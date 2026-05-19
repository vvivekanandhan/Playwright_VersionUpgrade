import { type Page, type Locator, expect } from '@playwright/test';

/**
 * VelosPortalPage – login, logout, top-level navigation, portal management.
 * Converted from Velos_PortalPage.java + Steps_VelosPortal.java
 */
export class VelosPortalPage {
  page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  logoutLink: Locator;

  /* ── Static Locators from Velos_PortalPage.java ── */
  readonly DashboardMenu: Locator;
  readonly loginField: Locator;
  readonly saveAchievements: Locator;
  readonly saveMilestones: Locator;
  readonly savevisitsbutton: Locator;
  readonly getesignMessageMile: Locator;
  readonly CloseCApopup: Locator;
  readonly invokeAcceptCheckbox: Locator;
  readonly clickAcceptButton: Locator;
  readonly signOutButton: Locator;
  readonly SpecimenlinkA: Locator;
  readonly resetPasswordButton: Locator;
  readonly portalAccountSettings: Locator;
  readonly confirmPassword: Locator;
  readonly enterPassword: Locator;
  readonly emailFieldCheck: Locator;
  readonly clinsphereLogin: Locator;
  readonly checkbox: Locator;
  readonly Link: Locator;
  readonly tabname: Locator;
  readonly loginFieldCheck: Locator;
  readonly loginValue: Locator;
  readonly emailValue: Locator;
  readonly viewicon: Locator;
  readonly manageUserPaginationBar: Locator;
  readonly securityPINInput: Locator;
  readonly resetUserMessage: Locator;
  readonly acceptButton: Locator;
  readonly deletePortalAlert: Locator;
  readonly Preview: Locator;
  readonly getesignMessage: Locator;
  readonly portalLoginStatus: Locator;
  readonly loginEditClick: Locator;
  readonly sendNewEmail: Locator;
  readonly Gotbutton: Locator;
  readonly Datefrom: Locator;
  readonly Intervalfrom: Locator;
  readonly Dateto: Locator;
  readonly Intervalto: Locator;
  readonly userNameHomePage: Locator;
  readonly QuikClick: Locator;
  readonly portalDocClose: Locator;
  readonly seclectFormsTab: Locator;
  readonly EmailText: Locator;
  readonly Emailsubject: Locator;
  readonly SelectStudy: Locator;
  readonly SearchStudy: Locator;
  readonly UserPagination: Locator;
  readonly Tryagain: Locator;
  readonly logOut: Locator;
  readonly searchButtonClick: Locator;
  readonly pleaseWait: Locator;
  readonly eSignatureInput: Locator;
  readonly dataSavedMessage: Locator;
  readonly accountFormsLink: Locator;
  readonly itemDropBoxHomePage: Locator;
  readonly advanceSearch: Locator;
  readonly advanceSearchIconClick: Locator;
  readonly datePickerClearButton: Locator;
  readonly rightArrowIcon: Locator;
  readonly enterInFormatField: Locator;
  readonly studyTitleOnMilestone: Locator;
  readonly scanCodeSearchButton: Locator;
  readonly statusColumn: Locator;
  readonly histroyicon: Locator;
  readonly designicon: Locator;
  readonly previewicon: Locator;
  readonly createnewportal: Locator;
  readonly enterportalname: Locator;
  readonly clickonallpatient: Locator;
  readonly clickbackbutton: Locator;
  readonly selectportalstatus: Locator;
  readonly selectportalincorrectlogins: Locator;
  readonly createlogin: Locator;
  readonly patientloginemail: Locator;
  readonly patientloginname: Locator;
  readonly allradiobutton: Locator;
  readonly witoutradiobutton: Locator;
  readonly emailnotifycheckbox: Locator;
  readonly allPatientInOrganizationRadioButton: Locator;
  readonly specificPatientOnlyRadioButton: Locator;
  readonly deactivatedcheck: Locator;
  readonly editLoginInfo: Locator;
  readonly storageName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]').first();
    this.passwordInput = page.locator('input[name="password"]').first();
    this.loginButton = page.getByText('log in').first();
    this.logoutLink = page.locator('a[title="Logout"]').first();

    // Portal-specific locators
    this.DashboardMenu = page.locator("//select[@id='theme']//option[contains(text(),'Dashboard')]");
    this.loginField = page.locator("//td//input[@name='userLogin']");
    this.saveAchievements = page.locator("(//span[@class='ui-button-text' and contains(text(),'Save')])[7]");
    this.saveMilestones = page.locator("(//span[@class='ui-button-text' and contains(text(),'Save')])[8]");
    this.savevisitsbutton = page.locator("(//span[@class='ui-button-text' and contains(text(),'Save')])[2]");
    this.getesignMessageMile = page.locator("//td//span[@id='eSignMessageSave']|//p//span[@id='eSignMessageSave']");
    this.CloseCApopup = page.locator("//button[@class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-dialog-titlebar-close']");
    this.invokeAcceptCheckbox = page.locator("//input[@type='checkbox' and @name='checkBoxDefault']|//input[@id='mat-mdc-checkbox-0-input']");
    this.clickAcceptButton = page.locator("//span[contains(text(),'Accept')]");
    this.signOutButton = page.locator("//span[contains(text(),'Sign out')]");
    this.SpecimenlinkA = page.locator("//a[normalize-space()='Specimen']");
    this.resetPasswordButton = page.locator("//input[@class='button button-primary' and @type='submit' and @value='Reset Password']|//input[@class='button button-primary']");
    this.portalAccountSettings = page.locator("//input[@name='expire_days']|//input[@name='logout_time']|//select[@name='incorrect_logins']|//p[@class='sectionHeadings' and contains(text(),'Patient Account General Settings')]");
    this.confirmPassword = page.locator("//input[@name='confirmPassword']");
    this.enterPassword = page.locator("//input[@name='credentials.passcode']");
    this.emailFieldCheck = page.locator("//input[@id='userEmail' and @readonly]");
    this.clinsphereLogin = page.locator("//img[@aria-label='WCG ClinSphere logo logo']");
    this.checkbox = page.locator("//b[normalize-space()='Check if you want to change your password.']");
    this.Link = page.locator("//a[normalize-space()='Criteria for selecting a password']");
    this.tabname = page.locator('td.selectedTab');
    this.loginFieldCheck = page.locator("//input[@id='userLogin1' and @readonly]");
    this.loginValue = page.locator("//input[@id='userLogin1']");
    this.emailValue = page.locator("//input[@id='userEmail']");
    this.viewicon = page.locator("//img[@src='./images/View.gif']");
    this.manageUserPaginationBar = page.locator("//div[@id='rowsPerPage']");
    this.securityPINInput = page.locator("//table[contains(@id,'submit')]//td/following-sibling::td/input | //tr[td[contains(text(),'Security PIN')]]//*/input");
    this.resetUserMessage = page.locator("//p[contains(text(),'An email to generate a new password, Security PIN ')]");
    this.acceptButton = page.locator("//input[@type='image']");
    this.deletePortalAlert = page.locator("//tbody/tr/td[@align='center']/b[1]");
    this.Preview = page.locator("(//button[@id='save_changes'])[1]");
    this.getesignMessage = page.locator("//td//span[@id='eSignMessage']|//p//span[@id='eSignMessage']");
    this.portalLoginStatus = page.locator("//select[@id='patStat']");
    this.loginEditClick = page.locator("//img[@title='Edit']");
    this.sendNewEmail = page.locator("//div[@class='text-weight-medium login__btn__text']");
    this.Gotbutton = page.locator("//button/span[contains(text(),'Go')]");
    this.Datefrom = page.locator('#pmFromId');
    this.Intervalfrom = page.locator('#pmFromUnitId');
    this.Dateto = page.locator('#pmToId');
    this.Intervalto = page.locator('#pmToUnitId');
    this.userNameHomePage = page.locator("//li[@class='user-details']/i[@class='fa fa-user-circle']");
    this.QuikClick = page.locator("//span[@id='id_quick']/a");
    this.portalDocClose = page.locator("//h2[contains(text(),'Create New Share')]/following-sibling::button[1]");
    this.seclectFormsTab = page.locator("a:has-text('Forms')");
    this.EmailText = page.locator('#txtAreamessage');
    this.Emailsubject = page.locator('#subject');
    this.SelectStudy = page.locator("a:has-text('Select Study')");
    this.SearchStudy = page.locator("input[name='search_data']");
    this.UserPagination = page.locator('#totalItems');
    this.Tryagain = page.locator('.ui-button-text');
    this.logOut = page.locator("//a[@title='Logout']");
    this.searchButtonClick = page.locator("//span[normalize-space()='Search']");
    this.pleaseWait = page.locator("//div[contains(@style,'visibility: visible')]//div[contains(text(),'Please Wait')]");
    this.eSignatureInput = page.locator("//table[contains(@id,'submit')]//td/following-sibling::td/input | //tr[td[contains(text(),'e-Signature')]]//*/input");
    this.dataSavedMessage = page.locator("//p[contains(text(),'Data')]");
    this.accountFormsLink = page.locator("tr td a[class='account-from']");
    this.itemDropBoxHomePage = page.locator("//ul[contains(@id,'list1')]");
    this.advanceSearch = page.locator("//td/input[contains(@placeholder,'Title')]");
    this.advanceSearchIconClick = page.locator("//i[@class='fa fa-search']");
    this.datePickerClearButton = page.locator("//div[contains(@class,'datepicker')]//button[contains(text(),'Clear')]");
    this.rightArrowIcon = page.locator("//a[@name='thebutton']");
    this.enterInFormatField = page.locator("//input[contains(@name,'numformat')]");
    this.studyTitleOnMilestone = page.locator("//a[contains(@href,'studyId')]/img");
    this.scanCodeSearchButton = page.locator("//input[contains(@value,'Search')]");
    this.statusColumn = page.locator("a:has-text('Active')");
    this.histroyicon = page.locator("//img[@title='History']");
    this.designicon = page.locator("//img[@title='Design']");
    this.previewicon = page.locator("//img[@title='Preview']");
    this.createnewportal = page.locator("//a[contains(text(),'Create New Portal')]");
    this.enterportalname = page.locator("input[name='portalName']");
    this.clickonallpatient = page.locator("input[name='portalPatPop']");
    this.clickbackbutton = page.locator('.ui-button-text');
    this.selectportalstatus = page.locator("//select[@name='status']");
    this.selectportalincorrectlogins = page.locator("//select[@name='incorrect_logins']");
    this.createlogin = page.locator("//a[contains(text(),'Create Login')]");
    this.patientloginemail = page.locator("//input[@name='email' or @name='email1']");
    this.patientloginname = page.locator("input[name='patLogin']");
    this.allradiobutton = page.locator("//*[@id='div2']/table/tbody/tr[3]/td/input[3]");
    this.witoutradiobutton = page.locator("//td//input[@name='loginChk' and contains(@value,'N')]");
    this.emailnotifycheckbox = page.locator("input[name='emailNotify']");
    this.allPatientInOrganizationRadioButton = page.locator("//input[@value='O']");
    this.specificPatientOnlyRadioButton = page.locator("//input[@value='P']");
    this.deactivatedcheck = page.locator("//td[contains(text(),'Deactivated')]");
    this.editLoginInfo = page.locator("//a/img[contains(@title,'Edit')]");
    this.storageName = page.locator("input[name='storageName']");
  }

  /* ── Dynamic Locator Methods from Velos_PortalPage.java ── */

  tabLink(text: string) {
    return this.page.locator(`//ul[contains(@class,'dropmenu')]/li//*[contains(text(),'${text}')]`);
  }

  subLink(text: string) {
    return this.page.locator(`//div[contains(@class,'submenu')]//li//*[contains(text(),'${text}')]`);
  }

  subLinkBySection(link: string, section: string) {
    return this.page.locator(`//table[contains(@class,'topmenu')]//*[li[*[contains(text(), '${section}')]]]/li/a[contains(text(), '${link}')]`);
  }

  subLinkSelected(text: string) {
    return this.page.locator(`//td[@class='selectedTab']/a[contains(text(), '${text}')]|//td[contains(@class,'selectedTab')]/a[contains(text(), '${text}')]`);
  }

  validateMessage(text: string) {
    return this.page.locator(`//button[text()='${text}']|//button[contains(text(),'${text}')]|//span[contains(text(),'${text}')]| //input[contains(@value,'${text}')]`);
  }

  linksClickHomepage(text: string) {
    return this.page.locator(`//a[contains(text(),'${text}')] | //a/i[contains(text(),'${text}')] | //a[contains(@title,'${text}')] | //a[contains(.,'${text}')]`);
  }

  studySearch(text: string) {
    return this.page.locator(`//tr[@class='inputPanel']/td[contains(text(),'${text}')]/following-sibling::td/input`);
  }

  studyAdministerationByText(text: string) {
    return this.page.locator(`//div[contains(text(),'${text}')]/parent::td/preceding-sibling::td//img[@title='Study Administration']|//td//a//img[@title='Study Administration']|//td[contains(text(),'${text}')]/parent::tr/td/preceding-sibling::td//img[@title='Study Administration']|//td[*[contains(text(),'${text}')]]//img[contains(@alt,'Study Administration')]`);
  }

  eSignMsgByText(text: string) {
    return this.page.locator(`//span[contains(text(),'${text}')]`);
  }

  studyIconsClick(text: string) {
    return this.page.locator(`//img[contains(@title,'${text}')]`);
  }

  topNavigationIconClick(text: string) {
    return this.page.locator(`//a[contains(@title,'${text}')]|//a/i[contains(@title,'${text}')]|//img[contains(@title,'${text}')] | //*[@class='sectionHeadingsFrm']//a/img[@title='${text}'] | //img[contains(@id,'${text}')]|//img[contains(@alt,'${text}')]`);
  }

  verifyVisitsInManageVisits(text: string) {
    return this.page.locator(`//td[contains(@headers,'delete')]/following-sibling::td/div[contains(text(),'${text}')]`);
  }

  RowWithText1AndText2(text1: string, text2: string) {
    return this.page.locator(`//tr[*//*[contains(text(),'${text1}')]] [*//*[contains(text(),'${text2}') ] ] | //tr[td[contains(text(),'${text1}')]] [td[contains(text(),'${text2}') ] ] | //tr[td//*[contains(text(), '${text1}')]] [td[contains(text(),'${text2}')]]`);
  }

  columnNameByText(column: string) {
    return this.page.locator(`//*[contains(@class, 'yui-dt-sortable')][contains(text(), '${column}')]`);
  }

  descColumnByText(column: string) {
    return this.page.locator(`//th[contains(@class, 'yui-dt-desc')]//a[contains(text(), '${column}')]`);
  }

  ascColumnByText(column: string) {
    return this.page.locator(`//th[contains(@class, 'yui-dt-asc')]//a[contains(text(), '${column}')]`);
  }

  homepageTextClick(selectByText: string) {
    return this.page.locator(`//li[contains(text(),'${selectByText}')]`);
  }

  fontChangeLinks(selectByText: string) {
    return this.page.locator(`//a/font[contains(text(),'${selectByText}')]`);
  }

  iconClickAsPerGridOnAppendix(header: string, iconName: string) {
    return this.page.locator(`//th[contains(text(),'${header}')]/../following-sibling::tr//img[contains(@title,'${iconName}')]`);
  }

  portaliconClickByPortalName(iconName: string, portalName: string) {
    return this.page.locator(`//td[*[contains(text(),'${portalName}')]]/../following-sibling::tr//img[contains(@title,'${iconName}')]|//td[*[contains(text(),'${portalName}')]]/./following-sibling::td//img[contains(@title,'${iconName}')]`);
  }

  clickonPortalName(text: string) {
    return this.page.locator(`//td[a[contains(text(),'${text}')]]`);
  }

  linkWithText(text: string) {
    return this.page.locator(`//a[contains(text(),'${text}')]`);
  }

  PortalInfoIcon(text: string, icon: string) {
    return this.page.locator(`//td[*[contains(text(),'${text}')]]/following-sibling::td//img[contains(@src,'${icon}')]`);
  }

  UserRowsPerPage(value: string) {
    return this.page.locator(`//select[@id='rowSelector']/option[@value='${value}']`);
  }

  portalDocumentIcon(document: string, info: string) {
    return this.page.locator(`//td[*[contains(text(),'${document}')]]/following-sibling::td//img[@title='${info}']`);
  }

  portalDocumentIconClick(document: string) {
    return this.page.locator(`//td[*[contains(text(),'${document}')]]/following-sibling::td[5]/a[*]`);
  }

  portalStatus(portalname: string, status: string) {
    return this.page.locator(`//td[*[contains(text(),'${portalname}')]]/following-sibling::td[2]/a[contains(text(),'${status}')]`);
  }

  selectedSubLink(link: string) {
    return this.page.locator(`//td[@class='selectedTab custom']//a[contains(text(),'${link}')]`);
  }

  studyVerDocudelete(docName: string, iconName: string) {
    return this.page.locator(`//td[*[contains(text(),'${docName}')]]/following-sibling::td//img[contains(@title,'${iconName}')]`);
  }

  attachmentClick(categoryName: string, tdNumber: number) {
    return this.page.locator(`//td[contains(text(),'${categoryName}')]/following-sibling::td[${tdNumber}]/a[1]`);
  }

  appendixDocdelete(documentname: string) {
    return this.page.locator(`//td/span/a[contains(text(),'${documentname}')]/../../following-sibling::td[3]/a[1]`);
  }

  columnHeader(headername: string) {
    return this.page.locator(`//th[contains(text(),'${headername}')]`);
  }

  linkImgWithText(patient: string, title: string) {
    return this.page.locator(`//td/a[contains(text(),'${patient}')]/../following-sibling::td[5]//a/img[contains(@title,'${title}')]`);
  }

  statusByName(ddName: string) {
    return this.page.locator(`//select[@name='${ddName}']`);
  }

  docuShareSelectOption(ddName: string) {
    return this.page.locator(`//th[@class='${ddName}']//select|(//th[@class='${ddName}']//select)[2]`);
  }

  documentdateatbottom(documentname: string, curdate: string) {
    return this.page.locator(`//span[contains(text(),'${documentname}')]/../../following-sibling::li[contains(text(),'${curdate}')]`);
  }

  documentdeleteiconexistence(documentname: string) {
    return this.page.locator(`//span[contains(text(),'${documentname}')]/../../following-sibling::li[@class='submission-delete']`);
  }

  documentdownloadiconexistence(documentname: string) {
    return this.page.locator(`//span[contains(text(),'${documentname}')]/../../following-sibling::li[@class='submission-download']`);
  }

  dociconcheck(documentname: string, icon: string) {
    return this.page.locator(`//span[contains(text(),'${documentname}')]/../../img[@src='${icon}']`);
  }

  checkBoxStorageName(storagename: string) {
    return this.page.locator(`//tr/td[contains(text(),'${storagename}')]//..//*[@name='Del']`);
  }

  checkBoxSpecimenName(specimenname: string) {
    return this.page.locator(`//*/tr/td/a[contains(text(),'${specimenname}')]/../../td/*[@name='Del']`);
  }

  studycalendarStatus(calname: string) {
    return this.page.locator(`//td[*[contains(text(),'${calname}')]]/following-sibling::td[3]/a[1]`);
  }

  appendixDocedit(documentname: string) {
    return this.page.locator(`//td/span/a[contains(text(),'${documentname}')]/../../following-sibling::td[2]/a[1]`);
  }

  linkWithTextandfld(text: string, text2: string) {
    return this.page.locator(`//input[@name='${text2}']/following-sibling::a[contains(text(), '${text}')]`);
  }

  linkWithTextinPP(text: string) {
    return this.page.locator(`//span[contains(text(),'${text}')]`);
  }

  topNavigationIconClicknew(text: string) {
    return this.page.locator(`//a[contains(@title,'${text}')]|(//a[contains(text(),'${text}')])[3]|//input[contains(@title,'${text}')]|//a[contains(text(),'${text}')]|//img[contains(@title,'${text}')] | //*[@class='sectionHeadingsFrm']//a/img[@title='${text}'] | //img[contains(@id,'${text}')]|//img[contains(@alt,'${text}')]`);
  }

  VerifyField(text: string) {
    return this.page.locator(`//td[contains(text(),'${text}')]|//span[contains(text(),'${text}')]`);
  }

  verifyVisitsInManageVisitsYUI(text: string) {
    return this.page.locator(`//td[@class='  yui-dt-col-visitName']//div[@class='yui-dt-liner' and contains(text(),'${text}')]`);
  }

  portalDocDownloaandUnsharedclick(docName: string, iconNumber: number) {
    return this.page.locator(`//span[@title='${docName}']/../../following-sibling::li[${iconNumber}]/img[1]`);
  }

  /* ── helpers ────────────────────────────────────────── */

  /** Top menu tab (Manage, Reports, …) */
  private tab(name: string) {
    return this.page.locator('.dropmenu li').getByText(name, { exact: false }).first();
  }

  /** Sub-link scoped to a section inside the submenu */
  private sectionLink(link: string, section: string) {
    return this.page.locator(
      `//table[contains(@class,'topmenu')]//*[li[*[contains(text(),'${section}')]]]/li/a[contains(text(),'${link}')]`,
    ).first();
  }

  /** Generic button / span / input matching visible text */
  buttonByText(text: string) {
    return this.page.locator(
      `button:has-text("${text}"), span:has-text("${text}"), input[value="${text}"]`,
    ).first();
  }

  /* ── actions ────────────────────────────────────────── */

  async login(username: string, password: string, url: string) {
    await this.page.goto(url);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    if(await this.page.getByText('You are currently logged in').first().isVisible()){
      await this.page.getByRole('button', { name: 'Ok' }).first().click();
    }
  }

  async logout() {
    await this.logoutLink.scrollIntoViewIfNeeded();
    await this.logoutLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate via the top menu: tab → section → link.
   * Example: navigateTo('Users', 'Application', 'Manage')
   */
  async navigateTo(MenuSubMenu: string, section: string, pageName: string) {
    await this.page.getByRole('link', { name: MenuSubMenu, exact: true }).first().click();
    await this.page.locator('.submenu ul').filter({ hasText: section }).getByRole('link', { name: pageName }).first().click();
  }

  async clickHomepageLink(text: string) {
    await this.page.getByRole('link', { name: text }).first().click();
  }

  /** Alias used by VelosPersonalizePage */
  async clickLinkOnHomepage(text: string) {
    await this.clickHomepageLink(text);
  }

  async clickPortalButton(text: string) {
    await this.buttonByText(text).click();
  }

  async enterSecurityPin(pin: string) {
    await this.page.locator('#eSign').first().fill(pin);
  }

  /** Enter security PIN and verify the confirmation message */
  async enterSecurityPinAndVerify(pin: string, expectedMessage: string) {
    await this.page.locator('#eSign').first().fill(pin);
    await expect(this.page.getByText(expectedMessage, { exact: false }).first()).toBeVisible();
  }

  async submitForm() {
    await this.page.locator('#submit_btn').first().click();
  }

  /** Alias used by VelosStudyDetailsPage / VelosPersonalizePage */
  async submitDetails() {
    await this.submitForm();
  }

  async expectTextOnPage(text: string) {
    await expect(this.page.getByText(text, { exact: false }).first()).toBeVisible();
  }

  /* ── additional navigation helpers ──────────────────── */

  /**
   * Navigate via top menu tab → section sub-link.
   * Maps the Selenium step: "I navigate sublink X under section Y and tabName Z"
   */
  async navigateSublinkBySection(sublink: string, section: string, tabName: string) {
    await this.page.locator(
      `//div[contains(@class,'dropmenu')]//a[contains(text(),'${tabName}')]`,
    ).first().click();
    await this.sectionLink(sublink, section).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to a tab on a form / portal page.
   * Maps: "I navigate to tab X on form page" / "on Velos portal page"
   */
  async navigateToTab(tabName: string) {
    const tabLocator = this.page.locator(
      `//td[contains(@class,'Tab')]/a[contains(text(), '${tabName}')]` +
      `|//a//span[contains(text(),'${tabName}')]` +
      `|//a[contains(text(),'${tabName}')]`,
    ).first();
    await tabLocator.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Search study from the homepage search bar */
  async searchStudyInHomepage(studyNumber: string) {
    await this.clickHomepageLink('Home Page');
    const searchBox = this.page.locator('input[name="search"], input[name="search_data"]').first();
    await searchBox.fill(studyNumber);
    await this.page.locator('input[value="Search"]').first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Click the Study Administration icon for a study */
  async clickStudyAdminIcon(studyNumber: string) {
    await this.page.locator(
      `//div[contains(text(),'${studyNumber}')]/parent::td/preceding-sibling::td//img[@title='Study Administration']` +
      `|//td//a//img[@title='Study Administration']` +
      `|//td[contains(text(),'${studyNumber}')]/parent::tr/td/preceding-sibling::td//img[@title='Study Administration']` +
      `|//td[*[contains(text(),'${studyNumber}')]]//img[contains(@alt,'Study Administration')]`,
    ).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
