/**
 * Handles the note list preview and detailed view.
 */
window.LDS_Exporter = window.LDS_Exporter || {};
window.LDS_Exporter.NotePreviewer = {
    init: function() {
        this.previewList = document.getElementById("previewList");
        this.previewListView = document.getElementById("previewListView");
        this.previewDetailView = document.getElementById("previewDetailView");
        this.richNotePreview = document.getElementById("richNotePreview");
        this.backToListBtn = document.getElementById("backToListBtn");
        this.previewHeader = document.getElementById("previewHeader");
        this.previewDesc = document.getElementById("previewDesc");
        this.statsSummary = document.getElementById("statsSummary");
        this.searchInput = document.getElementById("noteSearch");

        this.currentNotesData = []; // Store data for filtering

        if (this.backToListBtn) {
            this.backToListBtn.addEventListener("click", () => this.showListView());
        }

        if (this.searchInput) {
            this.searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value));
        }
    },

    handleSearch: function(query) {
        const term = query.toLowerCase().trim();
        if (!term) {
            this.renderList(this.currentNotesData, true);
            return;
        }

        const filtered = this.currentNotesData.filter(rawNote => {
            const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawNote);
            return (note.title && note.title.toLowerCase().includes(term)) || 
                   (note.content && note.content.toLowerCase().includes(term));
        });

        this.renderList(filtered, true); // true means we are not resetting currentNotesData
    },

    updateStats: function(notesData) {
        if (!this.statsSummary) return;

        const total = notesData.length;
        const journals = notesData.filter(n => (n.type || 'journal') === 'journal').length;
        const highlights = notesData.filter(n => n.type === 'highlight').length;
        
        // Count unique notebooks
        const notebooks = new Set();
        notesData.forEach(n => {
            const normalized = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(n);
            normalized.notebooks.forEach(nb => notebooks.add(nb));
        });

        this.statsSummary.innerHTML = `
            <div class="stat-badge">Total: <b>${total}</b></div>
            <div class="stat-badge">Journals: <b>${journals}</b></div>
            <div class="stat-badge">Highlights: <b>${highlights}</b></div>
            <div class="stat-badge">Notebooks: <b>${notebooks.size}</b></div>
        `;
        this.statsSummary.classList.remove('hidden');
    },

    showListView: function() {
        this.previewListView.classList.remove('hidden');
        this.previewDetailView.classList.add('hidden');
        this.previewHeader.innerText = "4. Preview your notes";
        this.previewDesc.innerText = "Select a journal entry to view its content.";
    },

    showDetailView: function(rawNote) {
        const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawNote);
        this.previewListView.classList.add('hidden');
        this.previewDetailView.classList.remove('hidden');
        
        let html = `<div>`;
        html += `<span class="preview-meta-badge">${note.type}</span>`;
        if (note.created) html += `<span class="preview-meta">${note.created.substring(0, 10)}</span>`;
        
        if (note.notebooks.length > 0) {
            html += `<p class="preview-meta"><b>Notebooks:</b> ${note.notebooks.join(", ")}</p>`;
        }
        if (note.tags.length > 0) {
            html += `<p class="preview-meta"><b>Tags:</b> ${note.tags.join(", ")}</p>`;
        }

        html += `<div class="preview-rich-content">`;
        if (note.content) {
            const isHTML = /<[a-z][\s\S]*>/i.test(note.content);
            html += isHTML ? note.content : note.content.replace(/\n/g, '<br>');
        } else {
            html += `<i>(No content)</i>`;
        }
        html += `</div></div>`;

        this.richNotePreview.innerHTML = html;
        
        this.previewHeader.innerText = note.title || "Journal Detail";
        this.previewDesc.innerText = "Viewing rendered content.";
        document.querySelector('.preview-container').scrollTop = 0;
    },

    renderList: function(notesData, isFiltering = false) {
        if (!isFiltering) {
            this.currentNotesData = notesData;
            if (this.searchInput) this.searchInput.value = ""; // Clear search on new data
        }

        this.previewList.innerHTML = "";
        
        // Filter ONLY journals for PREVIEW (unless we are already filtering by search)
        let displayData = notesData;
        if (!isFiltering) {
            displayData = notesData.filter(rawNote => {
                const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawNote);
                return note.type === 'journal';
            });
        }

        displayData.slice(0, 100).forEach((rawNote) => {
            const note = window.LDS_Exporter.NoteNormalizer.normalizeNoteData(rawNote);
            const li = document.createElement("li");
            li.className = "preview-item";
            li.innerHTML = `
                <span class="preview-title">${note.title || "(No Title)"}</span>
                <span class="preview-meta">${note.created.substring(0, 10)}</span>
            `;
            li.addEventListener("click", () => this.showDetailView(rawNote));
            this.previewList.appendChild(li);
        });

        if (displayData.length === 0) {
            this.previewList.innerHTML = `<li class="preview-item disabled"><span class="preview-meta">No notes found matching your criteria.</span></li>`;
        } else if (displayData.length > 100) {
            const more = document.createElement("li");
            more.className = "preview-item disabled";
            more.style.cursor = "default";
            more.innerHTML = `<span class="preview-meta" style="text-align:center; display:block;">... and ${displayData.length - 100} more items</span>`;
            this.previewList.appendChild(more);
        }
    }
};
