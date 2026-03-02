# 🚀 Ai-Markmap-Pro

**Professional AI-Powered Mind Map Generator** - Enhanced version with advanced features

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/platoba/Ai-Markmap-Pro)

## ✨ What's New in Pro Version

### 🎯 Core Enhancements
- **📚 History Management** - Save, search, and restore your mind maps
- **🎨 Theme System** - Dark mode + 5 beautiful color schemes
- **📦 Template Library** - 15+ ready-to-use templates
- **🔗 Share System** - Generate shareable URLs
- **📤 Advanced Export** - MD/JSON/PDF support
- **💡 Prompt Library** - 20+ AI prompt templates
- **⌨️ Power User Shortcuts** - Extended keyboard controls
- **💾 Auto-save** - Never lose your work
- **🔍 Search & Filter** - Find your maps instantly
- **📊 Batch Operations** - Export multiple versions

## 🚀 Quick Start

### Option 1: Direct Use
1. Download `index-pro.html`
2. Open in your browser
3. Configure API settings
4. Start creating!

### Option 2: Local Development
```bash
git clone https://github.com/platoba/Ai-Markmap-Pro.git
cd Ai-Markmap-Pro
# Open index-pro.html in browser
```

## 📖 Features Guide

### History Management
- **Auto-save**: Every generated map is saved automatically
- **Search**: Find maps by title, content, or date
- **Tags**: Organize maps with custom tags
- **Export/Import**: Backup your entire history

### Template System
Choose from 15+ templates:
- 📋 Project Planning
- 🧠 Brainstorming
- 📚 Learning Notes
- 🎯 Goal Setting
- 📊 SWOT Analysis
- 🗺️ Roadmap
- 📝 Meeting Notes
- 🔬 Research
- And more...

### Theme System
- 🌊 Ocean (Blue tones)
- 🌲 Forest (Green tones)
- 🌅 Sunset (Warm tones)
- 💜 Purple (Purple tones)
- ⚫ Monochrome (Grayscale)
- 🌙 Dark Mode

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Generate mind map |
| `Ctrl+S` | Export PNG |
| `Ctrl+Shift+S` | Export SVG |
| `Ctrl+H` | Open history |
| `Ctrl+T` | Open templates |
| `Ctrl+K` | Open prompt library |
| `←` / `→` | Switch versions |
| `F11` | Fullscreen |
| `Esc` | Close modals |

## 🎨 Customization

### Custom Themes
Add your own color schemes by editing the theme configuration:
```javascript
const customTheme = {
  name: 'My Theme',
  colors: ['#color1', '#color2', '#color3', ...],
  background: '#ffffff',
  text: '#000000'
};
```

### Custom Templates
Create templates for your specific needs:
```markdown
# Template Name
## Section 1
- Point 1
- Point 2
## Section 2
- Point A
- Point B
```

## 🔧 API Configuration

### Supported Providers
- OpenAI (GPT-4, GPT-3.5)
- Anthropic Claude
- Google Gemini
- Azure OpenAI
- Any OpenAI-compatible API

### Setup
1. Click `⚙️ API Settings`
2. Enter API URL (e.g., `https://api.openai.com`)
3. Enter API Key
4. Select or enter model name
5. Save

## 📤 Export Options

### Formats
- **PNG**: High-resolution raster image
- **SVG**: Scalable vector graphics
- **Markdown**: Plain text format
- **JSON**: Structured data
- **PDF**: Printable document (via browser print)

### Batch Export
Export all versions at once:
1. Generate multiple versions
2. Click `Batch Export`
3. Choose format
4. Download as ZIP

## 🔗 Sharing

### Generate Share Link
1. Create your mind map
2. Click `Share` button
3. Copy generated URL
4. Share with others

### URL Parameters
- `data`: Base64-encoded mind map data
- `theme`: Theme name
- `lang`: Language (zh/en)

Example:
```
https://your-domain.com/index-pro.html?data=BASE64_DATA&theme=ocean&lang=en
```

## 🌐 Multi-language

Supported languages:
- 🇨🇳 Chinese (Simplified)
- 🇺🇸 English
- 🇯🇵 Japanese (Coming soon)
- 🇰🇷 Korean (Coming soon)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development
```bash
# Clone the repo
git clone https://github.com/platoba/Ai-Markmap-Pro.git

# Make your changes
# Test thoroughly

# Submit PR
```

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Original project: [Ai-Markmap](https://github.com/kongkongyo/Ai-Markmap) by kongkongyo
- [Markmap](https://markmap.js.org/) - Mind map rendering
- [D3.js](https://d3js.org/) - Data visualization

## 📧 Contact

- GitHub: [@platoba](https://github.com/platoba)
- Issues: [Report a bug](https://github.com/platoba/Ai-Markmap-Pro/issues)

## 🗺️ Roadmap

### v2.1.0 (Planned)
- [ ] Real-time collaboration
- [ ] Cloud sync
- [ ] Mobile apps (iOS/Android)
- [ ] Plugin system
- [ ] More AI providers

### v2.2.0 (Planned)
- [ ] Video export
- [ ] Presentation mode
- [ ] Advanced analytics
- [ ] Team workspaces

---

**Made with ❤️ by the Ai-Markmap-Pro team**
