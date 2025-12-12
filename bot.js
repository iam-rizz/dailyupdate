// Smart Daily Update Bot
const fs = require('fs');
const simpleGit = require('simple-git');
const { execSync } = require('child_process');
const path = require('path');

const git = simpleGit();

// Konfigurasi
const TRACKING_FILE = path.join(__dirname, 'commit_tracking.json');
const DAILY_FILE = path.join(__dirname, 'daily_update.txt');
const BRANCH_NAME = 'auto/daily-update';
const BASE_BRANCH = 'main';

// Commit messages bervariasi
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

// Aktivitas development
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

function getRandomCommitMessage() {
    return commitMessages[Math.floor(Math.random() * commitMessages.length)];
}

function getRandomActivity() {
    return activityTypes[Math.floor(Math.random() * activityTypes.length)];
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

    // Reset counter jika hari berbeda
    if (tracking.date !== today) {
        tracking = {
            date: today,
            count: 0,
            targetCommits: Math.floor(Math.random() * 8) + 8 // Random 8-15
        };

        // Log new day
        const timestamp = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
        fs.appendFileSync(DAILY_FILE, `\n🌅 === NEW DAY: ${timestamp} === Target: ${tracking.targetCommits} commits ===\n\n`);
    }

    // Commit jika belum mencapai target
    const shouldCommit = tracking.count < tracking.targetCommits;

    if (shouldCommit) {
        tracking.count += 1;
    }

    fs.writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2));
    console.log(`📊 Today's progress: ${tracking.count}/${tracking.targetCommits} commits`);

    return shouldCommit;
}

// Logging dengan timestamp WIB
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

// Commit & push perubahan
async function makeCommit() {
    const commitMessage = getRandomCommitMessage();

    const branches = await git.branchLocal();
    if (!branches.all.includes(BRANCH_NAME)) {
        await git.checkoutLocalBranch(BRANCH_NAME);
    } else {
        await git.checkout(BRANCH_NAME);
    }

    await git.add([TRACKING_FILE, DAILY_FILE]);
    await git.commit(`${commitMessage} - ${new Date().toISOString()}`);
    await git.push('origin', BRANCH_NAME, { '--force': null });
    
    addLog(`Commit & push sukses: ${commitMessage}`, 'COMMIT');
}

// Buat PR otomatis
function createPullRequest() {
    try {
        execSync(
            `gh pr create --base ${BASE_BRANCH} --head ${BRANCH_NAME} --title "Daily Update & Progress Tracking" --body "Automated daily update & commit tracking."`,
            { stdio: 'inherit' }
        );
        addLog('PR berhasil dibuat', 'PR');
    } catch (err) {
        addLog('PR mungkin sudah ada, atau GitHub CLI belum login', 'PR');
    }
}

// Merge PR otomatis & hapus branch
function mergeAndDeleteBranch() {
    try {
        console.log('🔄 Mencoba merge langsung...');
        execSync(`gh pr merge --merge --delete-branch`, { stdio: 'inherit' });
        addLog('PR berhasil di-merge dan branch dihapus', 'CLEANUP');
    } catch (err) {
        console.log('⚠️ Merge langsung gagal. Mencoba fallback ke auto-merge...');
        try {
            execSync(`gh pr merge --merge --delete-branch --auto`, { stdio: 'inherit' });
            addLog('Auto-merge diaktifkan', 'CLEANUP');
        } catch (err2) {
            addLog('Gagal mengaktifkan auto-merge', 'ERROR');
        }
    }
}

// Main execution
(async () => {
    // Cek smart frequency dulu
    if (!shouldCommitNow()) {
        console.log('⏭️  Skipping - target harian sudah tercapai');
        return;
    }

    addLog('Bot execution started', 'SYSTEM');

    // Generate aktivitas
    const activity = getRandomActivity();
    addLog(`Started working on: ${activity}`, 'ACTIVITY');

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

    // Git operations
    await makeCommit();
    createPullRequest();
    mergeAndDeleteBranch();

    addLog('Bot execution finished', 'SYSTEM');
    addLog('─'.repeat(60), 'SEPARATOR');
})();
