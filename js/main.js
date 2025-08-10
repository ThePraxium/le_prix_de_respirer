/**
 * Main Calculator Application Module
 * Coordinates all calculator components and manages application state
 */

import { TaxCalculator } from './taxCalculator.js';
import { UIControls } from './uiControls.js';
import { DisplayManager } from './displayManager.js';
import { ThemeManager } from './themeManager.js';
import { TabManager } from './tabManager.js';

export class TaxCalculatorApp {
    constructor() {
        this.taxCalculator = new TaxCalculator();
        this.displayManager = new DisplayManager();
        this.themeManager = new ThemeManager();
        this.tabManager = new TabManager();
        
        // Initialize UI controls with update callback
        this.uiControls = new UIControls(() => this.updateCalculations());
        
        // Listen for tab changes to update bracket breakdown
        document.addEventListener('tabChanged', (e) => {
            if (e.detail.activeTab === 'bracket-breakdown') {
                this.updateBracketBreakdown();
            }
        });
        
        // Perform initial calculations
        this.updateCalculations();
    }

    /**
     * Update all calculations and displays
     */
    updateCalculations() {
        // Get current input values
        const inputs = this.uiControls.getValues();
        
        // Calculate comprehensive tax scenario with federal, state, and county taxes
        const calculation = this.taxCalculator.calculateAllTaxes(inputs);
        
        // Calculate baseline scenario for federal taxes
        const grossIncome = inputs.federalIncome || 0;
        const standardDeduction = this.taxCalculator.getStandardDeduction(inputs.filingStatus);
        const baselineCalculation = grossIncome > 0 ? this.taxCalculator.calculateBaseline(grossIncome, inputs.filingStatus) : null;
        
        // Update all displays
        this.displayManager.updateAll(calculation, inputs, baselineCalculation, standardDeduction);
        
        // Update bracket breakdown if that tab is active
        if (this.tabManager.getActiveTab() === 'bracket-breakdown') {
            this.updateBracketBreakdown();
        }
    }

    /**
     * Update bracket breakdown tables
     */
    updateBracketBreakdown() {
        const inputs = this.uiControls.getValues();
        this.displayManager.updateBracketBreakdown(inputs, this.taxCalculator);
    }

    /**
     * Reset calculator to default values
     */
    reset() {
        this.uiControls.reset();
    }

    /**
     * Get current calculator state
     * @returns {Object} Current state including inputs and calculations
     */
    getState() {
        const inputs = this.uiControls.getValues();
        const calculation = this.taxCalculator.calculateAllTaxes(inputs);
        
        return {
            inputs,
            calculation,
            theme: this.themeManager.getCurrentTheme()
        };
    }

    /**
     * Set calculator state
     * @param {Object} state - State to set
     */
    setState(state) {
        if (state.inputs) {
            this.uiControls.setValues(state.inputs);
        }
        if (state.theme) {
            this.themeManager.setTheme(state.theme);
        }
        this.updateCalculations();
    }

    /**
     * Enable all calculator functionality
     */
    enable() {
        this.uiControls.enable();
    }

    /**
     * Disable all calculator functionality
     */
    disable() {
        this.uiControls.disable();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make calculator available globally for debugging/external access
    window.taxCalculatorApp = new TaxCalculatorApp();
});