/**
 * Handles wizard step navigation and progress bar updates.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.WizardNavigator = {
    init: function() {
        this.stepLabels = document.querySelectorAll(".steps-labels span");
        this.progressBar = document.getElementById("progressBar");
        
        // Expose to window for inline onclick handlers in HTML
        window.goToStep = (step) => this.goToStep(step);
    },

    goToStep: function(stepNumber) {
        document.querySelectorAll('.wizard-step').forEach(step => step.classList.add('hidden'));
        const currentStep = document.getElementById(`step${stepNumber}`);
        if (currentStep) currentStep.classList.remove('hidden');
        
        const progress = (stepNumber / 5) * 100;
        document.documentElement.style.setProperty('--progress', `${progress}%`);

        this.stepLabels.forEach((label, index) => {
            label.classList.toggle('active', index + 1 === stepNumber);
        });

        // Trigger custom events if needed
        const event = new CustomEvent('stepChanged', { detail: { step: stepNumber } });
        document.dispatchEvent(event);
    }
};
