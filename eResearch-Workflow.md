# eResearch (Velos) – System Workflow Guide

This document explains how the Velos eResearch clinical trial management system works, based on the end-to-end smoke test workflow.

---

## Overview

Velos eResearch is a **Clinical Trial Management System (CTMS)** used to manage clinical research studies. It handles everything from defining study structures (fields, forms, events, calendars) to enrolling patients, tracking visits, managing financials (milestones, invoices, payments), and reconciling costs.

All critical actions in the system require an **eSign (electronic signature / security PIN)** for audit trail compliance.

---

## Workflow Diagram

```
Libraries (Reusable Building Blocks)
    │
    ├── 1. Fields         → Define data capture fields (text, number, date, dropdown, checkbox, radio)
    ├── 2. Forms          → Group fields into CRF (Case Report Forms)
    ├── 3. Events         → Define study events/procedures with costs and linked forms
    └── 4. Calendars      → Define visit schedules with events mapped to visits
            │
            ▼
Study Setup
    │
    ├── 5. Create Patient → Register a patient in the system
    ├── 6. Create Study   → Create a new study with imported calendar
    │       ├── Import & activate calendar from library
    │       ├── Import calendar template (CSV)
    │       ├── Add enrollment status
    │       ├── Add patient to study
    │       ├── Create patient schedule
    │       └── Mark all visits as Done
    │
    ▼
Financials
    │
    ├── 7. Milestones     → Define payment rules triggered by study/patient/visit/event status
    │       └── Achieve milestones (mark conditions as met)
    ├── 8. Invoicing      → Generate invoices from achieved milestones
    └── 9. Payments       → Create payments and reconcile against invoices or milestones
```

---

## Step-by-Step Workflow

### Phase 1: Library Setup (Reusable Components)

Libraries contain reusable building blocks that can be shared across multiple studies.

#### Step 1 – Fields (`Libraries → Fields`)

Fields define the individual data points collected during a study.

- **Categories** group related fields (e.g., "Demographics", "Lab Results")
- **Field Types:**
  - **Edit Box:** text, number, date
  - **Multiple Choice:** dropdown, checkbox, radio
- Each field has a unique name and unique ID
- Navigation: `Libraries → Fields → Add Category / Add Edit Box / Add Multiple Choice`

#### Step 2 – Forms (`Libraries → Forms`)

Forms are collections of fields organized into sections, used as **Case Report Forms (CRFs)**.

- **Form Categories** group related forms
- Forms are assigned to a category and contain fields from the field library
- Fields are added via a popup where you select the field category, search, check desired fields, and assign to a section
- Navigation: `Libraries → Forms → Add Category / Add Form`

#### Step 3 – Events (`Libraries → Events`)

Events represent procedures, visits, or activities performed during a study.

- **Event Categories** group related events
- Each event has:
  - **Name** and **CPT Code** (medical billing code)
  - **Duration** (days/weeks/months)
  - **Research Cost** (dollar amount in USD)
  - **Linked Forms** (CRFs to be filled during the event)
- Navigation: `Libraries → Events → Add Category / New Event`
- Sub-tabs: `Resource → Cost → Specify Cost` and `Resource → CRF Details → Link Forms`

#### Step 4 – Calendars (`Libraries → Calendars`)

Calendars define the visit schedule for a study, mapping events to visits.

- **Define Calendar:** Set calendar name and properties
- **Select Events:** Choose events from a category to include
- **Manage Visits:** Create visits with different time point types:
  - **Fixed Time Point** – occurs at a specific day/time relative to enrollment
  - **Dependent Time Point** – occurs relative to another visit
  - **No Time Point** – unscheduled/ad-hoc visit
- **Event-Visit Grid:** Map which events occur at which visits (checkbox matrix)
- Navigation: `Libraries → Calendars → Add Calendar`

---

### Phase 2: Patient & Study Setup

#### Step 5 – Create Patient

Patients are registered in the system before they can be enrolled in studies.

- Each patient gets a **unique Patient ID**
- After creation, the patient is searchable and verifiable in the system
- Navigation: Patient management area

#### Step 6 – Create Study

Studies are the core entity tying everything together.

