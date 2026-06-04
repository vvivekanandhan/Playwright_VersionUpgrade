# Playwright Version Upgrade - Smoke Test Suite

## 📋 Overview

This project contains automated end-to-end tests for the Velos eResearch application using Playwright. The main smoke test suite (`versionUpgradeSmoke.spec.ts`) validates critical workflows across the application including field creation, form management, event creation, calendar setup, patient management, and study creation.

## 🎯 Main Test: versionUpgradeSmoke.spec.ts

The smoke test suite runs a comprehensive set of **serial tests** that validate core application functionality:

1. **Add Category and Fields** - Creates field categories and various field types (text, number, date, dropdown, checkbox, radio)
2. **Add Form Category and Create Form** - Creates form categories, forms, and links fields to forms
3. **Add Event Category and Create Events** - Creates event categories, multiple events with costs and linked forms
4. **Add Library Calendar** - Creates a library calendar with fixed, dependent, and no-time-point visits
5. **Create Patient and Verify** - Creates and verifies patient records
6. **Create Study and Add Status** - Creates studies, assigns calendars, imports schedules, and enrolls patients

> **Note:** These tests run in **serial mode** to maintain data dependencies between test steps.

## 📁 Project Structure

```
Playwright_versionUpgrade/
│
├── fixtures/
│   └── velosFixtures.ts          # Custom Playwright fixtures for login and navigation
│
├── helpers/
│   ├── DBHelper.ts               # Database helper functions
│   ├── ScreenshotPdfHelper.ts    # Screenshot and PDF generation
│   └── VelosHelper.ts            # Navigation and common UI helpers
│
├── pages1/
│   ├── LoginPage.ts              # Login page object model
│   ├── PatientDetails.ts         # Patient management page object
│   ├── Studypage.ts              # Study management page object
│   ├── VelosCalendarPage.ts      # Calendar page object
│   ├── VelosFieldPage.ts         # Field management page object
│   └── VelosPortalPage.ts        # Portal/home page object
│
├── test-data/                    # Test data directory
│   ├── calendarLibEvents.json    # Event data for calendar
│   ├── calendarDetails.json      # Calendar configuration data
│   ├── patientcreation.json      # Patient creation data
│   ├── studycreation.json        # Study creation data
│   └── calendar_template (8).csv # Calendar import template
│
├── tests/
│   ├── versionUpgradeSmoke.spec.ts  # Main smoke test suite (THIS IS THE KEY FILE)
│   ├── Atomic_*.spec.ts             # Individual atomic tests
│   └── FinalYUIRTC*.spec.ts         # Other test suites
│
├── .env.ctrlv13                  # Default environment configuration
├── .env.dev-eresearch            # Alternative environment configuration
├── playwright.config.js          # Playwright configuration
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## 📊 Test Data Details

All test data is stored in the `test-data/` directory as JSON files:

### 1. calendarLibEvents.json
Contains event definitions for calendar creation:
```json
{
  "events": [
    {
      "eventName": "Blood Draw",
      "cptCode": "36415",
      "duration": "15",
      "durationUnit": "Days",
      "researchCost": "50"
    },
    // ... more events
  ]
}
```

### 2. calendarDetails.json
Calendar configuration including visits and time points:
```json
{
  "calendarNamePrefix": "Pet Calendar_",
  "description": "pet calendar name",
  "calType": "149",
  "duration": "10",
  "durationUnit": "year",
  "visits": ["v1", "v2", "v3"],
  "fixedTimePointVisit": { ... },
  "dependentTimePointVisit": { ... },
  "noTimePointVisit": { ... }
}
```

### 3. studycreation.json
Study metadata:
```json
{
  "studyNumberPrefix": "STD_",
  "title": "Petproject",
  "division": "12136",
  "therapeuticArea": "12837",
  "phase": "154",
  "protocolStatus": "205"
}
```

### 4. patientcreation.json
Patient creation configuration:
```json
{
  "url": "https://dev-eresearch.wcgclinical.com/velos/jsp/ereslogin.jsp",
  "username": "velosadmin",
  "password": "velos123",
  "patientIdPrefix": "PW_"
}
```

> **Dynamic Data Generation:** The tests generate unique identifiers by appending timestamps to prevent conflicts.

## 🔧 Prerequisites

- **Node.js**: v16 or higher
- **Git**: For cloning the repository
- **Windows/Mac/Linux**: Playwright supports all platforms

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Playwright_versionUpgrade
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` (v1.60.0)
- `dotenv` for environment variable management
- `oracledb` for database operations
- `pdfkit` for PDF report generation

### Step 3: Install Playwright Browsers

```bash
npm install playwright@latest
```


