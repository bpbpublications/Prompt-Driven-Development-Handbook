/**
 * StatisticsPanel Component
 * Displays task statistics and analytics
 */
class StatisticsPanel {
    constructor(container) {
        this.container = container;
        this.tasks = [];
        this.currentFilter = { status: 'all', priority: 'all', search: '' };
        
        this.init();
    }

    init() {
        this.createStatisticsStructure();
        this.attachEventListeners();
    }

    createStatisticsStructure() {
        this.container.innerHTML = `
            <div class="statistics-panel">
                <div class="stats-header">
                    <h3 class="stats-title">Task Statistics</h3>
                    <button class="stats-refresh-btn" aria-label="Refresh statistics" title="Refresh statistics">
                        <span class="icon">🔄</span>
                    </button>
                </div>
                
                <div class="stats-content">
                    <!-- Overview Stats -->
                    <div class="stats-section overview-stats">
                        <h4 class="stats-section-title">Overview</h4>
                        <div class="stats-grid">
                            <div class="stat-card" data-stat="total">
                                <div class="stat-value" aria-live="polite">0</div>
                                <div class="stat-label">Total Tasks</div>
                            </div>
                            <div class="stat-card" data-stat="completed">
                                <div class="stat-value" aria-live="polite">0</div>
                                <div class="stat-label">Completed</div>
                            </div>
                            <div class="stat-card" data-stat="in-progress">
                                <div class="stat-value" aria-live="polite">0</div>
                                <div class="stat-label">In Progress</div>
                            </div>
                            <div class="stat-card" data-stat="pending">
                                <div class="stat-value" aria-live="polite">0</div>
                                <div class="stat-label">Pending</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Progress Stats -->
                    <div class="stats-section progress-stats">
                        <h4 class="stats-section-title">Progress</h4>
                        <div class="progress-container">
                            <div class="progress-bar-wrapper">
                                <div class="progress-labels">
                                    <span class="progress-label">Completion Rate</span>
                                    <span class="progress-percentage" aria-live="polite">0%</span>
                                </div>
                                <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                    <div class="progress-fill"></div>
                                </div>
                            </div>
                            
                            <div class="progress-breakdown">
                                <div class="breakdown-item todo">
                                    <span class="breakdown-color"></span>
                                    <span class="breakdown-label">To Do</span>
                                    <span class="breakdown-count" data-status="todo">0</span>
                                </div>
                                <div class="breakdown-item in-progress">
                                    <span class="breakdown-color"></span>
                                    <span class="breakdown-label">In Progress</span>
                                    <span class="breakdown-count" data-status="in-progress">0</span>
                                </div>
                                <div class="breakdown-item done">
                                    <span class="breakdown-color"></span>
                                    <span class="breakdown-label">Done</span>
                                    <span class="breakdown-count" data-status="done">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Priority Stats -->
                    <div class="stats-section priority-stats">
                        <h4 class="stats-section-title">Priority Distribution</h4>
                        <div class="priority-breakdown">
                            <div class="priority-item high">
                                <div class="priority-header">
                                    <span class="priority-icon">🔴</span>
                                    <span class="priority-label">High Priority</span>
                                    <span class="priority-count" data-priority="high">0</span>
                                </div>
                                <div class="priority-bar">
                                    <div class="priority-fill high-priority"></div>
                                </div>
                            </div>
                            
                            <div class="priority-item medium">
                                <div class="priority-header">
                                    <span class="priority-icon">🟡</span>
                                    <span class="priority-label">Medium Priority</span>
                                    <span class="priority-count" data-priority="medium">0</span>
                                </div>
                                <div class="priority-bar">
                                    <div class="priority-fill medium-priority"></div>
                                </div>
                            </div>
                            
                            <div class="priority-item low">
                                <div class="priority-header">
                                    <span class="priority-icon">🟢</span>
                                    <span class="priority-label">Low Priority</span>
                                    <span class="priority-count" data-priority="low">0</span>
                                </div>
                                <div class="priority-bar">
                                    <div class="priority-fill low-priority"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Due Date Stats -->
                    <div class="stats-section due-date-stats">
                        <h4 class="stats-section-title">Due Dates</h4>
                        <div class="due-date-breakdown">
                            <div class="due-date-item overdue">
                                <span class="due-date-icon">⚠️</span>
                                <span class="due-date-label">Overdue</span>
                                <span class="due-date-count" data-due="overdue">0</span>
                            </div>
                            <div class="due-date-item due-today">
                                <span class="due-date-icon">📅</span>
                                <span class="due-date-label">Due Today</span>
                                <span class="due-date-count" data-due="today">0</span>
                            </div>
                            <div class="due-date-item due-soon">
                                <span class="due-date-icon">⏰</span>
                                <span class="due-date-label">Due This Week</span>
                                <span class="due-date-count" data-due="week">0</span>
                            </div>
                            <div class="due-date-item no-due-date">
                                <span class="due-date-icon">📋</span>
                                <span class="due-date-label">No Due Date</span>
                                <span class="due-date-count" data-due="none">0</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="stats-section quick-actions">
                        <h4 class="stats-section-title">Quick Actions</h4>
                        <div class="action-buttons">
                            <button class="action-btn" data-action="show-overdue">
                                <span class="action-icon">⚠️</span>
                                Show Overdue
                            </button>
                            <button class="action-btn" data-action="show-high-priority">
                                <span class="action-icon">🔴</span>
                                High Priority
                            </button>
                            <button class="action-btn" data-action="show-completed">
                                <span class="action-icon">✅</span>
                                Completed
                            </button>
                            <button class="action-btn" data-action="clear-filters">
                                <span class="action-icon">🔄</span>
                                All Tasks
                            </button>
                        </div>
                    </div>
                    
                    <!-- Performance Insights -->
                    <div class="stats-section insights">
                        <h4 class="stats-section-title">Insights</h4>
                        <div class="insights-content">
                            <div class="insight-item" data-insight="productivity">
                                <div class="insight-text">Loading insights...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Refresh button
        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.stats-refresh-btn')) {
                this.refresh();
            }
        });

        // Quick action buttons
        this.container.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.action-btn');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                this.handleQuickAction(action);
            }
        });

        // Stat card clicks for filtering
        this.container.addEventListener('click', (e) => {
            const statCard = e.target.closest('.stat-card');
            if (statCard) {
                const stat = statCard.dataset.stat;
                this.handleStatCardClick(stat);
            }
        });

        // Priority breakdown clicks
        this.container.addEventListener('click', (e) => {
            const priorityItem = e.target.closest('.priority-item');
            if (priorityItem) {
                const priority = priorityItem.classList.contains('high') ? 'high' :
                               priorityItem.classList.contains('medium') ? 'medium' : 'low';
                this.handlePriorityClick(priority);
            }
        });
    }

    handleQuickAction(action) {
        const event = new CustomEvent('stats:quickAction', {
            detail: { action },
            bubbles: true
        });
        this.container.dispatchEvent(event);
    }

    handleStatCardClick(stat) {
        let filterValue = 'all';
        
        switch (stat) {
            case 'completed':
                filterValue = 'done';
                break;
            case 'in-progress':
                filterValue = 'in-progress';
                break;
            case 'pending':
                filterValue = 'todo';
                break;
        }
        
        if (filterValue !== 'all') {
            const event = new CustomEvent('stats:filterByStatus', {
                detail: { status: filterValue },
                bubbles: true
            });
            this.container.dispatchEvent(event);
        }
    }

    handlePriorityClick(priority) {
        const event = new CustomEvent('stats:filterByPriority', {
            detail: { priority },
            bubbles: true
        });
        this.container.dispatchEvent(event);
    }

    updateStatistics(tasks, filter = null) {
        this.tasks = tasks;
        if (filter) {
            this.currentFilter = filter;
        }
        
        const stats = this.calculateStatistics(tasks);
        this.renderStatistics(stats);
        this.updateInsights(stats);
    }

    calculateStatistics(tasks) {
        const stats = {
            total: tasks.length,
            byStatus: { todo: 0, 'in-progress': 0, done: 0 },
            byPriority: { high: 0, medium: 0, low: 0 },
            byDueDate: { overdue: 0, today: 0, week: 0, none: 0 },
            completionRate: 0
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + 7);

        tasks.forEach(task => {
            // Status distribution
            stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;
            
            // Priority distribution
            stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
            
            // Due date analysis
            if (task.dueDate) {
                const dueDate = new Date(task.dueDate);
                dueDate.setHours(0, 0, 0, 0);
                
                if (dueDate < today) {
                    stats.byDueDate.overdue++;
                } else if (dueDate.getTime() === today.getTime()) {
                    stats.byDueDate.today++;
                } else if (dueDate <= endOfWeek) {
                    stats.byDueDate.week++;
                }
            } else {
                stats.byDueDate.none++;
            }
        });

        // Calculate completion rate
        if (stats.total > 0) {
            stats.completionRate = Math.round((stats.byStatus.done / stats.total) * 100);
        }

        return stats;
    }

    renderStatistics(stats) {
        // Overview stats
        this.updateStatCard('total', stats.total);
        this.updateStatCard('completed', stats.byStatus.done);
        this.updateStatCard('in-progress', stats.byStatus['in-progress']);
        this.updateStatCard('pending', stats.byStatus.todo);

        // Progress bar
        this.updateProgressBar(stats.completionRate);
        this.updateProgressBreakdown(stats.byStatus);

        // Priority distribution
        this.updatePriorityDistribution(stats.byPriority, stats.total);

        // Due date breakdown
        this.updateDueDateBreakdown(stats.byDueDate);
    }

    updateStatCard(stat, value) {
        const card = this.container.querySelector(`[data-stat="${stat}"] .stat-value`);
        if (card) {
            // Animate the number change
            this.animateNumber(card, parseInt(card.textContent) || 0, value);
        }
    }

    updateProgressBar(percentage) {
        const progressBar = this.container.querySelector('.progress-bar');
        const progressFill = this.container.querySelector('.progress-fill');
        const progressPercentage = this.container.querySelector('.progress-percentage');

        if (progressBar && progressFill && progressPercentage) {
            progressBar.setAttribute('aria-valuenow', percentage);
            progressFill.style.width = `${percentage}%`;
            progressPercentage.textContent = `${percentage}%`;
        }
    }

    updateProgressBreakdown(statusCounts) {
        ['todo', 'in-progress', 'done'].forEach(status => {
            const countElement = this.container.querySelector(`[data-status="${status}"]`);
            if (countElement) {
                countElement.textContent = statusCounts[status] || 0;
            }
        });
    }

    updatePriorityDistribution(priorityCounts, total) {
        ['high', 'medium', 'low'].forEach(priority => {
            const countElement = this.container.querySelector(`[data-priority="${priority}"]`);
            const fillElement = this.container.querySelector(`.${priority}-priority`);
            
            if (countElement && fillElement) {
                const count = priorityCounts[priority] || 0;
                const percentage = total > 0 ? (count / total) * 100 : 0;
                
                countElement.textContent = count;
                fillElement.style.width = `${percentage}%`;
            }
        });
    }

    updateDueDateBreakdown(dueDateCounts) {
        const mapping = {
            'overdue': dueDateCounts.overdue,
            'today': dueDateCounts.today,
            'week': dueDateCounts.week,
            'none': dueDateCounts.none
        };

        Object.entries(mapping).forEach(([key, count]) => {
            const countElement = this.container.querySelector(`[data-due="${key}"]`);
            if (countElement) {
                countElement.textContent = count;
            }
        });
    }

    updateInsights(stats) {
        const insights = this.generateInsights(stats);
        const insightElement = this.container.querySelector('[data-insight="productivity"] .insight-text');
        
        if (insightElement && insights.length > 0) {
            insightElement.innerHTML = insights.join('<br>');
        }
    }

    generateInsights(stats) {
        const insights = [];
        
        // Completion rate insights
        if (stats.completionRate >= 80) {
            insights.push('🎉 Great job! You\'re completing most of your tasks.');
        } else if (stats.completionRate >= 50) {
            insights.push('👍 Good progress! Keep pushing forward.');
        } else if (stats.completionRate > 0) {
            insights.push('💪 You\'re making progress. Consider breaking down larger tasks.');
        }
        
        // Priority insights
        if (stats.byPriority.high > stats.byPriority.medium + stats.byPriority.low) {
            insights.push('🔥 Many high-priority tasks. Focus on the most critical ones first.');
        }
        
        // Overdue insights
        if (stats.byDueDate.overdue > 0) {
            insights.push(`⚠️ ${stats.byDueDate.overdue} task(s) overdue. Consider addressing them soon.`);
        }
        
        // Today's tasks
        if (stats.byDueDate.today > 0) {
            insights.push(`📅 ${stats.byDueDate.today} task(s) due today. Stay focused!`);
        }
        
        // No insights fallback
        if (insights.length === 0) {
            insights.push('📊 Add some tasks to see productivity insights.');
        }
        
        return insights;
    }

    animateNumber(element, from, to) {
        const duration = 500;
        const steps = 20;
        const stepDuration = duration / steps;
        const stepValue = (to - from) / steps;
        
        let current = from;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            current += stepValue;
            
            if (step >= steps) {
                element.textContent = to;
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, stepDuration);
    }

    refresh() {
        // Add loading state
        const refreshBtn = this.container.querySelector('.stats-refresh-btn');
        refreshBtn.classList.add('rotating');
        
        // Emit refresh event
        const event = new CustomEvent('stats:refresh', {
            bubbles: true
        });
        this.container.dispatchEvent(event);
        
        // Remove loading state after animation
        setTimeout(() => {
            refreshBtn.classList.remove('rotating');
        }, 1000);
    }

    // Public methods for external interaction
    highlightStat(statType, value) {
        let selector;
        
        switch (statType) {
            case 'status':
                if (value === 'done') selector = '[data-stat="completed"]';
                else if (value === 'in-progress') selector = '[data-stat="in-progress"]';
                else if (value === 'todo') selector = '[data-stat="pending"]';
                break;
            case 'priority':
                selector = `.priority-item.${value}`;
                break;
        }
        
        if (selector) {
            const element = this.container.querySelector(selector);
            if (element) {
                element.classList.add('highlighted');
                setTimeout(() => {
                    element.classList.remove('highlighted');
                }, 2000);
            }
        }
    }

    getStatsSummary() {
        const stats = this.calculateStatistics(this.tasks);
        return {
            total: stats.total,
            completed: stats.byStatus.done,
            inProgress: stats.byStatus['in-progress'],
            pending: stats.byStatus.todo,
            completionRate: stats.completionRate,
            overdue: stats.byDueDate.overdue
        };
    }

    exportStats() {
        const stats = this.calculateStatistics(this.tasks);
        return {
            timestamp: new Date().toISOString(),
            filter: this.currentFilter,
            statistics: stats,
            insights: this.generateInsights(stats)
        };
    }
}

export default StatisticsPanel;
