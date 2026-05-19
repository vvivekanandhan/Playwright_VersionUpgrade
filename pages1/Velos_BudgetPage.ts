import { type Page, type Locator, expect } from '@playwright/test';

export class Velos_BudgetPage {
  page: Page;

  /* ══════════════════════════════════════════════════════════
     Static Locator Declarations from Velos_BudgetPage.java
     ══════════════════════════════════════════════════════════ */

  readonly Therapeutic: Locator;
  readonly noOfPatients: Locator;
  readonly amountcheck: Locator;
  readonly checkbox: Locator;
  readonly Editclick: Locator;
  readonly Eventnamerepeating: Locator;
  readonly sectiondrodpdown2: Locator;
  readonly sectiondrodpdown: Locator;
  readonly clickfirstchk: Locator;
  readonly thirdstacheckbox: Locator;
  readonly thirdsdacheckbox: Locator;
  readonly thirdmilestonestatus: Locator;
  readonly thirdpaymenttype: Locator;
  readonly addmilestoneinbudget: Locator;
  readonly applyindirect: Locator;
  readonly sda: Locator;
  readonly noOfunit: Locator;
  readonly defaultCalendarCheckbox: Locator;
  readonly budgetTab: Locator;
  readonly addLineItemType: Locator;
  readonly budgetCalendarSelect: Locator;
  readonly lineItemsEventName: Locator;
  readonly lineItemsCategorySelect: Locator;
  readonly lineItemsRepeatingLineItemsSelect: Locator;
  readonly misceditlineitem: Locator;
  readonly eventName: Locator;
  readonly selectCategory: Locator;
  readonly selectCostType: Locator;
  readonly unitCostInput: Locator;
  readonly editCalculationSalaryClassifiedCheckbox: Locator;
  readonly editCalculationApplyDiscountRadio: Locator;
  readonly excludeSOCLineItems: Locator;
  readonly repeatingLineItems: Locator;
  readonly perPatientFeesText: Locator;
  readonly inputDescriptionFieldText: Locator;
  readonly budgetGridIconsHidden: Locator;
  readonly downloadBudgetIcon: Locator;
  readonly uploadBudgetIcon: Locator;
  readonly milestonesCount: Locator;
  readonly numberOfMilestoneEntries: Locator;
  readonly milestoneEntriesRowList: Locator;
  readonly inputDeleteReasonFieldText: Locator;
  readonly inputCommentFieldText: Locator;
  readonly inputDescriptionField: Locator;
  readonly inputstoragecapacity: Locator;
  readonly applyToAllPerPatientSectionscheckbox: Locator;
  readonly orgDropdown: Locator;
  readonly lineItemsEventNameOne: Locator;
  readonly lineItemsEventNameTwo: Locator;
  readonly lineItemsEventNameThree: Locator;
  readonly lineItemCPTcodeOne: Locator;
  readonly lineItemsRepeatingLineItemsSelectOne: Locator;
  readonly lineItemsRepeatingLineItemsSelectTwo: Locator;
  readonly lineItemsRepeatingLineItemsSelectThree: Locator;
  readonly lineItemsRepeatingLineItemsSelectThreeNew: Locator;
  readonly personnelTypeFieldOne: Locator;
  readonly personnelTypeFieldTwo: Locator;
  readonly personnelTypeFieldThree: Locator;
  readonly rateFieldOne: Locator;
  readonly rateFieldTwo: Locator;
  readonly rateFieldThree: Locator;
  readonly includeInDropdownOne: Locator;
  readonly includeInDropdownTwo: Locator;
  readonly includeInDropdownThree: Locator;
  readonly applyChangesToDropDownThree: Locator;
  readonly personnelTypeFieldTwoAfterChange: Locator;
  readonly deleteEventRepeatingOne: Locator;
  readonly calendarStatusDropdown: Locator;
  readonly visitOneCheckboxOne: Locator;
  readonly visitTwoCheckboxTwo: Locator;
  readonly excludeSocLineItemsCheckbox: Locator;
  readonly budgetSearchInputBox: Locator;
  readonly searchButton: Locator;
  readonly defaultCalendarBudget: Locator;

