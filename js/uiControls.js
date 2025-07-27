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
            incomeSlider: document.getElementById('income-slider'),
            incomeInput: document.getElementById('income-input'),
            adjustmentsSlider: document.getElementById('adjustments-slider'),
            adjustmentsInput: document.getElementById('adjustments-input'),
            deductionsSlider: document.getElementById('deductions-slider'),
            deductionsInput: document.getElementById('deductions-input'),
            creditsSlider: document.getElementById('credits-slider'),
            creditsInput: document.getElementById('credits-input'),
            filingStatusRadios: document.querySelectorAll('input[name="filingStatus"]')
        };
    }

    /**
     * Set up event listeners for all controls
     */
    setupEventListeners() {
        // Set up slider-input synchronization
        this.setupInputSync(this.elements.incomeSlider, this.elements.incomeInput);
        this.setupInputSync(this.elements.adjustmentsSlider, this.elements.adjustmentsInput);
        this.setupInputSync(this.elements.deductionsSlider, this.elements.deductionsInput);
        this.setupInputSync(this.elements.creditsSlider, this.elements.creditsInput);

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
            income: parseFloat(this.elements.incomeInput.value) || 0,
            adjustments: parseFloat(this.elements.adjustmentsInput.value) || 0,
            deductions: parseFloat(this.elements.deductionsInput.value) || 0,
            credits: parseFloat(this.elements.creditsInput.value) || 0,
            filingStatus: parseInt(document.querySelector('input[name="filingStatus"]:checked').value)
        };
    }

    /**
     * Set values for all controls
     * @param {Object} values - Values to set
     */
    setValues(values) {
        if (values.income !== undefined) {
            this.elements.incomeSlider.value = values.income;
            this.elements.incomeInput.value = values.income;
        }
        if (values.adjustments !== undefined) {
            this.elements.adjustmentsSlider.value = values.adjustments;
            this.elements.adjustmentsInput.value = values.adjustments;
        }
        if (values.deductions !== undefined) {
            this.elements.deductionsSlider.value = values.deductions;
            this.elements.deductionsInput.value = values.deductions;
        }
        if (values.credits !== undefined) {
            this.elements.creditsSlider.value = values.credits;
            this.elements.creditsInput.value = values.credits;
        }
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
            income: 0,
            adjustments: 0,
            deductions: 0,
            credits: 0,
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