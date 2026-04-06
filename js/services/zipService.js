/**
 * Service to handle the creation and generation of ZIP files.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.ZipService = {
    /**
     * Processes raw note data and generates a ZIP blob.
     */
    generateNotesZip: async function(notesData, exportFormat = 'md') {
        const zip = new JSZip();
        let processedCount = 0;

        const MarkdownExporter = window.LDS_Exporter.MarkdownExporter;
        const TextExporter = window.LDS_Exporter.TextExporter;
        const OrgExporter = window.LDS_Exporter.OrgExporter;
        const JsonExporter = window.LDS_Exporter.JsonExporter;
        const HtmlExporter = window.LDS_Exporter.HtmlExporter;
        const CsvExporter = window.LDS_Exporter.CsvExporter;
        const FileUtils = window.LDS_Exporter.FileUtils;
        const NoteNormalizer = window.LDS_Exporter.NoteNormalizer;

        // --- Special Case: CSV is a single file ---
        if (exportFormat === 'csv') {
            const csvContent = CsvExporter.createContent(notesData);
            zip.file("lds_notes_all.csv", csvContent);
            return await zip.generateAsync({ type: "blob" });
        }

        // --- Standard Case: Individual files ---
        notesData.forEach((rawNote, index) => {
            // Accept all note-like types from JSON or CSV
            const type = rawNote.type || "journal";
            const validTypes = ["journal", "highlight", "reference", "note"];
            if (!validTypes.includes(type)) return;

            // Use the exporter to get content and normalized metadata
            let content = '';
            let extension = exportFormat;

            if (exportFormat === 'md') {
                content = MarkdownExporter.createMarkdown(rawNote);
            } else if (exportFormat === 'txt') {
                content = TextExporter.createContent(rawNote);
            } else if (exportFormat === 'org') {
                content = OrgExporter.createContent(rawNote);
            } else if (exportFormat === 'json') {
                content = JsonExporter.createContent(rawNote);
            } else if (exportFormat === 'html') {
                content = HtmlExporter.createContent(rawNote);
            } else {
                throw new Error(`Unsupported export format: ${exportFormat}`);
            }

            // Get normalized data for filename and folder logic
            const note = NoteNormalizer.normalizeNoteData(rawNote);
            const filename = FileUtils.generateFilename(note, index, extension);
            
            // Folder logic
            const notebook = (note.notebooks && note.notebooks.length > 0) 
                ? note.notebooks[0] 
                : "Unassigned";
            
            const sanitizedFolder = notebook.replace(/[\\/:*?"<>|]/g, "_");
            
            zip.file(`${sanitizedFolder}/${filename}`, content);
            processedCount++;
        });

        if (processedCount === 0) {
            throw new Error("No valid notes found in the provided file.");
        }

        return await zip.generateAsync({ type: "blob" });
    }
};
