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
            totalEffectiveRateDisplay: document.getElementById('total-effective-rate-display'),

            // Visual calculation elements - Custom
            visualGrossIncome: document.getElementById('visual-gross-income'),
            visualAdjustments: document.getElementById('visual-adjustments'),
            visualAgi: document.getElementById('visual-agi'),
            visualAgi2: document.getElementById('visual-agi-2'),
            visualDeductions: document.getElementById('visual-deductions'),
            visualTaxableIncome: document.getElementById('visual-taxable-income'),
            visualTaxableIncome2: document.getElementById('visual-taxable-income-2'),
            visualTaxRate: document.getElementById('visual-tax-rate'),
            visualPreCreditTax: document.getElementById('visual-pre-credit-tax'),
            visualPreCreditTax2: document.getElementById('visual-pre-credit-tax-2'),
            visualCredits: document.getElementById('visual-credits'),
            visualTotalTax: document.getElementById('visual-total-tax'),
            visualGrossIncome2: document.getElementById('visual-gross-income-2'),
            visualTotalTax2: document.getElementById('visual-total-tax-2'),
            visualTakeHome: document.getElementById('visual-take-home'),
            visualTotalTax3: document.getElementById('visual-total-tax-3'),
            visualGrossIncome3: document.getElementById('visual-gross-income-3'),
            visualEffectiveRate: document.getElementById('visual-effective-rate'),

            // Visual calculation elements - Baseline
            baselineGrossIncome: document.getElementById('baseline-gross-income'),
            baselineAdjustments: document.getElementById('baseline-adjustments'),
            baselineAgi: document.getElementById('baseline-agi'),
            baselineAgi2: document.getElementById('baseline-agi-2'),
            baselineDeductions: document.getElementById('baseline-deductions'),
            baselineTaxableIncome: document.getElementById('baseline-taxable-income'),
            baselineTaxableIncome2: document.getElementById('baseline-taxable-income-2'),
            baselineTaxRate: document.getElementById('baseline-tax-rate'),
            baselinePreCreditTax: document.getElementById('baseline-pre-credit-tax'),
            baselinePreCreditTax2: document.getElementById('baseline-pre-credit-tax-2'),
            baselineCredits: document.getElementById('baseline-credits'),
            baselineTotalTax: document.getElementById('baseline-total-tax'),
            baselineGrossIncome2: document.getElementById('baseline-gross-income-2'),
            baselineTotalTax2: document.getElementById('baseline-total-tax-2'),
            baselineTakeHome: document.getElementById('baseline-take-home'),
            baselineTotalTax3: document.getElementById('baseline-total-tax-3'),
            baselineGrossIncome3: document.getElementById('baseline-gross-income-3'),
            baselineEffectiveRate: document.getElementById('baseline-effective-rate')
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
     * Update visual calculation displays for custom scenario
     * @param {Object} calculation - Tax calculation results
     * @param {Object} inputs - Input values
     */
    updateVisualCalculations(calculation, inputs) {
        const { federal } = calculation;
        
        // Step 1: Gross Income - Adjustments = AGI
        if (this.elements.visualGrossIncome) {
            this.elements.visualGrossIncome.textContent = this.formatCurrency(inputs.federalIncome || 0);
        }
        if (this.elements.visualAdjustments) {
            this.elements.visualAdjustments.textContent = this.formatCurrency(inputs.federalAdjustments || 0);
        }
        if (this.elements.visualAgi) {
            this.elements.visualAgi.textContent = this.formatCurrency(federal.agi);
        }
        if (this.elements.visualAgi2) {
            this.elements.visualAgi2.textContent = this.formatCurrency(federal.agi);
        }

        // Step 2: AGI - Deductions = Taxable Income
        if (this.elements.visualDeductions) {
            this.elements.visualDeductions.textContent = this.formatCurrency(inputs.federalDeductions || 0);
        }
        if (this.elements.visualTaxableIncome) {
            this.elements.visualTaxableIncome.textContent = this.formatCurrency(federal.taxableIncome);
        }
        if (this.elements.visualTaxableIncome2) {
            this.elements.visualTaxableIncome2.textContent = this.formatCurrency(federal.taxableIncome);
        }

        // Step 3: Taxable Income × Tax Rate = Tax Before Credits
        const taxableEffectiveRate = federal.taxableIncome > 0 ? (federal.preCreditTax / federal.taxableIncome) * 100 : 0;
        if (this.elements.visualTaxRate) {
            this.elements.visualTaxRate.textContent = this.formatPercentage(taxableEffectiveRate);
        }
        if (this.elements.visualPreCreditTax) {
            this.elements.visualPreCreditTax.textContent = this.formatCurrency(federal.preCreditTax);
        }
        if (this.elements.visualPreCreditTax2) {
            this.elements.visualPreCreditTax2.textContent = this.formatCurrency(federal.preCreditTax);
        }

        // Step 4: Tax Before Credits - Credits = Total Tax
        if (this.elements.visualCredits) {
            this.elements.visualCredits.textContent = this.formatCurrency(inputs.federalCredits || 0);
        }
        if (this.elements.visualTotalTax) {
            this.elements.visualTotalTax.textContent = this.formatCurrency(federal.totalTax);
        }
        if (this.elements.visualTotalTax2) {
            this.elements.visualTotalTax2.textContent = this.formatCurrency(federal.totalTax);
        }
        if (this.elements.visualTotalTax3) {
            this.elements.visualTotalTax3.textContent = this.formatCurrency(federal.totalTax);
        }

        // Step 5: Gross Income - Total Tax = Take-Home Pay
        if (this.elements.visualGrossIncome2) {
            this.elements.visualGrossIncome2.textContent = this.formatCurrency(inputs.federalIncome || 0);
        }
        if (this.elements.visualGrossIncome3) {
            this.elements.visualGrossIncome3.textContent = this.formatCurrency(inputs.federalIncome || 0);
        }
        const takeHomePay = (inputs.federalIncome || 0) - federal.totalTax;
        if (this.elements.visualTakeHome) {
            this.elements.visualTakeHome.textContent = this.formatCurrency(takeHomePay);
        }

        // Step 6: Effective Rate
        if (this.elements.visualEffectiveRate) {
            this.elements.visualEffectiveRate.textContent = this.formatPercentage(federal.effectiveRate);
        }
    }

    /**
     * Update visual calculation displays for baseline scenario
     * @param {Object} baselineCalculation - Baseline tax calculation results
     * @param {number} grossIncome - Gross income amount
     * @param {number} standardDeduction - Standard deduction amount
     */
    updateBaselineVisualCalculations(baselineCalculation, grossIncome, standardDeduction) {
        // Step 1: Gross Income - Adjustments = AGI
        if (this.elements.baselineGrossIncome) {
            this.elements.baselineGrossIncome.textContent = this.formatCurrency(grossIncome);
        }
        if (this.elements.baselineAdjustments) {
            this.elements.baselineAdjustments.textContent = this.formatCurrency(0);
        }
        if (this.elements.baselineAgi) {
            this.elements.baselineAgi.textContent = this.formatCurrency(baselineCalculation.agi);
        }
        if (this.elements.baselineAgi2) {
            this.elements.baselineAgi2.textContent = this.formatCurrency(baselineCalculation.agi);
        }

        // Step 2: AGI - Deductions = Taxable Income
        if (this.elements.baselineDeductions) {
            this.elements.baselineDeductions.textContent = this.formatCurrency(standardDeduction);
        }
        if (this.elements.baselineTaxableIncome) {
            this.elements.baselineTaxableIncome.textContent = this.formatCurrency(baselineCalculation.taxableIncome);
        }
        if (this.elements.baselineTaxableIncome2) {
            this.elements.baselineTaxableIncome2.textContent = this.formatCurrency(baselineCalculation.taxableIncome);
        }

        // Step 3: Taxable Income × Tax Rate = Tax Before Credits
        const taxableEffectiveRate = baselineCalculation.taxableIncome > 0 ? (baselineCalculation.preCreditTax / baselineCalculation.taxableIncome) * 100 : 0;
        if (this.elements.baselineTaxRate) {
            this.elements.baselineTaxRate.textContent = this.formatPercentage(taxableEffectiveRate);
        }
        if (this.elements.baselinePreCreditTax) {
            this.elements.baselinePreCreditTax.textContent = this.formatCurrency(baselineCalculation.preCreditTax);
        }
        if (this.elements.baselinePreCreditTax2) {
            this.elements.baselinePreCreditTax2.textContent = this.formatCurrency(baselineCalculation.preCreditTax);
        }

        // Step 4: Tax Before Credits - Credits = Total Tax
        if (this.elements.baselineCredits) {
            this.elements.baselineCredits.textContent = this.formatCurrency(0);
        }
        if (this.elements.baselineTotalTax) {
            this.elements.baselineTotalTax.textContent = this.formatCurrency(baselineCalculation.totalTax);
        }
        if (this.elements.baselineTotalTax2) {
            this.elements.baselineTotalTax2.textContent = this.formatCurrency(baselineCalculation.totalTax);
        }
        if (this.elements.baselineTotalTax3) {
            this.elements.baselineTotalTax3.textContent = this.formatCurrency(baselineCalculation.totalTax);
        }

        // Step 5: Gross Income - Total Tax = Take-Home Pay
        if (this.elements.baselineGrossIncome2) {
            this.elements.baselineGrossIncome2.textContent = this.formatCurrency(grossIncome);
        }
        if (this.elements.baselineGrossIncome3) {
            this.elements.baselineGrossIncome3.textContent = this.formatCurrency(grossIncome);
        }
        if (this.elements.baselineTakeHome) {
            this.elements.baselineTakeHome.textContent = this.formatCurrency(baselineCalculation.postTaxIncome);
        }

        // Step 6: Effective Rate
        if (this.elements.baselineEffectiveRate) {
            this.elements.baselineEffectiveRate.textContent = this.formatPercentage(baselineCalculation.grossEffectiveRate);
        }
    }

    /**
     * Update all displays with current data
     * @param {Object} calculation - Complete tax calculation results
     * @param {Object} inputs - Input values
     * @param {Object} baselineCalculation - Baseline calculation results
     * @param {number} standardDeduction - Standard deduction amount
     */
    updateAll(calculation, inputs = {}, baselineCalculation = null, standardDeduction = 0) {
        this.updateAgiDisplays(calculation);
        this.updateVisualizationBar(calculation);
        this.updateTaxSummary(calculation);
        
        // Update visual calculations
        this.updateVisualCalculations(calculation, inputs);
        
        // Update baseline if provided
        if (baselineCalculation) {
            const grossIncome = inputs.federalIncome || 0;
            this.updateBaselineVisualCalculations(baselineCalculation, grossIncome, standardDeduction);
        }
    }
}