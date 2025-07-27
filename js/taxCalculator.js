/**
 * Tax Calculation Module
 * Handles all tax calculation logic including federal tax brackets and computations
 */

export class TaxCalculator {
    constructor() {
        // 2024 Federal tax brackets
        this.federalBrackets = {
            single: [[11950, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]],
            married: [[23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]]
        };
        
        // 2024 Maryland state tax brackets
        this.marylandBrackets = {
            single: [[1000, 0.02], [2000, 0.03], [3000, 0.04], [100000, 0.0475], [125000, 0.05], [150000, 0.0525], [250000, 0.055], [Infinity, 0.0575]],
            married: [[1000, 0.02], [2000, 0.03], [3000, 0.04], [150000, 0.0475], [175000, 0.05], [225000, 0.0525], [300000, 0.055], [Infinity, 0.0575]]
        };
        
        // 2024 Anne Arundel County tax brackets
        this.anneArundelBrackets = {
            single: [[50000, 0.027], [400000, 0.0281], [Infinity, 0.032]],
            married: [[75000, 0.027], [480000, 0.0281], [Infinity, 0.032]]
        };
        
        // 2024 standard deductions
        this.standardDeductions = {
            single: 14600,
            married: 29200
        };
    }

    /**
     * Calculate tax based on bracket system
     * @param {number} income - Taxable income
     * @param {Array} brackets - Tax bracket array
     * @returns {number} Calculated tax amount
     */
    calculateBracketTax(income, brackets) {
        if (income <= 0) return 0;
        
        let totalTax = 0;
        let previousLimit = 0;

        for (const bracket of brackets) {
            const [bracketLimit, rate] = bracket;
            
            if (income <= previousLimit) {
                break; // Income is below this bracket
            }
            
            const taxableInThisBracket = Math.min(income, bracketLimit) - previousLimit;
            
            if (taxableInThisBracket > 0) {
                totalTax += taxableInThisBracket * rate;
            }
            
            if (income <= bracketLimit) {
                break; // We've calculated all applicable brackets
            }
            
            previousLimit = bracketLimit;
        }
        
        return Math.round(totalTax * 100) / 100; // Round to nearest cent
    }

    /**
     * Get federal tax brackets for filing status
     * @param {number} filingStatus - 1 for single, 2 for married
     * @returns {Array} Tax brackets array
     */
    getFederalBrackets(filingStatus) {
        return filingStatus === 1 ? this.federalBrackets.single : this.federalBrackets.married;
    }

    /**
     * Get Maryland state tax brackets for filing status
     * @param {number} filingStatus - 1 for single, 2 for married
     * @returns {Array} Tax brackets array
     */
    getMarylandBrackets(filingStatus) {
        return filingStatus === 1 ? this.marylandBrackets.single : this.marylandBrackets.married;
    }

    /**
     * Get Anne Arundel County tax brackets for filing status
     * @param {number} filingStatus - 1 for single, 2 for married
     * @returns {Array} Tax brackets array
     */
    getAnneArundelBrackets(filingStatus) {
        return filingStatus === 1 ? this.anneArundelBrackets.single : this.anneArundelBrackets.married;
    }

    /**
     * Get standard deduction for filing status
     * @param {number} filingStatus - 1 for single, 2 for married
     * @returns {number} Standard deduction amount
     */
    getStandardDeduction(filingStatus) {
        return filingStatus === 1 ? this.standardDeductions.single : this.standardDeductions.married;
    }

