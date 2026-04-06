/**
 * Handles the export format selection and ZIP generation.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.ExportController = {
    init: function() {
        this.formatCards = document.querySelectorAll(".format-card");
        this.exportFormatInput = document.getElementById("exportFormat");
        this.convertBtn = document.getElementById("convertBtn");
        this.statusEl = document.getElementById("status");

        if (this.formatCards) {
            this.formatCards.forEach(card => {
                card.addEventListener("click", () => {
                    this.formatCards.forEach(c => c.classList.remove("active"));
                    card.classList.add("active");
                    if (this.exportFormatInput) {
                        this.exportFormatInput.value = card.getAttribute("data-value");
                    }
                });
            });
        }
    },

    bindExportAction: function(getDataCallback, onComplete) {
        if (!this.convertBtn) return;

        this.convertBtn.addEventListener("click", async () => {
            const data = getDataCallback();
            if (!data) return;

            const exportFormat = this.exportFormatInput.value || 'md';
            this.convertBtn.disabled = true;
            this.convertBtn.innerText = "Generating ZIP...";

            try {
                const zipBlob = await window.LDS_Exporter.ZipService.generateNotesZip(data, exportFormat);
                window.LDS_Exporter.FileUtils.downloadFile(zipBlob, `lds_notes_export_${exportFormat}.zip`);
                
                if (this.statusEl) {
                    this.statusEl.innerText = `${data.length} total items exported.`;
                }
                
                if (onComplete) onComplete();
            } catch (error) {
                alert(error.message);
            } finally {
                this.convertBtn.disabled = false;
                this.convertBtn.innerText = "Download ZIP";
            }
        });
    }
};
