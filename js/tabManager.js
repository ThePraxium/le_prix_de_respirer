/**
 * Tab Manager Module
 * Handles tab navigation and content switching
 */

export class TabManager {
    constructor() {
        this.activeTab = 'calculator';
        this.init();
    }

    /**
     * Initialize tab functionality
     */
    init() {
        this.bindTabEvents();
        this.setActiveTab('calculator'); // Default to calculator tab
    }

    /**
     * Bind click events to tab buttons
     */
    bindTabEvents() {
        const calculatorTab = document.getElementById('calculator-tab');
        const customCalcTab = document.getElementById('custom-calc-tab');
        const marylandCalcTab = document.getElementById('maryland-calc-tab');
        const bracketBreakdownTab = document.getElementById('bracket-breakdown-tab');

        if (calculatorTab) {
            calculatorTab.addEventListener('click', () => this.setActiveTab('calculator'));
        }

        if (customCalcTab) {
            customCalcTab.addEventListener('click', () => this.setActiveTab('custom-calc'));
        }

        if (marylandCalcTab) {
            marylandCalcTab.addEventListener('click', () => this.setActiveTab('maryland-calc'));
        }

        if (bracketBreakdownTab) {
            bracketBreakdownTab.addEventListener('click', () => this.setActiveTab('bracket-breakdown'));
        }

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.setActiveTab('calculator');
                        break;
                    case '2':
                        e.preventDefault();
                        this.setActiveTab('custom-calc');
                        break;
                    case '3':
                        e.preventDefault();
                        this.setActiveTab('maryland-calc');
                        break;
                    case '4':
                        e.preventDefault();
                        this.setActiveTab('bracket-breakdown');
                        break;
                }
            }
        });
    }

    /**
     * Set the active tab
     * @param {string} tabName - Name of the tab to activate ('calculator' or 'custom-calc')
     */
    setActiveTab(tabName) {
        // Remove active class from all tab buttons
        const allTabButtons = document.querySelectorAll('.tab-button');
        const allTabContents = document.querySelectorAll('.tab-content');

        allTabButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
        });

        allTabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to selected tab
        const activeTabButton = document.getElementById(`${tabName}-tab`);
        const activeTabContent = document.getElementById(`${tabName}-content`);

        if (activeTabButton && activeTabContent) {
            activeTabButton.classList.add('active');
            activeTabButton.setAttribute('aria-selected', 'true');
            activeTabContent.classList.add('active');
            
            this.activeTab = tabName;

            // Focus the tab button for accessibility
            activeTabButton.focus();

            // Trigger a custom event for other modules to listen to
            document.dispatchEvent(new CustomEvent('tabChanged', {
                detail: { activeTab: tabName }
            }));
        }
    }

    /**
     * Get the currently active tab
     * @returns {string} Name of the active tab
     */
    getActiveTab() {
        return this.activeTab;
    }

    /**
     * Switch to next tab
     */
    nextTab() {
        if (this.activeTab === 'calculator') {
            this.setActiveTab('custom-calc');
        } else if (this.activeTab === 'custom-calc') {
            this.setActiveTab('maryland-calc');
        } else {
            this.setActiveTab('calculator');
        }
    }

    /**
     * Switch to previous tab
     */
    previousTab() {
        if (this.activeTab === 'calculator') {
            this.setActiveTab('maryland-calc');
        } else if (this.activeTab === 'custom-calc') {
            this.setActiveTab('calculator');
        } else {
            this.setActiveTab('custom-calc');
        }
    }
}