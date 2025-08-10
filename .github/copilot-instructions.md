# Federal & State Tax Calculator (Le Prix de Respirer)

Federal & State Tax Calculator is a static web application built with pure HTML, CSS, and JavaScript ES6 modules. It calculates federal, Maryland state, and Anne Arundel County taxes with an interactive, mobile-first design.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Run the Application:
- **INSTANT SETUP**: No dependencies to install, no build process required
- Start local development server: `python3 -m http.server 8000` -- starts immediately (2 seconds max)
- Navigate to: `http://localhost:8000` for main calculator
- Navigate to: `http://localhost:8000/example.html` for modular usage examples
- **NEVER CANCEL**: Allow server to run continuously during development

### File Structure (9 total files):
```
├── index.html              # Main calculator interface
├── example.html            # Module usage demonstration
├── styles.css              # Mobile-first CSS (no frameworks)
├── js/
│   ├── main.js            # Application coordinator (80 lines)
│   ├── taxCalculator.js   # Tax calculation logic (420 lines)
│   ├── uiControls.js      # Input controls (280 lines)
│   ├── displayManager.js  # Display updates (380 lines)
│   ├── themeManager.js    # Dark/light mode (90 lines)
│   └── tabManager.js      # Tab navigation (277 lines)
├── README.md              # Architecture documentation
└── LICENSE                # MIT License
```

### Development Workflow:
- Edit files directly -- changes appear immediately on browser refresh
- No compilation, bundling, or build steps required
- No package.json, no dependencies, no node_modules
- **TESTING**: Manual browser testing only -- no automated test framework

## Validation

### Manual Testing Requirements:
**ALWAYS test these complete scenarios after making changes:**

1. **Calculator Functionality**:
   - Enter $75,000 in both Federal and Maryland gross income fields
   - Verify calculations: Federal tax ~$8,523, State ~$3,510, County ~$2,025
   - Test both input methods: sliders and number inputs
   - Verify AGI and taxable income calculations update correctly

2. **User Interface Features**:
   - Toggle dark/light theme using button in top-right
   - Navigate between all 3 tabs: Calculator, Federal Tax Graphs, Maryland Tax Graphs
   - Verify responsive design by resizing browser window
   - Test slider/input synchronization

3. **Modular Architecture**:
   - Visit `/example.html` and test all 4 module examples
   - Verify "Run Tax Calculation" produces correct results
   - Test currency formatting examples display properly

### Expected Results:
- **Main calculator** at $75k income (married filing status): 
  - Federal tax: $8,523 (11.36% effective rate)
  - Maryland state tax: $3,510 (4.68% rate)
  - Anne Arundel County tax: $2,025 (2.70% rate)
  - Total effective rate: 18.74%, take-home pay: $60,942
- **Federal tab** shows step-by-step calculation breakdown with baseline comparison
- **Maryland tab** shows separate state and county tax calculations with baseline
- **Dark mode** changes background colors and preserves all functionality
- **Example page** modules work independently (TaxCalculator, DisplayManager, etc.)

### Browser Compatibility:
- Requires modern browser with ES6 module support (Chrome 61+, Firefox 60+, Safari 11+)
- Tested and working in current Chrome, Firefox, Safari
- **NO INTERNET REQUIRED** except for Google Fonts (graceful fallback to system fonts)
- **NO CONSOLE ERRORS** during normal operation

## Common Tasks

### Making Changes:
- **CSS styling**: Edit `styles.css` directly (mobile-first approach)
- **Tax calculation logic**: Modify tax brackets in `js/taxCalculator.js`
- **UI components**: Update `js/uiControls.js` or `js/displayManager.js`
- **New features**: Follow modular pattern - create new module and import in `main.js`

### Tax Bracket Updates:
- Federal brackets: `this.federalBrackets` in `taxCalculator.js`
- Maryland brackets: `this.marylandBrackets` in `taxCalculator.js`
- County brackets: `this.anneArundelBrackets` in `taxCalculator.js`
- Standard deductions: `this.standardDeductions` in `taxCalculator.js`

### Adding New Tax Jurisdictions:
1. Add new bracket definitions to `TaxCalculator` class
2. Create calculation methods following existing pattern
3. Update `calculateAllTaxes()` method to include new jurisdiction
4. Add UI elements to `index.html` 
5. Update display logic in `displayManager.js`

## Architecture Notes

### Modular Design:
- **TaxCalculator**: Pure calculation logic, no DOM interaction
- **UIControls**: Input handling and form state management
- **DisplayManager**: All DOM updates and visual formatting
- **ThemeManager**: Dark/light mode with localStorage persistence
- **TabManager**: Navigation between calculator views
- **Main**: Coordinates all modules and manages application state

### No Build Process Benefits:
- **Zero setup time** for new developers
- **Immediate feedback** - just refresh browser
- **No dependency management** or version conflicts
- **Easy deployment** to any static hosting
- **Simple debugging** with browser DevTools

### Key Components:
- **ES6 modules** with import/export
- **Progressive tax bracket calculations** for federal and state
- **Real-time updates** as user types or moves sliders
- **Mobile-responsive design** without CSS frameworks
- **Local storage** for theme persistence

## Troubleshooting

### Common Issues:
- **Fonts not loading**: Check internet connection (Google Fonts) - app works without them
- **Module import errors**: Ensure serving over HTTP, not file:// protocol
- **Calculations incorrect**: Verify tax bracket arrays are properly formatted
- **UI not updating**: Check console for JavaScript errors in modules

### Debug Commands:
```bash
# Serve application
python3 -m http.server 8000

# Check file permissions
ls -la /path/to/repository

# Validate HTML/CSS (if tools available)
# No specific linting tools included in this project
```

This is a **purely frontend application** with no backend, no database, no API dependencies, and no build pipeline required.