```

### Step 4: Configure Environment

The project uses environment files for configuration. By default, it uses `.env.ctrlv13`.

**Environment file format (.env.ctrlv13):**
```env
URL=https://your-velos-instance.com/velos/jsp/ereslogin.jsp
VELOS_USERNAME=your-username
VELOS_PASSWORD=your-password
```

Available environment files:
- `.env.ctrlv13` (default)
- `.env.dev-eresearch`

> **Important:** Ensure the environment file contains valid credentials and URL for your target environment.

## ▶️ Running the Smoke Test

### Option 1: Run with Default Environment (.env.ctrlv13)

```bash
npx playwright test tests/versionUpgradeSmoke.spec.ts --project=chromium
```

### Option 2: Run with Specific Environment

Use PowerShell (Windows):
```powershell
$env:ENV_FILE=".env.ctrlv13"; npx playwright test tests/versionUpgradeSmoke.spec.ts --project=chromium
```

Use Bash (Mac/Linux):
```bash
ENV_FILE=".env.dev-eresearch" npx playwright test tests/versionUpgradeSmoke.spec.ts --project=chromium
```

### Option 3: Run in Headed Mode (See Browser)

```bash
npx playwright test tests/versionUpgradeSmoke.spec.ts --project=chromium --headed
```

### Option 4: Run Specific Test

```bash
npx playwright test tests/versionUpgradeSmoke.spec.ts --project=chromium -g "Add Category and Fields"
```

### Option 5: Run in Debug Mode

```bash
npx playwright test tests/versionUpgradeSmoke.spec.ts --project=chromium --debug
```

## 📊 Test Reports

After test execution, reports are generated in multiple formats:

1. **HTML Report**: Open with `npx playwright show-report`
   - Location: `playwright-report/index.html`

2. **PDF Report**: Custom PDF report with screenshots
   - Generated by `pdf-reporter.js`

3. **Console Output**: Real-time test execution logs

## 🔍 What the Smoke Test Validates

### Test 1: Add Category and Fields ✅
- Creates a field category with unique timestamp
- Adds text, number, and date edit box fields
- Adds dropdown, checkbox, and radio button fields
- Validates field creation across different types

### Test 2: Add Form Category and Create Form ✅
- Creates form category
- Creates form and links it to the category
- Adds library fields to the form from previously created category
- Validates form-field relationships

### Test 3: Add Event Category and Create Events ✅
- Creates event category
- Creates multiple events from JSON data (Blood Draw, Physical Exam, MRI Scan, Lab Analysis)
- Assigns costs to each event
- Links forms to events

### Test 4: Add Library Calendar ✅
- Creates library calendar with defined properties
- Selects events from the created event category
- Creates three types of visits:
  - **Fixed Time Point** (v1)
  - **Dependent Time Point** (v2)
  - **No Time Point** (v3)
- Configures event-visit grid

### Test 5: Create Patient and Verify ✅
- Creates patient with unique ID
- Searches for the created patient
- Verifies patient visibility in the system

### Test 6: Create Study and Add Status ✅
- Creates study with metadata
- Assigns library calendar to the study
- Imports calendar template
- Adds enrolled status
- Enrolls patient in the study
- Creates patient schedule

## ⚙️ Configuration Details

### playwright.config.js Highlights

- **Test Directory**: `./tests`
- **Parallel Execution**: Disabled (`fullyParallel: false`, `workers: 1`)
- **Timeout**: 100 seconds per test
- **Action Timeout**: 10 seconds
- **Headless Mode**: Disabled by default (`headless: false`)
- **Screenshots**: Captured on every test
- **Trace**: On first retry only

### Browser Support

- ✅ Chromium (default, non-headless)
- ✅ Firefox (non-headless)
- ✅ WebKit

## 🛠️ Fixtures and Helpers

### Custom Fixtures (fixtures/velosFixtures.ts)

The project uses custom Playwright fixtures that provide:

- **`login`**: Auto-login fixture using environment credentials
- **`nav`**: VelosHelper instance for navigation
- **`page`**: Auto-accepts all browser dialogs
- **`patientData`**: Loaded from patientcreation.json
- **`studyData`**: Loaded from studycreation.json
- **`calendarData`**: Loaded from calendarDetails.json with dynamic name

Usage:
```typescript
test('My Test', async ({ login, nav, page, patientData }) => {
  // login is already done
  // nav provides navigation methods
  // page has dialog auto-accept enabled
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Test fails with "element not found"**
   - Check if the application is accessible
   - Verify environment credentials
   - Increase timeout values if needed

2. **Environment variables not loading**
   - Ensure `.env` file exists
   - Check ENV_FILE environment variable
   - Verify file format (no spaces around `=`)

3. **Browser not launching**
   - Run `npx playwright install chromium`
   - Check if browsers are installed: `npx playwright --version`

4. **Tests running in parallel conflict**
   - The smoke test is configured for serial execution
   - Don't modify `test.describe.configure({ mode: 'serial' })`

## 📝 Development Guidelines

### Adding New Tests

1. Create test file in `tests/` directory
2. Import fixtures: `import { test, expect } from '../fixtures/velosFixtures'`
3. Use page objects from `pages1/` directory
4. Add test data to `test-data/` if needed

### Modifying Test Data

- Update JSON files in `test-data/` directory
- Ensure JSON is valid
- Dynamic values use timestamps for uniqueness

### Page Objects

All page interactions should use Page Object Model (POM):
- `LoginPage.ts` - Login functionality
- `VelosHelper.ts` - Navigation and common actions
- `VelosFieldPage.ts` - Field management
- `VelosCalendarPage.ts` - Calendar operations
- `StudyPage.ts` - Study management
- `PatientDetails.ts` - Patient operations

## 📞 Support

For issues or questions:
1. Check the test output and error logs
2. Review the HTML report for screenshots
3. Verify environment configuration
4. Check test data validity

## 📄 License

ISC

---

**Last Updated**: May 2026
**Playwright Version**: 1.60.0
**Node Version**: 16+
