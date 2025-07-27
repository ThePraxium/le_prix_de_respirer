/**
 * Display Manager Module
 * Handles updating all display elements and visualizations for federal, state, and county taxes
 */

export class DisplayManager {
    constructor() {
        this.elements = this.initializeElements();
    }

    /**
     * Initialize DOM element references for display elements
     * @returns {Object} Object containing DOM element references
     */
    initializeElements() {
        return {
            // Federal display elements
            federalAgiDisplay: document.getElementById('federal-agi-display'),
            federalTaxableIncomeDisplay: document.getElementById('federal-taxable-income-display'),
            
            // State display elements
            stateAgiDisplay: document.getElementById('state-agi-display'),
            stateTaxableIncomeDisplay: document.getElementById('state-taxable-income-display'),

            // Visualization bar elements
            barTakeHome: document.getElementById('bar-take-home'),
            barFederal: document.getElementById('bar-federal'),
            barState: document.getElementById('bar-state'),
            barCounty: document.getElementById('bar-county'),

            // Tax summary elements
            federalAgiSummary: document.getElementById('federal-agi-summary'),
            federalTaxableSummary: document.getElementById('federal-taxable-summary'),
            federalTaxSummary: document.getElementById('federal-tax-summary'),
            federalRateSummary: document.getElementById('federal-rate-summary'),
            
            stateAgiSummary: document.getElementById('state-agi-summary'),
            stateTaxableSummary: document.getElementById('state-taxable-summary'),
            stateTaxSummary: document.getElementById('state-tax-summary'),
            countyTaxSummary: document.getElementById('county-tax-summary'),
            stateRateSummary: document.getElementById('state-rate-summary'),
            
            totalFederalDisplay: document.getElementById('total-federal-display'),
            totalStateDisplay: document.getElementById('total-state-display'),
            totalCountyDisplay: document.getElementById('total-county-display'),
            totalAllTaxesDisplay: document.getElementById('total-all-taxes-display'),
            totalTakeHomeDisplay: document.getElementById('total-take-home-display'),
            totalEffectiveRateDisplay: document.getElementById('total-effective-rate-display')
        };
    }

    /**
     * Format number as currency
     * @param {number} value - Number to format
     * @returns {string} Formatted currency string
     */
    formatCurrency(value) {
        return value.toLocaleString('en-US', { 
            style: 'currency', 
            currency: 'USD', 
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0 
        });
    }

    /**
     * Format number as percentage
     * @param {number} value - Number to format
     * @returns {string} Formatted percentage string
     */
    formatPercentage(value) {
        return value.toFixed(2) + '%';
    }

    /**
     * Update federal and state AGI displays
     * @param {Object} calculation - Tax calculation results
     */
    updateAgiDisplays(calculation) {
        if (this.elements.federalAgiDisplay) {
            this.elements.federalAgiDisplay.textContent = this.formatCurrency(calculation.federal.agi);
        }
        if (this.elements.federalTaxableIncomeDisplay) {
            this.elements.federalTaxableIncomeDisplay.textContent = this.formatCurrency(calculation.federal.taxableIncome);
        }
        if (this.elements.stateAgiDisplay) {
            this.elements.stateAgiDisplay.textContent = this.formatCurrency(calculation.state.agi);
        }
        if (this.elements.stateTaxableIncomeDisplay) {
            this.elements.stateTaxableIncomeDisplay.textContent = this.formatCurrency(calculation.state.taxableIncome);
        }
    }