  // Additional locators
  readonly submitButton: Locator;
  readonly eSignInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // ── CSS selectors for name/id-based elements (preferred over XPath) ──
    this.Therapeutic = page.locator('input[name="Tarea"]');
    this.noOfPatients = page.locator('input[name="patno"]');
    this.amountcheck = page.locator('input[name="amZeroAmountChk"]');
    this.checkbox = page.locator('#AdditionalMilestone');
    this.Editclick = page.locator('tbody tr:nth-child(12) td:nth-child(3) a:first-child img');
    this.Eventnamerepeating = page.locator('input[name="type"]');
    this.sectiondrodpdown2 = page.locator('select option:has-text("3. Study Design")');
    this.sectiondrodpdown = page.locator('select[name="sectionNameDD"]');
    this.clickfirstchk = page.locator('input[name="selEvent0"]');
    this.thirdstacheckbox = page.locator('input[name="sponsorAmountChk"]').nth(2);
    this.thirdsdacheckbox = page.locator('input[name="sponsorAmountChk"]').nth(2);
    this.thirdmilestonestatus = page.locator('select[name="milestoneStat"]').nth(2);
    this.thirdpaymenttype = page.locator('select[name="dpayType"]').nth(2);
    this.addmilestoneinbudget = page.getByRole('img', { name: 'Milestones' });
    this.applyindirect = page.locator('input[name="appIndirects"]');
    this.sda = page.locator('input[name="sponsorAmount"]');
    this.noOfunit = page.locator('input[name="noUnits"]');
    this.defaultCalendarCheckbox = page.locator('input[title="Include Default Calendar Budgets"]');
    this.budgetTab = page.getByRole('link', { name: 'Budget', exact: true });
    this.addLineItemType = page.locator('input[name="type"]');
    this.budgetCalendarSelect = page.locator('select#bgtcal');
    this.lineItemsEventName = page.locator('input[name="newEventdata"]');
    this.lineItemsCategorySelect = page.locator('input[name="newEventdata"]').locator('xpath=../following-sibling::td/select[@name="newCmbCtgry"]');
    this.lineItemsRepeatingLineItemsSelect = page.locator('input[name="newEventdata"]').locator('xpath=../following-sibling::td/select[@name="newrepeatOption"]');
    this.misceditlineitem = page.locator('//td[*[contains(text(),"Miscellaneous")]]/following-sibling::td[2]/a[1]');
    this.eventName = page.locator('textarea[name="eventdata"]');
    this.selectCategory = page.locator('select[name="cmbCtgry"]');
    this.selectCostType = page.locator('select[name="dCodeType"]');
    this.unitCostInput = page.locator('input[name="unitCost"]');
    this.editCalculationSalaryClassifiedCheckbox = page.locator('//b[contains(text(),"Fringe Benefit")]/../following-sibling::td/input[@type="checkbox"]');
    this.editCalculationApplyDiscountRadio = page.locator('//b[contains(text(),"Cost Discount")]/../following-sibling::td/input[@type="radio"]').first();
    this.excludeSOCLineItems = page.locator('//b[contains(text(),"Exclude")]/following-sibling::input');
    this.repeatingLineItems = page.locator('select[name="newrepeatOption"]');
    this.perPatientFeesText = page.locator('//td/b[contains(text(),"Personnel Cost")]/following-sibling::i[contains(text(),"Per Patient Fees")]');
    this.inputDescriptionFieldText = page.locator('//td[*[contains(text(),"Description")]]/following-sibling::td/textarea | //td[contains(text(),"Description")]/following-sibling::td/textarea');
    this.budgetGridIconsHidden = page.locator('tr#calIcons[style*="display: none"], label[id*="hide"][style*="display: none"]');
    this.downloadBudgetIcon = page.locator('img[src*="download.png"]');
    this.uploadBudgetIcon = page.locator('img[src*="upload.png"]');
    this.milestonesCount = page.locator('p[id*="wcg__global__box__milestones"]');
    this.numberOfMilestoneEntries = page.locator('div[id*="reportDataTable_info"]');
    this.milestoneEntriesRowList = page.locator('table[id*="reportDataTable"] tbody tr');
    this.inputDeleteReasonFieldText = page.locator('textarea[name="reason_del"]');
    this.inputCommentFieldText = page.locator('textarea[name*="instructions"]');
    this.inputDescriptionField = page.locator('[name="desc1"]');
    this.inputstoragecapacity = page.locator('#storageUnitCap');
    this.applyToAllPerPatientSectionscheckbox = page.locator('input[name="applyToAll"][type="checkbox"]');
    this.orgDropdown = page.locator('select[name="orgId"]');
    this.lineItemsEventNameOne = page.locator('input[name="newEventdata"]').nth(0);
    this.lineItemsEventNameTwo = page.locator('input[name="newEventdata"]').nth(1);
    this.lineItemsEventNameThree = page.locator('input[name="newEventdata"]').nth(2);
    this.lineItemCPTcodeOne = page.locator('input[name="newCptCode"]').first();
    this.lineItemsRepeatingLineItemsSelectOne = page.locator('input[name="newEventdata"]').nth(0).locator('xpath=../following-sibling::td/select[@name="newrepeatOption"]');
    this.lineItemsRepeatingLineItemsSelectTwo = page.locator('input[name="newEventdata"]').nth(1).locator('xpath=../following-sibling::td/select[@name="newrepeatOption"]');
    this.lineItemsRepeatingLineItemsSelectThree = page.locator('input[name="newEventdata"]').nth(2).locator('xpath=../following-sibling::td/select[@name="newrepeatOption"]');
    this.lineItemsRepeatingLineItemsSelectThreeNew = page.locator('//td/input[@name="lineitemIds"]/..//input[2]').nth(2);
    this.personnelTypeFieldOne = page.locator('input[name="newType"]').nth(0);
    this.personnelTypeFieldTwo = page.locator('input[name="newType"]').nth(1);
    this.personnelTypeFieldThree = page.locator('input[name="newType"]').nth(2);
    this.rateFieldOne = page.locator('input[name="newRate"]').nth(0);
    this.rateFieldTwo = page.locator('input[name="newRate"]').nth(1);
    this.rateFieldThree = page.locator('input[name="newRate"]').nth(2);
    this.includeInDropdownOne = page.locator('select[name="newBudgetStatus"]').nth(0);
    this.includeInDropdownTwo = page.locator('select[name="newBudgetStatus"]').nth(1);
    this.includeInDropdownThree = page.locator('select[name="newBudgetStatus"]').nth(2);
    this.applyChangesToDropDownThree = page.locator('select[name="applyFutureCost"]').nth(2);
    this.personnelTypeFieldTwoAfterChange = page.locator('//td//input[@name="lineitemIds"]/../input[2]').nth(1);
    this.deleteEventRepeatingOne = page.getByRole('link', { name: 'Delete' }).first();
    this.calendarStatusDropdown = page.locator('select[name="calStatus"]');
    this.visitOneCheckboxOne = page.locator('p input[type="checkbox"]').nth(4);
    this.visitTwoCheckboxTwo = page.locator('p input[type="checkbox"]').nth(7);
    this.excludeSocLineItemsCheckbox = page.locator('input[name="excludeSOCApply"]');
    this.budgetSearchInputBox = page.locator('input[name="searchCriteria"]');
    this.searchButton = page.locator('span.ui-button-text');
    this.defaultCalendarBudget = page.locator('[name="includeDefaultCalendarBudgets"]');

