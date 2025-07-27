/**
 * Main Calculator Application Module
 * Coordinates all calculator components and manages application state
 */

import { TaxCalculator } from './taxCalculator.js';
import { UIControls } from './uiControls.js';
import { DisplayManager } from './displayManager.js';
import { ThemeManager } from './themeManager.js';

export class TaxCalculatorApp {
    constructor() {
        this.taxCalculator = new TaxCalculator();
        this.displayManager = new DisplayManager();
        this.themeManager = new ThemeManager();
        
        // Initialize UI controls with update callback
        this.uiControls = new UIControls(() => this.updateCalculations());
        
        // Perform initial calculations
        this.updateCalculations();
    }

    /**
     * Update all calculations and displays
     */
    updateCalculations() {
        // Get current input values
        const inputs = this.uiControls.getValues();
        
        // Calculate custom scenario
        const customCalculation = this.taxCalculator.calculateTaxes(inputs);
        
        // Calculate baseline scenario
        const baselineCalculation = this.taxCalculator.calculateBaseline(inputs.income, inputs.filingStatus);
        
        // Get standard deduction for display
        const standardDeduction = this.taxCalculator.getStandardDeduction(inputs.filingStatus);
        
        // Update all displays
        this.displayManager.updateAll({
            customCalculation,
            baselineCalculation,
            inputs,
            standardDeduction
        });
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
        const customCalculation = this.taxCalculator.calculateTaxes(inputs);
        const baselineCalculation = this.taxCalculator.calculateBaseline(inputs.income, inputs.filingStatus);
        
        return {
            inputs,
            customCalculation,
            baselineCalculation,
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