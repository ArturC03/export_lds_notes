# LDS Notes Exporter 📜🚀

A powerful, private, and 100% client-side tool to export your notes and journals from the official Church website (ChurchofJesusChrist.org) into modern, open formats.

## ✨ Features

- **Total Privacy**: All processing is done entirely in your browser. Your data never leaves your computer.
- **Flexible Export Formats**:
  - 📝 **Markdown (.md)**: Perfect for Obsidian, Logseq, and Notion.
  - 📖 **Emacs Org Mode (.org)**: Structured for Emacs.
  - 🌐 **Rich HTML (.html)**: Preserves all formatting; ideal for Apple/Samsung Notes.
  - 📊 **Clean CSV (.csv)**: Organized table for Excel or Google Sheets.
  - 💻 **Clean JSON (.json)**: Clean, structured data for integrations.
  - 📄 **Plain Text (.txt)**: Simple and universal.
- **Modern UX**: 
  - Minimalist interface with a "Monochrome" design.
  - **Drag & Drop**: Drag and drop files directly into the upload area.
  - **Elegant Notifications**: Toast notification system for alerts and success messages.
  - **Real-time Statistics**: View a summary of your import (Total notes, journals, notebooks).

## 🚀 How to Use

1. **Download or Clone**: Get the code from this repository.
2. **Open the App**: Double-click the `index.html` file (no server required).
3. **Follow the Wizard**:
   - **Activation**: Open the official Church notes page.
   - **Download**: Download your data from the Church website.
   - **Upload**: Drag the file (JSON or CSV) to the designated area.
   - **Preview**: Explore your notes, use the search feature, and view statistics.
   - **Export**: Visually choose your format and download the ZIP.

## 🛠️ Technical Architecture

The project is 100% client-side (no backend). The current structure is modular:
- `/js/components/`: UI Controllers (Wizard, Preview, Export).
- `/js/exporters/`: Data conversion modules.
- `/js/parsers/`: Input data parsing logic.
- `/js/services/`: ZIP file manipulation.
- `/js/utils/`: Data normalization and helpers.
- `/styles/`: Modular CSS (base, layout, components).

## 🙏 Acknowledgments

I would like to express my sincere gratitude to the [gospel-library-export](https://github.com/AverageHelper/gospel-library-export) repository. It was through this project that I was able to make this tool a reality. It helped me understand the existing methods and how to handle formatting exports via the Church's API.

## 📄 License
GNU Affero General Public License v3.0
