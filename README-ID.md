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

Bot commit otomatis yang memelihara aktivitas GitHub natural dengan randomisasi cerdas dan sistem Auto PR yang robust.

## ✨ Fitur Utama

- **Smart Frequency**: 8–15 commit random per hari dengan algoritma probabilitas
- **Auto Pull Request System**: Workflow PR lengkap dengan auto-merge dan fallback
- **Dynamic Messages**: 20+ pesan commit bervariasi dengan emoji unik
- **Unique Branch Creation**: Format `auto/{activity}-{timestamp}`
- **Realistic Activity Simulation**: 12 jenis aktivitas development yang beragam
- **Intelligent Progress Tracking**: JSON-based tracking dengan reset harian otomatis
- **Timezone Aware**: Semua timestamp dalam WIB (Asia/Jakarta)
- **Robust Error Handling**: Retry logic, fallback system, dan cleanup otomatis
- **Concurrency Control**: File-based locking untuk mencegah double execution
- **Branch Management**: Auto cleanup dengan zero-orphan policy

## 🔧 Sistem Kerja

1. **27 Scheduled Runs** per hari (06:00–23:00 WIB) dengan interval random
2. **Smart Decision Logic** - Bot memutuskan commit berdasarkan target harian (8-15)
3. **Unique Branch Creation** - Format: `auto/{activity-slug}-{timestamp}`
4. **Realistic Activity Logging** - Update ke `daily_update.txt` dengan progress logs
5. **GitHub CLI Integration** - Auto-create PR dengan title dan body professional
6. **Auto-Merge System** - Otomatis merge dan delete branch, fallback ke manual merge
7. **Progress Tracking** - JSON tracking untuk maintain frequency natural
8. **Comprehensive Logging** - Timestamp detail dengan category-based logging

## 📊 Simulasi Aktivitas Development

Bot mensimulasikan 12 jenis aktivitas realistis:
- **Code review session** - Review dan feedback kode
- **Feature development** - Pengembangan fitur baru
- **Bug fixing** - Perbaikan bug dan error handling
- **Documentation update** - Update dokumentasi dan README
- **Performance optimization** - Optimasi performa aplikasi
- **Testing improvements** - Peningkatan test coverage
- **Refactoring work** - Restructuring dan clean code
- **Security enhancements** - Peningkatan security dan vulnerability fixes
- **UI/UX improvements** - Perbaikan user interface dan experience
- **Database optimization** - Optimasi query dan database schema
- **API development** - Pengembangan REST/GraphQL API
- **Deployment preparation** - Setup deployment dan CI/CD

## 🎯 Algoritma Smart Logic

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

### Fitur Smart Tracking:
- Reset otomatis setiap hari dengan target random
- Progress counter real-time di `commit_tracking.json`
- Auto-commit tracking file untuk sinkronisasi
- Natural frequency distribution sepanjang hari

## 📈 Hasil & Performa

- **Daily Frequency**: 8–15 commits konsisten per hari
- **Success Rate**: ~95% execution rate dengan 27 scheduled runs
- **GitHub Profile**: Green squares konsisten dengan professional messages
- **Activity Logs**: Detailed simulation logs di `daily_update.txt`
- **PR History**: Clean pull request workflow dengan auto-merge
- **Branch Management**: Zero orphaned branches dengan auto-cleanup
- **Error Recovery**: Robust fallback system untuk handling conflicts

## 🚀 Setup & Instalasi

### Prasyarat
```bash
# Node.js 20+ dengan npm
# GitHub CLI (gh) terinstall dan sudah login
# Repository dengan Actions enabled
# GitHub token permissions yang sesuai
```

### Langkah Instalasi

1. **Clone/Fork Repository**
   ```bash
   git clone https://github.com/iam-rizz/dailyupdate.git
   cd dailyupdate
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi GitHub Actions**
   - Pastikan Actions enabled di repository settings
   - Verifikasi GITHUB_TOKEN permissions (contents: write, pull-requests: write)

4. **Test Manual** (opsional)
   ```bash
   export GITHUB_TOKEN="your_token"
   node bot.js
   ```

5. **Deploy & Monitor**
   - Push ke GitHub untuk aktivasi workflow
   - Monitor di Actions tab untuk execution logs

## 📱 Monitoring & Debugging

### Lokasi Monitoring
- **Actions Tab**: Real-time workflow execution dan error logs
- **Pull Requests**: Auto-created PRs dengan merge history
- **`daily_update.txt`**: Detailed activity logs dengan timestamp WIB
- **`commit_tracking.json`**: Daily progress dan target tracking
- **Network Graph**: Visual branch creation dan merge pattern

### Kategori Log
- `[SYSTEM]` - Bot lifecycle events
- `[ACTIVITY]` - Development activity simulation
- `[BRANCH]` - Branch operations dan switching
- `[COMMIT]` - Commit operations dan messages
- `[PUSH]` - Push operations dengan retry logic
- `[PR]` - Pull request creation dan management
- `[CLEANUP]` - Branch cleanup dan maintenance
- `[ERROR]` - Error handling dan troubleshooting
- `[WARNING]` - Non-critical issues
- `[SYNC]` - Remote synchronization

## ⚙️ Kustomisasi

### Ubah Target Frequency
```javascript
// File: bot.js
targetCommits: Math.floor(Math.random() * 8) + 8 // 8–15
// Ubah ke:
targetCommits: Math.floor(Math.random() * 5) + 10 // 10–14
```

### Tambah Commit Messages
```javascript
// File: bot.js
const commitMessages = [
    "📝 Daily activity update",
    // Tambah pesan baru...
    "🌟 Your custom message"
];
```

### Ubah Schedule
```yaml
# File: .github/workflows/daily.yml
- cron: '0 17 * * *'    # 00:00 WIB (schedule baru)
```

## 🔧 Sistem Auto PR

### Workflow Pull Request
```
Branch Baru → Commit Changes → Push ke Remote → Create PR → Auto-Merge → Delete Branch
```

### Format PR
- **Title Format**: `[Auto] {commit-message}`
- **Body Template**: `Automated PR for {activity}`
- **Branch Naming**: `auto/{activity-slug}-{timestamp}`
- **Base Branch**: `main`
- **Merge Strategy**: `--merge --delete-branch`

### Fitur Lanjutan
- **Retry Logic**: 3x push attempts dengan delay
- **Lock Mechanism**: File-based locking (5 menit timeout)
- **Remote Sync**: Auto-sync dengan upstream sebelum operasi
- **Fallback System**: Auto-merge flag jika direct merge gagal
- **Cleanup Process**: Zero-orphan branch policy

## 🛡️ Security & Best Practices

- **Token Management**: Environment-based token handling
- **Permission Scope**: Minimal required permissions
- **Concurrent Protection**: File-based locking mechanism
- **Rate Limiting**: Natural frequency control mencegah spam

## 🔍 Troubleshooting

### Masalah Umum

1. **Error "No upstream branch"**
   - Solusi: Explicit remote/branch dalam push command

2. **PR Creation Gagal**
   ```bash
   gh auth status
   gh repo view --json permissions
   ```

3. **Lock File Issues**
   ```bash
   rm .bot-lock
   ```

---

**Versi Saat Ini**: Smart Bot v2.0  
**Target Harian**: 8–15 commits dengan Auto PR System  
**Jadwal Workflow**: 27 eksekusi/hari (06:00–23:00 WIB)  

*Memelihara kontribusi GitHub profesional dengan automasi cerdas* 🚀
