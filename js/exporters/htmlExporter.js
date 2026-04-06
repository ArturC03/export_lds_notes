/**
 * Provider for Rich HTML export.
 * Perfect for importing into Apple Notes, Samsung Notes, or printing.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.HtmlExporter = {
    /**
     * Converts note object into a clean HTML document.
     */
    createContent: function(rawData) {
        const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawData);
        const title = note.title || "Untitled Note";

        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; color: #333; }
        .meta { font-size: 0.85em; color: #666; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
        .meta-item { margin-bottom: 5px; }
        .meta-label { font-weight: bold; margin-right: 5px; }
        h1 { margin-top: 0; }
        .content { white-space: pre-wrap; } /* Fallback for plain text content */
        .content:has(> *) { white-space: normal; } /* Use normal spacing if HTML tags present */
    </style>
</head>
<body>
    <div class="meta">
        <h1>${title}</h1>
        <div class="meta-item"><span class="meta-label">Type:</span> ${note.type}</div>
        <div class="meta-item"><span class="meta-label">Date:</span> ${note.created || ""}</div>
        ${note.source ? `<div class="meta-item"><span class="meta-label">Source:</span> <a href="${note.source}">${note.source}</a></div>` : ""}
        ${note.tags.length > 0 ? `<div class="meta-item"><span class="meta-label">Tags:</span> ${note.tags.join(', ')}</div>` : ""}
        ${note.notebooks.length > 0 ? `<div class="meta-item"><span class="meta-label">Notebooks:</span> ${note.notebooks.join(', ')}</div>` : ""}
    </div>
    <div class="content">
        ${note.content || "<i>(No content)</i>"}
    </div>
</body>
</html>`;

        return html;
    },
    extension: 'html'
};
