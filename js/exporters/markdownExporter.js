/**
 * High-fidelity Markdown Exporter using Turndown.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.MarkdownExporter = {
    /**
     * Converts raw note data (JSON or CSV) into a formatted Markdown string.
     * @param {Object} rawData - Raw input data.
     * @returns {string} Formatted Markdown content.
     */
    createMarkdown: function(rawData) {
        const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawData);
        const title = note.title || "Untitled Note";
        
        // --- Source Metadata Cleanup ---
        let displaySource = note.source || "";
        if (displaySource && displaySource !== "undefined" && displaySource.startsWith("http")) {
            displaySource = displaySource.replace(/\/$/, ""); // Standardize: no trailing slash
        }

        // Only show source if it points to a specific sub-page
        const isSpecificPage = displaySource && 
                               displaySource.length > "https://www.churchofjesuschrist.org".length;
        const sourceLink = isSpecificPage ? `[View on Church Website](${displaySource})` : "";
        
        // --- YAML Frontmatter ---
        let frontmatter = `---\n`;
        frontmatter += `type: ${note.type}\n`;
        frontmatter += `title: "${title.replace(/"/g, '\\"')}"\n`;
        frontmatter += `source: ${isSpecificPage ? displaySource : ""}\n`;
        frontmatter += `color: ${note.color || ""}\n`;
        frontmatter += `tags: [${note.tags.join(', ')}]\n`;
        frontmatter += `notebooks: [${note.notebooks.join(', ')}]\n`;
        frontmatter += `updated: ${note.updated || ""}\n`;
        frontmatter += `created: ${note.created || ""}\n`;
        frontmatter += `---\n\n`;

        // --- Markdown Body ---
        let body = `# ${title}\n\n`;
        
        if (sourceLink) {
            body += `**Source:** ${sourceLink}\n\n`;
        }

        if (note.type === "highlight" || note.type === "reference") {
            const colorInfo = note.color ? ` <span style="color: ${note.color}">●</span>` : "";
            body += `> **Type:** ${note.type}${colorInfo}\n\n`;
        }

        if (note.content) {
            body += `${this.applyMarkdownRules(note.content)}\n\n`;
        }

        if (note.type === "highlight" && !note.content) {
            body += `*(This is a highlight without an attached note)*\n`;
        }

        return frontmatter + body;
    },

    /**
     * Converts HTML to Markdown using Turndown with specialized LDS rules.
     */
    applyMarkdownRules: function(content) {
        if (!content) return "";

        // Initialize Turndown Service
        const turndownService = new TurndownService({
            headingStyle: 'atx',
            hr: '---',
            bulletListMarker: '*',
            codeBlockStyle: 'fenced',
            emDelimiter: '*' 
        });

        // Preserve <u> tags for underline support
        turndownService.keep(['u']);

        // Prevent escaping of user-defined characters (e.g., using ] as 'é')
        const originalEscape = turndownService.escape;
        turndownService.escape = function (string) {
            return originalEscape(string).replace(/\\\[/g, '[').replace(/\\\]/g, ']');
        };

        // Convert to Markdown
        let markdown = turndownService.turndown(content);

        // Fix LDS internal link pattern: "Description [https://...]"
        markdown = markdown.replace(/([^\]\n\r]+)\s*\[(https?:\/\/[^\]\s]+)\](?!\()/g, "[$1]($2) ");

        // Final polishing of spacing and punctuation
        markdown = markdown
            .replace(/^[ \t]+|[ \t]+$/gm, "") // Trim whitespace per line
            .replace(/\n{3,}/g, "\n\n")       // Collapse excess line breaks
            .replace(/\s+([,.;:!\]])/g, "$1") // Clean punctuation spacing
            .trim();

        return markdown;
    }
};
