/**
 * Provider for Clean JSON export.
 * Normalizes LDS notes into a simple, structured format.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.JsonExporter = {
    /**
     * Converts note object into a clean JSON string.
     */
    createContent: function(rawData) {
        const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawData);
        const markdownContent = window.LDS_Exporter.MarkdownExporter.applyMarkdownRules(note.content);
        
        // Structure only the relevant data
        const cleanData = {
            title: note.title || "Untitled Note",
            type: note.type,
            content: markdownContent,
            metadata: {
                source: note.source || null,
                color: note.color || null,
                tags: note.tags || [],
                notebooks: note.notebooks || [],
                created: note.created || null,
                updated: note.updated || null
            }
        };

        return JSON.stringify(cleanData, null, 4);
    },
    extension: 'json'
};