    /**
     * Update visualization bar with federal, state, and county taxes
     * @param {Object} calculation - Tax calculation results
     */
    updateVisualizationBar(calculation) {
        const { federal, state, county, totals } = calculation;
        const totalIncome = totals.primaryIncome;

        if (totalIncome > 0) {
            const takeHomePercent = Math.max(0, (totals.postTaxIncome / totalIncome) * 100);
            const federalPercent = (federal.totalTax / totalIncome) * 100;
            const statePercent = (state.totalTax / totalIncome) * 100;
            const countyPercent = (county.totalTax / totalIncome) * 100;

            this.elements.barTakeHome.style.width = `${takeHomePercent}%`;
            this.elements.barFederal.style.width = `${federalPercent}%`;
            this.elements.barState.style.width = `${statePercent}%`;
            this.elements.barCounty.style.width = `${countyPercent}%`;
            
            // Only show text if the segment is wide enough
            this.elements.barTakeHome.textContent = takeHomePercent > 15 ? 'Take-Home' : '';
            this.elements.barFederal.textContent = federalPercent > 8 ? 'Federal' : '';
            this.elements.barState.textContent = statePercent > 8 ? 'State' : '';
            this.elements.barCounty.textContent = countyPercent > 5 ? 'County' : '';
        } else {
            this.elements.barTakeHome.style.width = '100%';
            this.elements.barFederal.style.width = '0%';
            this.elements.barState.style.width = '0%';
            this.elements.barCounty.style.width = '0%';
            this.elements.barTakeHome.textContent = 'Income';
        }
    }

    /**
     * Update tax summary sections
     * @param {Object} calculation - Tax calculation results
     */
    updateTaxSummary(calculation) {
        const { federal, state, county, totals } = calculation;

        // Federal summary
        if (this.elements.federalAgiSummary) {
            this.elements.federalAgiSummary.textContent = this.formatCurrency(federal.agi);
        }
        if (this.elements.federalTaxableSummary) {
            this.elements.federalTaxableSummary.textContent = this.formatCurrency(federal.taxableIncome);
        }
        if (this.elements.federalTaxSummary) {
            this.elements.federalTaxSummary.textContent = this.formatCurrency(federal.totalTax);
        }
        if (this.elements.federalRateSummary) {
            this.elements.federalRateSummary.textContent = this.formatPercentage(federal.effectiveRate);
        }

        // State summary
        if (this.elements.stateAgiSummary) {
            this.elements.stateAgiSummary.textContent = this.formatCurrency(state.agi);
        }
        if (this.elements.stateTaxableSummary) {
            this.elements.stateTaxableSummary.textContent = this.formatCurrency(state.taxableIncome);
        }
        if (this.elements.stateTaxSummary) {
            this.elements.stateTaxSummary.textContent = this.formatCurrency(state.totalTax);
        }
        if (this.elements.countyTaxSummary) {
            this.elements.countyTaxSummary.textContent = this.formatCurrency(county.totalTax);
        }
        if (this.elements.stateRateSummary) {
            this.elements.stateRateSummary.textContent = this.formatPercentage(state.effectiveRate + county.effectiveRate);
        }

        // Total summary
        if (this.elements.totalFederalDisplay) {
            this.elements.totalFederalDisplay.textContent = this.formatCurrency(federal.totalTax);
        }
        if (this.elements.totalStateDisplay) {
            this.elements.totalStateDisplay.textContent = this.formatCurrency(state.totalTax);
        }
        if (this.elements.totalCountyDisplay) {
            this.elements.totalCountyDisplay.textContent = this.formatCurrency(county.totalTax);
        }
        if (this.elements.totalAllTaxesDisplay) {
            this.elements.totalAllTaxesDisplay.textContent = this.formatCurrency(totals.totalTax);
        }
        if (this.elements.totalTakeHomeDisplay) {
            this.elements.totalTakeHomeDisplay.textContent = this.formatCurrency(totals.postTaxIncome);
        }
        if (this.elements.totalEffectiveRateDisplay) {
            this.elements.totalEffectiveRateDisplay.textContent = this.formatPercentage(totals.effectiveRate);
        }
    }

    /**
     * Update all displays with current data
     * @param {Object} calculation - Complete tax calculation results
     */
    updateAll(calculation) {
        this.updateAgiDisplays(calculation);
        this.updateVisualizationBar(calculation);
        this.updateTaxSummary(calculation);
    }
}