    // ── Built-in Playwright locators ──
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.eSignInput = page.locator('#eSign');
  }

  /* ══════════════════════════════════════════════════════════
     Dynamic Locator Methods from Velos_BudgetPage.java
     — CSS selectors preferred; XPath only for complex DOM traversals
     ══════════════════════════════════════════════════════════ */

  inputField(input: string): Locator {
    return this.page.locator(`input[id*="${input}"], input[name*="${input}"]`);
  }

  checkBoxByNameAndValue(checkBoxName: string, checkBoxValue: string): Locator {
    return this.page.locator(`input[name*="${checkBoxName}"][value*="${checkBoxValue}"]`);
  }

  textAndInput(rowName: string, inputName: string): Locator {
    return this.page.locator(`//td[contains(text(),'${rowName}')]//parent::tr//td//input[@name='${inputName}']`);
  }

  linkStudyDropdown(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/following-sibling::td/font/select`);
  }

  budgetDropdown(dropdownName: string): Locator {
    return this.page.locator(`//b[contains(text(),'${dropdownName}')]/../following-sibling::select`);
  }

  studyNumberClick(studyNumber: string): Locator {
    return this.page.locator(`img[onmouseover*="${studyNumber}"]`);
  }

  searchBudgetByName(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/input`);
  }

  deleteItemByText(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/following-sibling::td/input[@type='checkbox']`);
  }

  addLineItemByIconClick(text: string, title: string): Locator {
    return this.page.locator(`//td[*[contains(text(),'${text}')]]/following-sibling::td`).getByRole('img', { name: title });
  }

  budgetPageDropdown(dropdownName: string): Locator {
    return this.page.locator(`//td[contains(text(),'${dropdownName}')]/select`);
  }

  lineItemsTableVerifyTitle(title: string): Locator {
    return this.page.locator(`td.reportData b:has-text("${title}")`);
  }

  verifyCostsInTable(costName: string): Locator {
    return this.page.locator(`//td[contains(text(),'${costName}')]/following-sibling::td`);
  }

  costPercentInput(costName: string): Locator {
    return this.page.locator(`//b[contains(text(),'${costName}')]/../following-sibling::td/b/input`);
  }

  tableSectionNameByText(sectionName: string): Locator {
    return this.page.locator(`td b:has-text("${sectionName}")`);
  }

  iconByTitle(title1: string, title2: string, title3: string): Locator {
    return this.page.locator(
      `//td[contains(@title,'${title1}')]/preceding::tr[1]//img[contains(@title,'${title2}')] | ` +
      `//td[contains(@title,'${title2}')]/parent::tr/preceding-sibling::tr[1]//font[contains(text(),'${title3}')]/ancestor::td/following-sibling::td//img[contains(@title,'${title1}')] | ` +
      `//img[contains(@title,'${title1}')]`
    );
  }

  iconBelongingToSection(title1: string, title2: string): Locator {
    return this.page.locator(`//td[contains(@title,'${title2}')]/following-sibling::td`).getByRole('img', { name: title1 });
  }

  rowWiseElementsOfPage(rowNo: string | number): Locator {
    return this.page.locator(
      `//form[@name='editCost']//table//tr[${rowNo}]//td | //p/following::table//tr[${rowNo}]//td`
    );
  }

  rowWiseElementsOfLineItem(rowNo: string | number): Locator {
    return this.page.locator(`table.basetbl.outline:nth-of-type(2) tr:nth-child(${rowNo}) td`);
  }

  selectdrpDwnNearItem(item: string, selectItem: string): Locator {
    return this.page.locator(
      `//select[contains(@name,'${item}')]/parent::td/following-sibling::td//select[contains(@name,'${selectItem}')] | ` +
      `//select[contains(@id,'${item}')]/parent::td/following-sibling::td//select[contains(@name,'${selectItem}')] | ` +
      `//input[contains(@id,'${item}')]/parent::td/following::td//select[contains(@name,'${selectItem}')] | ` +
      `//b[contains(text(),'${item}')]/parent::td/following-sibling::td//select[contains(@name,'${selectItem}')] | ` +
      `//td[*[contains(text(),'Additional')]]/../following-sibling::tr/td/select[contains(@name,'${selectItem}')]`
    );
  }

  selectDrpDwnNearItemWithOption(item: string, selectItem: string, option: string): Locator {
    return this.page.locator(
      `//b[contains(text(),'${item}')]/parent::td/following-sibling::td//select[contains(@name,'${selectItem}')]//option[contains(text(),'${option}')]`
    );
  }

  inputDataNearItem(nearItem: string, inputName: string): Locator {
    return this.page.locator(
      `//select[@name='${nearItem}']/parent::td/following-sibling::td/input[contains(@name,'${inputName}')] | ` +
      `//select[contains(@name,'${nearItem}')]/../following-sibling::td/input[contains(@id,'${inputName}')] | ` +
      `//td[*[contains(text(),'${nearItem}')]]/../following-sibling::tr/td/input[contains(@name,'${inputName}')]`
    );
  }

  eventUnderSection(section: string, event: string): Locator {
    return this.page.locator(
      `//td//b[contains(text(),'${section}')]//parent::td//parent::tr/following-sibling::tr[1]/td/a[contains(text(),'${event}')] | ` +
      `//td//b[contains(text(),'${section}')]//parent::td//parent::tr/following-sibling::tr/td/a[contains(text(),'${event}')]`
    );
  }

  icon(text: string): Locator {
    return this.page.locator(`img[id*="${text}"], img[title*="${text}"], img[src*="${text}"]`);
  }

  visitMilestoneAreaPageData(
    milestoneType: string, calendar: string, visit: string, milestoneRule: string,
    eventStatus: string, patientCount: string, patientStatus: string, paymentType: string,
    amount: string, holdback: string, limit: string, paymentFor: string, milestoneStatus: string
  ): Locator {
    const base = (fields: string[]) =>
      fields.map((f, i) =>
        i === 0
          ? `//td//div[contains(text(),'${f}')]`
          : `/parent::td/following-sibling::td//div[contains(text(),'${f}')]`
      ).join('');
    return this.page.locator(
      base([milestoneType, calendar, visit, milestoneRule, eventStatus, patientCount, patientStatus, paymentType, amount, holdback, limit, paymentFor, milestoneStatus]) + ' | ' +
      base([milestoneType, calendar, visit, milestoneRule, eventStatus, patientCount, paymentType, amount, holdback, limit, milestoneStatus]) + ' | ' +
      base([milestoneType, calendar, visit, milestoneRule, eventStatus, patientCount, paymentType, amount, holdback, milestoneStatus])
    );
  }

  additionalMilestoneAreaPageData(
    milestoneType: string, milestoneDesc: string, paymentType: string,
    amount: string, holdback: string, paymentFor: string, milestoneStatus: string
  ): Locator {
    const base = (fields: string[]) =>
      fields.map((f, i) =>
        i === 0
          ? `//td//div[contains(text(),'${f}')]`
          : `/parent::td/following-sibling::td//div[contains(text(),'${f}')]`
      ).join('');
    return this.page.locator(
      base([milestoneType, milestoneDesc, paymentType, amount, holdback, paymentFor, milestoneStatus]) + ' | ' +
      base([milestoneType, milestoneDesc, paymentType, amount, holdback, milestoneStatus]) + ' | ' +
      base([milestoneType, paymentType, holdback, milestoneStatus])
    );
  }

  eventMilestoneAreaPageData(
    milestoneType: string, calendar: string, visit: string, event: string,
    milestoneRule: string, eventStatus: string, patientCount: string, patientStatus: string,
    paymentType: string, amount: string, holdback: string, limit: string,
    paymentFor: string, milestoneStatus: string
  ): Locator {
    const base = (fields: string[]) =>
      fields.map((f, i) =>
        i === 0
          ? `//td//div[contains(text(),'${f}')]`
          : `/parent::td/following-sibling::td//div[contains(text(),'${f}')]`
      ).join('');
    return this.page.locator(
      base([milestoneType, calendar, visit, event, milestoneRule, eventStatus, patientCount, patientStatus, paymentType, amount, holdback, limit, paymentFor, milestoneStatus]) + ' | ' +
      base([milestoneType, calendar, visit, event, milestoneRule, eventStatus, patientCount, paymentType, amount, holdback, limit, milestoneStatus]) + ' | ' +
      base([milestoneType, calendar, visit, event, milestoneRule, eventStatus, patientCount, paymentType, amount, holdback, milestoneStatus]) + ' | ' +
      base([milestoneType, calendar, visit, event, milestoneRule, patientCount, paymentType, amount, holdback, limit, milestoneStatus])
    );
  }

  selectRadioButtonInEditCalculationAttributes(fieldName: string, valueNum: string): Locator {
    return this.page.locator(`//*[contains(.,'${fieldName}')]/input[@value=${valueNum}]`);
  }

  verifyVisitWithCalendarPresenceInBudgetGrid(visitName: string, calendarName: string): Locator {
    return this.page.locator(`//td[contains(@title,'${visitName}')]//font[contains(text(),'${calendarName}')]`);
  }

  iconBelongToSectionClick(eventName: string, title: string): Locator {
    return this.page.locator(`//td[contains(@title,'${eventName}')]/following-sibling::td`).getByRole('img', { name: title });
  }

  verifyDropdownValueOnBudgetPage(fieldName: string, value: string): Locator {
    return this.page.locator(`//td[contains(.,'${fieldName}')]/following-sibling::td//select/option[contains(text(),'${value}')]`);
  }

  RadioButtonClickOrVerify(type: string, value: string): Locator {
    return this.page.locator(`input[type="${type}"][value="${value}"]`);
  }

  eventPersonnelOrRepeatingLineDeleteLinkWithValue(value: string): Locator {
    return this.page.locator(`//td//input[2][contains(@value,'${value}')]/../..//td//a[contains(text(),'Delete')]`);
  }

  perfromDeleteActionOnBudgetSection(sectionName: string): Locator {
    return this.page.locator(`//td[contains(text(),'${sectionName}')]/following-sibling::td`).getByRole('img', { name: 'Delete' });
  }

  perfromEditActionOnBudgetSection(sectionName: string): Locator {
    return this.page.locator(`//td[contains(text(),'${sectionName}')]/following-sibling::td`).getByRole('img', { name: 'Edit' });
  }

  updateUnitCostByRowNumber(rowNum: number): Locator {
    return this.page.locator(`tr:nth-child(${rowNum}) td input[name="unitCost"]`);
  }

  updateCategoryByRowNumber(rowNum: number, eventName: string): Locator {
    return this.page.locator(`//tr[${rowNum}]//textarea[contains(text(),'${eventName}')]/../following-sibling::td//select[@name='cmbCtgry']`);
  }

  updateCostTypeByRowNumber(rowNum: number, eventName: string): Locator {
    return this.page.locator(`//tr[${rowNum}]//textarea[contains(text(),'${eventName}')]/../following-sibling::td//select[@name='dCodeType']`);
  }

  updateUnitsByRowNumber(rowNum: number, eventName: string): Locator {
    return this.page.locator(`//tr[${rowNum}]//textarea[contains(text(),'${eventName}')]/../following-sibling::td//input[@name='noUnits']`);
  }

  verifyValueWithEventInReportDisplay(columnName: string, eventName: string, value: string): Locator {
    return this.page.locator(
      `//tr[*[*[contains(text(),'${columnName}')]]]/following-sibling::tr//td[contains(text(),'${eventName}')]/following-sibling::td[contains(text(),'${value}')] | ` +
      `//tr[*[*[contains(text(),'${columnName}')]]]//following-sibling::tr//td[contains(text(),'${eventName}')]/following-sibling::td[contains(text(),'${value}')]`
    );
  }

  verifyFrinIndirect1AndIndirect2(text1: string, text2: string, value: string): Locator {
    return this.page.locator(
      `//td[contains(text(),'${text1}')]/following-sibling::td[contains(text(),'${text2}')]/following-sibling::td[contains(text(),'${value}')]`
    );
  }

  updateUnitCostByEvent(eventName: string): Locator {
    return this.page.locator(`//textarea[contains(text(),'${eventName}')]/..//following-sibling::td/input[@name='unitCost']`);
  }

  PerformUpdateActionWithTagName(text: string, tagName: string): Locator {
    return this.page.locator(`//td//textarea[contains(text(),'${text}')]/../..//*[@name='${tagName}']`);
  }

  searchBudgetByStudy(study: string): Locator {
    return this.page.getByText(study, { exact: false });
  }

  iconBelongToSectionWithCalendarClick(sectionType: string, calendarName: string, title: string): Locator {
    return this.page.locator(
      `//td[contains(@title,'${sectionType}')]//font[contains(text(),'${calendarName}')]/../../following-sibling::td//img[contains(@title,'${title}')] | ` +
      `//td[contains(@title,'${sectionType}')]/../preceding-sibling::tr//font[contains(text(),'${calendarName}')]/../../../../../../../following-sibling::tr//td//img[contains(@title,'${title}')]`
    );
  }

  searchBudgetByNameExists(name: string): Locator {
    return this.page.getByRole('link', { name, exact: false });
  }

  searchBudgetByStudyAndName(study: string, data: string): Locator {
    return this.page.locator(`//td//a[contains(text(),'${data}')]/../following-sibling::td[contains(text(),' ${study}')]`);
  }

  verifyDropdownValueOnVersionPage(fieldName: string, value: string): Locator {
    return this.page.locator(`select[name="${fieldName}"] option:has-text("${value}")`);
  }

  updateCategoryByRowNumber1(eventName: string): Locator {
    return this.page.locator(`//tr//textarea[contains(text(),'${eventName}')]/../following-sibling::td//select[@name='cmbCtgry']`);
  }

  updateCostTypeByRowNumber1(eventName: string): Locator {
    return this.page.locator(`//tr//textarea[contains(text(),'${eventName}')]/../following-sibling::td//select[@name='dCodeType']`);
  }

  updateUnitsByRowNumber1(eventName: string): Locator {
    return this.page.locator(`//tr//textarea[contains(text(),'${eventName}')]/../following-sibling::td//input[@name='noUnits']`);
  }

  checkBudgetPresence(text: string): Locator {
    return this.page.getByRole('link', { name: text, exact: true });
  }

  deleteUserFromBudget(text: string): Locator {
    return this.page.locator(`//tr//td[contains(text(),'${text}')]/following-sibling::td`).getByRole('img', { name: 'Delete' });
  }

  deletestudyBudgetLineItem(itemName: string): Locator {
    return this.page.locator(`//td/a[contains(text(),'${itemName}')]/../../td//following-sibling::td/a`).getByRole('img', { name: 'Delete' });
  }

  /* ══════════════════════════════════════════════════════════
     Action Methods from Steps_VelosBudgetPage.java

     Playwright best practices applied:
     ✓ No manual waitForLoadState — Playwright auto-waits
     ✓ fill() auto-clears — no separate clear() needed
     ✓ getByRole / getByText for semantic locators
     ✓ CSS selectors over XPath where possible
     ✓ waitForLoadState kept ONLY for popup windows
     ══════════════════════════════════════════════════════════ */

  /**
   * Create a new budget with type, status, name, and link to study
   */
  async createBudget(opts: {
    budgetName: string;
    budgetStatus: string;
    budgetTemplate: string;
    studyLink?: string;
    eSign?: string;
  }) {
    const dynamic = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(4, 12);
    const name = opts.budgetName + dynamic;
    await this.page.locator('input[name="budgetName"]').fill(name);
    if (opts.studyLink) {
      await this.page.getByRole('link', { name: opts.studyLink }).click();
    }
    await this.budgetDropdown('Status').selectOption({ label: opts.budgetStatus });
    await this.budgetDropdown('Template').selectOption({ label: opts.budgetTemplate });
    await this.eSignInput.first().fill(opts.eSign ?? process.env.ESIGN ?? '1234');
    await this.submitButton.click();
    return name;
  }

  /**
   * Create budget without random name suffix
   */
  async createBudgetWithoutRandom(opts: {
    budgetName: string;
    budgetStatus: string;
    budgetTemplate: string;
    eSign?: string;
  }) {
    await this.page.locator('input[name="budgetName"]').fill(opts.budgetName);
    await this.budgetDropdown('Status').selectOption({ label: opts.budgetStatus });
    await this.budgetDropdown('Template').selectOption({ label: opts.budgetTemplate });
    await this.eSignInput.first().fill(opts.eSign ?? process.env.ESIGN ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Navigate to the budget tab
   */
  async navigateToBudgetTab() {
    await this.budgetTab.click({ force: true });
  }

  /**
   * Search for budget content by name
   */
  async searchContent(fieldName: string, value: string) {
    await this.searchBudgetByName(fieldName).fill(value);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  /**
   * Search and delete a budget
   */
  async searchAndDeleteBudget(budgetName: string, eSign?: string) {
    await this.searchContent('Budget Name', budgetName);
    this.page.once('dialog', (d) => d.accept());
    await this.page.getByRole('img', { name: 'Delete' }).click();
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Copy an existing budget
   */
  async copyBudget(budgetName: string, newBudgetName: string, eSign?: string) {
    await this.searchContent('Budget Name', budgetName);
    await this.searchBudgetByNameExists(budgetName).click();
    await this.page.getByRole('img', { name: 'Copy' }).click();
    await this.page.locator('input[name="budgetName"]').fill(newBudgetName);
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Delete multiple items by checking checkboxes and deleting
   */
  async deleteMultipleItems(items: string[], eSign?: string) {
    for (const item of items) {
      await this.deleteItemByText(item).check();
    }
    this.page.once('dialog', (d) => d.accept());
    await this.page.getByRole('img', { name: 'Delete' }).click();
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Add a new section to budget
   */
  async addSection(sectionName: string, eSign?: string) {
    await this.sectiondrodpdown.selectOption({ label: sectionName });
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Edit line item description and add new
   */
  async editLineItemDescriptionAndAddNew(description: string, newDescription: string, eSign?: string) {
    await this.inputDescriptionFieldText.first().fill(description);
    await this.addLineItemType.fill(newDescription);
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Select a user and submit
   */
  async selectUserAndSubmit(userName: string, eSign?: string) {
    await this.page.locator(`//td[contains(text(),'${userName}')]/preceding-sibling::td/input[@type='checkbox']`).check();
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Add a new calendar (Study or Library) — popup needs explicit waitForLoadState
   */
  async addNewCalendar(calendarType: 'Study' | 'Library', calendarName: string, eSign?: string) {
    const iconTitle = calendarType === 'Study' ? 'Study Cal' : 'Lib. Cal';
    await this.icon(iconTitle).click();
    const popup = await this.page.waitForEvent('popup');
    await popup.waitForLoadState();
    await popup.locator(`input[value*="${calendarName}"]`).check();
    await popup.locator('#eSign').first().fill(eSign ?? '1234');
    await popup.getByRole('button', { name: 'Submit' }).click();
    await popup.waitForLoadState();
    await popup.close();
  }

  /**
   * Delete a calendar
   */
  async deleteCalendar(calendarName: string, eSign?: string) {
    this.page.once('dialog', (d) => d.accept());
    await this.page.locator(`//font[contains(text(),'${calendarName}')]/../../..//img[@title='Delete']`).click();
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Select calendar name from dropdown
   */
  async selectCalendarName(calendarName: string) {
    await this.budgetCalendarSelect.selectOption({ label: calendarName });
  }

  /**
   * Add repeat line items
   */
  async addRepeatLineItems(eventNames: string[], repeatingOptions: string[], eSign?: string) {
    const eventFields = [this.lineItemsEventNameOne, this.lineItemsEventNameTwo, this.lineItemsEventNameThree];
    const repeatFields = [this.lineItemsRepeatingLineItemsSelectOne, this.lineItemsRepeatingLineItemsSelectTwo, this.lineItemsRepeatingLineItemsSelectThree];
    for (let i = 0; i < eventNames.length && i < 3; i++) {
      await eventFields[i].fill(eventNames[i]);
      await repeatFields[i].selectOption({ label: repeatingOptions[i] });
    }
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Exclude multiple line items by checking checkboxes
   */
  async excludeMultipleLineItems(items: string[]) {
    for (const item of items) {
      await this.clickfirstchk.check();
    }
  }

  /**
   * Select type in dropdown
   */
  async selectTypeInDropdown(dropdownName: string, option: string) {
    await this.budgetPageDropdown(dropdownName).selectOption({ label: option });
  }

  /**
   * Select report type
   */
  async selectReportType(reportName: string) {
    await this.budgetDropdown('Report Type').selectOption({ label: reportName });
  }

  /**
   * Enter description text
   */
  async enterDescription(description: string) {
    await this.inputDescriptionFieldText.first().fill(description);
  }

  /**
   * Enter comments
   */
  async enterComments(comments: string) {
    await this.inputCommentFieldText.first().fill(comments);
  }

  /**
   * Enter delete reason
   */
  async enterDeleteReason(reason: string) {
    await this.inputDeleteReasonFieldText.fill(reason);
  }

  /**
   * Verify budget page is opened — uses getByText
   */
  async verifyBudgetPageOpened(expectedText: string) {
    await expect(this.page.getByText(expectedText).first()).toBeVisible();
  }

  /**
   * Select dropdown name option
   */
  async selectDropdownNameOption(dropdownName: string, option: string) {
    await this.budgetDropdown(dropdownName).selectOption({ label: option });
  }

  /**
   * Verify dropdown has expected option
   */
  async verifyDropdownOption(dropdownName: string, option: string) {
    await expect(this.verifyDropdownValueOnBudgetPage(dropdownName, option)).toBeVisible();
  }

  /**
   * Select/enter dropdown near item
   */
  async selectDropdownNearItem(item: string, selectItem: string, option: string) {
    await this.selectdrpDwnNearItem(item, selectItem).selectOption({ label: option });
  }

  /**
   * Enter input data near item — fill() auto-clears
   */
  async enterDataNearItem(nearItem: string, inputName: string, data: string) {
    await this.inputDataNearItem(nearItem, inputName).fill(data);
  }

  /**
   * Check a checkbox by text
   */
  async checkCheckbox(text: string) {
    await this.page.locator(`//td[contains(text(),'${text}')]/input[@type='checkbox'] | //input[contains(@name,'${text}')]`).first().check();
  }

  /**
   * Uncheck a checkbox by text
   */
  async uncheckCheckbox(text: string) {
    await this.page.locator(`//td[contains(text(),'${text}')]/input[@type='checkbox'] | //input[contains(@name,'${text}')]`).first().uncheck();
  }

  /**
   * Check checkbox by name and value
   */
  async checkCheckboxByNameAndValue(name: string, value: string) {
    await this.checkBoxByNameAndValue(name, value).check();
  }

  /**
   * Verify checkbox is checked
   */
  async verifyCheckboxChecked(name: string, value: string) {
    await expect(this.checkBoxByNameAndValue(name, value)).toBeChecked();
  }

  /**
   * Verify budget page created — uses getByText
   */
  async verifyBudgetPageCreated(budgetName: string) {
    await expect(this.page.getByText(budgetName).first()).toBeVisible();
  }

  /**
   * Verify icons are hidden on budget grid
   */
  async verifyIconsHidden() {
    await expect(this.budgetGridIconsHidden.first()).toBeVisible();
  }

  /**
   * Verify manage budget page — uses getByText
   */
  async verifyManageBudgetPage() {
    await expect(this.page.getByText('Manage Budget').first()).toBeVisible();
  }

  /**
   * Click icon having specified title
   */
  async clickIconHaving(title: string) {
    await this.icon(title).first().click();
  }

  /**
   * Click icon belonging to a section
   */
  async clickIconBelongingToSection(iconTitle: string, sectionTitle: string) {
    await this.iconBelongingToSection(iconTitle, sectionTitle).click();
  }

  /**
   * Click icon belonging to section (by event name)
   */
  async clickIconBelongToSection(eventName: string, title: string) {
    await this.iconBelongToSectionClick(eventName, title).click();
  }

  /**
   * Click icon belonging to section with calendar
   */
  async clickIconBelongToSectionWithCalendar(section: string, calendarName: string, title: string) {
    await this.iconBelongToSectionWithCalendarClick(section, calendarName, title).click({ force: true });
  }

  /**
   * Enter event row-wise data (9 columns) — fill() auto-clears
   */
  async enterEventRowData(opts: {
    rowNo: string;
    event: string;
    cptCode: string;
    category: string;
    costType: string;
    unitCost: string;
    applyDiscount: string;
    applyIndirect1: string;
    applyIndirect2: string;
  }) {
    const cells = this.rowWiseElementsOfLineItem(opts.rowNo);
    await cells.nth(0).locator('input').fill(opts.event);
    await cells.nth(1).locator('input').fill(opts.cptCode);
    await cells.nth(2).locator('select').selectOption({ label: opts.category });
    await cells.nth(3).locator('select').selectOption({ label: opts.costType });
    await cells.nth(4).locator('input').fill(opts.unitCost);
  }

  /**
   * Enter event row-wise data with extended columns — fill() auto-clears
   */
  async enterEventRowDataExtended(opts: {
    rowNo: string;
    event: string;
    cptCode: string;
    category: string;
    costType: string;
    unitCost: string;
    ofUnits: string;
    applyDiscount: string;
    applyIndirect1: string;
    applyIndirect2: string;
    sponsorDirectAmount: string;
    applyNoOfPatients: string;
  }) {
    const cells = this.rowWiseElementsOfLineItem(opts.rowNo);
    await cells.nth(0).locator('input').fill(opts.event);
    await cells.nth(1).locator('input').fill(opts.cptCode);
    await cells.nth(2).locator('select').selectOption({ label: opts.category });
    await cells.nth(3).locator('select').selectOption({ label: opts.costType });
    await cells.nth(4).locator('input').fill(opts.unitCost);
    await cells.nth(5).locator('input').fill(opts.ofUnits);
    await cells.nth(9).locator('input').fill(opts.sponsorDirectAmount);
  }

  /**
   * Enter personnel type data at a specific row — fill() auto-clears
   */
  async enterPersonnelTypeData(opts: {
    rowNo: string;
    personnelType: string;
    rate: string;
    includeIn: string;
    notes: string;
    category: string;
    applyChangesTo: string;
  }) {
    const cells = this.rowWiseElementsOfPage(opts.rowNo);
    await cells.nth(0).locator('input').fill(opts.personnelType);
    await cells.nth(1).locator('input').fill(opts.rate);
    await cells.nth(2).locator('select').selectOption({ label: opts.includeIn });
    await cells.nth(3).locator('input').fill(opts.notes);
    await cells.nth(4).locator('select').selectOption({ label: opts.category });
    if (opts.applyChangesTo) {
      await cells.nth(5).locator('select').selectOption({ label: opts.applyChangesTo });
    }
  }

  /**
   * Enter new personnel type data — CSS selectors, fill() auto-clears
   */
  async enterNewPersonnelTypeData(opts: {
    personnelType: string;
    rate: string;
    includeIn: string;
    notes: string;
    category: string;
  }) {
    await this.page.locator('input[name="newType"]').fill(opts.personnelType);
    await this.page.locator('input[name="newRate"]').fill(opts.rate);
    await this.page.locator('select[name="newBudgetStatus"]').selectOption({ label: opts.includeIn });
    await this.page.locator('input[name="newNotes"]').fill(opts.notes);
    await this.page.locator('select[name="newCmbCtgry"]').selectOption({ label: opts.category });
  }

  /**
   * Hover over an icon
   */
  async hoverIcon(title: string) {
    await this.icon(title).first().hover();
  }

  /**
   * Hover then click icon on budget page
   */
  async hoverClickIcon(title: string) {
    await this.icon(title).first().hover();
    await this.icon(title).first().click();
  }

  /**
   * Verify icon is present on page
   */
  async verifyIconPresent(title: string) {
    await expect(this.icon(title).first()).toBeVisible();
  }

  /**
   * Get mouseover info text — CSS selector for tooltip
   */
  async getMouseoverInfo(title: string): Promise<string> {
    await this.icon(title).first().hover();
    const tooltip = this.page.locator('[class*="tooltip"]').first();
    return await tooltip.textContent() ?? '';
  }

  /**
   * Verify overview page — uses getByText
   */
  async verifyOverviewPage() {
    await expect(this.page.getByText('Overview').first()).toBeVisible();
  }

  /**
   * Verify calendar grid page — uses getByText
   */
  async verifyCalendarGridPage() {
    await expect(this.page.getByText('Calendar Grid').first()).toBeVisible();
  }

  /**
   * Verify sections page — uses getByText
   */
  async verifySectionsPage() {
    await expect(this.page.getByText('Sections').first()).toBeVisible();
  }

  /**
   * Verify line items page — uses getByText
   */
  async verifyLineItemsPage() {
    await expect(this.page.getByText('Line Item').first()).toBeVisible();
  }

  /**
   * Verify personnel cost page
   */
  async verifyPersonnelCostPage() {
    await expect(this.perPatientFeesText.first()).toBeVisible();
  }

  /**
   * Verify event under a section
   */
  async verifyEventUnderSection(section: string, event: string) {
    await expect(this.eventUnderSection(section, event)).toBeVisible();
  }

  /**
   * Verify by visit page — uses getByText
   */
  async verifyByVisitPage() {
    await expect(this.page.getByText('By Visit').first()).toBeVisible();
  }

  /**
   * Verify budget edit page — uses getByText
   */
  async verifyBudgetEditPage() {
    await expect(this.page.getByText('Edit').first()).toBeVisible();
  }

  /**
   * Verify appendix page — uses getByText
   */
  async verifyAppendixPage() {
    await expect(this.page.getByText('Appendix').first()).toBeVisible();
  }

  /**
   * Verify access rights page — uses getByText
   */
  async verifyAccessRightsPage() {
    await expect(this.page.getByText('Access Rights').first()).toBeVisible();
  }

  /**
   * Verify budget open page — uses getByText
   */
  async verifyBudgetOpenPage() {
    await expect(this.page.getByText('Open').first()).toBeVisible();
  }

  /**
   * Verify upload page
   */
  async verifyUploadPage() {
    await expect(this.uploadBudgetIcon.first()).toBeVisible();
  }

  /**
   * Verify URL page — uses getByText
   */
  async verifyURLPage() {
    await expect(this.page.getByText('URL').first()).toBeVisible();
  }

  /**
   * Verify copy budget page — uses getByText
   */
  async verifyCopyBudgetPage() {
    await expect(this.page.getByText('Copy').first()).toBeVisible();
  }

  /**
   * Verify browser page — uses getByText
   */
  async verifyBrowserPage() {
    await expect(this.page.getByText('Browser').first()).toBeVisible();
  }

  /**
   * Verify short description page — uses getByText
   */
  async verifyShortDescPage() {
    await expect(this.page.getByText('Short').first()).toBeVisible();
  }

  /**
   * Verify calculation attributes page — uses getByText
   */
  async verifyCalculationAttributesPage() {
    await expect(this.page.getByText('Calculation Attributes').first()).toBeVisible();
  }

  /**
   * Verify milestones page — uses getByText
   */
  async verifyMilestonesPage() {
    await expect(this.page.getByText('Milestones').first()).toBeVisible();
  }

  /**
   * Verify milestones count
   */
  async verifyMilestonesCount(expectedCount: string) {
    await expect(this.milestonesCount).toContainText(expectedCount);
  }

  /**
   * Verify visit milestone data
   */
  async verifyVisitMilestoneData(
    milestoneType: string, calendar: string, visit: string, milestoneRule: string,
    eventStatus: string, patientCount: string, patientStatus: string, paymentType: string,
    amount: string, holdback: string, limit: string, paymentFor: string, milestoneStatus: string
  ) {
    await expect(
      this.visitMilestoneAreaPageData(milestoneType, calendar, visit, milestoneRule, eventStatus, patientCount, patientStatus, paymentType, amount, holdback, limit, paymentFor, milestoneStatus)
    ).toBeVisible();
  }

  /**
   * Verify additional milestone data
   */
  async verifyAdditionalMilestoneData(
    milestoneType: string, milestoneDesc: string, paymentType: string,
    amount: string, holdback: string, paymentFor: string, milestoneStatus: string
  ) {
    await expect(
      this.additionalMilestoneAreaPageData(milestoneType, milestoneDesc, paymentType, amount, holdback, paymentFor, milestoneStatus)
    ).toBeVisible();
  }

  /**
   * Verify event milestone data
   */
  async verifyEventMilestoneData(
    milestoneType: string, calendar: string, visit: string, event: string,
    milestoneRule: string, eventStatus: string, patientCount: string, patientStatus: string,
    paymentType: string, amount: string, holdback: string, limit: string,
    paymentFor: string, milestoneStatus: string
  ) {
    await expect(
      this.eventMilestoneAreaPageData(milestoneType, calendar, visit, event, milestoneRule, eventStatus, patientCount, patientStatus, paymentType, amount, holdback, limit, paymentFor, milestoneStatus)
    ).toBeVisible();
  }

  /**
   * Upload a file — CSS selector for file input
   */
  async uploadFile(filePath: string) {
    await this.page.locator('input[type="file"]').setInputFiles(filePath);
  }

  /**
   * Select radio button in edit calculation attributes
   */
  async selectRadioButton(fieldName: string, valueNum: string) {
    await this.selectRadioButtonInEditCalculationAttributes(fieldName, valueNum).click();
  }

  /**
   * Verify budget presence
   */
  async verifyBudgetPresenceAndCreate(budgetName: string, exists: boolean) {
    if (exists) {
      await expect(this.checkBudgetPresence(budgetName)).toBeVisible();
    } else {
      await expect(this.checkBudgetPresence(budgetName)).not.toBeVisible();
    }
  }

  /**
   * Verify visit with calendar presence in budget grid
   */
  async verifyVisitWithCalendar(visitName: string, calendarName: string) {
    await expect(this.verifyVisitWithCalendarPresenceInBudgetGrid(visitName, calendarName)).toBeVisible();
  }

  /**
   * Update unit cost for a row — fill() auto-clears
   */
  async updateUnitsAndCost(rowNum: number, unitCost: string, ofUnits: string) {
    await this.updateUnitCostByRowNumber(rowNum).fill(unitCost);
  }

  /**
   * Verify apply to all checkbox
   */
  async verifyApplyToAllCheckbox() {
    await expect(this.applyToAllPerPatientSectionscheckbox).toBeVisible();
  }

  /**
   * Verify checkboxes at row
   */
  async verifyCheckboxesAtRow(rowNo: string) {
    const cells = this.rowWiseElementsOfLineItem(rowNo);
    await expect(cells.nth(6).locator('input')).toBeVisible();
  }

  /**
   * Verify dropdown value on budget page
   */
  async verifyDropdownValue(fieldName: string, value: string) {
    await expect(this.verifyDropdownValueOnBudgetPage(fieldName, value)).toBeVisible();
  }

  /**
   * Delete budget section
   */
  async deleteBudgetSection(sectionName: string, eSign?: string) {
    this.page.once('dialog', (d) => d.accept());
    await this.perfromDeleteActionOnBudgetSection(sectionName).click();
    await this.eSignInput.first().fill(eSign ?? '1234');
    await this.submitButton.click();
  }

  /**
   * Edit budget section
   */
  async editBudgetSection(sectionName: string) {
    await this.perfromEditActionOnBudgetSection(sectionName).click();
  }

  /**
   * Select calendar status dropdown
   */
  async selectCalendarStatus(status: string) {
    await this.calendarStatusDropdown.selectOption({ label: status });
  }

  /**
   * Link events with visits by checking checkboxes
   */
  async linkEventsWithVisits() {
    await this.visitOneCheckboxOne.check();
    await this.visitTwoCheckboxTwo.check();
  }

  /**
   * Update category for event
   */
  async updateCategoryForEvent(rowNum: number, eventName: string, category: string) {
    await this.updateCategoryByRowNumber(rowNum, eventName).selectOption({ label: category });
  }

  /**
   * Update cost type for event
   */
  async updateCostTypeForEvent(rowNum: number, eventName: string, costType: string) {
    await this.updateCostTypeByRowNumber(rowNum, eventName).selectOption({ label: costType });
  }

  /**
   * Update units for event — fill() auto-clears
   */
  async updateUnitsForEvent(rowNum: number, eventName: string, units: string) {
    await this.updateUnitsByRowNumber(rowNum, eventName).fill(units);
  }

  /**
   * Update category/costType/units by event name (no row number needed)
   */
  async updateCategoryByEvent(eventName: string, category: string) {
    await this.updateCategoryByRowNumber1(eventName).selectOption({ label: category });
  }

  async updateCostTypeByEvent(eventName: string, costType: string) {
    await this.updateCostTypeByRowNumber1(eventName).selectOption({ label: costType });
  }

  async updateUnitsByEvent(eventName: string, units: string) {
    await this.updateUnitsByRowNumber1(eventName).fill(units);
  }

  /**
   * Update unit cost by event name — fill() auto-clears
   */
  async updateUnitCostForEvent(eventName: string, unitCost: string) {
    await this.updateUnitCostByEvent(eventName).fill(unitCost);
  }

  /**
   * Perform update action with tag name for event
   */
  async performUpdateAction(eventName: string, tagName: string, value: string) {
    const element = this.PerformUpdateActionWithTagName(eventName, tagName);
    const tag = await element.evaluate((el) => el.tagName.toLowerCase());
    if (tag === 'select') {
      await element.selectOption({ label: value });
    } else {
      await element.fill(value);
    }
  }

  /**
   * Verify value with event in report display
   */
  async verifyValueWithEvent(columnName: string, eventName: string, value: string) {
    await expect(this.verifyValueWithEventInReportDisplay(columnName, eventName, value)).toBeVisible();
  }

  /**
   * Verify fringe/indirect1/indirect2 values
   */
  async verifyFringeIndirect(text1: string, text2: string, value: string) {
    await expect(this.verifyFrinIndirect1AndIndirect2(text1, text2, value)).toBeVisible();
  }

  /**
   * Check exclude SOC line items checkbox
   */
  async checkExcludeSOCLineItems() {
    await this.excludeSOCLineItems.check();
  }

  /**
   * Verify exclude SOC checkbox is unchecked
   */
  async verifyExcludeSOCUnchecked() {
    await expect(this.excludeSocLineItemsCheckbox).not.toBeChecked();
  }

  /**
   * Verify section is present in budget
   */
  async verifySectionPresent(sectionName: string) {
    await expect(this.tableSectionNameByText(sectionName)).toBeVisible();
  }

  /**
   * Delete event/personnel/repeating line with value
   */
  async deleteEventPersonnelOrRepeatingLine(value: string) {
    this.page.once('dialog', (d) => d.accept());
    await this.eventPersonnelOrRepeatingLineDeleteLinkWithValue(value).click();
  }

  /**
   * Delete user from budget access rights
   */
  async clickDeleteUserIcon(user: string) {
    this.page.once('dialog', (d) => d.accept());
    await this.deleteUserFromBudget(user).click({ force: true });
  }

  /**
   * Delete study budget line item
   */
  async clickDeleteLineItemIcon(lineItem: string) {
    this.page.once('dialog', (d) => d.accept());
    await this.deletestudyBudgetLineItem(lineItem).click({ force: true });
  }

  /**
   * Add new line item — popup needs waitForLoadState; CSS selectors; fill() auto-clears
   */
  async addNewLineItem(opts: {
    eventName: string;
    category: string;
    unitCost: string;
    noOfUnits: string;
    sponsorDirectAmount: string;
    eSign?: string;
  }) {
    const popup = await this.page.waitForEvent('popup');
    await popup.waitForLoadState();
    await popup.locator('textarea[name="eventdata"]').fill(opts.eventName);
    await popup.locator('select[name="cmbCtgry"]').selectOption({ label: opts.category });
    await popup.locator('input[name="unitCost"]').fill(opts.unitCost);
    await popup.locator('input[name="noUnits"]').fill(opts.noOfUnits);
    await popup.locator('input[name="appIndirects"]').click();
    await popup.locator('input[name="sponsorAmount"]').fill(opts.sponsorDirectAmount);
    await popup.locator('#eSign').first().fill(opts.eSign ?? '1234');
    await popup.getByRole('button', { name: 'Submit' }).click();
    await popup.waitForLoadState();
    await popup.close();
  }

  /**
   * Edit line item — popup needs waitForLoadState; CSS selectors; fill() auto-clears
   */
  async editLineItem(opts: {
    eventName: string;
    category: string;
    unitCost: string;
    noOfUnits: string;
    sponsorDirectAmount: string;
    eSign?: string;
  }) {
    await this.misceditlineitem.click();
    const popup = await this.page.waitForEvent('popup');
    await popup.waitForLoadState();
    await popup.locator('textarea[name="eventdata"]').fill(opts.eventName);
    await popup.locator('select[name="cmbCtgry"]').selectOption({ label: opts.category });
    await popup.locator('input[name="unitCost"]').fill(opts.unitCost);
    await popup.locator('input[name="noUnits"]').fill(opts.noOfUnits);
    await popup.locator('input[name="appIndirects"]').click();
    await popup.locator('input[name="sponsorAmount"]').fill(opts.sponsorDirectAmount);
    await popup.locator('#eSign').first().fill(opts.eSign ?? '1234');
    await popup.getByRole('button', { name: 'Submit' }).click();
    await popup.waitForLoadState();
    await popup.close();
  }

  /**
   * Click milestone icon in study budget
   */
  async clickMilestoneIcon() {
    await this.addmilestoneinbudget.click();
  }

  /**
   * Select payment type from study budget milestone
   */
  async selectPaymentType(paymentType: string) {
    await this.thirdpaymenttype.selectOption({ label: paymentType });
  }

  /**
   * Select milestone status from study budget milestone
   */
  async selectMilestoneStatus(status: string) {
    await this.thirdmilestonestatus.selectOption({ label: status });
  }

  /**
   * Click SDA checkbox in study budget
   */
  async clickThirdSDACheckbox() {
    await this.thirdsdacheckbox.click();
  }

  /**
   * Click STA checkbox in study budget
   */
  async clickThirdSTACheckbox() {
    await this.thirdstacheckbox.click();
  }

  /**
   * Click edit icon for miscellaneous section
   */
  async clickEditMiscIcon() {
    await this.misceditlineitem.click();
  }

  /**
   * Add additional milestone rule
   */
  async addAdditionalMilestoneRule() {
    await this.checkbox.click();
    await this.amountcheck.click();
  }

  /**
   * Edit visit in study budget
   */
  async editVisitStudyBudget() {
    await this.Editclick.click();
  }

  /**
   * Enter event name in add/edit repeating line item — fill() auto-clears
   */
  async enterEventNameInRepeatingLineItem(value: string) {
    await this.Eventnamerepeating.fill(value);
  }

  /**
   * Enter event name in repeating line item input — fill() auto-clears
   */
  async enterEventRepeatingLineItem(event: string) {
    await this.lineItemsEventName.fill(event);
  }

  /**
   * Insert CPT code and repeating line items
   */
  async insertCPTcodeAndRepeatingLineItems(opts: {
    events: string[];
    cptCodes?: string[];
    repeatingOptions: string[];
  }) {
    const eventFields = [this.lineItemsEventNameOne, this.lineItemsEventNameTwo, this.lineItemsEventNameThree];
    for (let i = 0; i < opts.events.length && i < 3; i++) {
      await eventFields[i].fill(opts.events[i]);
      if (opts.cptCodes && opts.cptCodes[i]) {
        await this.lineItemCPTcodeOne.fill(opts.cptCodes[i]);
      }
    }
    const repeatFields = [this.lineItemsRepeatingLineItemsSelectOne, this.lineItemsRepeatingLineItemsSelectTwo, this.lineItemsRepeatingLineItemsSelectThree];
    for (let i = 0; i < opts.repeatingOptions.length && i < 3; i++) {
      await repeatFields[i].selectOption({ label: opts.repeatingOptions[i] });
    }
  }

  /**
   * Insert personnel data into fields — fill() auto-clears
   */
  async insertPersonnelData(opts: {
    personnelTypes: string[];
    rates: string[];
    includeIn: string[];
  }) {
    const typeFields = [this.personnelTypeFieldOne, this.personnelTypeFieldTwo, this.personnelTypeFieldThree];
    const rateFields = [this.rateFieldOne, this.rateFieldTwo, this.rateFieldThree];
    const includeFields = [this.includeInDropdownOne, this.includeInDropdownTwo, this.includeInDropdownThree];
    for (let i = 0; i < opts.personnelTypes.length && i < 3; i++) {
      await typeFields[i].fill(opts.personnelTypes[i]);
      await rateFields[i].fill(opts.rates[i]);
      await includeFields[i].selectOption({ label: opts.includeIn[i] });
    }
  }

  /**
   * Set repeating line item three
   */
  async setRepeatingLineItemThree(value: string) {
    await this.lineItemsRepeatingLineItemsSelectThreeNew.fill(value);
  }

  /**
   * Set personnel type two after change
   */
  async setPersonnelTypeTwoAfterChange(value: string) {
    await this.personnelTypeFieldTwoAfterChange.fill(value);
  }

  /**
   * Delete link for first repeating event
   */
  async deleteRepeatingLink() {
    this.page.once('dialog', (d) => d.accept());
    await this.deleteEventRepeatingOne.click();
  }

  /**
   * Verify number of patients value
   */
  async verifyNumberOfPatients(): Promise<string> {
    return await this.noOfPatients.inputValue();
  }

  /**
   * Verify number of units value
   */
  async verifyNumberOfUnits(): Promise<string> {
    return await this.noOfunit.inputValue();
  }

  /**
   * Click personnel cost icon — uses getByRole
   */
  async clickPersonnelCostIcon() {
    await this.page.getByRole('img', { name: 'Personnel Cost' }).click({ force: true });
  }

  /**
   * Update category, cost type, and units for event — fill() auto-clears
   */
  async updateCategoryCostTypeUnitsForEvent(eventName: string, category: string, costType: string, unitNo: string) {
    await this.updateCategoryByRowNumber1(eventName).selectOption({ label: category });
    await this.updateCostTypeByRowNumber1(eventName).selectOption({ label: costType });
    await this.updateUnitsByRowNumber1(eventName).fill(unitNo);
  }

  /**
   * Search budget template and delete — uses getByRole for Delete icon
   */
  async searchBudgetTemplateAndDelete(templateName: string, eSign?: string) {
    await this.budgetSearchInputBox.fill(templateName);
    await this.defaultCalendarBudget.click();
    await this.searchButton.click();
    const deleteIcon = this.page.getByRole('img', { name: 'Delete' });
    if (await deleteIcon.isVisible()) {
      this.page.once('dialog', (d) => d.accept());
      await deleteIcon.click();
      await this.eSignInput.first().fill(eSign ?? '1234');
      await this.submitButton.click();
    }
  }

  /**
   * Enter data in budget search field — fill() auto-clears
   */
  async enterDataInBudgetField(data: string, fieldName: string) {
    const field = this.page.locator(`//td[contains(text(),'${fieldName}')]/following-sibling::td/input | //td[contains(text(),'${fieldName}')]/input`);
    await field.first().fill(data);
  }

  /**
   * Enter e-signature and submit
   */
  async enterESignatureAndSubmit(eSignature: string) {
    await this.eSignInput.first().fill(eSignature);
    await this.submitButton.click();
  }

  /**
   * Select dropdown by name — CSS selector
   */
  async selectNewDropdownOption(name: string, option: string) {
    await this.page.locator(`select[name="${name}"]`).first().selectOption({ label: option });
  }

  /**
   * Verify overlapping text — uses getByText
   */
  async verifyOverlappingText(text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }

  /**
   * Update events costs at a specific row — fill() auto-clears
   */
  async updateEventsCosts(opts: {
    rowNo: string;
    costType: string;
    unitCost: string;
    ofUnits: string;
    sponsorDirectAmount: string;
    applyDiscount?: 'check' | 'uncheck';
    applyIndirect1?: 'check' | 'uncheck';
    applyIndirect2?: 'check' | 'uncheck';
    applyNoOfPatients?: 'check' | 'uncheck';
  }) {
    const cells = this.rowWiseElementsOfLineItem(opts.rowNo);
    await cells.nth(3).locator('select').selectOption({ label: opts.costType });
    await cells.nth(4).locator('input').fill(opts.unitCost);
    await cells.nth(5).locator('input').fill(opts.ofUnits);
    await cells.nth(9).locator('input').fill(opts.sponsorDirectAmount);
  }
}
