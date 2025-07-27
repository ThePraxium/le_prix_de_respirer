/**
 * UI Controls Module
 * Handles input controls, sliders, and form interactions
 */

export class UIControls {
    constructor(updateCallback) {
        this.updateCallback = updateCallback;
        this.elements = this.initializeElements();
        this.setupEventListeners();
    }

    /**
     * Initialize DOM element references
     * @returns {Object} Object containing DOM element references
     */
    initializeElements() {
        return {
            // Federal controls
            federalIncomeSlider: document.getElementById('federal-income-slider'),
            federalIncomeInput: document.getElementById('federal-income-input'),
            federalAdjustmentsSlider: document.getElementById('federal-adjustments-slider'),
            federalAdjustmentsInput: document.getElementById('federal-adjustments-input'),
            federalDeductionsSlider: document.getElementById('federal-deductions-slider'),
            federalDeductionsInput: document.getElementById('federal-deductions-input'),
            federalCreditsSlider: document.getElementById('federal-credits-slider'),
            federalCreditsInput: document.getElementById('federal-credits-input'),
            
            // State controls
            stateIncomeSlider: document.getElementById('state-income-slider'),
            stateIncomeInput: document.getElementById('state-income-input'),
            stateAdjustmentsSlider: document.getElementById('state-adjustments-slider'),
            stateAdjustmentsInput: document.getElementById('state-adjustments-input'),
            stateDeductionsSlider: document.getElementById('state-deductions-slider'),
            stateDeductionsInput: document.getElementById('state-deductions-input'),
            stateCreditsSlider: document.getElementById('state-credits-slider'),
            stateCreditsInput: document.getElementById('state-credits-input'),
            
            // Common controls
            filingStatusRadios: document.querySelectorAll('input[name="filingStatus"]')
        };
    }

    /**
     * Set up event listeners for all controls
     */
    setupEventListeners() {
        // Set up federal controls
        this.setupInputSync(this.elements.federalIncomeSlider, this.elements.federalIncomeInput);
        this.setupInputSync(this.elements.federalAdjustmentsSlider, this.elements.federalAdjustmentsInput);
        this.setupInputSync(this.elements.federalDeductionsSlider, this.elements.federalDeductionsInput);
        this.setupInputSync(this.elements.federalCreditsSlider, this.elements.federalCreditsInput);
        
        // Set up state controls
        this.setupInputSync(this.elements.stateIncomeSlider, this.elements.stateIncomeInput);
        this.setupInputSync(this.elements.stateAdjustmentsSlider, this.elements.stateAdjustmentsInput);
        this.setupInputSync(this.elements.stateDeductionsSlider, this.elements.stateDeductionsInput);
        this.setupInputSync(this.elements.stateCreditsSlider, this.elements.stateCreditsInput);

        // Set up filing status change listener
        this.elements.filingStatusRadios.forEach(radio => 
            radio.addEventListener('change', () => this.updateCallback())
        );
    }

    /**
     * Synchronize slider and input field values
     * @param {HTMLElement} slider - Slider element
     * @param {HTMLElement} input - Input element
     */
    setupInputSync(slider, input) {
        slider.addEventListener('input', () => {
            input.value = slider.value;
            this.updateCallback();
        });

        input.addEventListener('change', () => {
            let value = parseFloat(input.value) || 0;
            const max = parseFloat(slider.max);
            if (value > max) {
                value = max;
                input.value = value;
            }
            slider.value = value;
            this.updateCallback();
        });
    }

    /**
     * Get current values from all controls
     * @returns {Object} Current form values
     */
    getValues() {
        return {
            // Federal values
            federalIncome: parseFloat(this.elements.federalIncomeInput.value) || 0,
            federalAdjustments: parseFloat(this.elements.federalAdjustmentsInput.value) || 0,
            federalDeductions: parseFloat(this.elements.federalDeductionsInput.value) || 0,
            federalCredits: parseFloat(this.elements.federalCreditsInput.value) || 0,
            
            // State values
            stateIncome: parseFloat(this.elements.stateIncomeInput.value) || 0,
            stateAdjustments: parseFloat(this.elements.stateAdjustmentsInput.value) || 0,
            stateDeductions: parseFloat(this.elements.stateDeductionsInput.value) || 0,
            stateCredits: parseFloat(this.elements.stateCreditsInput.value) || 0,
            
            // Common values
            filingStatus: parseInt(document.querySelector('input[name="filingStatus"]:checked').value)
        };
    }

    /**
     * Set values for all controls
     * @param {Object} values - Values to set
     */
    setValues(values) {
        // Federal values
        if (values.federalIncome !== undefined) {
            this.elements.federalIncomeSlider.value = values.federalIncome;
            this.elements.federalIncomeInput.value = values.federalIncome;
        }
        if (values.federalAdjustments !== undefined) {
            this.elements.federalAdjustmentsSlider.value = values.federalAdjustments;
            this.elements.federalAdjustmentsInput.value = values.federalAdjustments;
        }
        if (values.federalDeductions !== undefined) {
            this.elements.federalDeductionsSlider.value = values.federalDeductions;
            this.elements.federalDeductionsInput.value = values.federalDeductions;
        }
        if (values.federalCredits !== undefined) {
            this.elements.federalCreditsSlider.value = values.federalCredits;
            this.elements.federalCreditsInput.value = values.federalCredits;
        }
        
        // State values
        if (values.stateIncome !== undefined) {
            this.elements.stateIncomeSlider.value = values.stateIncome;
            this.elements.stateIncomeInput.value = values.stateIncome;
        }
        if (values.stateAdjustments !== undefined) {
            this.elements.stateAdjustmentsSlider.value = values.stateAdjustments;
            this.elements.stateAdjustmentsInput.value = values.stateAdjustments;
        }
        if (values.stateDeductions !== undefined) {
            this.elements.stateDeductionsSlider.value = values.stateDeductions;
            this.elements.stateDeductionsInput.value = values.stateDeductions;
        }
        if (values.stateCredits !== undefined) {
            this.elements.stateCreditsSlider.value = values.stateCredits;
            this.elements.stateCreditsInput.value = values.stateCredits;
        }
        
        // Common values
        if (values.filingStatus !== undefined) {
            const radio = document.querySelector(`input[name="filingStatus"][value="${values.filingStatus}"]`);
            if (radio) radio.checked = true;
        }
    }

    /**
     * Reset all controls to default values
     */
    reset() {
        this.setValues({
            federalIncome: 0,
            federalAdjustments: 0,
            federalDeductions: 0,
            federalCredits: 0,
            stateIncome: 0,
            stateAdjustments: 0,
            stateDeductions: 0,
            stateCredits: 0,
            filingStatus: 2 // Default to married
        });
        this.updateCallback();
    }

    /**
     * Disable all controls
     */
    disable() {
        Object.values(this.elements).forEach(element => {
            if (element instanceof NodeList) {
                element.forEach(node => node.disabled = true);
            } else {
                element.disabled = true;
            }
        });
    }

    /**
     * Enable all controls
     */
    enable() {
        Object.values(this.elements).forEach(element => {
            if (element instanceof NodeList) {
                element.forEach(node => node.disabled = false);
            } else {
                element.disabled = false;
            }
        });
    }
}