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

            // Percentage display elements
            percentageTakeHome: document.getElementById('percentage-take-home'),
            percentageFederal: document.getElementById('percentage-federal'),
            percentageState: document.getElementById('percentage-state'),
            percentageCounty: document.getElementById('percentage-county'),

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
            baselineEffectiveRate: document.getElementById('baseline-effective-rate'),

            // Maryland visual calculation elements - Custom
            marylandVisualGrossIncome: document.getElementById('maryland-visual-gross-income'),
            marylandVisualAdjustments: document.getElementById('maryland-visual-adjustments'),
            marylandVisualAgi: document.getElementById('maryland-visual-agi'),
            marylandVisualAgi2: document.getElementById('maryland-visual-agi-2'),
            marylandVisualDeductions: document.getElementById('maryland-visual-deductions'),
            marylandVisualTaxableIncome: document.getElementById('maryland-visual-taxable-income'),
            marylandVisualTaxableIncome2: document.getElementById('maryland-visual-taxable-income-2'),
            marylandVisualTaxableIncome3: document.getElementById('maryland-visual-taxable-income-3'),
            marylandVisualStateTaxRate: document.getElementById('maryland-visual-state-tax-rate'),
            marylandVisualStatePreCreditTax: document.getElementById('maryland-visual-state-pre-credit-tax'),
            marylandVisualCountyTaxRate: document.getElementById('maryland-visual-county-tax-rate'),
            marylandVisualCountyTax: document.getElementById('maryland-visual-county-tax'),
            marylandVisualStatePreCreditTax2: document.getElementById('maryland-visual-state-pre-credit-tax-2'),
            marylandVisualCredits: document.getElementById('maryland-visual-credits'),
            marylandVisualTotalStateTax: document.getElementById('maryland-visual-total-state-tax'),
            marylandVisualTotalStateTax2: document.getElementById('maryland-visual-total-state-tax-2'),
            marylandVisualCountyTax2: document.getElementById('maryland-visual-county-tax-2'),
            marylandVisualCombinedTax: document.getElementById('maryland-visual-combined-tax'),
            marylandVisualGrossIncome2: document.getElementById('maryland-visual-gross-income-2'),
            marylandVisualCombinedTax2: document.getElementById('maryland-visual-combined-tax-2'),
            marylandVisualTakeHome: document.getElementById('maryland-visual-take-home'),
            marylandVisualCombinedTax3: document.getElementById('maryland-visual-combined-tax-3'),
            marylandVisualGrossIncome3: document.getElementById('maryland-visual-gross-income-3'),
            marylandVisualEffectiveRate: document.getElementById('maryland-visual-effective-rate'),

            // Maryland visual calculation elements - Baseline
            marylandBaselineGrossIncome: document.getElementById('maryland-baseline-gross-income'),
            marylandBaselineAdjustments: document.getElementById('maryland-baseline-adjustments'),
            marylandBaselineAgi: document.getElementById('maryland-baseline-agi'),
            marylandBaselineAgi2: document.getElementById('maryland-baseline-agi-2'),
            marylandBaselineDeductions: document.getElementById('maryland-baseline-deductions'),
            marylandBaselineTaxableIncome: document.getElementById('maryland-baseline-taxable-income'),
            marylandBaselineTaxableIncome2: document.getElementById('maryland-baseline-taxable-income-2'),
            marylandBaselineTaxableIncome3: document.getElementById('maryland-baseline-taxable-income-3'),
            marylandBaselineStateTaxRate: document.getElementById('maryland-baseline-state-tax-rate'),
            marylandBaselineStatePreCreditTax: document.getElementById('maryland-baseline-state-pre-credit-tax'),
            marylandBaselineCountyTaxRate: document.getElementById('maryland-baseline-county-tax-rate'),
            marylandBaselineCountyTax: document.getElementById('maryland-baseline-county-tax'),
            marylandBaselineStatePreCreditTax2: document.getElementById('maryland-baseline-state-pre-credit-tax-2'),
            marylandBaselineCredits: document.getElementById('maryland-baseline-credits'),
            marylandBaselineTotalStateTax: document.getElementById('maryland-baseline-total-state-tax'),
            marylandBaselineTotalStateTax2: document.getElementById('maryland-baseline-total-state-tax-2'),
            marylandBaselineCountyTax2: document.getElementById('maryland-baseline-county-tax-2'),
            marylandBaselineCombinedTax: document.getElementById('maryland-baseline-combined-tax'),
            marylandBaselineGrossIncome2: document.getElementById('maryland-baseline-gross-income-2'),
            marylandBaselineCombinedTax2: document.getElementById('maryland-baseline-combined-tax-2'),
            marylandBaselineTakeHome: document.getElementById('maryland-baseline-take-home'),
            marylandBaselineCombinedTax3: document.getElementById('maryland-baseline-combined-tax-3'),
            marylandBaselineGrossIncome3: document.getElementById('maryland-baseline-gross-income-3'),
            marylandBaselineEffectiveRate: document.getElementById('maryland-baseline-effective-rate')
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
            // Use the exact effective rates from tax calculation to match Tax Summary
            const federalPercent = federal.effectiveRate;
            const statePercent = state.effectiveRate;
            const countyPercent = county.effectiveRate;
            const takeHomePercent = Math.max(0, 100 - federalPercent - statePercent - countyPercent);

            // Update bar widths
            this.elements.barTakeHome.style.width = `${takeHomePercent}%`;
            this.elements.barFederal.style.width = `${federalPercent}%`;
            this.elements.barState.style.width = `${statePercent}%`;
            this.elements.barCounty.style.width = `${countyPercent}%`;
            
            // Clear text content from bar segments (percentages now shown above)
            this.elements.barTakeHome.textContent = '';
            this.elements.barFederal.textContent = '';
            this.elements.barState.textContent = '';
            this.elements.barCounty.textContent = '';

            // Update percentage display area - use same formatting as Tax Summary (2 decimal places)
            if (this.elements.percentageTakeHome) {
                this.elements.percentageTakeHome.textContent = this.formatPercentage(takeHomePercent);
            }
            if (this.elements.percentageFederal) {
                this.elements.percentageFederal.textContent = this.formatPercentage(federalPercent);
            }
            if (this.elements.percentageState) {
                this.elements.percentageState.textContent = this.formatPercentage(statePercent);
            }
            if (this.elements.percentageCounty) {
                this.elements.percentageCounty.textContent = this.formatPercentage(countyPercent);
            }
        } else {
            // No income case
            this.elements.barTakeHome.style.width = '100%';
            this.elements.barFederal.style.width = '0%';
            this.elements.barState.style.width = '0%';
            this.elements.barCounty.style.width = '0%';
            this.elements.barTakeHome.textContent = '';
            this.elements.barFederal.textContent = '';
            this.elements.barState.textContent = '';
            this.elements.barCounty.textContent = '';

            // Reset percentage display
            if (this.elements.percentageTakeHome) {
                this.elements.percentageTakeHome.textContent = this.formatPercentage(100);
            }
            if (this.elements.percentageFederal) {
                this.elements.percentageFederal.textContent = this.formatPercentage(0);
            }
            if (this.elements.percentageState) {
                this.elements.percentageState.textContent = this.formatPercentage(0);
            }
            if (this.elements.percentageCounty) {
                this.elements.percentageCounty.textContent = this.formatPercentage(0);
            }
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
     * Update Maryland visual calculation displays for custom scenario
     * @param {Object} calculation - Tax calculation results
     * @param {Object} inputs - Input values
     */
    updateMarylandVisualCalculations(calculation, inputs) {
        const { state, county } = calculation;
        
        // Step 1: Gross Income - Adjustments = AGI
        if (this.elements.marylandVisualGrossIncome) {
            this.elements.marylandVisualGrossIncome.textContent = this.formatCurrency(inputs.stateIncome || 0);
        }
        if (this.elements.marylandVisualAdjustments) {
            this.elements.marylandVisualAdjustments.textContent = this.formatCurrency(inputs.stateAdjustments || 0);
        }
        if (this.elements.marylandVisualAgi) {
            this.elements.marylandVisualAgi.textContent = this.formatCurrency(state.agi);
        }
        if (this.elements.marylandVisualAgi2) {
            this.elements.marylandVisualAgi2.textContent = this.formatCurrency(state.agi);
        }

        // Step 2: AGI - Deductions = Taxable Income
        if (this.elements.marylandVisualDeductions) {
            this.elements.marylandVisualDeductions.textContent = this.formatCurrency(inputs.stateDeductions || 0);
        }
        if (this.elements.marylandVisualTaxableIncome) {
            this.elements.marylandVisualTaxableIncome.textContent = this.formatCurrency(state.taxableIncome);
        }
        if (this.elements.marylandVisualTaxableIncome2) {
            this.elements.marylandVisualTaxableIncome2.textContent = this.formatCurrency(state.taxableIncome);
        }
        if (this.elements.marylandVisualTaxableIncome3) {
            this.elements.marylandVisualTaxableIncome3.textContent = this.formatCurrency(state.taxableIncome);
        }

        // Step 3: Taxable Income × State Tax Rate = State Tax Before Credits
        const stateTaxableEffectiveRate = state.taxableIncome > 0 ? (state.preCreditTax / state.taxableIncome) * 100 : 0;
        if (this.elements.marylandVisualStateTaxRate) {
            this.elements.marylandVisualStateTaxRate.textContent = this.formatPercentage(stateTaxableEffectiveRate);
        }
        if (this.elements.marylandVisualStatePreCreditTax) {
            this.elements.marylandVisualStatePreCreditTax.textContent = this.formatCurrency(state.preCreditTax);
        }
        if (this.elements.marylandVisualStatePreCreditTax2) {
            this.elements.marylandVisualStatePreCreditTax2.textContent = this.formatCurrency(state.preCreditTax);
        }

        // Step 4: Taxable Income × County Tax Rate = County Tax
        const countyTaxableEffectiveRate = state.taxableIncome > 0 ? (county.totalTax / state.taxableIncome) * 100 : 0;
        if (this.elements.marylandVisualCountyTaxRate) {
            this.elements.marylandVisualCountyTaxRate.textContent = this.formatPercentage(countyTaxableEffectiveRate);
        }
        if (this.elements.marylandVisualCountyTax) {
            this.elements.marylandVisualCountyTax.textContent = this.formatCurrency(county.totalTax);
        }
        if (this.elements.marylandVisualCountyTax2) {
            this.elements.marylandVisualCountyTax2.textContent = this.formatCurrency(county.totalTax);
        }

        // Step 5: State Tax Before Credits - Credits = Total State Tax
        if (this.elements.marylandVisualCredits) {
            this.elements.marylandVisualCredits.textContent = this.formatCurrency(inputs.stateCredits || 0);
        }
        if (this.elements.marylandVisualTotalStateTax) {
            this.elements.marylandVisualTotalStateTax.textContent = this.formatCurrency(state.totalTax);
        }
        if (this.elements.marylandVisualTotalStateTax2) {
            this.elements.marylandVisualTotalStateTax2.textContent = this.formatCurrency(state.totalTax);
        }

        // Step 6: Total State Tax + County Tax = Combined Maryland Tax
        const combinedMarylandTax = state.totalTax + county.totalTax;
        if (this.elements.marylandVisualCombinedTax) {
            this.elements.marylandVisualCombinedTax.textContent = this.formatCurrency(combinedMarylandTax);
        }
        if (this.elements.marylandVisualCombinedTax2) {
            this.elements.marylandVisualCombinedTax2.textContent = this.formatCurrency(combinedMarylandTax);
        }
        if (this.elements.marylandVisualCombinedTax3) {
            this.elements.marylandVisualCombinedTax3.textContent = this.formatCurrency(combinedMarylandTax);
        }

        // Step 7: Gross Income - Combined Maryland Tax = Take-Home Pay
        if (this.elements.marylandVisualGrossIncome2) {
            this.elements.marylandVisualGrossIncome2.textContent = this.formatCurrency(inputs.stateIncome || 0);
        }
        if (this.elements.marylandVisualGrossIncome3) {
            this.elements.marylandVisualGrossIncome3.textContent = this.formatCurrency(inputs.stateIncome || 0);
        }
        const takeHomePay = (inputs.stateIncome || 0) - combinedMarylandTax;
        if (this.elements.marylandVisualTakeHome) {
            this.elements.marylandVisualTakeHome.textContent = this.formatCurrency(takeHomePay);
        }

        // Step 8: Effective Rate
        const combinedEffectiveRate = (inputs.stateIncome || 0) > 0 ? (combinedMarylandTax / (inputs.stateIncome || 0)) * 100 : 0;
        if (this.elements.marylandVisualEffectiveRate) {
            this.elements.marylandVisualEffectiveRate.textContent = this.formatPercentage(combinedEffectiveRate);
        }
    }

    /**
     * Update Maryland visual calculation displays for baseline scenario
     * @param {Object} marylandBaselineCalculation - Maryland baseline tax calculation results
     * @param {number} grossIncome - Gross income amount
     * @param {number} standardDeduction - Standard deduction amount
     */
    updateMarylandBaselineVisualCalculations(marylandBaselineCalculation, grossIncome, standardDeduction) {
        const { state, county, combined } = marylandBaselineCalculation;
        
        // Step 1: Gross Income - Adjustments = AGI
        if (this.elements.marylandBaselineGrossIncome) {
            this.elements.marylandBaselineGrossIncome.textContent = this.formatCurrency(grossIncome);
        }
        if (this.elements.marylandBaselineAdjustments) {
            this.elements.marylandBaselineAdjustments.textContent = this.formatCurrency(0);
        }
        if (this.elements.marylandBaselineAgi) {
            this.elements.marylandBaselineAgi.textContent = this.formatCurrency(state.agi);
        }
        if (this.elements.marylandBaselineAgi2) {
            this.elements.marylandBaselineAgi2.textContent = this.formatCurrency(state.agi);
        }

        // Step 2: AGI - Deductions = Taxable Income
        if (this.elements.marylandBaselineDeductions) {
            this.elements.marylandBaselineDeductions.textContent = this.formatCurrency(standardDeduction);
        }
        if (this.elements.marylandBaselineTaxableIncome) {
            this.elements.marylandBaselineTaxableIncome.textContent = this.formatCurrency(state.taxableIncome);
        }
        if (this.elements.marylandBaselineTaxableIncome2) {
            this.elements.marylandBaselineTaxableIncome2.textContent = this.formatCurrency(state.taxableIncome);
        }
        if (this.elements.marylandBaselineTaxableIncome3) {
            this.elements.marylandBaselineTaxableIncome3.textContent = this.formatCurrency(state.taxableIncome);
        }

        // Step 3: Taxable Income × State Tax Rate = State Tax Before Credits
        const stateTaxableEffectiveRate = state.taxableIncome > 0 ? (state.preCreditTax / state.taxableIncome) * 100 : 0;
        if (this.elements.marylandBaselineStateTaxRate) {
            this.elements.marylandBaselineStateTaxRate.textContent = this.formatPercentage(stateTaxableEffectiveRate);
        }
        if (this.elements.marylandBaselineStatePreCreditTax) {
            this.elements.marylandBaselineStatePreCreditTax.textContent = this.formatCurrency(state.preCreditTax);
        }
        if (this.elements.marylandBaselineStatePreCreditTax2) {
            this.elements.marylandBaselineStatePreCreditTax2.textContent = this.formatCurrency(state.preCreditTax);
        }

        // Step 4: Taxable Income × County Tax Rate = County Tax
        const countyTaxableEffectiveRate = state.taxableIncome > 0 ? (county.totalTax / state.taxableIncome) * 100 : 0;
        if (this.elements.marylandBaselineCountyTaxRate) {
            this.elements.marylandBaselineCountyTaxRate.textContent = this.formatPercentage(countyTaxableEffectiveRate);
        }
        if (this.elements.marylandBaselineCountyTax) {
            this.elements.marylandBaselineCountyTax.textContent = this.formatCurrency(county.totalTax);
        }
        if (this.elements.marylandBaselineCountyTax2) {
            this.elements.marylandBaselineCountyTax2.textContent = this.formatCurrency(county.totalTax);
        }

        // Step 5: State Tax Before Credits - Credits = Total State Tax
        if (this.elements.marylandBaselineCredits) {
            this.elements.marylandBaselineCredits.textContent = this.formatCurrency(0);
        }
        if (this.elements.marylandBaselineTotalStateTax) {
            this.elements.marylandBaselineTotalStateTax.textContent = this.formatCurrency(state.totalTax);
        }
        if (this.elements.marylandBaselineTotalStateTax2) {
            this.elements.marylandBaselineTotalStateTax2.textContent = this.formatCurrency(state.totalTax);
        }

        // Step 6: Total State Tax + County Tax = Combined Maryland Tax
        if (this.elements.marylandBaselineCombinedTax) {
            this.elements.marylandBaselineCombinedTax.textContent = this.formatCurrency(combined.totalTax);
        }
        if (this.elements.marylandBaselineCombinedTax2) {
            this.elements.marylandBaselineCombinedTax2.textContent = this.formatCurrency(combined.totalTax);
        }
        if (this.elements.marylandBaselineCombinedTax3) {
            this.elements.marylandBaselineCombinedTax3.textContent = this.formatCurrency(combined.totalTax);
        }

        // Step 7: Gross Income - Combined Maryland Tax = Take-Home Pay
        if (this.elements.marylandBaselineGrossIncome2) {
            this.elements.marylandBaselineGrossIncome2.textContent = this.formatCurrency(grossIncome);
        }
        if (this.elements.marylandBaselineGrossIncome3) {
            this.elements.marylandBaselineGrossIncome3.textContent = this.formatCurrency(grossIncome);
        }
        if (this.elements.marylandBaselineTakeHome) {
            this.elements.marylandBaselineTakeHome.textContent = this.formatCurrency(combined.postTaxIncome);
        }

        // Step 8: Effective Rate
        if (this.elements.marylandBaselineEffectiveRate) {
            this.elements.marylandBaselineEffectiveRate.textContent = this.formatPercentage(combined.effectiveRate);
        }
    }

    /**
     * Clear Maryland baseline visual calculations when no income
     */
    clearMarylandBaselineVisualCalculations() {
        const elementsToUpdate = [
            'marylandBaselineGrossIncome', 'marylandBaselineAdjustments', 'marylandBaselineAgi', 'marylandBaselineAgi2',
            'marylandBaselineDeductions', 'marylandBaselineTaxableIncome', 'marylandBaselineTaxableIncome2', 'marylandBaselineTaxableIncome3',
            'marylandBaselineStatePreCreditTax', 'marylandBaselineStatePreCreditTax2', 'marylandBaselineCountyTax', 'marylandBaselineCountyTax2',
            'marylandBaselineCredits', 'marylandBaselineTotalStateTax', 'marylandBaselineTotalStateTax2',
            'marylandBaselineCombinedTax', 'marylandBaselineCombinedTax2', 'marylandBaselineCombinedTax3',
            'marylandBaselineGrossIncome2', 'marylandBaselineGrossIncome3', 'marylandBaselineTakeHome'
        ];

        elementsToUpdate.forEach(elementName => {
            if (this.elements[elementName]) {
                this.elements[elementName].textContent = this.formatCurrency(0);
            }
        });

        const percentageElements = [
            'marylandBaselineStateTaxRate', 'marylandBaselineCountyTaxRate', 'marylandBaselineEffectiveRate'
        ];

        percentageElements.forEach(elementName => {
            if (this.elements[elementName]) {
                this.elements[elementName].textContent = this.formatPercentage(0);
            }
        });
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
     * Clear baseline visual calculations when no income
     */
    clearBaselineVisualCalculations() {
        const elementsToUpdate = [
            'baselineGrossIncome', 'baselineAdjustments', 'baselineAgi', 'baselineAgi2',
            'baselineDeductions', 'baselineTaxableIncome', 'baselineTaxableIncome2',
            'baselineTaxRate', 'baselinePreCreditTax', 'baselinePreCreditTax2',
            'baselineCredits', 'baselineTotalTax', 'baselineGrossIncome2',
            'baselineTotalTax2', 'baselineTakeHome', 'baselineTotalTax3',
            'baselineGrossIncome3'
        ];

        elementsToUpdate.forEach(elementName => {
            if (this.elements[elementName]) {
                this.elements[elementName].textContent = this.formatCurrency(0);
            }
        });

        if (this.elements.baselineTaxRate) {
            this.elements.baselineTaxRate.textContent = this.formatPercentage(0);
        }
        if (this.elements.baselineEffectiveRate) {
            this.elements.baselineEffectiveRate.textContent = this.formatPercentage(0);
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
        this.updateMarylandVisualCalculations(calculation, inputs);
        
        // Update baseline if provided and income > 0
        if (baselineCalculation && (inputs.federalIncome || 0) > 0) {
            const grossIncome = inputs.federalIncome || 0;
            this.updateBaselineVisualCalculations(baselineCalculation, grossIncome, standardDeduction);
        } else {
            // Clear baseline when no income
            this.clearBaselineVisualCalculations();
        }

        // Update Maryland baseline if provided and state income > 0
        const stateGrossIncome = inputs.stateIncome || 0;
        if (stateGrossIncome > 0) {
            // Calculate Maryland baseline
            const marylandBaselineCalculation = window.taxCalculatorApp?.taxCalculator?.calculateMarylandBaseline(stateGrossIncome, inputs.filingStatus || 2);
            if (marylandBaselineCalculation) {
                this.updateMarylandBaselineVisualCalculations(marylandBaselineCalculation, stateGrossIncome, standardDeduction);
            }
        } else {
            // Clear Maryland baseline when no income
            this.clearMarylandBaselineVisualCalculations();
        }
    }

    /**
     * Update bracket breakdown tables with tax calculation details
     * @param {Object} taxInputs - Tax calculation inputs
     * @param {Object} taxCalculator - Tax calculator instance
     */
    updateBracketBreakdown(taxInputs, taxCalculator) {
        const breakdown = taxCalculator.getCompleteTaxBreakdown(taxInputs);
        
        // Update federal breakdown table
        this.updateBracketTable(
            'federal-bracket-table', 
            breakdown.federal,
            'federal-total-income',
            'federal-total-tax'
        );
        
        // Update Maryland breakdown table
        this.updateBracketTable(
            'maryland-bracket-table', 
            breakdown.maryland,
            'maryland-total-income',
            'maryland-total-tax'
        );
        
        // Update Anne Arundel breakdown table
        this.updateBracketTable(
            'anne-arundel-bracket-table', 
            breakdown.anneArundel,
            'anne-arundel-total-income',
            'anne-arundel-total-tax'
        );
    }

    /**
     * Update a specific bracket breakdown table
     * @param {string} tableId - ID of the table to update
     * @param {Object} breakdown - Bracket breakdown data
     * @param {string} totalIncomeId - ID of total income element
     * @param {string} totalTaxId - ID of total tax element
     */
    updateBracketTable(tableId, breakdown, totalIncomeId, totalTaxId) {
        const table = document.getElementById(tableId);
        if (!table) return;

        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        // Clear existing rows
        tbody.innerHTML = '';

        // Add bracket rows
        breakdown.brackets.forEach((bracket) => {
            const row = document.createElement('tr');
            
            // Determine if this bracket has any tax (for highlighting)
            const hasActivity = bracket.taxIncomeInBracket > 0;
            if (hasActivity) {
                row.classList.add('active-bracket');
            }

            row.innerHTML = `
                <td>${this.formatCurrency(bracket.lowerLimit)}</td>
                <td>${bracket.upperLimit === 'No Limit' ? 'No Limit' : this.formatCurrency(bracket.upperLimit)}</td>
                <td>${bracket.rate.toFixed(2)}%</td>
                <td>${this.formatCurrency(bracket.incomeRemaining)}</td>
                <td>${this.formatCurrency(bracket.taxIncomeInBracket)}</td>
                <td>${this.formatCurrency(bracket.taxAmount)}</td>
            `;
            
            tbody.appendChild(row);
        });

        // Update totals
        const totalIncomeElement = document.getElementById(totalIncomeId);
        const totalTaxElement = document.getElementById(totalTaxId);
        
        if (totalIncomeElement) {
            totalIncomeElement.textContent = this.formatCurrency(breakdown.totalIncome);
        }
        
        if (totalTaxElement) {
            totalTaxElement.textContent = this.formatCurrency(breakdown.totalTax);
        }
    }
}