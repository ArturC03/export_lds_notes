/**
 * Wrapper for JSON parsing logic.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.JsonParser = {
    /**
     * Parses a JSON file and returns a Promise with the results.
     * @param {File} file - The JSON file to parse.
     * @returns {Promise<Array<Object>>}
     */
    parse: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    // The CLI often exports an array of annotations directly
                    // but the API sometimes wraps it in { annotations: [] }
                    const notes = Array.isArray(data) ? data : (data.annotations || []);
                    resolve(notes);
                } catch (error) {
                    reject(new Error(`JSON Parsing Error: ${error.message}`));
                }
            };
            reader.onerror = () => reject(new Error("Error reading file"));
            reader.readAsText(file);
        });
    }
};
