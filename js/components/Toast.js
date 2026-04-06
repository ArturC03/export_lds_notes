/**
 * Simple Toast Notification System.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.Toast = {
    init: function() {
        if (!document.getElementById("toast-container")) {
            const container = document.createElement("div");
            container.id = "toast-container";
            document.body.appendChild(container);
        }
    },
    show: function(message, duration = 3000) {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    }
};
