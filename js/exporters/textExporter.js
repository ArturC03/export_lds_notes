/**
 * Provider for TXT export.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.TextExporter = {
    /**
     * Converts note object into plain text.
     */
    createContent: function(rawData) {
        const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawData);
        let output = `${note.title.toUpperCase()}\n`;
        output += `====================\n\n`;
        output += `${note.content.replace(/<[^>]*>/g, '')}\n`;
        return output;
    },
    extension: 'txt'
};
