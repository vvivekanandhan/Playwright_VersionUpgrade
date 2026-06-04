import { type Page, type Locator, expect } from '@playwright/test';
import { VelosHelper } from '../helpers/VelosHelper';

/**
 * VelosFinancialPage – Financials Browser, Milestones, Invoicing, Payments.
 * Converted from Velos_FinancialsPage.java + Steps_VelosFinancialsPage.java
 */
export class VelosFinancialPage {
  page: Page;
  inv: string | null = null;

  /* ── Static Locators from Velos_FinancialsPage.java ── */
  readonly getInvoiceAmountHoldback: Locator;
  readonly remainingToApplyValue: Locator;
  readonly patMilestoneAmount: Locator;
  readonly patientPaymentTypeDropDown: Locator;
  readonly milestoneActiveDropdownEditor: Locator;
  readonly milestoneActiveTextEditor: Locator;
  readonly milestoneDatePickerMonth: Locator;
  readonly milestoneDatePickerYear: Locator;
  readonly Serial: Locator;
  readonly milestoneRows: Locator;
  readonly amountToFilter: Locator;
  readonly amountFromFilter: Locator;
  readonly paymentDescMouseover: Locator;
  readonly invoiceButton: Locator;
  readonly generateInoiceButton: Locator;
  readonly reconcileDetailsGrid: Locator;
  readonly reconcileSearchIcon: Locator;
  readonly reconcileSearchKeyword: Locator;
  readonly closeReconcileModal: Locator;
  readonly checkSecurityPinLabel: Locator;
  readonly deleteselectedButtonEventStatus: Locator;
  readonly reportValue: Locator;
  readonly gridValue: Locator;
  readonly checkApplyAmountsHighlighted: Locator;
  readonly checkSelectInvoiceHighlighted: Locator;
  readonly checkDefaultSort: Locator;
  readonly reconcileEMCheckbox: (milestoneText: string) => Locator;
  readonly reconcileAllMileCheckbox: Locator;
  readonly Deletepayment: Locator;
  readonly Deleteinvoice: Locator;
  readonly DeleteSelectedRule: Locator;
  readonly Deletecheck: Locator;
  readonly clickReconcile: Locator;
  readonly searchPayment: Locator;
  readonly paymentDescription: Locator;
  readonly invoiceDueDateDay: Locator;
  readonly selectInvoiceDate: Locator;
  readonly CalculateAll: Locator;
  readonly EraseAll: Locator;
  readonly DeleteAllRules: Locator;
  readonly totalRecordNumber: Locator;
  readonly milestonesForStudyList: Locator;
  readonly holdBackInputField: Locator;
  readonly addMilestonePlusIcon: Locator;
  readonly addPM_MilestonePlusIcon: Locator;
  readonly addVM_MilestonePlusIcon: Locator;
  readonly addEM_MilestonePlusIcon: Locator;
  readonly addSM_MilestonePlusIcon: Locator;
  readonly addAM_MilestonePlusIcon: Locator;
  readonly amMilestoneDescEditor: Locator;
  readonly milestoneRequiredFieldDropdown: Locator;
  readonly inputValue: Locator;
  readonly verifyRuleExpanded: Locator;
  readonly getInvoiceAmount: Locator;
  readonly verifyInvoiceGrid: Locator;
  readonly invoiceUpdate: Locator;
  readonly addNewPaymentLink: Locator;
  readonly amountColumnValue: Locator;
  readonly reconciledColumnValue: Locator;
  readonly nonReconciledValue: Locator;
  readonly searcHPaymentInput: Locator;
  readonly deletePaymenteSignature: Locator;
  readonly backButton: Locator;
  readonly verifyGridIsBlank: Locator;
  readonly clickCloseIconOnRecocilePopup: Locator;
  readonly enterInvoiceAmountInInvoiceGrid: Locator;
  readonly inputFieldValueInMilestone: Locator;
  readonly nextApplyAmountButton: Locator;
  readonly RconcilePaymenteSignature: Locator;
  readonly tooltipContentOnPaymentsPage: Locator;
  readonly hoverOverPaymentsPageStudyTitle: Locator;
  readonly calculateAllIconInvoiceCreation: Locator;
  readonly clearValueInPaymentToApplyField: Locator;
  readonly totalPaymentAmount: Locator;
  readonly previouslyApplied: Locator;
  readonly appliedToSelected: Locator;
  readonly remainingToApply: Locator;
  readonly totalMilestoneAmount: Locator;
  readonly selectedPayment: Locator;
  readonly remainingToPay: Locator;
  readonly firstCalculateIcon: Locator;
  readonly amount: Locator;
  readonly reconcile: Locator;
  readonly editamount: Locator;
  readonly paymentamount: Locator;
  readonly SaveAndClose: Locator;
  readonly PayInFull: Locator;
  readonly ReconcileDetailIcon: Locator;
  readonly addNewPaymentButton: Locator;
  readonly editApplyAmt: Locator;
  readonly deleteAmount: Locator;
  readonly patientcount: Locator;
  readonly milestonePreviewAndSaveBtn: Locator;
  readonly invoicingTabLink: Locator;
  readonly createNewInvoiceLink: Locator;
  readonly submitStepOneButton: Locator;
  readonly calculateAllIcon: Locator;
  readonly generateInvoiceButton: Locator;

