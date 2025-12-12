// Smart Daily Update Bot v2.0
const fs = require('fs');
const simpleGit = require('simple-git');
const { execSync } = require('child_process');
const path = require('path');

const git = simpleGit();

// Configuration
const TRACKING_FILE = path.join(__dirname, 'commit_tracking.json');
const DAILY_FILE = path.join(__dirname, 'daily_update.txt');
const LOCK_FILE = path.join(__dirname, '.bot-lock');
const BASE_BRANCH = 'main';
const MAX_LOCK_AGE = 5 * 60 * 1000; // 5 minutes

// Commit messages
const commitMessages = [
    "📝 Daily activity update",
    "🔄 Regular maintenance commit",
    "✨ Fresh daily changes",
    "🚀 Automated sync update",
    "📊 Progress tracking update",
    "🔧 System maintenance log",
    "💫 Daily workflow commit",
    "⚡ Quick status update",
    "🌟 Regular check-in",
    "🎯 Daily milestone update",
    "🔥 Continuous improvement",
    "💡 Daily insights update",
    "🚧 Work in progress sync",
    "📈 Performance tracking",
    "🎨 Daily refinements",
    "🛠️ Routine optimization",
    "💪 Daily grind update",
    "🌈 Creative progress sync",
    "⭐ Excellence pursuit update",
    "🏆 Achievement tracking"
];

// Activity types
const activityTypes = [
    "code review session",
    "feature development",
    "bug fixing",
    "documentation update",
    "performance optimization",
    "testing improvements",
    "refactoring work",
    "security enhancements",
    "UI/UX improvements",
    "database optimization",
    "API development",
    "deployment preparation"
];

// Lock mechanism
function acquireLock() {
    if (process.env.GITHUB_ACTIONS) return true; // Skip in CI

    try {
        if (fs.existsSync(LOCK_FILE)) {
            const lockTime = parseInt(fs.readFileSync(LOCK_FILE, 'utf8'));
            if (Date.now() - lockTime < MAX_LOCK_AGE) {
                return false;
            }
            fs.unlinkSync(LOCK_FILE);
        }
        fs.writeFileSync(LOCK_FILE, Date.now().toString());
        return true;
    } catch (error) {
        return false;
    }
}

function releaseLock() {
    try {
        if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
    } catch (error) {}
}

// Helpers
function getRandomCommitMessage() {
    return commitMessages[Math.floor(Math.random() * commitMessages.length)];
}

function getRandomActivity() {
    return activityTypes[Math.floor(Math.random() * activityTypes.length)];
}

function generateBranchName(activity) {
    return `auto/${activity.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
}

// Smart frequency control
function shouldCommitNow() {
    const today = new Date().toDateString();
    let tracking = {};

    if (fs.existsSync(TRACKING_FILE)) {
        try {
            tracking = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
        } catch (error) {
            tracking = {};
        }
    }

    if (tracking.date !== today) {
        tracking = {
            date: today,
            count: 0,
            targetCommits: Math.floor(Math.random() * 8) + 8 // 8-15
        };

        const timestamp = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
        fs.appendFileSync(DAILY_FILE, `\n🌅 === NEW DAY: ${timestamp} === Target: ${tracking.targetCommits} commits ===\n\n`);
    }

    const shouldCommit = tracking.count < tracking.targetCommits;
    if (shouldCommit) tracking.count += 1;

    fs.writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2));
    console.log(`📊 Today's progress: ${tracking.count}/${tracking.targetCommits} commits`);

    return shouldCommit;
}

// Logging
function addLog(message, type = 'INFO') {
    const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const logEntry = `[${timestamp} WIB] [${type}] ${message}\n`;
    fs.appendFileSync(DAILY_FILE, logEntry);
    console.log(`[${type}] ${message}`);
}

