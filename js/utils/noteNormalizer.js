/**
 * Utility to map different input formats (Official CSV, API JSON) to a shared Note structure.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.NoteNormalizer = {
    /**
     * Maps raw input data to a standardized Note object.
     * @param {Object} d - Raw input data.
     * @returns {Object} Standardized note.
     */
    normalizeNoteData: function(d) {
        // Handle API JSON / CLI Archive Format
        if (d.note || d.annotationId) {
            return {
                title: d.note?.title || "",
                content: d.note?.content || "",
                type: d.type || "note",
                source: d.source || d.uri || "",
                tags: (d.tags || []).map(t => t.name),
                notebooks: (d.folders || []).map(f => f.name),
                updated: d.lastUpdated || "",
                created: d.created || "",
                color: d.highlights?.[0]?.color || ""
            };
        }
        // Handle Official CSV Format
        return {
            title: (d.title && d.title !== "undefined") ? d.title : "",
            content: d["note text"] || "",
            type: d.type || "note",
            source: d["source location"] || "",
            tags: d.tags ? d.tags.split(',').filter(s => s.trim()) : [],
            notebooks: d.notebooks ? d.notebooks.split(',').filter(s => s.trim()) : [],
            updated: d["last updated"] || "",
            created: d.created || "",
            color: d.color || ""
        };
    }
};
