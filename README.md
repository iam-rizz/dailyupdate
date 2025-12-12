<h2 align="center"> ━━━━━━  ❖  ━━━━━━ </h2>

<!-- BADGES -->
<div align="center">

[![stars](https://img.shields.io/github/stars/iam-rizz/dailyupdate?color=C9CBFF&labelColor=1A1B26&style=for-the-badge)](https://github.com/iam-rizz/dailyupdate/stargazers)
[![size](https://img.shields.io/github/repo-size/iam-rizz/dailyupdate?color=9ece6a&labelColor=1A1B26&style=for-the-badge)](https://github.com/iam-rizz/dailyupdate)
[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fiam-rizz%2Fdailyupdate&label=View&labelColor=%231a1b26&countColor=%23e0af68)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fiam-rizz%2Fdailyupdate)
[![license](https://img.shields.io/github/license/iam-rizz/dailyupdate?color=FCA2AA&labelColor=1A1B26&style=for-the-badge)](https://github.com/iam-rizz/dailyupdate/blob/main/LICENSE.md)

</div>

<p align="center">
  <a href="README.md">English</a> •
  <a href="README-ID.md">Bahasa Indonesia</a>
</p>

<h2 align="center"> ━━━━━━  ❖  ━━━━━━ </h2>

# 🤖 Smart Daily Update Bot v2.0

Automated commit bot that maintains natural GitHub activity with smart randomization and robust Auto PR system.

## ✨ Key Features

- **Smart Frequency**: 8–15 random commits per day with probability algorithm
- **Auto Pull Request System**: Complete PR workflow with auto-merge and fallback
- **Dynamic Messages**: 20+ varied commit messages with unique emojis
- **Unique Branch Creation**: Format `auto/{activity}-{timestamp}`
- **Realistic Activity Simulation**: 12 diverse development activity types
- **Intelligent Progress Tracking**: JSON-based tracking with automatic daily reset
- **Timezone Aware**: All timestamps in WIB (Asia/Jakarta)
- **Robust Error Handling**: Retry logic, fallback system, and automatic cleanup
- **Concurrency Control**: File-based locking to prevent double execution
- **Branch Management**: Auto cleanup with zero-orphan policy

## 🔧 How It Works

1. **27 Scheduled Runs** per day (06:00–23:00 WIB) with random intervals
2. **Smart Decision Logic** - Bot decides commits based on daily target (8-15)
3. **Unique Branch Creation** - Format: `auto/{activity-slug}-{timestamp}`
4. **Realistic Activity Logging** - Updates to `daily_update.txt` with progress logs
5. **GitHub CLI Integration** - Auto-create PR with professional title and body
6. **Auto-Merge System** - Automatic merge and delete branch, fallback to manual merge
7. **Progress Tracking** - JSON tracking to maintain natural frequency
8. **Comprehensive Logging** - Detailed timestamps with category-based logging

## 📊 Development Activity Simulation

Bot simulates 12 realistic activity types:
- **Code review session** - Code review and feedback
- **Feature development** - New feature development
- **Bug fixing** - Bug fixes and error handling
- **Documentation update** - Documentation and README updates
- **Performance optimization** - Application performance optimization
- **Testing improvements** - Test coverage improvements
- **Refactoring work** - Restructuring and clean code
- **Security enhancements** - Security improvements and vulnerability fixes
- **UI/UX improvements** - User interface and experience improvements
- **Database optimization** - Query and database schema optimization
- **API development** - REST/GraphQL API development
- **Deployment preparation** - Deployment and CI/CD setup

## 🎯 Smart Logic Algorithm

```javascript
// Daily Target Algorithm
targetCommits: Math.floor(Math.random() * 8) + 8 // Range: 8–15

// Commit Decision Logic
const shouldCommit = tracking.count < tracking.targetCommits;

// Progress Tracking
{
  "date": "Fri Dec 12 2025",
  "count": 7,
  "targetCommits": 12
}
```

### Smart Tracking Features:
- Automatic reset every day with random target
- Real-time progress counter in `commit_tracking.json`
- Auto-commit tracking file for synchronization
- Natural frequency distribution throughout the day

## 📈 Expected Results & Performance

- **Daily Frequency**: 8–15 consistent commits per day
- **Success Rate**: ~95% execution rate with 27 scheduled runs
- **GitHub Profile**: Consistent green squares with professional messages
- **Activity Logs**: Detailed simulation logs in `daily_update.txt`
- **PR History**: Clean pull request workflow with auto-merge
- **Branch Management**: Zero orphaned branches with auto-cleanup
- **Error Recovery**: Robust fallback system for handling conflicts

## 🚀 Setup & Installation

### Prerequisites
```bash
# Node.js 20+ with npm
# GitHub CLI (gh) installed and authenticated
# Repository with Actions enabled
# Proper GitHub token permissions
```

### Installation Steps

1. **Clone/Fork Repository**
   ```bash
   git clone https://github.com/iam-rizz/dailyupdate.git
   cd dailyupdate
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure GitHub Actions**
   - Ensure Actions enabled in repository settings
   - Verify GITHUB_TOKEN permissions (contents: write, pull-requests: write)

4. **Test Manual Execution** (optional)
   ```bash
   export GITHUB_TOKEN="your_token"
   node bot.js
   ```

5. **Deploy & Monitor**
   - Push to GitHub to activate workflow
   - Monitor in Actions tab for execution logs

## 📱 Monitoring & Debugging

### Monitoring Locations
- **Actions Tab**: Real-time workflow execution and error logs
- **Pull Requests**: Auto-created PRs with merge history
- **`daily_update.txt`**: Detailed activity logs with WIB timestamp
- **`commit_tracking.json`**: Daily progress and target tracking
- **Network Graph**: Visual branch creation and merge pattern

### Log Categories
- `[SYSTEM]` - Bot lifecycle events
- `[ACTIVITY]` - Development activity simulation
- `[BRANCH]` - Branch operations and switching
- `[COMMIT]` - Commit operations and messages
- `[PUSH]` - Push operations with retry logic
- `[PR]` - Pull request creation and management
- `[CLEANUP]` - Branch cleanup and maintenance
- `[ERROR]` - Error handling and troubleshooting
- `[WARNING]` - Non-critical issues
- `[SYNC]` - Remote synchronization

## ⚙️ Customization

### Change Frequency Target
```javascript
// File: bot.js
targetCommits: Math.floor(Math.random() * 8) + 8 // 8–15
// Change to:
targetCommits: Math.floor(Math.random() * 5) + 10 // 10–14
```

### Add Commit Messages
```javascript
// File: bot.js
const commitMessages = [
    "📝 Daily activity update",
    // Add new messages...
    "🌟 Your custom message"
];
```

### Change Schedule
```yaml
# File: .github/workflows/daily.yml
- cron: '0 17 * * *'    # 00:00 WIB (new schedule)
```

## 🔧 Auto PR System

### Pull Request Workflow
```
New Branch → Commit Changes → Push to Remote → Create PR → Auto-Merge → Delete Branch
```

### PR Format
- **Title Format**: `[Auto] {commit-message}`
- **Body Template**: `Automated PR for {activity}`
- **Branch Naming**: `auto/{activity-slug}-{timestamp}`
- **Base Branch**: `main`
- **Merge Strategy**: `--merge --delete-branch`

### Advanced Features
- **Retry Logic**: 3x push attempts with delay
- **Lock Mechanism**: File-based locking (5 min timeout)
- **Remote Sync**: Auto-sync with upstream before operations
- **Fallback System**: Auto-merge flag if direct merge fails
- **Cleanup Process**: Zero-orphan branch policy

## 🛡️ Security & Best Practices

- **Token Management**: Environment-based token handling
- **Permission Scope**: Minimal required permissions
- **Concurrent Protection**: File-based locking mechanism
- **Rate Limiting**: Natural frequency control prevents spam

## 🔍 Troubleshooting

### Common Issues

1. **"No upstream branch" Error**
   - Solution: Explicit remote/branch in push command

2. **PR Creation Failed**
   ```bash
   gh auth status
   gh repo view --json permissions
   ```

3. **Lock File Issues**
   ```bash
   rm .bot-lock
   ```

---

**Current Version**: Smart Bot v2.0  
**Daily Target**: 8–15 commits with Auto PR System  
**Workflow Schedule**: 27 executions/day (06:00–23:00 WIB)  

*Maintaining professional GitHub contributions with intelligent automation* 🚀
