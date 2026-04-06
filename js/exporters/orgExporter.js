/**
 * Provider for Emacs Org mode export using Turndown for robust conversion.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.OrgExporter = {
    /**
     * Converts note object into Org mode format.
     */
    createContent: function(rawData) {
        const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawData);
        const title = note.title || "Untitled Note";

        let output = `#+TITLE: ${title}\n`;
        output += `#+TYPE: ${note.type}\n`;
        output += `#+DATE: ${note.created || ""}\n`;
        output += `#+UPDATED: ${note.updated || ""}\n`;
        output += `#+SOURCE: ${note.source || ""}\n`;
        output += `#+COLOR: ${note.color || ""}\n`;

        if (note.tags && note.tags.length > 0) {
            const orgTags = note.tags.map(t => t.replace(/\s+/g, '_')).join(':');
            output += `#+FILETAGS: :${orgTags}:\n`;
        }

        if (note.notebooks && note.notebooks.length > 0) {
            output += `#+NOTEBOOKS: ${note.notebooks.join(', ')}\n`;
        }

        output += `\n* ${title}\n\n`;
        if (note.content) {
            output += this.applyOrgRules(note.content) + "\n";
        }
        
        return output;
    },

    /**
     * Converts HTML to Org mode using Turndown with custom Org rules.
     */
    applyOrgRules: function(content) {
        if (!content) return "";

        // Initialize Turndown Service
        const turndownService = new TurndownService({
            hr: '-----',
            bulletListMarker: '-',
        });

        // Org Mode Rules
        // Bold: *text*
        turndownService.addRule('bold', {
            filter: ['b', 'strong'],
            replacement: (content) => `*${content}*`
        });

        // Italic: /text/
        turndownService.addRule('italic', {
            filter: ['i', 'em'],
            replacement: (content) => `/${content}/`
        });

        // Underline: _text_
        turndownService.addRule('underline', {
            filter: ['u'],
            replacement: (content) => `_${content}_`
        });

        // Links: [[url][description]]
        turndownService.addRule('link', {
            filter: 'a',
            replacement: (content, node) => {
                const href = node.getAttribute('href') || '';
                return `[[${href}][${content}]]`;
            }
        });

        // Prevent escaping of characters that Org Mode uses
        const originalEscape = turndownService.escape;
        turndownService.escape = function (string) {
            return originalEscape(string)
                .replace(/\\\[/g, '[')
                .replace(/\\\]/g, ']')
                .replace(/\\\*/g, '*')
                .replace(/\\\_/g, '_')
                .replace(/\\\//g, '/');
        };

        let org = turndownService.turndown(content);

        // Final polishing
        org = org
            .replace(/^[ \t]+|[ \t]+$/gm, "") // Trim whitespace per line
            .replace(/\n{3,}/g, "\n\n")       // Collapse excess line breaks
            .trim();

        return org;
    },

    extension: 'org'
};