// Sync with remote
async function syncWithRemote() {
    try {
        await git.fetch();
        await git.reset(['--hard', `origin/${BASE_BRANCH}`]);
        addLog('Synced with remote', 'SYNC');
        return true;
    } catch (error) {
        addLog(`Sync failed: ${error.message}`, 'ERROR');
        return false;
    }
}

// Push with retry
async function pushWithRetry(branchName, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            await git.push('origin', branchName, { '--force': null });
            addLog(`Push successful to ${branchName}`, 'PUSH');
            return true;
        } catch (error) {
            addLog(`Push attempt ${i + 1} failed: ${error.message}`, 'WARNING');
            if (i < maxRetries - 1) {
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }
    addLog('All push attempts failed', 'ERROR');
    return false;
}

// Create PR
function createPullRequest(branchName, commitMessage, activity) {
    try {
        const prTitle = `[Auto] ${commitMessage}`;
        const prBody = `Automated PR for ${activity}`;
        execSync(
            `gh pr create --base ${BASE_BRANCH} --head ${branchName} --title "${prTitle}" --body "${prBody}"`,
            { stdio: 'pipe' }
        );
        addLog('PR created successfully', 'PR');
        return true;
    } catch (err) {
        addLog('PR already exists or creation failed', 'PR');
        return false;
    }
}

// Merge PR
function mergePullRequest() {
    try {
        execSync(`gh pr merge --merge --delete-branch`, { stdio: 'pipe' });
        addLog('PR merged and branch deleted', 'CLEANUP');
        return true;
    } catch (err) {
        try {
            execSync(`gh pr merge --merge --delete-branch --auto`, { stdio: 'pipe' });
            addLog('Auto-merge enabled', 'CLEANUP');
            return true;
        } catch (err2) {
            addLog('Merge failed', 'ERROR');
            return false;
        }
    }
}

// Cleanup branch
async function cleanupBranch(branchName) {
    try {
        await git.checkout(BASE_BRANCH);
        await git.deleteLocalBranch(branchName, true);
        addLog(`Cleaned up branch: ${branchName}`, 'CLEANUP');
    } catch (error) {}
}

// Main execution
async function main() {
    if (!acquireLock()) {
        console.log('🔒 Another instance is running, skipping...');
        return;
    }

    try {
        // Sync first before checking tracking
        await git.checkout(BASE_BRANCH);
        await syncWithRemote();

        if (!shouldCommitNow()) {
            console.log('⏭️  Skipping - daily target reached');
            return;
        }

        addLog('Bot execution started', 'SYSTEM');

        const activity = getRandomActivity();
        const branchName = generateBranchName(activity);
        const commitMessage = getRandomCommitMessage();

        addLog(`Working on: ${activity}`, 'ACTIVITY');

        // Create branch from synced main
        await git.checkoutLocalBranch(branchName);
        addLog(`Created branch: ${branchName}`, 'BRANCH');

        // Progress logs
        const progressMessages = [
            '🔍 Analyzing requirements',
            '⚡ Implementing solution',
            '🧪 Running tests',
            '✅ Task completed successfully'
        ];
        const numLogs = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numLogs; i++) {
            addLog(progressMessages[i], 'PROGRESS');
        }

        // Commit and push (tracking file sudah di-update oleh shouldCommitNow)
        await git.add([TRACKING_FILE, DAILY_FILE]);
        await git.commit(`${commitMessage} - ${new Date().toISOString()}`);
        addLog(`Committed: ${commitMessage}`, 'COMMIT');

        if (await pushWithRetry(branchName)) {
            createPullRequest(branchName, commitMessage, activity);
            await new Promise(r => setTimeout(r, 2000));
            mergePullRequest();
        }

        await cleanupBranch(branchName);
        addLog('Bot execution finished', 'SYSTEM');
        addLog('─'.repeat(60), 'SEPARATOR');

    } catch (error) {
        addLog(`Error: ${error.message}`, 'ERROR');
    } finally {
        releaseLock();
    }
}

main();
