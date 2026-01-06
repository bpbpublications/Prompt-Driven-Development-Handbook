/**
 * FilterBar Component
 * Manages task filtering and search functionality
 */
class FilterBar {
    constructor(container) {
        this.container = container;
        this.currentFilters = {
            status: 'all',
            priority: 'all',
            search: ''
        };
        
        this.init();
    }

    init() {
        this.createFilterStructure();
        this.attachEventListeners();
    }

    createFilterStructure() {
        this.container.innerHTML = `
            <div class="filter-bar">
                <div class="filter-section">
                    <h3 class="filter-title">Filters</h3>
                    
                    <div class="filter-group">
                        <label for="status-filter" class="filter-label">Status</label>
                        <select id="status-filter" class="filter-select" aria-label="Filter by status">
                            <option value="all">All Statuses</option>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="priority-filter" class="filter-label">Priority</label>
                        <select id="priority-filter" class="filter-select" aria-label="Filter by priority">
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
                
                <div class="search-section">
                    <div class="search-group">
                        <label for="search-input" class="search-label visually-hidden">Search tasks</label>
                        <div class="search-input-wrapper">
                            <input 
                                type="search" 
                                id="search-input" 
                                class="search-input" 
                                placeholder="Search tasks..."
                                aria-label="Search tasks by title or description"
                                autocomplete="off">
                            <button type="button" class="search-clear-btn" aria-label="Clear search" style="display: none;">
                                <span class="icon">×</span>
                            </button>
                        </div>
                        <button type="button" class="search-btn" aria-label="Search">
                            <span class="icon">🔍</span>
                        </button>
                    </div>
                </div>
                
                <div class="filter-actions">
                    <button type="button" class="btn btn-secondary clear-filters-btn">
                        Clear All
                    </button>
                    <div class="active-filters" aria-live="polite">
                        <span class="filter-count">No filters active</span>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const statusFilter = this.container.querySelector('#status-filter');
        const priorityFilter = this.container.querySelector('#priority-filter');
        const searchInput = this.container.querySelector('#search-input');
        const searchClearBtn = this.container.querySelector('.search-clear-btn');
        const clearAllBtn = this.container.querySelector('.clear-filters-btn');

        // Filter changes
        statusFilter.addEventListener('change', () => {
            this.updateFilter('status', statusFilter.value);
        });

        priorityFilter.addEventListener('change', () => {
            this.updateFilter('priority', priorityFilter.value);
        });

        // Search functionality
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.updateFilter('search', searchInput.value.trim());
            }, 300); // Debounce search
        });

        // Search on Enter
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(searchTimeout);
                this.updateFilter('search', searchInput.value.trim());
            }
        });

        // Search clear button
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.updateFilter('search', '');
            searchInput.focus();
        });

        // Show/hide clear button based on search input
        searchInput.addEventListener('input', () => {
            searchClearBtn.style.display = searchInput.value ? 'flex' : 'none';
        });

        // Clear all filters
        clearAllBtn.addEventListener('click', () => {
            this.clearAllFilters();
        });

        // Keyboard shortcuts
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchInput === document.activeElement) {
                searchInput.blur();
            }
        });
    }

    updateFilter(filterType, value) {
        const oldValue = this.currentFilters[filterType];
        this.currentFilters[filterType] = value;
        
        this.updateFilterDisplay();
        
        // Only emit event if value actually changed
        if (oldValue !== value) {
            const event = new CustomEvent('filter:changed', {
                detail: { 
                    filters: { ...this.currentFilters },
                    changedFilter: filterType,
                    oldValue,
                    newValue: value
                },
                bubbles: true
            });
            this.container.dispatchEvent(event);
        }
    }

    updateFilterDisplay() {
        this.updateActiveFiltersCount();
        this.updateClearButtonState();
    }

    updateActiveFiltersCount() {
        const activeFiltersCount = this.getActiveFiltersCount();
        const filterCountElement = this.container.querySelector('.filter-count');
        
        if (activeFiltersCount === 0) {
            filterCountElement.textContent = 'No filters active';
            filterCountElement.className = 'filter-count';
        } else {
            const filterText = activeFiltersCount === 1 ? 'filter' : 'filters';
            filterCountElement.textContent = `${activeFiltersCount} ${filterText} active`;
            filterCountElement.className = 'filter-count active';
        }
    }

    updateClearButtonState() {
        const clearAllBtn = this.container.querySelector('.clear-filters-btn');
        const hasActiveFilters = this.getActiveFiltersCount() > 0;
        
        clearAllBtn.disabled = !hasActiveFilters;
        clearAllBtn.setAttribute('aria-disabled', !hasActiveFilters);
    }

    getActiveFiltersCount() {
        let count = 0;
        
        if (this.currentFilters.status !== 'all') count++;
        if (this.currentFilters.priority !== 'all') count++;
        if (this.currentFilters.search !== '') count++;
        
        return count;
    }

    clearAllFilters() {
        // Reset all filter controls
        this.container.querySelector('#status-filter').value = 'all';
        this.container.querySelector('#priority-filter').value = 'all';
        this.container.querySelector('#search-input').value = '';
        this.container.querySelector('.search-clear-btn').style.display = 'none';
        
        // Reset internal state
        const oldFilters = { ...this.currentFilters };
        this.currentFilters = {
            status: 'all',
            priority: 'all',
            search: ''
        };
        
        this.updateFilterDisplay();
        
        // Emit event
        const event = new CustomEvent('filter:cleared', {
            detail: { 
                oldFilters,
                newFilters: { ...this.currentFilters }
            },
            bubbles: true
        });
        this.container.dispatchEvent(event);
        
        // Announce to screen readers
        this.announceToScreenReader('All filters cleared');
    }

    // Public methods for external interaction
    getFilters() {
        return { ...this.currentFilters };
    }

    setFilters(filters) {
        const hasChanged = Object.keys(filters).some(key => 
            filters[key] !== this.currentFilters[key]
        );
        
        if (!hasChanged) return;
        
        // Update internal state
        this.currentFilters = { ...this.currentFilters, ...filters };
        
        // Update UI controls
        if (filters.status !== undefined) {
            this.container.querySelector('#status-filter').value = filters.status;
        }
        
        if (filters.priority !== undefined) {
            this.container.querySelector('#priority-filter').value = filters.priority;
        }
        
        if (filters.search !== undefined) {
            const searchInput = this.container.querySelector('#search-input');
            searchInput.value = filters.search;
            this.container.querySelector('.search-clear-btn').style.display = 
                filters.search ? 'flex' : 'none';
        }
        
        this.updateFilterDisplay();
    }

    getFilterSummary() {
        const filters = [];
        
        if (this.currentFilters.status !== 'all') {
            filters.push(`Status: ${this.formatFilterValue(this.currentFilters.status)}`);
        }
        
        if (this.currentFilters.priority !== 'all') {
            filters.push(`Priority: ${this.formatFilterValue(this.currentFilters.priority)}`);
        }
        
        if (this.currentFilters.search !== '') {
            filters.push(`Search: "${this.currentFilters.search}"`);
        }
        
        return filters.length > 0 ? filters.join(', ') : 'No filters applied';
    }

    formatFilterValue(value) {
        return value.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Advanced filtering methods
    hasActiveFilter(filterType) {
        switch (filterType) {
            case 'status':
                return this.currentFilters.status !== 'all';
            case 'priority':
                return this.currentFilters.priority !== 'all';
            case 'search':
                return this.currentFilters.search !== '';
            default:
                return false;
        }
    }

    toggleFilter(filterType, value) {
        if (this.currentFilters[filterType] === value) {
            // If already selected, clear it
            this.updateFilter(filterType, filterType === 'search' ? '' : 'all');
        } else {
            // Otherwise, set it
            this.updateFilter(filterType, value);
        }
    }

    focusSearch() {
        const searchInput = this.container.querySelector('#search-input');
        searchInput.focus();
        searchInput.select();
    }

    // Accessibility helpers
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        document.body.appendChild(announcement);
        announcement.textContent = message;
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Quick filter methods for external use
    filterByStatus(status) {
        this.updateFilter('status', status);
    }

    filterByPriority(priority) {
        this.updateFilter('priority', priority);
    }

    search(query) {
        this.updateFilter('search', query);
    }

    // State management
    saveFiltersToLocalStorage() {
        try {
            localStorage.setItem('taskflow-filters', JSON.stringify(this.currentFilters));
        } catch (error) {
            console.warn('Could not save filters to localStorage:', error);
        }
    }

    loadFiltersFromLocalStorage() {
        try {
            const saved = localStorage.getItem('taskflow-filters');
            if (saved) {
                const filters = JSON.parse(saved);
                this.setFilters(filters);
                return true;
            }
        } catch (error) {
            console.warn('Could not load filters from localStorage:', error);
        }
        return false;
    }

    clearSavedFilters() {
        try {
            localStorage.removeItem('taskflow-filters');
        } catch (error) {
            console.warn('Could not clear saved filters:', error);
        }
    }
}

export default FilterBar;
