/**
 * Display Manager Module
 * Handles updating all display elements and visualizations
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
            // Main display elements
            agiDisplay: document.getElementById('agi-display'),
            taxableIncomeDisplayMain: document.getElementById('taxable-income-display-main'),

            // Visualization bar elements
            barTakeHome: document.getElementById('bar-take-home'),
            barFederal: document.getElementById('bar-federal'),

            // Custom calculation display elements
            vcElements: {
                gross1: document.getElementById('vc-gross-1'),
                adjustments: document.getElementById('vc-adjustments'),
                agi1: document.getElementById('vc-agi-1'),
                agi2: document.getElementById('vc-agi-2'),
                deductions: document.getElementById('vc-deductions'),
                taxableIncome: document.getElementById('vc-taxable-income'),
                taxableIncome2: document.getElementById('vc-taxable-income-2'),
                marginalRateValue: document.getElementById('vc-marginal-rate-value'),
                preCreditTax: document.getElementById('vc-pre-credit-tax'),
                preCreditTax2: document.getElementById('vc-pre-credit-tax-2'),
                credits: document.getElementById('vc-credits'),
                totalTax1: document.getElementById('vc-total-tax-1'),
                gross2: document.getElementById('vc-gross-2'),
                totalTax2: document.getElementById('vc-total-tax-2'),
                postTax: document.getElementById('vc-post-tax'),
                totalTax3: document.getElementById('vc-total-tax-3'),
                gross3: document.getElementById('vc-gross-3'),
                grossEffectiveRate: document.getElementById('vc-gross-effective-rate')
            },

            // Baseline comparison display elements
            bcElements: {
                gross1: document.getElementById('bc-gross-1'),
                adjustments: document.getElementById('bc-adjustments'),
                agi1: document.getElementById('bc-agi-1'),
                agi2: document.getElementById('bc-agi-2'),
                deductions: document.getElementById('bc-deductions'),
                taxableIncome: document.getElementById('bc-taxable-income'),
                taxableIncome2: document.getElementById('bc-taxable-income-2'),
                marginalRateValue: document.getElementById('bc-marginal-rate-value'),
                preCreditTax: document.getElementById('bc-pre-credit-tax'),
                preCreditTax2: document.getElementById('bc-pre-credit-tax-2'),
                credits: document.getElementById('bc-credits'),
                totalTax1: document.getElementById('bc-total-tax-1'),
                gross2: document.getElementById('bc-gross-2'),
                totalTax2: document.getElementById('bc-total-tax-2'),
                postTax: document.getElementById('bc-post-tax'),
                totalTax3: document.getElementById('bc-total-tax-3'),
                gross3: document.getElementById('bc-gross-3'),
                grossEffectiveRate: document.getElementById('bc-gross-effective-rate')
            }
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
     * Update main display elements
     * @param {Object} calculation - Tax calculation results
     */
    updateMainDisplays(calculation) {
        this.elements.agiDisplay.textContent = this.formatCurrency(calculation.agi);
        this.elements.taxableIncomeDisplayMain.textContent = this.formatCurrency(calculation.taxableIncome);
    }

    /**
     * Update visualization bar
     * @param {Object} params - Parameters for visualization
     */
    updateVisualizationBar(params) {
        const { income, totalTax, postTaxIncome } = params;

        if (income > 0) {
            const takeHomePercent = Math.max(0, (postTaxIncome / income) * 100);
            const fedPercent = (totalTax / income) * 100;

            this.elements.barTakeHome.style.width = `${takeHomePercent}%`;
            this.elements.barFederal.style.width = `${fedPercent}%`;
            
            this.elements.barTakeHome.textContent = takeHomePercent > 15 ? 'Take-Home' : '';
            this.elements.barFederal.textContent = fedPercent > 15 ? 'Federal Tax' : '';
        } else {
            this.elements.barTakeHome.style.width = '100%';
            this.elements.barFederal.style.width = '0%';
            this.elements.barTakeHome.textContent = 'Income';
        }
    }

    /**
     * Update custom calculation section
     * @param {Object} calculation - Tax calculation results
     * @param {Object} inputs - Input values
     */
    updateCustomCalculation(calculation, inputs) {
        const { income, adjustments, deductions, credits } = inputs;
        const { agi, taxableIncome, preCreditTax, totalTax, postTaxIncome, taxableEffectiveRate, grossEffectiveRate } = calculation;

        // Populate the custom visual calculation flow
        this.elements.vcElements.gross1.textContent = this.formatCurrency(income);
        this.elements.vcElements.adjustments.textContent = this.formatCurrency(adjustments);
        this.elements.vcElements.agi1.textContent = this.formatCurrency(agi);
        this.elements.vcElements.agi2.textContent = this.formatCurrency(agi);
        this.elements.vcElements.deductions.textContent = this.formatCurrency(deductions);
        this.elements.vcElements.taxableIncome.textContent = this.formatCurrency(taxableIncome);
        this.elements.vcElements.taxableIncome2.textContent = this.formatCurrency(taxableIncome);
        
        const taxableRateHtml = taxableIncome > 0 ? `${taxableEffectiveRate.toFixed(2)}%` : 'N/A';
        this.elements.vcElements.marginalRateValue.innerHTML = taxableRateHtml;

        this.elements.vcElements.preCreditTax.textContent = this.formatCurrency(preCreditTax);
        this.elements.vcElements.preCreditTax2.textContent = this.formatCurrency(preCreditTax);
        this.elements.vcElements.credits.textContent = this.formatCurrency(credits);
        this.elements.vcElements.totalTax1.textContent = this.formatCurrency(totalTax);
        this.elements.vcElements.gross2.textContent = this.formatCurrency(income);
        this.elements.vcElements.totalTax2.textContent = this.formatCurrency(totalTax);
        this.elements.vcElements.postTax.textContent = this.formatCurrency(postTaxIncome);
        
        this.elements.vcElements.totalTax3.textContent = this.formatCurrency(totalTax);
        this.elements.vcElements.gross3.textContent = this.formatCurrency(income);
        this.elements.vcElements.grossEffectiveRate.textContent = grossEffectiveRate.toFixed(2) + '%';
    }

    /**
     * Update baseline comparison section
     * @param {Object} calculation - Baseline calculation results
     * @param {number} income - Gross income
     * @param {number} standardDeduction - Standard deduction amount
     */
    updateBaselineComparison(calculation, income, standardDeduction) {
        const { agi, taxableIncome, preCreditTax, totalTax, postTaxIncome, taxableEffectiveRate, grossEffectiveRate } = calculation;

        this.elements.bcElements.gross1.textContent = this.formatCurrency(income);
        this.elements.bcElements.adjustments.textContent = this.formatCurrency(0);
        this.elements.bcElements.agi1.textContent = this.formatCurrency(agi);
        this.elements.bcElements.agi2.textContent = this.formatCurrency(agi);
        this.elements.bcElements.deductions.textContent = this.formatCurrency(standardDeduction);
        this.elements.bcElements.taxableIncome.textContent = this.formatCurrency(taxableIncome);
        this.elements.bcElements.taxableIncome2.textContent = this.formatCurrency(taxableIncome);

        this.elements.bcElements.marginalRateValue.innerHTML = taxableIncome > 0 ? `${taxableEffectiveRate.toFixed(2)}%` : 'N/A';

        this.elements.bcElements.preCreditTax.textContent = this.formatCurrency(preCreditTax);
        this.elements.bcElements.preCreditTax2.textContent = this.formatCurrency(preCreditTax);
        this.elements.bcElements.credits.textContent = this.formatCurrency(0);
        this.elements.bcElements.totalTax1.textContent = this.formatCurrency(totalTax);
        this.elements.bcElements.gross2.textContent = this.formatCurrency(income);
        this.elements.bcElements.totalTax2.textContent = this.formatCurrency(totalTax);
        this.elements.bcElements.postTax.textContent = this.formatCurrency(postTaxIncome);

        this.elements.bcElements.totalTax3.textContent = this.formatCurrency(totalTax);
        this.elements.bcElements.gross3.textContent = this.formatCurrency(income);
        this.elements.bcElements.grossEffectiveRate.textContent = grossEffectiveRate.toFixed(2) + '%';
    }

    /**
     * Update all displays with current data
     * @param {Object} data - Complete data object with calculations and inputs
     */
    updateAll(data) {
        const { customCalculation, baselineCalculation, inputs, standardDeduction } = data;
        
        this.updateMainDisplays(customCalculation);
        this.updateVisualizationBar({
            income: inputs.income,
            totalTax: customCalculation.totalTax,
            postTaxIncome: customCalculation.postTaxIncome
        });
        this.updateCustomCalculation(customCalculation, inputs);
        this.updateBaselineComparison(baselineCalculation, inputs.income, standardDeduction);
    }
}