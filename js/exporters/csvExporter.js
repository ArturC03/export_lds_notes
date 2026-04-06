/**
 * Provider for Clean CSV export.
 * Formats all notes into a single tabular structure.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.CsvExporter = {
    /**
     * Converts an array of raw notes into a single CSV string.
     */
    createContent: function(notesData) {
        const NoteNormalizer = window.LDS_Exporter.NoteNormalizer;
        
        // Normalize all notes
        const rows = notesData.map(rawData => {
            const note = NoteNormalizer.normalizeNoteData(rawData);
            return {
                Title: note.title || "Untitled Note",
                Type: note.type,
                Date: note.created || "",
                Updated: note.updated || "",
                Notebooks: note.notebooks.join(', '),
                Tags: note.tags.join(', '),
                Source: note.source || "",
                Color: note.color || "",
                Content: note.content || ""
            };
        });

        // Use PapaParse (already in index.html) to generate valid CSV
        return Papa.unparse(rows);
    },
    extension: 'csv'
};
