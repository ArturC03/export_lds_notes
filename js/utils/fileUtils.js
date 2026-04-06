/**
 * Utility functions for file handling and naming.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.FileUtils = {
    /**
     * Generates a safe filename for a note.
     */
    generateFilename: function(note, index, extension = "md") {
        let datePrefix = "";
        if (note.created && note.created.length >= 10) {
            datePrefix = note.created.substring(0, 10) + " - ";
        }

        let baseName = "Note";
        if (note.title && note.title !== "undefined") {
            baseName = note.title;
        } else if (note.type === "highlight") {
            baseName = "Highlight";
        } else if (note.type === "reference") {
            baseName = "Reference";
        }

        let sanitizedBase = baseName.replace(/[\\/:*?"<>|]/g, "_");
        if (sanitizedBase.length > 100) {
            sanitizedBase = sanitizedBase.substring(0, 100);
        }

        return `${datePrefix}${sanitizedBase}_${index}.${extension}`;
    },

    /**
     * Triggers a browser download of a blob.
     */
    downloadFile: function(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
};