    /**
     * Calculate complete tax scenario including federal, state, and county taxes
     * @param {Object} params - Tax calculation parameters
     * @returns {Object} Complete tax calculation results
     */
    calculateTaxes(params) {
        const { income, adjustments, deductions, credits, filingStatus } = params;
        
        // Step 1: Calculate AGI
        const agi = Math.max(0, income - adjustments);
        
        // Step 2: Calculate taxable income
        const taxableIncome = Math.max(0, agi - deductions);
        
        // Step 3: Calculate pre-credit tax
        const preCreditTax = this.calculateBracketTax(taxableIncome, this.getFederalBrackets(filingStatus));
        
        // Step 4: Apply credits
        const totalTax = Math.max(0, preCreditTax - credits);
        
        // Step 5: Calculate take-home pay
        const postTaxIncome = income - totalTax;
        
        // Calculate effective rates
        const taxableEffectiveRate = taxableIncome > 0 ? (preCreditTax / taxableIncome) * 100 : 0;
        const grossEffectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
        
        return {
            agi,
            taxableIncome,
            preCreditTax,
            totalTax,
            postTaxIncome,
            taxableEffectiveRate,
            grossEffectiveRate
        };
    }

    /**
     * Calculate complete tax scenario with state and county taxes
     * @param {Object} params - Tax calculation parameters including state inputs
     * @returns {Object} Complete tax calculation results with federal, state, and county breakdowns
     */
    calculateAllTaxes(params) {
        const { 
            // Federal parameters
            federalIncome, federalAdjustments, federalDeductions, federalCredits,
            // State parameters
            stateIncome, stateAdjustments, stateDeductions, stateCredits,
            // Common parameters
            filingStatus 
        } = params;
        
        // Federal calculations
        const federalAgi = Math.max(0, federalIncome - federalAdjustments);
        const federalTaxableIncome = Math.max(0, federalAgi - federalDeductions);
        const federalPreCreditTax = this.calculateBracketTax(federalTaxableIncome, this.getFederalBrackets(filingStatus));
        const federalTax = Math.max(0, federalPreCreditTax - federalCredits);
        
        // State calculations (Maryland)
        const stateAgi = Math.max(0, stateIncome - stateAdjustments);
        const stateTaxableIncome = Math.max(0, stateAgi - stateDeductions);
        const statePreCreditTax = this.calculateBracketTax(stateTaxableIncome, this.getMarylandBrackets(filingStatus));
        const stateTax = Math.max(0, statePreCreditTax - stateCredits);
        
        // County calculations (Anne Arundel - based on state taxable income)
        const countyTax = this.calculateBracketTax(stateTaxableIncome, this.getAnneArundelBrackets(filingStatus));
        
        // Total calculations
        const totalTax = federalTax + stateTax + countyTax;
        const primaryIncome = Math.max(federalIncome, stateIncome);
        const postTaxIncome = primaryIncome - totalTax;
        
        // Effective rates
        const federalEffectiveRate = federalIncome > 0 ? (federalTax / federalIncome) * 100 : 0;
        const stateEffectiveRate = stateIncome > 0 ? (stateTax / stateIncome) * 100 : 0;
        const countyEffectiveRate = stateIncome > 0 ? (countyTax / stateIncome) * 100 : 0;
        const totalEffectiveRate = primaryIncome > 0 ? (totalTax / primaryIncome) * 100 : 0;
        
        return {
            federal: {
                agi: federalAgi,
                taxableIncome: federalTaxableIncome,
                preCreditTax: federalPreCreditTax,
                totalTax: federalTax,
                effectiveRate: federalEffectiveRate
            },
            state: {
                agi: stateAgi,
                taxableIncome: stateTaxableIncome,
                preCreditTax: statePreCreditTax,
                totalTax: stateTax,
                effectiveRate: stateEffectiveRate
            },
            county: {
                totalTax: countyTax,
                effectiveRate: countyEffectiveRate
            },
            totals: {
                totalTax,
                postTaxIncome,
                effectiveRate: totalEffectiveRate,
                primaryIncome
            }
        };
    }

    /**
     * Calculate baseline scenario (standard deduction, no adjustments/credits)
     * @param {number} income - Gross income
     * @param {number} filingStatus - Filing status
     * @returns {Object} Baseline calculation results
     */
    calculateBaseline(income, filingStatus) {
        return this.calculateTaxes({
            income,
            adjustments: 0,
            deductions: this.getStandardDeduction(filingStatus),
            credits: 0,
            filingStatus
        });
    }
}