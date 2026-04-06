/**
 * Wrapper for the CSV parsing logic.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.CsvParser = {
    /**
     * Parses a CSV file and returns a Promise with the results.
     */
    parse: function(file) {
        return new Promise((resolve, reject) => {
            // PapaParse is globally available via CDN
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error) => {
                    reject(new Error(`CSV Parsing Error: ${error.message}`));
                }
            });
        });
    }
};
