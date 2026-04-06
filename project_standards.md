# Project Standards: LDS Notes Exporter

## Purpose
The **LDS Notes Exporter** is a web-based tool designed to help users manage their personal study notes from the Church of Jesus Christ of Latter-day Saints official website. 

The application allows users to:
1.  Download their official notes in CSV format directly from the Church's API.
2.  Upload that CSV to this tool.
3.  Export the notes into a preferred format (currently supporting Markdown, with plans to expand to other formats).

## Project Architecture
The project must follow a **modular architecture** to ensure maintainability and scalability. All logic should be separated from the presentation layer (`index.html`).

### Directory Structure
-   `/index.html`: The main entry point (HTML only).
-   `/styles/`: Contains all CSS files.
-   `/js/`: Contains all JavaScript modules.
    -   `/js/main.js`: Orchestrates the application logic and UI interactions.
    -   `/js/parsers/`: Logic for parsing input files (e.g., CSV parsing).
    -   `/js/exporters/`: Modules for different export formats (e.g., Markdown, PDF, etc.).
    -   `/js/utils/`: General utility functions (file handling, string manipulation).

## Coding Conventions
To ensure consistency and professional standards, the following rules apply:

### Language
-   **All code must be in English.** This includes:
    -   Variable and function names.
    -   Class names.
    -   Comments and documentation.
    -   Commit messages.
-   The User Interface (UI) can be in other languages (e.g., Portuguese) to support the target audience, but the underlying implementation must remain in English.

### JavaScript (ES6+)
-   Use **Namespace Pattern** (global objects) for modularity to support local file execution (`file://`).
-   Avoid global variables outside the main application namespace (`window.LDS_Exporter`).
-   Functions should follow the **Single Responsibility Principle**.
-   Use `const` and `let` instead of `var`.
-   Naming style: `camelCase` for variables and functions, `PascalCase` for classes/modules.

### HTML/CSS
-   Keep HTML semantic.
-   Use external stylesheets; avoid inline styles.
-   CSS naming style: `kebab-case`.

## Future Expansion
The system is designed to be extensible. When adding a new export format:
1.  Create a new module in `/js/exporters/`.
2.  Register the new format in the main UI to allow user selection.
3.  Ensure the new exporter follows the established interface for note conversion.