| Sub-step | Description |
|----------|-------------|
| Create Study | Fill study details (name, number, type, etc.) and submit with eSign |
| Import Calendar | Import a previously created library calendar into the study |
| Activate Calendar | Set the calendar to Active status |
| Import CSV Template | Import additional calendar data from a CSV file |
| Add Enrolled Status | Add enrollment status to the study (may query DB for status label) |
| Add Patient to Study | Enroll the patient into the study |
| Create Patient Schedule | Generate the patient's visit schedule from the calendar |
| Mark Visits as Done | Mark all scheduled visits as completed (Done status) |

---

### Phase 3: Financial Management

#### Step 7 – Milestones (`Financial Summary → Milestones`)

Milestones define **payment rules** – conditions that, when met, trigger financial obligations.

**5 Milestone Types:**

| Type | Trigger Condition | Example |
|------|------------------|---------|
| **Patient Status** | Patient reaches a status (e.g., Enrolled) | Pay $500 when patient is enrolled |
| **Study Status** | Study reaches a status (e.g., Active/Enrolling) | Pay $400 when study is active |
| **Visit** | All events in a visit are marked Done | Pay $300 when Visit 1 is complete |
| **Event** | A specific event is marked Done | Pay $200 when Event 1 is done |
| **Additional** | Manual/ad-hoc milestone | Pay $100 for miscellaneous |

**Milestone Lifecycle:**
1. **Create** – Define milestone rules with type, status, amount, and set to Active
2. **Preview and Save** – Review and save with eSign
3. **Achieve** – Click "Achieve Milestone" to mark conditions as met (requires eSign)

#### Step 8 – Invoicing (`Financial Summary → Invoicing`)

Invoices are generated from achieved milestones.

1. Navigate to **Invoicing** tab
2. Click **Create a New Invoice**
3. Enter a unique **Invoice Number**
4. **Submit** step one
5. Click **Calculate All** to compute amounts from achieved milestones
6. Click **Generate Invoice** (opens a preview popup)
7. Invoice number appears as a link confirming creation

**Invoice Number Format:** `{StudyNumber}-{RandomNumber}{RandomChar}` (e.g., `STU-001-4523a`)

#### Step 9 – Payments (`Financial Summary → Payments`)

Payments track money received or made, and are reconciled against invoices or milestones.

**Creating a Payment:**
1. Navigate to **Payments** tab
2. Click **Add New**
3. Fill: amount, payment type (Received/Made), description, date
4. Click **Add New Payment**

**Reconciliation Methods:**

| Method | Steps |
|--------|-------|
| **By Invoice** | Reconcile → Select Invoices → Check invoice → Next: Apply Amounts → Pay total in full → eSign → Apply |
| **By Milestone** | Reconcile → Select milestone type (or All) → Check milestones → Next: Apply Amounts → Pay total in full → eSign → Apply |

When reconciling by **All** milestones, the system selects all milestone types and clicks all "Pay total in full" links.

---

## Key System Concepts

### Electronic Signature (eSign)
- Required for all create/update/delete operations
- A **Security PIN** entered via `#eSign` field
- Ensures audit trail compliance for clinical research regulations (21 CFR Part 11)

### Navigation Pattern
The system uses a hierarchical menu: `Top Menu → Sub Menu → Action`
- Example: `Libraries → Fields → Add Category`

### Popup Windows
Many operations (Add Category, Add Fields, Link Forms) open in **popup windows**.
The main page waits for the popup, the user interacts with it, then the popup closes.

### State Persistence
Test data (study number, patient ID, invoice number, etc.) is persisted to `.env` files so tests can resume from any point. The `TestState` class uses a Proxy pattern to auto-read from and write to environment variables.

---

## Data Flow Summary

```
Fields → Forms → Events (with Cost + Forms) → Calendar (with Visits + Events)
                                                        ↓
                                              Study (imports Calendar)
                                                        ↓
                                              Patient → Enrolled in Study
                                                        ↓
                                              Schedule → Visits marked Done
                                                        ↓
                                              Milestones → Achieved
                                                        ↓
                                              Invoice → Generated from Milestones
                                                        ↓
                                              Payment → Reconciled against Invoice/Milestones
```
