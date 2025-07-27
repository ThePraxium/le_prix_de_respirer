/**
 * Theme Manager Module
 * Handles dark/light mode functionality
 */

export class ThemeManager {
    constructor() {
        this.elements = this.initializeElements();
        this.initTheme();
        this.setupEventListeners();
    }

    /**
     * Initialize DOM element references
     * @returns {Object} Object containing theme-related DOM elements
     */
    initializeElements() {
        return {
            themeToggle: document.getElementById('theme-toggle'),
            themeToggleDarkIcon: document.getElementById('theme-toggle-dark-icon'),
            themeToggleLightIcon: document.getElementById('theme-toggle-light-icon')
        };
    }

    /**
     * Initialize theme based on saved preference or system preference
     */
    initTheme() {
        // Check for saved theme preference or default to light mode
        if (localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.setDarkMode();
        } else {
            this.setLightMode();
        }
    }

    /**
     * Set up event listeners for theme toggle
     */
    setupEventListeners() {
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    /**
     * Set dark mode
     */
    setDarkMode() {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (this.elements.themeToggleLightIcon) {
            this.elements.themeToggleLightIcon.classList.remove('hidden');
        }
        if (this.elements.themeToggleDarkIcon) {
            this.elements.themeToggleDarkIcon.classList.add('hidden');
        }
    }

    /**
     * Set light mode
     */
    setLightMode() {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (this.elements.themeToggleDarkIcon) {
            this.elements.themeToggleDarkIcon.classList.remove('hidden');
        }
        if (this.elements.themeToggleLightIcon) {
            this.elements.themeToggleLightIcon.classList.add('hidden');
        }
    }

    /**
     * Toggle between dark and light modes
     */
    toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
    }

    /**
     * Get current theme
     * @returns {string} Current theme ('dark' or 'light')
     */
    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    /**
     * Set specific theme
     * @param {string} theme - Theme to set ('dark' or 'light')
     */
    setTheme(theme) {
        if (theme === 'dark') {
            this.setDarkMode();
        } else {
            this.setLightMode();
        }
    }
}