  /* ── Milestone Grid Column Locators (PM = Patient Status, backward compat) ── */
  readonly serialNumberField: Locator;
  readonly milestoneTypeField: Locator;
  readonly patientCountField: Locator;
  readonly patientStatusField: Locator;
  readonly paymentTypeField: Locator;
  readonly amountField: Locator;
  readonly holdbackField: Locator;
  readonly limitField: Locator;
  readonly paymentForField: Locator;
  readonly dateFromField: Locator;
  readonly dateToField: Locator;
  readonly milestoneStatusField: Locator;
  readonly selectAllField: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getInvoiceAmountHoldback = page.locator("(//td[@class='col-invoiceAmount'])[2]").first();
    this.remainingToApplyValue = page.locator("//span[contains(.,'Remaining to Apply')]/following::span[contains(@class,'invrembalance')][1]").first();
    this.patMilestoneAmount = page.locator("//div[@id='PM_Parent_milestonegrid']//table[@id='PM_Parent_milestonegrid_datatablejs']//tbody/tr[1]//td[contains(@class,'yui-dt-col-amount')]//div[contains(@class,'yui-dt-liner')]").first();
    this.patientPaymentTypeDropDown = page.locator("//div[@id='PM_Parent_milestonegrid']//table[@id='PM_Parent_milestonegrid_datatablejs']//tbody/tr[1]//td[contains(@class,'yui-dt-col-payType')]//div[contains(@class,'yui-dt-liner')]").first();
    this.milestoneActiveDropdownEditor = page.getByRole('cell', { name: 'Serial # Milestone Type' }).getByRole('combobox');
    this.milestoneActiveTextEditor = page.getByRole('spinbutton').first();
    this.milestoneDatePickerMonth = page.getByRole('combobox', { name: 'Month' }).first();
    this.milestoneDatePickerYear = page.getByRole('combobox', { name: 'Year' }).first();
    this.Serial = page.getByRole('link', { name: 'Serial #' }).first();
    this.milestoneRows = page.getByRole('row').first();
    this.amountToFilter = page.getByRole('textbox', { name: 'Amount To' }).first();
    this.amountFromFilter = page.getByRole('textbox', { name: 'Amount From' }).first();
    this.paymentDescMouseover = page.locator("//span[@class='tooltipped']|//following-sibling::td//span[contains(text(),'...')]").first();
    this.invoiceButton = page.locator("//button[@type='submit']").first();
    this.generateInoiceButton = page.locator("//span[contains(text(),'Generate Invoice')]").first();
    this.reconcileDetailsGrid = page.locator("//div[contains(@class,'wcg_rectable')]").first();
    this.reconcileSearchIcon = page.locator("//i[@class='small material-icons prefix suffix wcg_search']").first();
    this.reconcileSearchKeyword = page.locator("//input[@id='inSearch']").first();
    this.closeReconcileModal = page.locator("//div[@class='modal-header']//i[@class='material-icons right modal-close'][normalize-space()='clear']").first();
    this.checkSecurityPinLabel = page.locator("//span[@class='eSignSpan']").first();
    this.deleteselectedButtonEventStatus = page.locator("//div[@id='tab__EM']//button[contains(text(),'Delete Selected')]").first();
    this.reportValue = page.locator("//table[@class='basetbl']").first();
    this.gridValue = page.locator("//div[@id='reportDataTable_wrapper']").first();
    this.checkApplyAmountsHighlighted = page.locator("//div[@class='col center circle second_select circle-active'] /following-sibling::div[contains(text(),'Apply Amounts')]").first();
    this.checkSelectInvoiceHighlighted = page.locator("//div[@class='col center circle circle-active first_select']/following-sibling::div//span[contains(text(),'Select Invoice')]").first();
    this.checkDefaultSort = page.locator("//th[contains(@class,'reportHeading sorting_asc') and contains(@aria-label,'Invoice Date')]").first();
    this.reconcileEMCheckbox = (milestoneText: string) => page.getByRole('row', { name: new RegExp(milestoneText, 'i') }).locator('td .valign-wrapper span').first();
    this.reconcileAllMileCheckbox = page.locator('.tablesorter-header-inner > .valign-wrapper > span').first();

    this.Deletepayment = page.locator("//i[normalize-space()='delete']").first();
    this.Deleteinvoice = page.locator("//input[@id='InvOpt0']").first();
    this.DeleteSelectedRule = page.locator("//div[@class='delete__milestone__wrapper valign-wrapper flex-align-helper-container']//button[@type='submit']").first();
    this.Deletecheck = page.locator('#allInvOpt').first();
    this.clickReconcile = page.locator("a:has-text('Reconcile')").first();
    this.searchPayment = page.locator("//input[@id='paySearch']").first();
    this.paymentDescription = page.locator("//input[@id='description']").first();
    this.invoiceDueDateDay = page.locator("//input[@id='paymentDueUnitBy']").first();
    this.selectInvoiceDate = page.locator("//input[@name='invDate']").first();
    this.CalculateAll = page.locator('#calculateAll').first();
    this.EraseAll = page.locator('#eraseAll').first();
    this.DeleteAllRules = page.locator('#allInvLines').first();
    this.totalRecordNumber = page.locator('.recNumber').first();
    this.milestonesForStudyList = page.locator("table tr[class*='Row'] td a[href*='milestone']").first();
    this.holdBackInputField = page.locator('#holdback').first();
    this.addMilestonePlusIcon = page.locator("span[title='Add'] i[class*='plus']").first();
    this.addPM_MilestonePlusIcon = page.locator("//span[@onclick=\"VELOS.milestoneGrid.addRows('PM');\"]").first();
    this.addVM_MilestonePlusIcon = page.locator("//span[@onclick=\"VELOS.milestoneGrid.addRows('VM');\"]").first();
    this.addEM_MilestonePlusIcon = page.locator("//span[@onclick=\"VELOS.milestoneGrid.addRows('EM');\"]").first();
    this.addSM_MilestonePlusIcon = page.locator("//span[@onclick=\"VELOS.milestoneGrid.addRows('SM');\"]").first();
    this.addAM_MilestonePlusIcon = page.locator("//span[@onclick=\"VELOS.milestoneGrid.addRows('AM');\"]").first();
    this.amMilestoneDescEditor = page.locator('.yui-dt-editor');
    this.milestoneRequiredFieldDropdown = page.locator("//div[@class='yui-dt-editor' and contains(@style,'left')]/select").first();
    this.inputValue = page.locator("//div[contains(@id,'textboxceditor') and contains(@style,'left')]//input").first();
    this.verifyRuleExpanded = page.locator("//div[contains(@class,'active')]//li[@class='active']").first();
    this.getInvoiceAmount = page.locator("//td[contains(@headers,'invoiceAmount')]/div|//td[contains(@class,'invoiceAmount')]/div|//td[@class='col-invoiceAmount']").first();
    this.verifyInvoiceGrid = page.locator("//div[contains(@id,'generateInvoiceGrid')]").first();
    this.invoiceUpdate = page.locator("//form[@id='viewInvFrm']").first();
    this.addNewPaymentLink = page.locator("//a[contains(.,'Add New')]").first();
    this.amountColumnValue = page.locator("//td[contains(text(),'Payment Made')]/following-sibling::td[3]").first();
    this.reconciledColumnValue = page.locator("//td[contains(text(),'Payment Made')]/following-sibling::td[4]").first();
    this.nonReconciledValue = page.locator("//td[contains(text(),'Payment Made')]/following-sibling::td[5]").first();
    this.searcHPaymentInput = page.locator("//input[contains(@placeholder,'Search payments')]").first();
    this.deletePaymenteSignature = page.locator("//input[contains(@name,'eSigns')]").first();
    this.backButton = page.locator("//a[contains(@id,'back')]").first();
    this.verifyGridIsBlank = page.locator("//tr[contains(@class,'mileTableRow') and contains(@style,'none')]").first();
    this.clickCloseIconOnRecocilePopup = page.locator("//span[contains(text(),'Reconcile')]/following-sibling::span//i[contains(text(),'clear')]").first();
    this.enterInvoiceAmountInInvoiceGrid = page.locator("//div[@class='yui-dt-editor']//input[@type='text']").first();
    this.inputFieldValueInMilestone = page.locator("(//div[not(contains(@style,'none')) and contains(@class,'editor')]//input)").first();
    this.nextApplyAmountButton = page.locator("//a[contains(text(),'Next: Apply Amounts')]/parent::div[not(contains(@class,'hide'))]//a[2]").first();
    this.RconcilePaymenteSignature = page.locator("//div[not(contains(@class,'hide'))]/span//input[contains(@name,'eSign') and contains(@type,'password')]").first();
    this.tooltipContentOnPaymentsPage = page.locator("//div[contains(@class,'material-tooltip') and contains(@style,'visible')]/div").first();
    this.hoverOverPaymentsPageStudyTitle = page.locator("//span[contains(@class,'tooltipped')]/img").first();
    this.calculateAllIconInvoiceCreation = page.locator('#calculateAll').first();
    this.clearValueInPaymentToApplyField = page.locator('#applyAmnt1').first();
    this.totalPaymentAmount = page.locator("//span[@class='miletotalamt numberfield']").first();
    this.previouslyApplied = page.locator("//span[@class='miletotalamtspent numberfield']").first();
    this.appliedToSelected = page.locator("//span[@class='mileapldtoselected numberfield']").first();
    this.remainingToApply = page.locator("//span[@class='milerembalance numberfield']").first();
    this.totalMilestoneAmount = page.locator("//span[@class='milecurtotal numberfield']").first();
    this.selectedPayment = page.locator("//span[@class='milepayapld numberfield']").first();
    this.remainingToPay = page.locator("//span[@class='mileremtopay numberfield']").first();
    this.firstCalculateIcon = page.locator("//tr[@id='yui-rec0']//img[@id='calculate_e0']").first();
    this.amount = page.locator("//*[@id='wcg__payment__tablePayment']/tbody/tr/td[5]/span").first();
    this.reconcile = page.locator("//*[@id='wcg__payment__tablePayment']/tbody/tr/td[6]/span").first();
    this.editamount = page.locator("//i[normalize-space()='edit']").first();
    this.paymentamount = page.locator("//input[@placeholder='Enter payment amount']").first();
    this.SaveAndClose = page.locator("//*[@id='addeditpayment']/div[3]/a[1]").first();
    this.PayInFull = page.locator("//a[@class='ancor1']").first();
    this.ReconcileDetailIcon = page.locator("//*[@id='reconciliation']/img").first();
    this.addNewPaymentButton = page.locator("//a[contains(@class,'modal-action waves-effect waves-blue btn-flat')]").first();
    this.editApplyAmt = page.locator("//i[normalize-space()='edit']").first();
    this.deleteAmount = page.locator("//i[normalize-space()='delete']").first();
    this.patientcount = page.locator("//div[@id='yui-textboxceditor2-container']//input[@type='text']").first();
    this.milestonePreviewAndSaveBtn = page.getByRole('row', { name: 'Holdback % 0.00 Apply to All' }).locator('#save_changes').last();
    this.invoicingTabLink = page.getByRole('link', { name: 'Invoicing' }).first();
    this.createNewInvoiceLink = page.getByRole('link', { name: 'CREATE A NEW INVOICE' }).first();
    this.submitStepOneButton = page.getByRole('button', { name: 'Submit' }).first();
    this.calculateAllIcon = page.getByRole('img', { name: 'Calculate All' }).first();
    this.generateInvoiceButton = page.getByRole('button', { name: 'Generate Invoice' }).first();

