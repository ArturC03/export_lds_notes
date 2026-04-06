/**
 * Main application orchestrator (Global Scripts version).
 */
document.addEventListener('DOMContentLoaded', () => {
    const { CsvParser, JsonParser, WizardNavigator, NotePreviewer, ExportController, Toast } = window.LDS_Exporter;

    // UI Elements for main logic
    const csvInput = document.getElementById("csvInput");
    const processBtn = document.getElementById("processBtn");
    const fileNameDisplay = document.getElementById("fileNameDisplay");
    const uploadArea = document.querySelector(".upload-area");
    
    let currentData = null;

    // Initialize Components
    WizardNavigator.init();
    NotePreviewer.init();
    ExportController.init();
    Toast.init();

    // Set up step changed listener for preview
    document.addEventListener('stepChanged', (e) => {
        const step = e.detail.step;
        if (step === 1) {
            currentData = null;
            if (csvInput) csvInput.value = "";
            if (fileNameDisplay) fileNameDisplay.innerText = "No file selected";
            if (processBtn) processBtn.disabled = true;
            
            // Hide stats summary
            const statsSummary = document.getElementById("statsSummary");
            if (statsSummary) statsSummary.classList.add("hidden");
        }
    });

    // Handle File Processing (Shared for input and drag&drop)
    const handleFile = (file) => {
        if (file) {
            fileNameDisplay.innerText = file.name;
            processBtn.disabled = false;
            
            // Sync with hidden input
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            csvInput.files = dataTransfer.files;
        }
    };

    // Handle File Input
    if (csvInput) {
        csvInput.addEventListener("change", (e) => handleFile(e.target.files[0]));
    }

    // Handle Drag & Drop
    if (uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
        });

        uploadArea.addEventListener('drop', (e) => {
            const file = e.dataTransfer.files[0];
            handleFile(file);
        }, false);
    }

    // Handle Parsing
    if (processBtn) {
        processBtn.addEventListener("click", async () => {
            const file = csvInput.files[0];
            if (!file) return;
            
            processBtn.disabled = true;
            processBtn.innerText = "Parsing...";

            try {
                const fileName = file.name.toLowerCase();
                if (fileName.endsWith('.json')) {
                    currentData = await JsonParser.parse(file);
                } else if (fileName.endsWith('.csv')) {
                    currentData = await CsvParser.parse(file);
                } else {
                    throw new Error("Unsupported format.");
                }

                // Render the preview list
                NotePreviewer.renderList(currentData);
                NotePreviewer.updateStats(currentData);

                processBtn.innerText = "View Notes →";
                WizardNavigator.goToStep(4);
            } catch (error) {
                Toast.show(error.message);
                processBtn.disabled = false;
                processBtn.innerText = "View Notes →";
            }
        });
    }

    // Bind Export Action
    ExportController.bindExportAction(
        () => currentData,
        () => WizardNavigator.goToStep(5)
    );

    // Initial navigation
    WizardNavigator.goToStep(1);
});