    /* ── Milestone Grid Column Locators – PM (Patient Status) backward compat ── */
    this.serialNumberField    = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-recNum']").first();
    this.milestoneTypeField   = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-mileType']").first();
    this.patientCountField    = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-patCount']").first();
    this.patientStatusField   = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-patStatus']").first();
    this.paymentTypeField     = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-payType']").first();
    this.amountField          = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-amount']").first();
    this.holdbackField        = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-holdBack']").first();
    this.limitField           = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-limit']").first();
    this.paymentForField      = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-payFor']").first();
    this.dateFromField        = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-date_From']").first();
    this.dateToField          = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-date_To']").first();
    this.milestoneStatusField = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-mileStatus']").first();
    this.selectAllField       = page.locator("#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-selectAll_PM'] input").first();
  }

  /* ── Instance methods for dynamic dropdown/text editors ── */

  activeDropdownEditorNew() {
    return this.page.locator("//div[contains(@id,'dropdownceditor') and contains(@class,'container')]//select");
  }

  activeTextEditorNew() {
    return this.page.locator("//div[contains(@id,'textboxceditor') or contains(@id,'texteditor')]//input");
  }

  /* ───────────────────────────────────────────────────────────────────────────
   * MILESTONE GRID – DYNAMIC LOCATORS FOR ALL 5 TYPES
   *
   * Grid table IDs:
   *   PM_milestonegrid_datatablejs  → Patient Status Milestones
   *   VM_milestonegrid_datatablejs  → Visit Milestones
   *   EM_milestonegrid_datatablejs  → Event Milestones
   *   SM_milestonegrid_datatablejs  → Study Status Milestones
   *   AM_milestonegrid_datatablejs  → Additional Milestones
   *
   * Column class suffixes (yui-dt-col-<suffix>):
   *   Common to all:  recNum, mileType, payType, amount, holdBack_parent, limit, payFor, mileStatus
   *   PM only:        patCount, patStatus, date_From, date_To, selectAll_PM
   *   VM only:        calendar, visit, mileRule, evtStatus, patCount, patStatus, date_From, date_To
   *   EM only:        calendar, visit, event, mileRule, evtStatus, patCount, patStatus
   *   SM only:        stdStatus
   *   AM only:        mileDesc
   * ─────────────────────────────────────────────────────────────────────────── */

  /**
   * Returns the last-row cell locator for any milestone grid + column.
   * @param prefix  - 'PM' | 'VM' | 'EM' | 'SM' | 'AM'
   * @param colClass - e.g. 'patStatus', 'amount', 'mileStatus'
   */
  getMilestoneCell(prefix: 'PM' | 'VM' | 'EM' | 'SM' | 'AM', colClass: string) {
    return this.page.locator(`#${prefix}_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-${colClass}']`);
  }

  /** Click any milestone grid cell (single click to open inline editor) */
  async clickMilestoneCell(prefix: 'PM' | 'VM' | 'EM' | 'SM' | 'AM', colClass: string) {
    await this.getMilestoneCell(prefix, colClass).click();
  }

  /* ── Patient Status Milestones (PM) ── */
  get pm_recNum()          { return this.getMilestoneCell('PM', 'recNum'); }
  get pm_mileType()        { return this.getMilestoneCell('PM', 'mileType'); }
  get pm_patCount()        { return this.getMilestoneCell('PM', 'patCount'); }
  get pm_patStatus()       { return this.getMilestoneCell('PM', 'patStatus'); }
  get pm_payType()         { return this.getMilestoneCell('PM', 'payType'); }
  get pm_amount()          { return this.getMilestoneCell('PM', 'amount'); }
  get pm_holdBack()        { return this.getMilestoneCell('PM', 'holdBack_parent'); }
  get pm_limit()           { return this.getMilestoneCell('PM', 'limit'); }
  get pm_payFor()          { return this.getMilestoneCell('PM', 'payFor'); }
  get pm_mileStatus()      { return this.getMilestoneCell('PM', 'mileStatus'); }
  get pm_dateFrom()        { return this.getMilestoneCell('PM', 'date_From'); }
  get pm_dateTo()          { return this.getMilestoneCell('PM', 'date_To'); }
  get pm_selectAll()       { return this.page.locator(`#PM_milestonegrid_datatablejs tbody tr:first-child td[class*='yui-dt-col-selectAll_PM'] input`); }

  /* ── Visit Milestones (VM) ── */
  get vm_recNum()          { return this.getMilestoneCell('VM', 'recNum'); }
  get vm_mileType()        { return this.getMilestoneCell('VM', 'mileType'); }
  get vm_calendar()        { return this.getMilestoneCell('VM', 'calendar'); }
  get vm_visit()           { return this.getMilestoneCell('VM', 'visit'); }
  get vm_mileRule()        { return this.getMilestoneCell('VM', 'mileRule'); }
  get vm_evtStatus()       { return this.getMilestoneCell('VM', 'evtStatus'); }
  get vm_patCount()        { return this.getMilestoneCell('VM', 'patCount'); }
  get vm_patStatus()       { return this.getMilestoneCell('VM', 'patStatus'); }
  get vm_payType()         { return this.getMilestoneCell('VM', 'payType'); }
  get vm_amount()          { return this.getMilestoneCell('VM', 'amount'); }
  get vm_holdBack()        { return this.getMilestoneCell('VM', 'holdBack_parent'); }
  get vm_limit()           { return this.getMilestoneCell('VM', 'limit'); }
  get vm_payFor()          { return this.getMilestoneCell('VM', 'payFor'); }
  get vm_mileStatus()      { return this.getMilestoneCell('VM', 'mileStatus'); }
  get vm_dateFrom()        { return this.getMilestoneCell('VM', 'date_From'); }
  get vm_dateTo()          { return this.getMilestoneCell('VM', 'date_To'); }

  /* ── Event Milestones (EM) ── */
  get em_recNum()          { return this.getMilestoneCell('EM', 'recNum'); }
  get em_mileType()        { return this.getMilestoneCell('EM', 'mileType'); }
  get em_calendar()        { return this.getMilestoneCell('EM', 'calendar'); }
  get em_visit()           { return this.getMilestoneCell('EM', 'visit'); }
  get em_event()           { return this.getMilestoneCell('EM', 'event'); }
  get em_mileRule()        { return this.getMilestoneCell('EM', 'mileRule'); }
  get em_evtStatus()       { return this.getMilestoneCell('EM', 'evtStatus'); }
  get em_patCount()        { return this.getMilestoneCell('EM', 'patCount'); }
  get em_patStatus()       { return this.getMilestoneCell('EM', 'patStatus'); }
  get em_payType()         { return this.getMilestoneCell('EM', 'payType'); }
  get em_amount()          { return this.getMilestoneCell('EM', 'amount'); }
  get em_holdBack()        { return this.getMilestoneCell('EM', 'holdBack_parent'); }
  get em_limit()           { return this.getMilestoneCell('EM', 'limit'); }
  get em_payFor()          { return this.getMilestoneCell('EM', 'payFor'); }
  get em_mileStatus()      { return this.getMilestoneCell('EM', 'mileStatus'); }

  /* ── Study Status Milestones (SM) ── */
  get sm_recNum()          { return this.getMilestoneCell('SM', 'recNum'); }
  get sm_mileType()        { return this.getMilestoneCell('SM', 'mileType'); }
  get sm_stdStatus()       { return this.getMilestoneCell('SM', 'stdStatus'); }
  get sm_payType()         { return this.getMilestoneCell('SM', 'payType'); }
  get sm_amount()          { return this.getMilestoneCell('SM', 'amount'); }
  get sm_holdBack()        { return this.getMilestoneCell('SM', 'holdBack_parent'); }
  get sm_limit()           { return this.getMilestoneCell('SM', 'limit'); }
  get sm_payFor()          { return this.getMilestoneCell('SM', 'payFor'); }
  get sm_mileStatus()      { return this.getMilestoneCell('SM', 'mileStatus'); }

  /* ── Additional Milestones (AM) ── */
  get am_recNum()          { return this.getMilestoneCell('AM', 'recNum'); }
  get am_mileType()        { return this.getMilestoneCell('AM', 'mileType'); }
  get am_mileDesc()        { return this.getMilestoneCell('AM', 'mileDesc'); }
  get am_payType()         { return this.getMilestoneCell('AM', 'payType'); }
  get am_amount()          { return this.getMilestoneCell('AM', 'amount'); }
  get am_holdBack()        { return this.getMilestoneCell('AM', 'holdBack_parent'); }
  get am_payFor()          { return this.getMilestoneCell('AM', 'payFor'); }
  get am_mileStatus()      { return this.getMilestoneCell('AM', 'mileStatus'); }


  /* ── Dynamic Locator Methods from Velos_FinancialsPage.java ── */

  expandMilestoneTypeByName(name: string) {
    return this.page.locator(`//h3[a[contains(text(),'${name}')]]//span[contains(@class,'triangle')]`);
  }

  milestoneTypeRequiredFieldByName(milestoneName: string, fieldName: string) {
    return this.page.locator(`(//div[contains(@id,'${milestoneName}_milestonegrid')]//td[contains(@class,'${fieldName}')])[last()]`);
  }

  verifyColumnPresent(column1: string, column2: string) {
    return this.page.locator(`//th[*[*[*[contains(text(),'${column1}')]]]]/following-sibling::th//span[contains(text(),'${column2}')]`);
  }

  doubleClickPatientStatusForLastRowByMilestoneName(MilestoneName: string) {
    return this.page.locator(`(//div[*[*[contains(text(),'${MilestoneName}')]]]//tr//td[contains(@class,'patStatus')])[last()]`);
  }

  doubleClickMilestoneStatusForLastRowByMilestoneName(MilestoneName: string) {
    return this.page.locator(`(//div[*[*[contains(text(),'${MilestoneName}')]]]//tr//td[contains(@class,'mileStatus')])[last()]`);
  }

  getHoldBackValuesForLastRowByMilestoneName(MilestoneName: string) {
    return this.page.locator(`(//div[*[*[contains(text(),'${MilestoneName}')]]]//tr//td[contains(@class,'holdBack')]//div)[last()]`);
  }

  textAreaInputInEdit1InvoicePopup(fieldName: string) {
    return this.page.locator(`//input[contains(@name,'${fieldName}')]`);
  }

  previewSaveByMilestoneName(milestoneName: string, buttonName: string) {
    return this.page.locator(`//h3[*[contains(text(),'${milestoneName}')]]/following-sibling::div//span[contains(text(),'${buttonName}')]`);
  }

  verifyMilestone(milestoneName: string) {
    return this.page.locator(`//h3[*[contains(text(),'${milestoneName}')]]/following-sibling::div[contains(@class,'active')]`);
  }

  verifyCheckboxByName(checkboxName: string) {
    return this.page.locator(`//td[contains(text(),'${checkboxName}')]/input`);
  }

  verifyMilestoneStatusRow(milestoneName: string, status: string) {
    return this.page.locator(`//h3[*[contains(text(),'${milestoneName}')]]/following-sibling::div//tr//td/div[contains(text(),'${status}')]`);
  }

  verifyViewAchievementPopUpBox(boxName: string) {
    return this.page.locator(`//div[@class='row wcg__box__container']//p[contains(text(),'${boxName}')]/preceding-sibling::p`);
  }

  expandMilestoneRule(milestoneRule: string) {
    return this.page.locator(`//div[contains(@id,'divBottom')]//div//a[contains(text(),'${milestoneRule}')]`);
  }

  viewSearchDataDisplayed(data: string) {
    return this.page.locator(`//li[contains(@class,'active')]//tr//td[contains(text(),'${data}')]`);
  }

  clickOnexpandCollapseButtons(buttonName: string) {
    return this.page.locator(`//div[contains(@class,'active')]//span[contains(text(),'${buttonName}')]`);
  }

  selectInvoiceType(fieldName: string) {
    return this.page.locator(`//td[*[*[contains(text(),'${fieldName}')]]]/following-sibling::td/select`);
  }

  verifyColumn(columnName: string) {
    return this.page.locator(`//th[contains(text(),'${columnName}')]|//th[*[*[contains(text(),'${columnName}')]]]|//th[*[contains(text(),'${columnName}')]]`);
  }

  editStatus(fieldName: string, currentStatus: string, iconClick: string) {
    return this.page.locator(`//td[*[contains(text(),'${fieldName}')]]/following-sibling::td/a[contains(text(),'${currentStatus}')]/following-sibling::a//img[contains(@title,'${iconClick}')]`);
  }

  verifyQuickAccessLinks(iconName: string) {
    return this.page.locator(`//td[*[@class='selectedTab']]/following-sibling::td//img[contains(@title,'${iconName}')]|//td[*[@class='selectedTab']]/following-sibling::td//i[contains(text(),'${iconName}')]`);
  }

  verifyFieldPresent(fieldName: string) {
    return this.page.locator(`//div[contains(@class,'container')]//div[*[contains(text(),'${fieldName}')]]/following-sibling::input|//div[contains(@class,'container')]//div[*[contains(text(),'${fieldName}')]]/following-sibling::select`);
  }

  verifyColumnInGrid(columnName: string, value: string) {
    return this.page.locator(`//th[*[*[contains(text(),'${columnName}')]]]/../../following-sibling::tbody//td[contains(text(),'${value}')]`);
  }

  modifyByColumnName(columnValue: string, iconClick: string) {
    return this.page.locator(`//td[contains(text(),'${columnValue}')]/following-sibling::td//i[contains(text(),'${iconClick}')]`);
  }

  linkClickByColumnName(columnValue: string, linkName: string) {
    return this.page.locator(`//td[contains(text(),'${columnValue}')]/following-sibling::td//a[contains(text(),'${linkName}')]|//td[contains(text(),'${columnValue}')]/following-sibling::td//i[contains(text(),'${linkName}')]`);
  }

  clickReconcilePopupBoxes(boxName: string) {
    return this.page.locator(`//div[contains(text(),'${boxName}')]`);
  }

  enterTextByPlaceholder(fieldName: string) {
    return this.page.locator(`//input[contains(@placeholder,'${fieldName}')]`);
  }

  selectInvoiceReconcilePopup(invoice: string) {
    return this.page.locator(`//td[contains(text(),'${invoice}')]/..//label`);
  }

  getValue(text: string) {
    return this.page.locator(`//span[contains(text(),'${text}')]/span`);
  }

  verifyMilestonesDropdownValues(text: string) {
    return this.page.locator(`//input[contains(@class,'dropdown')]/following-sibling::ul/li/span[contains(text(),'${text}')]`);
  }

  fieldInputByPlaceHolder(fieldName: string) {
    return this.page.locator(`//input[contains(@placeholder,'${fieldName}')]`);
  }

  selectPaymentType(Type: string) {
    return this.page.locator(`//div[contains(@class,'container')]//div[*[*[*[contains(text(),'${Type}')]]]]//select`);
  }

  selectPaymentTypeOrMethodA(type: string) {
    return this.page.locator(`//div[contains(@class,'container')]//div//label[contains(text(),'${type}')]/../..//select`);
  }

  ascByColumnPaymentGrid(columnName: string) {
    return this.page.locator(`//th[contains(@onclick, 'asc')]//span[contains(text(),'${columnName}')]`);
  }

  descByColumnPaymentGrid(columnName: string) {
    return this.page.locator(`//th[contains(@onclick, 'desc')]//span[contains(text(),'${columnName}')]`);
  }

  verifyReconcileColumnName(columnName: string) {
    return this.page.locator(`//table[contains(@id,'wcg__payment__tableMile')]//th//span[text()='${columnName}']`);
  }

  verifyColumnSortingOnReconcilePage(columnName: string, sortingType: string) {
    return this.page.locator(`//table[contains(@id,'wcg__payment__tableMile')]//span[contains(text(),'${columnName}')]/../parent::th[contains(@aria-sort,'${sortingType}')]`);
  }

  selectMilestoneType(type: string) {
    return this.page.locator(`//td[contains(text(),'${type}')]/preceding-sibling::td//input`);
  }

  paymentCalculatorgetValue(field: string) {
    return this.page.locator(`//div[@class='row wcg-apply-amount step-11']//following-sibling::div//span[contains(text(),'${field}')]/following-sibling::span//span`);
  }

  editIconClickByInvoiceName(invoiceName: string, iconName: string) {
    return this.page.locator(`//a[contains(text(),'${invoiceName}')]/../following-sibling::td//img[@title='${iconName}']`);
  }

  verifyInvoiceNumber(invoiceNumber: string) {
    return this.page.locator(`//tr/td[contains(text(),'${invoiceNumber}')]`);
  }

  clickInvoiceAmountColumnByMilestoneName(milestoneType: string) {
    return this.page.locator(`//td[*[contains(text(),'${milestoneType}')]]/following-sibling::td[contains(@class,'invoiceAmount')]`);
  }

  textAreaInputInEditInvoicePopup(fieldName: string) {
    return this.page.locator(`//td[contains(text(),'${fieldName}')]//textarea`);
  }

  statusLinkClickByInvoiceName(invoiceName: string, statusType: string) {
    return this.page.locator(`//td[*[contains(text(),'${invoiceName}')]]/following-sibling::td//a[contains(text(),'${statusType}')]`);
  }

  clickMilestoneValueByInputFieldName(milestoneName: string, fieldName: string) {
    return this.page.locator(`//div[@id='${milestoneName}']//tr[last()]//td[contains(@headers,'${fieldName}') and contains(@class,'editable')]`);
  }

  verifyMilestoneAchievedBymilestoneName(milestoneName: string) {
    return this.page.locator(`//td[*[contains(text(),'${milestoneName}')]]//following-sibling::td//input[@type='checkbox']`);
  }

  selectCalucateIconByMilestoneValue(milestoneType: string, value: string, iconName: string) {
    return this.page.locator(`//td[*[contains(text(),'${milestoneType}')]]/following-sibling::td[*[contains(text(),'${value}')]]/following-sibling::td//img[@title='${iconName}']`);
  }

  inputFieldsOnAddNewPaymentPopup(inputField: string) {
    return this.page.locator(`//input[contains(@name,'${inputField}')]`);
  }

  selectMilestoneCheckbox(PatID: string) {
    return this.page.locator(`//td[contains(text(),'${PatID}')]/parent::tr//label//span`);
  }

  reconcileDetailsDate(milestone: string) {
    return this.page.locator(`//td[contains(text(),'${milestone}')]/preceding-sibling::td[contains(@class,'searchableRecDate')]`);
  }

  editInvoiceMilestoneAmountByDesc(milestoneDesc: string) {
    return this.page.locator(`//td[contains(text(),'${milestoneDesc}')]//following-sibling::td/input[@name='amountInvoiced']`);
  }

  checkInvoiceEditIcon(Invoice: string) {
    return this.page.locator(`//td[contains(text(),'${Invoice}')]//following-sibling::td//a[contains(@onclick,'return viewInvoice')]`);
  }

  fldNamepath(text: string) {
    return this.page.locator(`//input[@name='${text}']`);
  }

  verifyInvoiceStatus(fieldName: string, currentStatus: string) {
    return this.page.locator(`//td[*[contains(text(),'${fieldName}')]]/following-sibling::td/a[contains(text(),'${currentStatus}')]`);
  }

  milestoneColumnValue(column: string) {
    return this.page.locator(`//span[contains(text(),'${column}')]/following-sibling::span/span`);
  }

  /* ── Existing Helper Methods ── */

  async searchStudy(studyNumber: string) {
    await this.page.locator('input[name="search_data"]').first().fill(studyNumber);
    await this.page.getByRole('button', { name: 'Search' }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async refreshList() {
    await this.page.getByRole('link', { name: /refresh/i }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addMilestoneRows(count: number, milestoneType: string) {
    await this.page.getByText(milestoneType).first().click();
    for (let i = 0; i < count; i++) {
      await this.page.getByRole('link', { name: /add/i }).first().click();
    }
  }

  async setMilestoneDropdownValue(field: string, value: string) {
    await this.page.locator(`select[name="${field}"]`).first().selectOption({ label: value });
  }

  async setMilestoneInputValue(field: string, value: string) {
    await this.page.locator(`input[name="${field}"]`).first().fill(value);
  }

  async previewAndSaveMilestones() {
    await this.page.getByRole('button', { name: 'Preview and Save' }).first().click();
  }

  async saveMilestones() {
    await this.page.getByRole('button', { name: 'Save' }).first().click();
  }

  async expandMilestoneRuleAction(ruleName: string) {
    await this.page.locator(`//td[contains(text(),'${ruleName}')]//preceding::img[contains(@class,'expand')]`).first().click();
  }

  async searchMilestoneField(field: string, value: string) {
    await this.page.locator(`select[name="${field}"]`).first().selectOption({ label: value });
  }

  async verifyMilestoneDisplayed(milestoneType: string) {
    await expect(this.page.getByText(milestoneType).first()).toBeVisible();
  }

  async navigateToTab(tabName: string) {
    await this.page.getByRole('link', { name: tabName }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickCreateInvoice() {
    await this.page.getByRole('link', { name: /create a new invoice/i }).first().click();
  }

  invoiceMilestoneTypeOption(milestoneType: string) {
    return this.page.locator('div').filter({ hasText: `Milestone Type ${milestoneType}` }).first();
  }

  /**
   * Opens Invoicing and creates an invoice from achieved milestones.
   * Fills a unique invoice number (studyNumber-randomNumber) into #invNumber.
   * Returns the generated invoice number.
   */
  async createInvoiceFromInvoicing( studyNumber: string = '', closeGeneratedInvoicePopup: boolean = true): Promise<string> {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const invoiceNumber = `${randomNum}${randomChar}`;
    if (!this.page.url().includes('invoicebrowser.jsp')) {
      const helper = new VelosHelper(this.page);
      await helper.navigateToFinancialTab(studyNumber);
    }

    await this.invoicingTabLink.click();
    await this.clickCreateInvoice();
    await this.page.locator('#invNumber').fill(invoiceNumber);
    await this.submitStepOneButton.click();
    await this.calculateAllIcon.click();

    const popupPromise = this.page.waitForEvent('popup', { timeout: 5000 }).catch(() => null);
    await this.generateInvoiceButton.click();
    const popupPage = await popupPromise;

    if (closeGeneratedInvoicePopup && popupPage) {
      await popupPage.close().catch(() => {});
    }

    // The system generates the full invoice number as studyNumber-randomNumber
    const fullInvoiceNumber = studyNumber ? `${studyNumber}-${invoiceNumber}` : invoiceNumber;

    // Store invoice number for later use
    this.inv = fullInvoiceNumber;

    // Verify invoice number is displayed as a link
    await expect(this.page.getByRole('link', { name: fullInvoiceNumber })).toBeVisible();

    return fullInvoiceNumber;
  }

  async submitInvoice() {
    await this.page.getByRole('button', { name: 'Submit' }).first().click();
  }

  async generateInvoice() {
    await this.page.getByRole('button', { name: 'Generate Invoice' }).first().click();
  }

  async selectInvoice(invoiceNumber: string) {
    await this.page.locator(`//td[contains(text(),'${invoiceNumber}')]//preceding::input[@type='checkbox']`).first().check();
  }

  async deleteSelectedInvoices() {
    await this.page.getByRole('link', { name: /delete selected/i }).first().click();
  }

  async verifyInvoiceGridVisible() {
    await expect(this.page.locator('table.dataGrid, .yui-dt-data, .invoice-grid').first()).toBeVisible();
  }

  async addPayment(amount: string, paymentType: string) {
    await this.page.locator('input[name="paymentAmount"]').first().fill(amount);
    await this.page.locator('select[name="paymentType"]').first().selectOption({ label: paymentType });
    await this.page.getByRole('link', { name: /add new payment/i }).first().click();
  }

  async clickAddNewPaymentLink() {
    await this.page.getByRole('link', { name: /Add New Payment/i }).first().click();
  }

  async verifyPaymentInGrid(paymentType: string) {
    await expect(this.page.getByText(paymentType).first()).toBeVisible();
  }

  async performPaymentAction(action: string, fieldValue: string) {
    await this.page.locator(`//td[contains(text(),'${fieldValue}')]//following::a[contains(text(),'${action}')]`).first().click();
  }

  async clickReconcileAction(rowText: string) {
    await this.page.locator(`//td[contains(text(),'${rowText}')]//following::a[contains(text(),'Reconcile')]`).first().click();
  }

  async selectReconcileBox(boxName: string) {
    await this.page.getByText(boxName).first().click();
  }

  async selectInvoiceOnPopup(invoiceNumber: string) {
    await this.page.locator(`//td[contains(text(),'${invoiceNumber}')]//preceding::input[@type='checkbox']`).first().check();
  }

  async verifyColumnInGridAction(columnName: string) {
    await expect(this.page.getByText(columnName).first()).toBeVisible();
  }

  async verifyTextPresent(text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }

  async verifyFieldPresentAction(fieldName: string) {
    await expect(this.page.getByText(fieldName).first()).toBeVisible();
  }

  async verifyQuickAccessIcon(iconName: string) {
    await expect(this.page.locator(`img[title*="${iconName}"], a:has-text("${iconName}")`).first()).toBeVisible();
  }

  async uploadFileInAppendix(description: string) {
    await this.page.getByRole('link', { name: /CLICK HERE/i }).first().click();
    await this.page.locator('input[name="description"], textarea[name="description"]').first().fill(description);
  }

  async addLinkInAppendix(url: string, description: string) {
    await this.page.getByRole('link', { name: /CLICK HERE/i }).first().click();
    await this.page.locator('input[name="url"]').first().fill(url);
    await this.page.locator('input[name="description"], textarea[name="description"]').first().fill(description);
  }

  /** Click 'Preview and Save' in the Milestone grid, fill eSign, and click Save */
  async milestonePreviewAndSave(eSignValue?: string) {
    await this.milestonePreviewAndSaveBtn.click();
    const value = eSignValue ?? process.env.ESIGN!;
    await this.page.locator('#eSign, #eSigns').last().click();
    await this.page.keyboard.type(value, { delay: 100 });
    await this.page.getByRole('button', { name: 'Save', exact: true }).first().click();
  }

  private async dismissInlineMilestoneEditor() {
    await this.page.getByText(' Milestone Type:').first().click();
  }

  private async addMilestoneRow(prefix: 'PM' | 'VM' | 'EM' | 'SM' | 'AM', count: number = 1) {
    await this.page.locator(`#${prefix}_rowCount`).last().click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(`#${prefix}_rowCount`).pressSequentially(String(count), { delay: 1000 });

    const plusIcon = {
      PM: this.addPM_MilestonePlusIcon,
      VM: this.addVM_MilestonePlusIcon,
      EM: this.addEM_MilestonePlusIcon,
      SM: this.addSM_MilestonePlusIcon,
      AM: this.addAM_MilestonePlusIcon,
    };

    await plusIcon[prefix].click();
  }

  private async selectActiveMilestoneDropdown(label?: string, index?: number) {
    if (label) {
      await this.milestoneActiveDropdownEditor.selectOption({ label });
    } else if (index !== undefined) {
      await this.milestoneActiveDropdownEditor.selectOption({ index });
    }
    await this.dismissInlineMilestoneEditor();
    await this.page.waitForTimeout(1000);
  }

  private async fillActiveMilestoneText(value: string) {
    await this.milestoneActiveTextEditor.fill(value);
    await this.dismissInlineMilestoneEditor();
    await this.page.waitForTimeout(500);
  }

  async createPatientStatusMilestone(patientStatus: string, amount: string) {
    await this.expandMilestoneTypeByName('Patient Status Milestones').click();
    await this.addMilestoneRow('PM');

    await this.clickPatientStatusField();
    await this.selectActiveMilestoneDropdown(patientStatus);

    await this.clickMilestoneStatusField();
    await this.selectActiveMilestoneDropdown('Active');

    await this.clickAmountField();
    await this.fillActiveMilestoneText(amount);

    await this.milestonePreviewAndSave();
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async createStudyStatusMilestone(studyStatus: string, amount: string) {
    await this.expandMilestoneTypeByName('Study Status Milestones').click();
    await this.addMilestoneRow('SM');

    await this.clickSM_StdStatusField();
    await this.selectActiveMilestoneDropdown(studyStatus);

    await this.clickSM_MilestoneStatusField();
    await this.selectActiveMilestoneDropdown('Active');

    await this.clickSM_AmountField();
    await this.fillActiveMilestoneText(amount);

    await this.milestonePreviewAndSave();
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async createVisitMilestone(calendarName: string, visitName: string, amount: string) {
    await this.expandMilestoneTypeByName('Visit Milestones').click();
    await this.addMilestoneRow('VM');

    await this.clickVM_CalendarField();
    await this.selectActiveMilestoneDropdown(calendarName);

    await this.clickVM_VisitField();
    await this.selectActiveMilestoneDropdown(visitName);

    await this.clickVM_MileRuleField();
    await this.selectActiveMilestoneDropdown('All events within the visit are  marked as -');

    await this.clickVM_EvtStatusField();
    await this.selectActiveMilestoneDropdown('Done');

    await this.clickVM_MilestoneStatusField();
    await this.selectActiveMilestoneDropdown('Active');

    await this.clickVM_AmountField();
    await this.fillActiveMilestoneText(amount);

    await this.milestonePreviewAndSave();
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async createEventMilestone(calendarName: string, visitName: string, eventName: string, amount: string, eventIndex?: number) {
    await this.expandMilestoneTypeByName('Event Milestones').click();
    await this.addMilestoneRow('EM');

    await this.clickEM_CalendarField();
    await this.selectActiveMilestoneDropdown(calendarName);

    await this.clickEM_VisitField();
    await this.selectActiveMilestoneDropdown(visitName);

    await this.clickEM_EventField();
    if (eventIndex !== undefined) {
      await this.selectActiveMilestoneDropdown(undefined, eventIndex);
    } else {
      await this.selectActiveMilestoneDropdown(eventName);
    }

    await this.clickEM_MileRuleField();
    await this.selectActiveMilestoneDropdown('Event is marked as -');

    await this.clickEM_EvtStatusField();
    await this.selectActiveMilestoneDropdown('Done');

    await this.clickEM_MilestoneStatusField();
    await this.selectActiveMilestoneDropdown('Active');

    await this.clickEM_AmountField();
    await this.fillActiveMilestoneText(amount);

    await this.milestonePreviewAndSave();
    await this.page.reload({ waitUntil: 'domcontentloaded' });

  }

  async createAdditionalMilestone(description: string, amount: string) {
    await this.expandMilestoneTypeByName('Additional Milestones').click();
    await this.addMilestoneRow('AM');

    await this.clickAM_MileDescField();
    await this.amMilestoneDescEditor.fill(description);

    await this.clickAM_MilestoneStatusField();
    await this.selectActiveMilestoneDropdown('Active');

    await this.clickAM_AmountField();
    await this.fillActiveMilestoneText(amount);

    await this.milestonePreviewAndSave();
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /* ── Patient Status Milestone Grid – Click Methods ── */

  async clickSerialNumberField() {
    await this.serialNumberField.click();
  }

  async clickMilestoneTypeField() {
    await this.milestoneTypeField.click();
  }

  async clickPatientCountField() {
    await this.patientCountField.click();
  }

  async clickPatientStatusField() {
    await this.patientStatusField.click();
  }

  async clickPaymentTypeField() {
    await this.paymentTypeField.click();
  }

  async clickAmountField() {
    await this.amountField.click();
  }

  async clickHoldbackField() {
    await this.holdbackField.click();
  }

  async clickLimitField() {
    await this.limitField.click();
  }

  async clickPaymentForField() {
    await this.paymentForField.click();
  }

  async clickDateFromField() {
    await this.dateFromField.click();
  }

  async clickDateToField() {
    await this.dateToField.click();
  }

  async clickMilestoneStatusField() {
    await this.milestoneStatusField.click();
  }

  async clickSelectAllField() {
    await this.selectAllField.click();
  }

  /* ── Visit Milestone Grid (VM) – Click Methods ── */

  async clickVM_SerialNumberField()   { await this.vm_recNum.click(); }
  async clickVM_MilestoneTypeField()  { await this.vm_mileType.click(); }
  async clickVM_CalendarField()       { await this.vm_calendar.click(); }
  async clickVM_VisitField()          { await this.vm_visit.click(); }
  async clickVM_MileRuleField()       { await this.vm_mileRule.click(); }
  async clickVM_EvtStatusField()      { await this.vm_evtStatus.click(); }
  async clickVM_PatientCountField()   { await this.vm_patCount.click(); }
  async clickVM_PatientStatusField()  { await this.vm_patStatus.click(); }
  async clickVM_PaymentTypeField()    { await this.vm_payType.click(); }
  async clickVM_AmountField()         { await this.vm_amount.click(); }
  async clickVM_HoldbackField()       { await this.vm_holdBack.click(); }
  async clickVM_LimitField()          { await this.vm_limit.click(); }
  async clickVM_PaymentForField()     { await this.vm_payFor.click(); }
  async clickVM_MilestoneStatusField(){ await this.vm_mileStatus.click(); }
  async clickVM_DateFromField()       { await this.vm_dateFrom.click(); }
  async clickVM_DateToField()         { await this.vm_dateTo.click(); }

  /* ── Event Milestone Grid (EM) – Click Methods ── */

  async clickEM_SerialNumberField()   { await this.em_recNum.click(); }
  async clickEM_MilestoneTypeField()  { await this.em_mileType.click(); }
  async clickEM_CalendarField()       { await this.em_calendar.click(); }
  async clickEM_VisitField()          { await this.em_visit.click(); }
  async clickEM_EventField()          { await this.em_event.click(); }
  async clickEM_MileRuleField()       { await this.em_mileRule.click(); }
  async clickEM_EvtStatusField()      { await this.em_evtStatus.click(); }
  async clickEM_PatientCountField()   { await this.em_patCount.click(); }
  async clickEM_PatientStatusField()  { await this.em_patStatus.click(); }
  async clickEM_PaymentTypeField()    { await this.em_payType.click(); }
  async clickEM_AmountField()         { await this.em_amount.click(); }
  async clickEM_HoldbackField()       { await this.em_holdBack.click(); }
  async clickEM_LimitField()          { await this.em_limit.click(); }
  async clickEM_PaymentForField()     { await this.em_payFor.click(); }
  async clickEM_MilestoneStatusField(){ await this.em_mileStatus.click(); }

  /* ── Study Status Milestone Grid (SM) – Click Methods ── */

  async clickSM_SerialNumberField()   { await this.sm_recNum.click(); }
  async clickSM_MilestoneTypeField()  { await this.sm_mileType.click(); }
  async clickSM_StdStatusField()      { await this.sm_stdStatus.click(); }
  async clickSM_PaymentTypeField()    { await this.sm_payType.click(); }
  async clickSM_AmountField()         { await this.sm_amount.click(); }
  async clickSM_HoldbackField()       { await this.sm_holdBack.click(); }
  async clickSM_LimitField()          { await this.sm_limit.click(); }
  async clickSM_PaymentForField()     { await this.sm_payFor.click(); }
  async clickSM_MilestoneStatusField(){ await this.sm_mileStatus.click(); }

  /* ── Additional Milestone Grid (AM) – Click Methods ── */

  async clickAM_SerialNumberField()   { await this.am_recNum.click(); }
  async clickAM_MilestoneTypeField()  { await this.am_mileType.click(); }
  async clickAM_MileDescField()       { await this.am_mileDesc.click(); }
  async clickAM_PaymentTypeField()    { await this.am_payType.click(); }
  async clickAM_AmountField()         { await this.am_amount.click(); }
  async clickAM_HoldbackField()       { await this.am_holdBack.click(); }
  async clickAM_PaymentForField()     { await this.am_payFor.click(); }
  async clickAM_MilestoneStatusField(){ await this.am_mileStatus.click(); }

  /**
   * Create a new payment on the Payments tab.
   * @param amount - Payment amount (e.g. '500')
   * @param description - Unique payment description
   * @param paymentType - Payment type label to select in dpayCode dropdown (defaults to first option)
   * @param paymentDate - Payment date in MM/DD/YYYY format (defaults to today)
   */
  async createPayment(amount: string, description: string, paymentType?: string, paymentDate?: string) {
    const today = paymentDate ?? new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

    // Navigate to Payments tab
    await this.page.getByRole('link', { name: 'Payments' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Click Add New
    await this.page.getByRole('link', { name: 'add_circle_outline Add New' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Fill payment form
    await this.page.getByRole('textbox', { name: 'Enter payment amount' }).fill(amount);
    if (paymentType) {
      const matchingOption = this.page.locator('#dpayCode option', { hasText: paymentType }).first();
      const value = await matchingOption.getAttribute('value');
      await this.page.locator('#dpayCode').selectOption(value!);
    } else {
      await this.page.locator('#dpayCode').selectOption({ index: 1 });
    }
    await this.page.getByRole('textbox', { name: 'Enter a description for this' }).fill(description);
    await this.page.locator('input[name="date"]').fill(today);

    // Submit payment
    await this.page.getByRole('link', { name: 'Add New Payment' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Reconcile an existing payment against a specific invoice.
   * @param description - Payment description to identify the row
   * @param invoiceNumber - Invoice number to reconcile against
   */
  async reconcilePaymentByInvoice(description: string, invoiceNumber?: string) {
    const resolvedInvoice = invoiceNumber ?? this.inv;
    if (!resolvedInvoice) throw new Error('No invoice number provided and none stored from createInvoiceFromInvoicing');

    // Click Reconcile for the payment matching the description
    const paymentRow = this.page.locator('tr').filter({ hasText: description }).last();
    await paymentRow.getByRole('link', { name: 'Reconcile', exact: true }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Select Invoices
    await this.page.getByRole('img', { name: 'Select Invoices' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Select the specific invoice by invoice number
    const invoiceCheckbox = this.page.locator(`//td[contains(text(),'${resolvedInvoice}')]/preceding-sibling::td//span`).first();
    await invoiceCheckbox.click();

    // Next: Apply Amounts
    await this.page.getByRole('link', { name: 'Next: Apply Amounts' }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Pay in full
    await this.page.getByRole('link', { name: 'check_circle Pay total in full' }).click();
// Fill Security PIN (eSign)
    const eSignValue = process.env.ESIGN ?? '1111';
    const pinField = this.page.locator('#eSign');
        await pinField.click();
    await pinField.fill(eSignValue);

    // Apply amounts from payment
    await this.page.getByRole('link', { name: 'Apply amounts from payment' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Reconcile an existing payment by milestone type.
   * @param description - Payment description to identify the row
   * @param milestoneType - Milestone type to reconcile against
   */
  async reconcilePaymentByMilestone(description: string, milestoneType: string) {
    // Click Reconcile for the payment matching the description
    const paymentRow = this.page.locator('tr').filter({ hasText: description }).last();
    await paymentRow.getByRole('link', { name: 'Reconcile', exact: true }).click();
    await this.page.waitForLoadState('domcontentloaded');

    // Select milestones
    if (milestoneType.toLowerCase() === 'all') {
      await this.reconcileAllMileCheckbox.click({ force: true });
    } else {
      await this.page.getByPlaceholder(' ', { exact: true }).nth(4).click();
      await this.page.getByRole('listbox').getByText(new RegExp(milestoneType, 'i')).first().click();
      await this.reconcileEMCheckbox(milestoneType).click();
    }

    // Next: Apply Amounts
    await this.page.getByRole('link', { name: 'Next: Apply Amounts' }).last().click();
    await this.page.waitForLoadState('domcontentloaded');

    // Pay in full – click all links when selecting all milestones
    const payInFullLinks = this.page.getByRole('link', { name: 'check_circle Pay total in full' });
    const count = await payInFullLinks.count();
    for (let i = 0; i < count; i++) {
      await payInFullLinks.nth(i).click();
    }

    // Fill Security PIN (eSign)
    const eSignValue = process.env.ESIGN ?? '1111';
    const pinField = this.page.locator('#eSign');
    await pinField.click();
    await pinField.fill(eSignValue);

    // Final apply
    await this.page.getByRole('link', { name: 'Apply amounts from payment' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }
}
