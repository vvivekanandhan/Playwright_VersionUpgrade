import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Velos_PatientPage – Combined POM from Velos_PatientPage.java + Step_VelosPatientPage.java.
 * Contains all static locators, dynamic locator methods, and step action methods.
 */
export class Velos_PatientPage {
  page: Page;

  /* ══════════════════════════════════════════════════════════
     Static Locators from Velos_PatientPage.java
     ══════════════════════════════════════════════════════════ */
  readonly Dropdown1: Locator;
  readonly Patcheckbox: Locator;
  readonly editImageEnrolledNew: Locator;
  readonly patientScheduleFilters: Locator;
  readonly selectFirstEventCheckbox: Locator;
  readonly orgDropdownStudyPatientSearch: Locator;
  readonly patScreenNo: Locator;
  readonly informedConsentVersionNo: Locator;
  readonly goButtonSpecimen: Locator;
  readonly selectCurrentDateRoster: Locator;
  readonly selectEventStatus: Locator;
  readonly checkStatusDate: Locator;
  readonly getStatusDate: Locator;
  readonly enterStatusNotes: Locator;
  readonly statusDateRosterPage: Locator;
  readonly selectFirstEvent: Locator;
  readonly firstVisitButton: Locator;
  readonly selectSecondPatient: Locator;
  readonly selectFirstPatient: Locator;
  readonly selectFirstUserprotocol: Locator;
  readonly SelectGrade2: Locator;
  readonly SelectGrade3: Locator;
  readonly SelectGrade4: Locator;
  readonly SelectGrade5: Locator;
  readonly patEnrolledStatusDate: Locator;
  readonly AENotes: Locator;
  readonly QuikNotes: Locator;
  readonly protocolTab: Locator;
  readonly statusDateingridEditVisitPage: Locator;
  readonly statusDropdowningridEditVisitPage: Locator;
  readonly eventOneCheckboxClick: Locator;
  readonly totalPageNo: Locator;
  readonly showingRecords: Locator;
  readonly PID: Locator;
  readonly fName: Locator;
  readonly lName: Locator;
  readonly DOB: Locator;
  readonly Organization: Locator;
  readonly survivalStatus: Locator;
  readonly sponserName: Locator;
  readonly patientfacilityID: Locator;
  readonly dataSavedMsg: Locator;
  readonly errorMessage: Locator;
  readonly closeButton: Locator;
  readonly firstPatient: Locator;
  readonly selectStudy: Locator;
  readonly studyStatus: Locator;
  readonly statusDate: Locator;
  readonly statusDateNew: Locator;
  readonly submitButton: Locator;
  readonly timezoneHidden: Locator;
  readonly registerNewOrg: Locator;
  readonly orgSelect: Locator;
  readonly patFacilityID: Locator;
  readonly addNewStatus: Locator;
  readonly DOD: Locator;
  readonly editImageEnrolled: Locator;
  readonly editImageProtocols: Locator;
  readonly surStatus: Locator;
  readonly statusNote: Locator;
  readonly backButton: Locator;
  readonly treatLoc: Locator;
  readonly firstStatus: Locator;
  readonly checkStatus: Locator;
  readonly addNewTreatArm: Locator;
  readonly treatment: Locator;
  readonly drugInfo: Locator;
  readonly endDate: Locator;
  readonly startDate: Locator;
  readonly notes: Locator;
  readonly reasonDel: Locator;
  readonly dateFrom: Locator;
  readonly dateTo: Locator;
  readonly searchReport: Locator;
  readonly addNewAE: Locator;
  readonly addMultipleAE: Locator;
  readonly adverseEventType: Locator;
  readonly adverseEventName: Locator;
  readonly advStartDate: Locator;
  readonly statusAE: Locator;
  readonly advEventID: Locator;
  readonly adverseEventsLink: Locator;
  readonly selectDictionaryLink: Locator;
  readonly removeSelectedEGradeLink: Locator;
  readonly dateInput: Locator;
  readonly fileInput: Locator;
  readonly fileDescription: Locator;
  readonly linkDescription: Locator;
  readonly linkUrl: Locator;
  readonly formNameSelect: Locator;
  readonly addNew: Locator;
  readonly rightArrow: Locator;
  readonly labDate: Locator;
  readonly testResult: Locator;
  readonly longResult: Locator;
  readonly labNameFieldLabPage: Locator;
  readonly abnormalResult: Locator;
  readonly studyPhase: Locator;
  readonly deleteImg: Locator;
  readonly labNameInput: Locator;
  readonly searchButton: Locator;
  readonly survivalStatusSearchPage: Locator;
  readonly goButton: Locator;
  readonly dataEntryDate: Locator;
  readonly dateTextClick: Locator;
  readonly formStatusDropdown: Locator;
  readonly dataEntryDateValueOnPrintFormData: Locator;
  readonly fieldNameDropdown: Locator;
  readonly queryTypeDropdown: Locator;
  readonly queryStatusDropdown: Locator;
  readonly reasonForChangeInputField: Locator;
  readonly studyCalender: Locator;
  readonly patientStartDate: Locator;
  readonly discontinuationDate: Locator;
  readonly discontinuationReason: Locator;
  readonly reasonForChange: Locator;
  readonly scheduleCount: Locator;
  readonly align: Locator;
  readonly warning: Locator;
  readonly selectSchedule: Locator;
  readonly visit: Locator;
  readonly eventStatusHistory: Locator;
  readonly studyLink: Locator;
  readonly viewPrevious: Locator;
  readonly editVisits: Locator;
  readonly addUnscheduledEvent: Locator;
  readonly deleteSchedule: Locator;
  readonly responseDropdown: Locator;
  readonly editMultipleEvents: Locator;
  readonly selectAllCheck: Locator;
  readonly statusDropdown: Locator;
  readonly statusValidFrom: Locator;
  readonly updateAllSelectedRows: Locator;
  readonly studySetupTab: Locator;
  readonly updateMultipleScheduleLink: Locator;
  readonly actionToBePerformed: Locator;
  readonly saveButton: Locator;
  readonly eventsLinkTextOnSchedulePage: Locator;
  readonly patientOtherIdIconClick: Locator;
  readonly studyIconWithoutStudy: Locator;
  readonly txCourseInputAdverseEvent: Locator;
  readonly genderDropclick: Locator;
  readonly primaryEthnicity: Locator;
  readonly patientStudtIDField: Locator;
  readonly primaryRace: Locator;
  readonly selectEthnicity: Locator;
  readonly selectRace: Locator;
  readonly deathDate: Locator;
  readonly deathCauseDDown: Locator;
  readonly selectSpeciality: Locator;
  readonly screeningDetails: Locator;
  readonly orgDropdown: Locator;
  readonly orgDropdownNew: Locator;
  readonly lastVisitDropdown: Locator;
  readonly nextVisitDropdown: Locator;
  readonly enrolledOnDropdown: Locator;
  readonly patientStatusDropdown: Locator;
  readonly ExcludePatientsNotCurrentlyEnrolledCheckbox: Locator;
  readonly survivalStatusDDown: Locator;
  readonly backBtn: Locator;
  readonly backLink: Locator;
  readonly submitBtn: Locator;
  readonly adverseEventClickLink: Locator;
  readonly selectButton: Locator;
  readonly PIDenrolled: Locator;
  readonly grid: Locator;
  readonly gridrowsclick: Locator;
  readonly pageTwo: Locator;
  readonly selectUserOne: Locator;
  readonly selectfirstGradeLink: Locator;
  readonly statusDropdownByIndex: Locator;
  readonly currentStudyCheckbox: Locator;
  readonly selectFirstLink: Locator;
  readonly selectFirstLinkInColumn: Locator;
  readonly selectfieldLinkByColumn: Locator;
  readonly selectFirstUser: Locator;
  readonly selectFirstStudyNumber: Locator;
  readonly selectFirstSelectinList: Locator;
  readonly selectPatientLinkOnReportPage: Locator;
  readonly selectStudyLinkOnReportPage: Locator;
  readonly selectSecondSelectList: Locator;
  readonly selectUserFirstLink: Locator;
  readonly selectUserSecondLink: Locator;
  readonly selectGradeInAdverseEvent: Locator;
  readonly verifytextseverity: Locator;
  readonly DOBStudyCentricPage: Locator;
  readonly verifyText: Locator;
  readonly selectAdverseEventsLink: Locator;
  readonly Notes: Locator;
  readonly eventNotes: Locator;
  readonly selectDiseaseCode: Locator;
  readonly dateOfDeath: Locator;
  readonly dateAppendix: Locator;
  readonly startDateClick: Locator;
  readonly startDateFirstRow: Locator;
  readonly stopDateFirstRow: Locator;
  readonly attributionColFirstRowDropdown: Locator;
  readonly actionColFirstRowDropdown: Locator;
  readonly recoveryColFirstDropdown: Locator;
  readonly adverseEventTypeColFirstDropdown: Locator;
  readonly stopDateClick: Locator;
  readonly firstDropdown: Locator;
  readonly secondDropdown: Locator;
  readonly thirdDropdown: Locator;
  readonly sortAscendingClick: Locator;
  readonly sortAscendingDescending: Locator;
  readonly selectDiseaseOneLink: Locator;
  readonly selectDiseaseTwoLink: Locator;
  readonly studyIcon: Locator;
  readonly yearRadioButton: Locator;
  readonly monthRadioButton: Locator;
  readonly dateRangeRadioButton: Locator;
  readonly allRadioButton: Locator;
  readonly selectYear: Locator;
  readonly selectMonth: Locator;
  readonly selectYear1: Locator;
  readonly eventStatusEditIconFirstLinkNonFDA: Locator;
  readonly visitListFirst: Locator;
  readonly eventStatusColumnFirstLink: Locator;
  readonly eventStatusEditIconFirstLink: Locator;
  readonly eventStatusEditIconSecondLink: Locator;
  readonly statusHistoryIconFirstLink: Locator;
  readonly statusHistoryIconLast: Locator;
  readonly statusHistoryDeleteIcon: Locator;
  readonly eventLinkclickInColumn: Locator;
  readonly firstCloseButton: Locator;
  readonly SecondCloseButton: Locator;
  readonly AddUnscheduledEventFirst: Locator;
  readonly eventWindowBefore: Locator;
  readonly eventWindowAfter: Locator;
  readonly eventWindowBeforeDropdown: Locator;
  readonly eventWindowAfterDropdown: Locator;
  readonly selectEventCatDropdown: Locator;
  readonly jumpToFormDropdown: Locator;
  readonly submitAndAddAnother: Locator;
  readonly submitAndAddAnotherBtn: Locator;
  readonly submitBtnPatientStatusPage: Locator;
  readonly timeZoneDropdown: Locator;
  readonly email: Locator;
  readonly dataEntryDatefield: Locator;
  readonly labsPerformed: Locator;
  readonly category: Locator;
  readonly labname: Locator;
  readonly studyDropdown: Locator;
  readonly studyDropdownProtocolPage: Locator;
  readonly orgDropdownSecond: Locator;
  readonly abnormalResultsDropdown: Locator;
  readonly labCheckBox: Locator;
  readonly formStatus: Locator;
  readonly addEditQueriesLink: Locator;
  readonly addNewLink: Locator;
  readonly studyNumberIcon: Locator;
  readonly ScheduleDropdown: Locator;
  readonly VisitDropdown: Locator;
  readonly selectDropdown: Locator;
  readonly filterVisitsEventsDropdown: Locator;
  readonly statusDropdownInGrid: Locator;
  readonly statusValidFromDropdownInGrid: Locator;
  readonly performedByDropdownGrid: Locator;
  readonly firstVisitStatusDropdown: Locator;
  readonly secondVisitStatusDropdown: Locator;
  readonly thirdVisitStatusDropdown: Locator;
  readonly fourthVisitStatusDropdown: Locator;
  readonly firstVisitStatusValidFromDropdown: Locator;
  readonly secondVisitStatusValidFromDropdown: Locator;
  readonly statusValidFromFirstVisit: Locator;
  readonly firstvisitPerformedByDropdown: Locator;
  readonly selectAllcheckbox: Locator;
  readonly firstVisitCheckbox: Locator;
  readonly clickFirstCheckbox: Locator;
  readonly clickSecondCheckbox: Locator;
  readonly followUpCheckbox: Locator;
  readonly patientIDTooltip: Locator;
  readonly providerField: Locator;
  readonly studyDropdownNew: Locator;
  readonly studyDropdownPatientSearch: Locator;
  readonly orgDropdownPatientSearch: Locator;
  readonly specialtydropdownPatientSearch: Locator;
  readonly currentPageField: Locator;
  readonly patientStudyIDField: Locator;
  readonly evaluableFlagDropdown: Locator;
  readonly evaluableStatusDropdown: Locator;
  readonly unevaluableStatusDropdown: Locator;
  readonly shortDescriptionAppendix: Locator;
  readonly codeSelectLink: Locator;
  readonly codeSelectLinkFour: Locator;
  readonly codeSelectLinkOne: Locator;
  readonly calendarStartDate: Locator;
  readonly categoryDropdown: Locator;
  readonly labNameAddNewpage: Locator;
  readonly addIconAddNewLabs: Locator;
  readonly removeIconAddNewLabs: Locator;
  readonly deselectCheckbox: Locator;
  readonly selectAllcheckboxAddNewLabs: Locator;
  readonly longResultUpperGrid: Locator;
  readonly longResultLowerGrid: Locator;
  readonly testResultLowerGrid: Locator;
  readonly labDateLowerGrid: Locator;
  readonly editiconFirstLink: Locator;
  readonly labdateForToxicity: Locator;
  readonly ifOtherEnterLLN: Locator;
  readonly andOrUln: Locator;
  readonly filterByDateDropdown: Locator;
  readonly reasonForChangeField: Locator;
  readonly dateOutcomeType: Locator;
  readonly IRBdatepicker: Locator;
  readonly FDAdatepicker: Locator;
  readonly Sponsardatepicker: Locator;
  readonly Othersdatepicker: Locator;
  readonly studyNumbertooltipSchedulePage: Locator;
  readonly studyTitletooltipSchedulePage: Locator;
  readonly studyTitleTooltipSchedulePageText: Locator;
  readonly unitDropdown: Locator;
  readonly patientScheduleCheckboxTwo: Locator;
  readonly ulnField: Locator;
  readonly llnField: Locator;
  readonly accessionNumber: Locator;
  readonly studyPhaseLbapage: Locator;
  readonly longTestResult: Locator;
  readonly reasonForChangeFDAaudit: Locator;
  readonly adverseEventTypeDropdown: Locator;
  readonly selectTextFristLink: Locator;
  readonly calcFirstLink: Locator;
  readonly txCourseFirstColumn: Locator;
  readonly statusValidFromdate: Locator;
  readonly AEdiscoveryDate: Locator;
  readonly AEloggedDate: Locator;
  readonly editVisitClickLink: Locator;
  readonly eventOneDropdownStatusColEditVisit: Locator;
  readonly statusDropdownEditVisitPage: Locator;
  readonly reasonForChangeInCoveragetypeEventStatusPage: Locator;
  readonly statusDateEditVisitPage: Locator;
  readonly performedByEditVisitPage: Locator;
  readonly editvisitSecondCheckbox: Locator;
  readonly editvisitThirdCheckbox: Locator;
  readonly editvisitFirstCheckbox: Locator;
  readonly editVisitFirstOneCheckbox: Locator;
  readonly statusDateEventTwoEditVisitPage: Locator;
  readonly statusDropdownColEditVisitpage: Locator;
  readonly statusDropdownEventTwoEditVisitpage: Locator;
  readonly statusDateColEditVisitPage: Locator;
  readonly performedByColEditVisitPage: Locator;
  readonly performedByColEditVisitPageEventOne: Locator;
  readonly RFCinCoverageTypeEditVisitpage: Locator;
  readonly coverageTypeDropdownEditVisitpage: Locator;
  readonly gridCheckbox: Locator;
  readonly firstarrowButtonEventPage: Locator;
  readonly eventCheckboxThird: Locator;
  readonly selectFirstCheckboxEventpage: Locator;
  readonly editiconClick: Locator;
  readonly selectCheckboxOneDeleteSchedulepage: Locator;
  readonly selectCheckboxTwoDeleteSchedulepage: Locator;
  readonly treatmentArmTwoDelete: Locator;
  readonly radiobuttonCalendarTemplateone: Locator;
  readonly radiobuttonCalendarTemplate: Locator;
  readonly selectedvisitField: Locator;
  readonly siteOfServicesUpperGrid: Locator;
  readonly siteOfServicesFirstEvent: Locator;
  readonly coverageTypeUpperGrid: Locator;
  readonly coverageTypeFirstEvent: Locator;
  readonly ReasonforChangeinCoverageTypeFirsEvent: Locator;
  readonly notesFieldOne: Locator;
  readonly eventOneCheckbox: Locator;
  readonly eventTwoCheckbox: Locator;
  readonly eventStatusOne: Locator;
  readonly eventStatusTwo: Locator;
  readonly selectActualDate: Locator;
  readonly MovealleventsofthisvisitRadioButton: Locator;
  readonly ReasonforChangeinCoverageType: Locator;
  readonly reasonForChangeInCoverageTypeTwo: Locator;
  readonly moveAllEventsOfThisVisit: Locator;
  readonly moveSuggestedDatetobeinsyncwithActualDate: Locator;
  readonly coverageTypeTooltip: Locator;
  readonly datePickerTodayButton: Locator;
  readonly datePickerClearButton: Locator;
  readonly selectdateLesserThanCurrentDate: Locator;
  readonly selectDateGreaterThanCurrentDate: Locator;
  readonly selectCurrentDate: Locator;
  readonly selectCurrentDateNew: Locator;
  readonly datepickerselectPreviousMonthIconClick: Locator;
  readonly datepickerselectNextMonthIconClick: Locator;
  readonly datePickerSelectDateOne: Locator;
  readonly datePickerSelectDateFifteen: Locator;
  readonly datePickerSelectDateSixteen: Locator;
  readonly datePickerSelectDateSeventeen: Locator;
  readonly datePickerSelectDateEighteen: Locator;
  readonly datePickerSelectDateNineteen: Locator;
  readonly datePickerSelectDateTwenty: Locator;
  readonly firstNameColumn: Locator;
  readonly reasonForChangeFDAauditTreatmentArmPage: Locator;
  readonly discontinuationReasonTextarea: Locator;
  readonly descriptionEventdetailsPage: Locator;
  readonly cptcodeEventdetailsPage: Locator;
  readonly notesEventDetailsPage: Locator;
  readonly specimanIDField: Locator;
  readonly longTestResultLabsPage: Locator;
  readonly notesTestResultLabPage: Locator;
  readonly actionDropdown: Locator;
  readonly recoveryDropdown: Locator;
  readonly abnormalResultDropdownAddNewPage: Locator;
  readonly userFirstName: Locator;
  readonly allButtonClick: Locator;
  readonly patientScheduleCheckboxOne: Locator;
  readonly studyStatusDate: Locator;
  readonly eventTwoCheckboxClick: Locator;
  readonly eventThreeCheckboxClick: Locator;
  readonly visitsDropdownSchedulePage: Locator;
  readonly moveAllEventsOfThisVisitCheckbox: Locator;
  readonly coverageTypeTooltipImg: Locator;
  readonly coverageTypeDropDown: Locator;
  readonly getAECodeFromLookup: Locator;
  readonly verifyMultipleAEGradeIsNotNull: Locator;
  readonly totalPages: Locator;
  readonly thirdVisitStatusValidFromDropdown: Locator;
  readonly fourthVisitStatusValidFromDropdown: Locator;
  readonly patientID: Locator;
  readonly getDeleteIcon: Locator;
  readonly dateTodayButton: Locator;
  readonly patientIcon: Locator;
  readonly printIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    this.Dropdown1 = page.locator("//select[@name='fldName']|//select[@name='fldNameOrder']");
    this.Patcheckbox = page.locator("(//input[@name='fldSelect'])[3]");
    this.editImageEnrolledNew = page.locator("(//a/img[@title='Edit'])[3]");
    this.patientScheduleFilters = page.locator("//div[@class='tabFormTopN tabFormTopN_PS']");
    this.selectFirstEventCheckbox = page.locator("(//tr//td//input[@type='checkBox' and @name='chkEvent'])[1]");
    this.orgDropdownStudyPatientSearch = page.locator("//select[@name='dPatSite']");
    this.patScreenNo = page.locator("//input[@name='patScreenNumber']");
    this.informedConsentVersionNo = page.locator("//input[@name='infConsentVerNumber']");
    this.goButtonSpecimen = page.locator("//span[contains(text(), 'GO')]|//span[@class='ui-button-text']");
    this.selectCurrentDateRoster = page.locator("//button[contains(text(),'Today')]");
    this.selectEventStatus = page.locator("//select[@ng-model='selectedEventStatus']");
    this.checkStatusDate = page.locator("//div[@id='div1']");
    this.getStatusDate = page.locator("(//div[@class='ui-grid-cell-contents ng-binding ng-scope'])[9]");
    this.enterStatusNotes = page.locator("//textarea[@ng-model='eventNotes']");
    this.statusDateRosterPage = page.locator("//input[@ng-model='statusDate']");
    this.selectFirstEvent = page.locator("(//div[@role='rowheader']//div[@class='ui-grid-selection-row-header-buttons ui-grid-icon-ok ng-scope'])[3]");
    this.firstVisitButton = page.locator("(//i[@class='ng-scope ui-grid-icon-plus-squared'])[1]");
    this.selectSecondPatient = page.locator("(//div[contains(@class,'ui-grid-selection-row-header-buttons ui-grid-icon-ok ng-scope')])[2]");
    this.selectFirstPatient = page.locator("(//div[contains(@class,'ui-grid-selection-row-header-buttons ui-grid-icon-ok ng-scope')])[1]");
    this.selectFirstUserprotocol = page.locator("body > div.popDefault > form:nth-child(4) > table.basetbl.midAlign.custom-table-center > tbody > tr.browserOddRow > td:nth-child(1) > a");
    this.SelectGrade2 = page.locator("/html/body/form/table[2]/tbody/tr[2]/td[3]/a");
    this.SelectGrade3 = page.locator("/html/body/form/table[2]/tbody/tr[3]/td[3]/a");
    this.SelectGrade4 = page.locator("/html/body/form/table[2]/tbody/tr[4]/td[3]/a");
    this.SelectGrade5 = page.locator("/html/body/form/table[2]/tbody/tr[5]/td[3]/a");
    this.patEnrolledStatusDate = page.locator("//input[@name='statusDate']");
    this.AENotes = page.locator("//textarea[@id='notes']");
    this.QuikNotes = page.locator("//textarea[@name='quicknote']");
    this.protocolTab = page.locator("//a[normalize-space()='Protocols']");
    this.statusDateingridEditVisitPage = page.locator("(//input[@type='text' and @name='statusValid0'])[2]");
    this.statusDropdowningridEditVisitPage = page.locator("//*[@name='eventStatus0']");
    this.eventOneCheckboxClick = page.locator("(//input[@type='checkbox' and @name='selEvent0'])[2]");
    this.totalPageNo = page.locator("//span[@id='1_totalPages']");
    this.showingRecords = page.locator("//td[contains(text(),'Showing')]");
    this.PID = page.locator("//input[@id='patid']");
    this.fName = page.locator("//input[@id='patfname']");
    this.lName = page.locator("//input[@id='patlname']");
    this.DOB = page.locator("//input[@id='patdob']");
    this.Organization = page.locator("//select[@id='siteId']");
    this.survivalStatus = page.locator("//select[@id='patstatus']");
    this.sponserName = page.locator("//input[@name='phyOther']");
    this.patientfacilityID = page.locator("//input[@name='patFacilityID']");
    this.dataSavedMsg = page.locator("//*[text()= 'Data Saved Successfully.']");
    this.errorMessage = page.locator("//td[@id='errorMessageTD'][text()='The Patient ID you have entered already exists for the selected organization. Please click on back and enter a new ID.']");
    this.closeButton = page.locator("//span[text()='Close']");
    this.firstPatient = page.locator("(//*[contains(@class, 'yui-dt-first')]//a[2])[1]|(//*[contains(@class, 'display nowrap paginatorTable dataTable no-footer')]//a[2])[1]");
    this.selectStudy = page.locator("//select[@id='selstudyId']");
    this.studyStatus = page.locator("//select[@name='patstatus']");
    this.statusDate = page.locator("//input[@name='StatusDate']");
    this.statusDateNew = page.locator("//input[@name='statusDate']");
    this.submitButton = page.locator("//span[contains(text(),'Submit')]");
    this.timezoneHidden = page.locator("//div[contains(@style, 'visibility:hidden')]/select[@id='timeZone']");
    this.registerNewOrg = page.locator("//a[contains(text(), 'Register to a New Organization')]");
    this.orgSelect = page.locator("//select[@name='patorganization']");
    this.patFacilityID = page.locator("//input[@name='patFacilityID']");
    this.addNewStatus = page.locator("//a[@id='addnewlink']");
    this.DOD = page.locator("//input[@name='deathDate']");
    this.editImageEnrolled = page.locator(".odd > td:nth-child(13) img");
    this.editImageProtocols = page.locator("(//img[@title='Edit'])[1]");
    this.surStatus = page.locator("//select[@id='survival']");
    this.statusNote = page.locator("//textarea[@name='Notes']");
    this.backButton = page.locator("//span[contains(text(), 'Back')]");
    this.treatLoc = page.locator("//select[@id= 'patTreatLoc']");
    this.firstStatus = page.locator("//tr[contains(@class, 'browser')][1]/td[1]/a");
    this.checkStatus = page.locator("//input[@name='currentStat']");
    this.addNewTreatArm = page.locator("//a[contains(text(), 'Add New Treatment Arm')]");
    this.treatment = page.locator("//select[@name='stdtxtarm']");
    this.drugInfo = page.locator("//input[@name='drugInfo']");
    this.endDate = page.locator("//input[@name='endDate']");
    this.startDate = page.locator("//input[@name='startDate']");
    this.notes = page.locator("//textarea[@name='notes']");
    this.reasonDel = page.locator("//textarea[@name='reason_del']");
    this.dateFrom = page.locator("//input[@name='dateFrom']");
    this.dateTo = page.locator("//input[@name='dateTo']");
    this.searchReport = page.locator("//div[@id='reportDataTable_filter']//input");
    this.addNewAE = page.locator("//a[contains(text(), 'Add New AE')]");
    this.addMultipleAE = page.locator("//a[contains(text(), 'Add Multiple AE')]");
    this.adverseEventType = page.locator("//select[@name='adve_type']");
    this.adverseEventName = page.locator("//input[@name='advName']");
    this.advStartDate = page.locator("//input[@name='startDt']");
    this.statusAE = page.locator("//select[@name='formStatus']");
    this.advEventID = page.locator("//input[@name='Response ID']");
    this.adverseEventsLink = page.locator("//a/*[contains(text(), 'Adverse Events')]");
    this.selectDictionaryLink = page.locator("//a[@id='dictionaryLink']");
    this.removeSelectedEGradeLink = page.locator("//a[contains(text(), 'Remove Already Selected Adverse Event Grade')]");
    this.dateInput = page.locator("//input[@name='perApndxDate']");
    this.fileInput = page.locator("//input[@name='name']");
    this.fileDescription = page.locator("//textarea[@name='desc']");
    this.linkDescription = page.locator("//textarea[@name='perApndxDesc']");
    this.linkUrl = page.locator("//input[@name='perApndxUri']");
    this.formNameSelect = page.locator("//select[@name='formPullDown']");
    this.addNew = page.locator("//img[@title='Add New']");
    this.rightArrow = page.locator("//img[contains(@src, 'formright')]");
    this.labDate = page.locator("//input[@name='labdate']");
    this.testResult = page.locator("//input[@name='tresult']");
    this.longResult = page.locator("//textarea[@name='longresult']");
    this.labNameFieldLabPage = page.locator("//input[@name='labname' and @type='text']");
    this.abnormalResult = page.locator("//select[@name='abnresult']");
    this.studyPhase = page.locator("//select[@name='stdPhase']");
    this.deleteImg = page.locator("//img[contains(@src, 'DeleteSelected')]");
    this.labNameInput = page.locator("//input[@name='labname'][@type='text']");
    this.searchButton = page.locator("//span[text()='Search']");
    this.survivalStatusSearchPage = page.locator("//select[@name='pstat']");
    this.goButton = page.locator("//span[contains(text(), 'Go')]");
    this.dataEntryDate = page.locator("input[id*='date']");
    this.dateTextClick = page.locator("//label[contains(text(),'Date')]");
    this.formStatusDropdown = page.locator("select[id*='formstat']");
    this.dataEntryDateValueOnPrintFormData = page.locator("span[id*='date'] u");
    this.fieldNameDropdown = page.locator('#field');
    this.queryTypeDropdown = page.locator("select[id*='Query']");
    this.queryStatusDropdown = page.locator("select[id*='Status']");
    this.reasonForChangeInputField = page.locator("textarea[name*='REASON']");
    this.studyCalender = page.locator("//select[@name='protocolId']");
    this.patientStartDate = page.locator("//input[@name='protStDate']");
    this.discontinuationDate = page.locator("//input[@name='discDate']");
    this.discontinuationReason = page.locator("//textarea[@name='discReason']");
    this.reasonForChange = page.locator("//textarea[@name='remarks']");
    this.scheduleCount = page.locator('.ui-accordion>h3');
    this.align = page.locator("//div[contains(@class,'ui-accordion')]/h3/a/span[2]");
    this.warning = page.locator("//img[contains(@src, 'exclamation')]");
    this.selectSchedule = page.locator("//select[@id='availableSch']");
    this.visit = page.locator("//select[@name='visit']");
    this.eventStatusHistory = page.locator("//a[@title='Event Status History']");
    this.studyLink = page.locator("//a/img[@id='activeImage']");
    this.viewPrevious = page.locator("//a[text()='View Previous']");
    this.editVisits = page.locator("//div[@id='month0visit0']//a[text()='Edit Visit']");
    this.addUnscheduledEvent = page.locator("//div[@id='month0visit0']//a[text()='Add Unscheduled Event']");
    this.deleteSchedule = page.locator("//a[contains(text(), 'Delete Schedule')]");
    this.responseDropdown = page.locator("select[name='reasons']");
    this.editMultipleEvents = page.locator("//a[text()='Edit Multiple Events']");
    this.selectAllCheck = page.locator("//input[@name='selDeSelAll']");
    this.statusDropdown = page.locator("//select[@name='status']");
    this.statusValidFrom = page.locator("//input[@name='caldate']");
    this.updateAllSelectedRows = page.locator("//a[text()='Update All Selected Rows']");
    this.studySetupTab = page.locator("//a[text()='Study Setup']");
    this.updateMultipleScheduleLink = page.locator("//a[text()=' UPDATE MULTIPLE SCHEDULES ']");
    this.actionToBePerformed = page.locator("//select[@name='multsch']");
    this.saveButton = page.locator('#saveEventData');
    this.eventsLinkTextOnSchedulePage = page.locator("//tbody//tr[contains(@class,'Row') and @style]//td//a[contains(@onclick,'viewevent')][1]");
    this.patientOtherIdIconClick = page.locator("//img[contains(@title,'View')]");
    this.studyIconWithoutStudy = page.locator("//p[contains(text(),'Study')]//a[contains(@href,'study')]/img|//td[contains(text(),'Study')]//a[contains(@href,'study')]/img");
    this.txCourseInputAdverseEvent = page.locator("//input[contains(@name,'treatment0')]");
    this.genderDropclick = page.locator("//select[@name='patgender']");
    this.primaryEthnicity = page.locator("//select[@name='patethnicity']");
    this.patientStudtIDField = page.locator("//input[@name='pstudyid']");
    this.primaryRace = page.locator("//select[@name='patrace']");
    this.selectEthnicity = page.locator("//*[@id='patientTab1']/table[1]/tbody/tr[7]/td[4]/a");
    this.selectRace = page.locator("//*[@id='patientTab1']/table[1]/tbody/tr[8]/td[4]/a");
    this.deathDate = page.locator("//input[@name='patdeathdate']");
    this.deathCauseDDown = page.locator("//select[@name='dthCause']");
    this.selectSpeciality = page.locator("//*[@id='patientTab1']/table[2]/tbody/tr[2]/td/a");
    this.screeningDetails = page.locator("//select[@name='selstudyId']");
    this.orgDropdown = page.locator("//select[@name='patorganization']");
    this.orgDropdownNew = page.locator("//select[@name='dPatSite']");
    this.lastVisitDropdown = page.locator("//input[@name='filterLastVisit']");
    this.nextVisitDropdown = page.locator("//select[@name='filterNextVisit']");
    this.enrolledOnDropdown = page.locator("//select[@name='filterEnrDate']");
    this.patientStatusDropdown = page.locator("//select[@name='patientstatus']");
    this.ExcludePatientsNotCurrentlyEnrolledCheckbox = page.locator("//input[@name='cbxExcludeNotEnrolled']");
    this.survivalStatusDDown = page.locator("//select[@name='patstatus' and @id='patstatus']");
    this.backBtn = page.locator("//input[contains(@value,'Back')]|//span[contains(text(),'Back')]");
    this.backLink = page.locator("//a[@id='backButton']//i[contains(text(),'arrow_back')]");
    this.submitBtn = page.locator("(//button[contains(text(),'Submit')])[1]");
    this.adverseEventClickLink = page.locator("(//td//a[contains(text(),'Adverse Event')])[1]");
    this.selectButton = page.locator("//span[text()='Select']");
    this.PIDenrolled = page.locator('#patientid');
    this.grid = page.locator("(//*[@class='yui-dt-first yui-dt-last'])[1]");
    this.gridrowsclick = page.locator("//*[@id='1_rowsPerPage']");
    this.pageTwo = page.locator("//*[@id='div2']/form/div[2]/div[3]/a[1]");
    this.selectUserOne = page.locator("(//a[contains(text(),'Select User')])[1]");
    this.selectfirstGradeLink = page.locator("(//*[@class='browserOddRow']/td//a)[1]");
    this.statusDropdownByIndex = page.locator("(//td[contains(text(),'Status')]/following-sibling::td/select)[1]");
    this.currentStudyCheckbox = page.locator("//td[contains(text(),'Status Date')]/../..//input[@type='checkbox']");
    this.selectFirstLink = page.locator("(//*[@class='browserOddRow']/td[1]/a)[1]");
    this.selectFirstLinkInColumn = page.locator("(//*[@class='browserEvenRow']/td[1])[1]/a");
    this.selectfieldLinkByColumn = page.locator("(//*[@class='browserEvenRow']/td[2])[1]/a");
    this.selectFirstUser = page.locator("(//*[@class='browserOddRow']/td[1])[1]/a");
    this.selectFirstStudyNumber = page.locator("(//*[@class='browserEvenRow']/td[1])[1]/a");
    this.selectFirstSelectinList = page.locator("(//span[contains(text(),'Select')])[1]");
    this.selectPatientLinkOnReportPage = page.locator("(//font//a[contains(text(),'Select Patient')])[2]");
    this.selectStudyLinkOnReportPage = page.locator("(//a[contains(text(),'Select Study')])[1]");
    this.selectSecondSelectList = page.locator("(//span[contains(text(),'Select')])[2]");
    this.selectUserFirstLink = page.locator("(//a[contains(text(),'Select User')])[1]");
    this.selectUserSecondLink = page.locator("(//a[contains(text(),'Select User')])[2]");
    this.selectGradeInAdverseEvent = page.locator("(//*[@class='browserOddRow']/td[3])[1]/a");
    this.verifytextseverity = page.locator("//td[text()='Severity/Grade Description']");
    this.DOBStudyCentricPage = page.locator("//input[@name='patdob']");
    this.verifyText = page.locator("//input[@id='aeGradeDesc']");
    this.selectAdverseEventsLink = page.locator("//tr[td[contains(text(),'Linked To')]]//a");
    this.Notes = page.locator("//*[@name='Notes']");
    this.eventNotes = page.locator("//*[@name='eventNotes']");
    this.selectDiseaseCode = page.locator("//*[@title='Select Disease Code']");
    this.dateOfDeath = page.locator("//*[@name='deathDate']");
    this.dateAppendix = page.locator("//*[@name='perApndxDate']");
    this.startDateClick = page.locator("//input[@name='startDt']");
    this.startDateFirstRow = page.locator("//td//input[@name='startDt0']");
    this.stopDateFirstRow = page.locator("//td//input[@name='stopDt0']");
    this.attributionColFirstRowDropdown = page.locator("//td//select[@name='adveRelation0']");
    this.actionColFirstRowDropdown = page.locator("//td//select[@name='action0']");
    this.recoveryColFirstDropdown = page.locator("//td//select[@name='recovery0']");
    this.adverseEventTypeColFirstDropdown = page.locator("//td//select[@name='advEtype0']");
    this.stopDateClick = page.locator("//input[@name='stopDt']");
    this.firstDropdown = page.locator("//*[@name='lookup_filter']");
    this.secondDropdown = page.locator("//*[@name='lookup_column']");
    this.thirdDropdown = page.locator("//*[@name='scriteria']");
    this.sortAscendingClick = page.locator("//*[contains(text(),'SHORT DESCRIPTIONS ICD10')]");
    this.sortAscendingDescending = page.locator("//tr//th[@nowrap='nowrap']");
    this.selectDiseaseOneLink = page.locator("(//span[text()='Select'])[1]");
    this.selectDiseaseTwoLink = page.locator("(//span[text()='Select'])[2]");
    this.studyIcon = page.locator("//*[@id='activeImage']");
    this.yearRadioButton = page.locator("//input[@type='radio' and @value='2']");
    this.monthRadioButton = page.locator("//input[@type='radio' and @value='3']");
    this.dateRangeRadioButton = page.locator("//input[@type='radio' and @value='4']");
    this.allRadioButton = page.locator("//input[@type='radio' and @value='1']");
    this.selectYear = page.locator("//*[@name='year']");
    this.selectMonth = page.locator("//*[@name='month']");
    this.selectYear1 = page.locator("//*[@name='year1']");
    this.eventStatusEditIconFirstLinkNonFDA = page.locator("(//tr[@class='pastSchRow']//td[5]//a//img)[1]");
    this.visitListFirst = page.locator("(//*[@class='ui-icon ui-icon-triangle-1-e'])[1]");
    this.eventStatusColumnFirstLink = page.locator("(//tr[@class='browserOddRow']//td[5]//a)[1]");
    this.eventStatusEditIconFirstLink = page.locator("(//tr[@class='browserOddRow']//td[5]//a//img)[1]");
    this.eventStatusEditIconSecondLink = page.locator("(//tr[@class='browserEvenRow']//td[5]//a//img)[1]");
    this.statusHistoryIconFirstLink = page.locator("(//tr[@class='browserOddRow']//td[6]//a//img)[1]");
    this.statusHistoryIconLast = page.locator("(//tr[@class='browserOddRow']//td[6]//a//img)[last()]");
    this.statusHistoryDeleteIcon = page.locator("(//form[@name='eventstat']//td//a//img)[1]");
    this.eventLinkclickInColumn = page.locator("(//tr[@class='browserOddRow']//td[4]//a)[1]");
    this.firstCloseButton = page.locator("(//span[text()='Close'])[1]|(//span[contains(text(),'Close')])[1]");
    this.SecondCloseButton = page.locator("(//span[text()='Close'])[2]");
    this.AddUnscheduledEventFirst = page.locator("(//a[contains(text(),'Add Unscheduled Event')])[1]");
    this.eventWindowBefore = page.locator("//input[@name='eventFuzzyPerDays']");
    this.eventWindowAfter = page.locator("//input[@name='eventFuzzyPerDaysA']");
    this.eventWindowBeforeDropdown = page.locator("//select[@name='durUnitB']");
    this.eventWindowAfterDropdown = page.locator("//select[@name='durUnitA']");
    this.selectEventCatDropdown = page.locator("//*[@name='categoryId']");
    this.jumpToFormDropdown = page.locator("//td[contains(text(),'Jump to Form')]/select");
    this.submitAndAddAnother = page.locator("//*[@id='add_another']/span");
    this.submitAndAddAnotherBtn = page.locator("//*[(text()='Submit and Add Another')]");
    this.submitBtnPatientStatusPage = page.locator("(//span[contains(text(),'Submit')])[1]");
    this.timeZoneDropdown = page.locator("//td[contains(text(),'Time Zone')]/following-sibling::td/select");
    this.email = page.locator("//*[@name='patemail']");
    this.dataEntryDatefield = page.locator("//*[@id='er_def_date_01']");
    this.labsPerformed = page.locator("//*[@name='filterEnrDate']");
    this.category = page.locator("//*[@name='groupName']");
    this.labname = page.locator("//*[@name='labname']");
    this.studyDropdown = page.locator("//*[@name='selStudyId']");
    this.studyDropdownProtocolPage = page.locator("//*[@name='selstudyId']");
    this.orgDropdownSecond = page.locator("//*[@name='enrollingSite']");
    this.abnormalResultsDropdown = page.locator("//*[@name='abnresult']");
    this.labCheckBox = page.locator("(//*[@type='checkbox' and @name='Del'])[1]");
    this.formStatus = page.locator("//*[@name='er_def_formstat']");
    this.addEditQueriesLink = page.locator("//a[text()=' Add/Edit Queries']");
    this.addNewLink = page.locator("//a[contains(text(),'Add New')]");
    this.studyNumberIcon = page.locator("//*[@id='activeImage']");
    this.ScheduleDropdown = page.locator("//*[@id='availableSch']");
    this.VisitDropdown = page.locator("//*[@name='visit']");
    this.selectDropdown = page.locator("//*[@name='view']");
    this.filterVisitsEventsDropdown = page.locator("//*[@name='dstatus']");
    this.statusDropdownInGrid = page.locator("//*[@name='status']");
    this.statusValidFromDropdownInGrid = page.locator("//*[@name='caldate']");
    this.performedByDropdownGrid = page.locator("//*[@name='performedByAll']");
    this.firstVisitStatusDropdown = page.locator("(//select[@name='eventstatus'])[1]");
    this.secondVisitStatusDropdown = page.locator("(//select[@name='eventstatus'])[2]");
    this.thirdVisitStatusDropdown = page.locator("(//select[@name='eventstatus'])[3]");
    this.fourthVisitStatusDropdown = page.locator("(//select[@name='eventstatus'])[4]");
    this.firstVisitStatusValidFromDropdown = page.locator("(//*[@name='exeon'])[1]");
    this.secondVisitStatusValidFromDropdown = page.locator("(//*[@name='exeon'])[2]");
    this.statusValidFromFirstVisit = page.locator("(//input[@name='exeon'])[1]");
    this.firstvisitPerformedByDropdown = page.locator("(//*[@name='performedBy'])[1]");
    this.selectAllcheckbox = page.locator("//*[@name='selDeSelAll']");
    this.firstVisitCheckbox = page.locator("(//*[@name='chkVst'])[1]");
    this.clickFirstCheckbox = page.locator("(//input[@type='checkbox'])[1]");
    this.clickSecondCheckbox = page.locator("(//input[@type='checkbox'])[2]");
    this.followUpCheckbox = page.locator("(//*[@name='chkVst'])[2]");
    this.patientIDTooltip = page.locator("//td[contains(text(),'Patient ID')]/img");
    this.providerField = page.locator("//*[@id='regby']");
    this.studyDropdownNew = page.locator("//select[@name='dStudyExists']");
    this.studyDropdownPatientSearch = page.locator("//select[@name='studyId']");
    this.orgDropdownPatientSearch = page.locator("//select[@name='siteId']");
    this.specialtydropdownPatientSearch = page.locator("//*[@name='speciality']");
    this.currentPageField = page.locator("//*[@id='1_pgNum']");
    this.patientStudyIDField = page.locator("//*[@name='patStudyId']");
    this.evaluableFlagDropdown = page.locator("//*[@id='evalFlag']");
    this.evaluableStatusDropdown = page.locator("//*[@id='evalStat']");
    this.unevaluableStatusDropdown = page.locator("//*[@id='inevalStat']");
    this.shortDescriptionAppendix = page.locator("//textarea[@name='desc']");
    this.codeSelectLink = page.locator("(//span[text()='Select'])[1]");
    this.codeSelectLinkFour = page.locator("(//span[text()='Select'])[4]");
    this.codeSelectLinkOne = page.locator("(//td//a[@type='submit'])[1]");
    this.calendarStartDate = page.locator("//*[@name='protStDate']");
    this.categoryDropdown = page.locator("//td[contains(text(),'Category')]//select");
    this.labNameAddNewpage = page.locator("//*[@name='searchLabName']");
    this.addIconAddNewLabs = page.locator("(//div//table//td//a/img)[1]");
    this.removeIconAddNewLabs = page.locator("(//div//table//td//a/img)[2]");
    this.deselectCheckbox = page.locator("(//*[@name='deselected'])[1]");
    this.selectAllcheckboxAddNewLabs = page.locator("//*[@onclick='selectAllCheckbox(this)']");
    this.longResultUpperGrid = page.locator("//*[@name='longresultheader']");
    this.longResultLowerGrid = page.locator("//*[@name='longresult']");
    this.testResultLowerGrid = page.locator("//*[@name='tresult']");
    this.labDateLowerGrid = page.locator("//input[@name='labdate']");
    this.editiconFirstLink = page.locator("(//img[contains(@title,'Edit')])[1]");
    this.labdateForToxicity = page.locator("//*[@name='labDate']");
    this.ifOtherEnterLLN = page.locator("//*[@name='otherLLN']");
    this.andOrUln = page.locator("//*[@name='otherULN']");
    this.filterByDateDropdown = page.locator("//td//select[@name='formFillDt']");
    this.reasonForChangeField = page.locator("(//td[@class='reportData']//textarea)[1]");
    this.dateOutcomeType = page.locator("//input[@name='outcomeDt']");
    this.IRBdatepicker = page.locator("//input[@name='notifyDate0']");
    this.FDAdatepicker = page.locator("//input[@name='notifyDate1']");
    this.Sponsardatepicker = page.locator("//input[@name='notifyDate2']");
    this.Othersdatepicker = page.locator("//input[@name='notifyDate3']");
    this.studyNumbertooltipSchedulePage = page.locator("//tr//td//a//img[@id='activeImage']");
    this.studyTitletooltipSchedulePage = page.locator("//tr//td//a//img[@id='activeImage']/../../a[2]/img");
    this.studyTitleTooltipSchedulePageText = page.locator("//tr//td//a//img[@id='activeImage']/../../a[2]");
    this.unitDropdown = page.locator("//select[@name='unit']");
    this.patientScheduleCheckboxTwo = page.locator("(//input[@name='selectedSchedule'])[2]");
    this.ulnField = page.locator("//input[@name='ULN']");
    this.llnField = page.locator("//input[@name='ULN']");
    this.accessionNumber = page.locator("//*[@name='accnumber']");
    this.studyPhaseLbapage = page.locator("//select[@name='stdPhase']");
    this.longTestResult = page.locator("//*[@name='longresult']");
    this.reasonForChangeFDAaudit = page.locator("//*[@name='remarks']");
    this.adverseEventTypeDropdown = page.locator("//select[@name='advEtype0']");
    this.selectTextFristLink = page.locator("(//a[contains(text(),'Select')])[1]");
    this.calcFirstLink = page.locator("(//a[contains(text(),'Calc.')])[1]");
    this.txCourseFirstColumn = page.locator("//input[@name='treatment0']");
    this.statusValidFromdate = page.locator("//input[@name='actualDt']");
    this.AEdiscoveryDate = page.locator("//input[@name='aediscoveryDt']");
    this.AEloggedDate = page.locator("//input[@name='aeloggedDt']");
    this.editVisitClickLink = page.locator("//td//a[contains(text(),'Edit Visit')]");
    this.eventOneDropdownStatusColEditVisit = page.locator("//form[@name='editVisitForm']//select[@name='eventStatus0']");
    this.statusDropdownEditVisitPage = page.locator("//*[@name='eventStatusAll']");
    this.reasonForChangeInCoveragetypeEventStatusPage = page.locator("//textarea[@name='reasonForCoverageChange']");
    this.statusDateEditVisitPage = page.locator("//*[@name='statusValidAll']");
    this.performedByEditVisitPage = page.locator("//*[@name='performedByAll']");
    this.editvisitSecondCheckbox = page.locator("(//input[@name='selEvent1'])[2]");
    this.editvisitThirdCheckbox = page.locator("(//input[@name='selEvent2'])[2]");
    this.editvisitFirstCheckbox = page.locator("(//input[@name='selEvent0'])[3]");
    this.editVisitFirstOneCheckbox = page.locator("(//input[@name='selEvent0'])[2]");
    this.statusDateEventTwoEditVisitPage = page.locator("(//input[@name='statusValid0'])[2]");
    this.statusDropdownColEditVisitpage = page.locator("(//select[@name='eventStatus0'])[3]");
    this.statusDropdownEventTwoEditVisitpage = page.locator("(//select[@name='eventStatus0'])[2]");
    this.statusDateColEditVisitPage = page.locator("(//input[@name='statusValid0'])[3]");
    this.performedByColEditVisitPage = page.locator("(//select[@name='performedBy0'])[3]");
    this.performedByColEditVisitPageEventOne = page.locator("(//select[@name='performedBy0'])[2]");
    this.RFCinCoverageTypeEditVisitpage = page.locator("(//textarea[@name='reason0'])[2]");
    this.coverageTypeDropdownEditVisitpage = page.locator("(//select[@name='covType0'])[2]");
    this.gridCheckbox = page.locator("(//th//input[@type='checkbox'])[1]");
    this.firstarrowButtonEventPage = page.locator("//a[@name='thebutton']/img");
    this.eventCheckboxThird = page.locator("(//td//input[@name='eventcheckbox'])[3]");
    this.selectFirstCheckboxEventpage = page.locator("(//tr//td//input[@type='checkbox'])[2]");
    this.editiconClick = page.locator("(//img[@title='Edit'])[1]");
    this.selectCheckboxOneDeleteSchedulepage = page.locator("(//input[@name='selectedSchedule'])[1]");
    this.selectCheckboxTwoDeleteSchedulepage = page.locator("(//input[@name='selectedSchedule'])[2]");
    this.treatmentArmTwoDelete = page.locator("(//*[@class='browserOddRow']/td[1])[1]/a/../following-sibling::td//a//img[@title='Delete']");
    this.radiobuttonCalendarTemplateone = page.locator("//input[@name='dayflag' and @value='0']");
    this.radiobuttonCalendarTemplate = page.locator("//input[@name='dayflag' and @value='1']");
    this.selectedvisitField = page.locator("//input[@name='dispSelDay']");
    this.siteOfServicesUpperGrid = page.locator("//select[@name='ddSos']");
    this.siteOfServicesFirstEvent = page.locator("(//select[@name='ddSiteService'])[1]");
    this.coverageTypeUpperGrid = page.locator("//select[@name='ddCoverage']");
    this.coverageTypeFirstEvent = page.locator("(//select[@name='ddCoverageType'])[1]");
    this.ReasonforChangeinCoverageTypeFirsEvent = page.locator("(//input[@name='reasonForCoverageChange'])[1]");
    this.notesFieldOne = page.locator("(//input[@name='note'])[1]");
    this.eventOneCheckbox = page.locator("(//input[@name='chkEvent'])[1]");
    this.eventTwoCheckbox = page.locator("(//input[@name='chkEvent'])[2]");
    this.eventStatusOne = page.locator("(//select[@name='eventstatus'])[1]");
    this.eventStatusTwo = page.locator("(//select[@name='eventstatus'])[2]");
    this.selectActualDate = page.locator("//input[@name='actualDt']");
    this.MovealleventsofthisvisitRadioButton = page.locator("(//input[@name='statusflag'])[1]");
    this.ReasonforChangeinCoverageType = page.locator("//textarea[@id='reasonForCoverageChange']");
    this.reasonForChangeInCoverageTypeTwo = page.locator("(//textarea[@name='reason0'])[2]");
    this.moveAllEventsOfThisVisit = page.locator("//input[@type='radio' and @value='3']");
    this.moveSuggestedDatetobeinsyncwithActualDate = page.locator("//input[@type='checkbox' and @value='1']");
    this.coverageTypeTooltip = page.locator("//div[contains(text(),'Coverage Type')]//img");
    this.datePickerTodayButton = page.locator("//div[contains(@class,'datepicker')]//button[contains(text(),'Today')]");
    this.datePickerClearButton = page.locator("//div[contains(@class,'datepicker')]//button[contains(text(),'Clear')]");
    this.selectdateLesserThanCurrentDate = page.locator("//tr//td[contains(@class,'today')]//preceding-sibling::td[1]//a");
    this.selectDateGreaterThanCurrentDate = page.locator("//tr//td[contains(@class,'today')]//following-sibling::td[1]//a");
    this.selectCurrentDate = page.locator("//td[contains(@class,'today')]");
    this.selectCurrentDateNew = page.locator("//td[contains(@class,'today')] | //td[contains(@class,'current-day')]|//div[contains(@class,'datepicker')]//button[contains(text(),'Today')]");
    this.datepickerselectPreviousMonthIconClick = page.locator("(//div[contains(@class,'datepicker')]//a//span)[1]");
    this.datepickerselectNextMonthIconClick = page.locator("(//div[contains(@class,'datepicker')]//a//span)[2]");
    this.datePickerSelectDateOne = page.locator("//div[contains(@class,'datepicker')]//td//a[contains(text(),'1')]");
    this.datePickerSelectDateFifteen = page.locator("//div[contains(@class,'datepicker')]//td//a[contains(text(),'15')]");
    this.datePickerSelectDateSixteen = page.locator("//div[contains(@class,'datepicker')]//td//a[contains(text(),'16')]");
    this.datePickerSelectDateSeventeen = page.locator("//div[contains(@class,'datepicker')]//td//a[contains(text(),'17')]");
    this.datePickerSelectDateEighteen = page.locator("//div[contains(@class,'datepicker')]//td//a[contains(text(),'18')]");
    this.datePickerSelectDateNineteen = page.locator("//div[contains(@class,'datepicker')]//td//a[contains(text(),'19')]");
    this.datePickerSelectDateTwenty = page.locator("//div[contains(@class,'datepicker')]//td//a[contains(text(),'20')]");
    this.firstNameColumn = page.locator("(//span//a[contains(@title,'Click')][contains(text(),'First Name')])[1]");
    this.reasonForChangeFDAauditTreatmentArmPage = page.locator("//textarea[@name='remarks']");
    this.discontinuationReasonTextarea = page.locator("//textarea[@name='discReason']");
    this.descriptionEventdetailsPage = page.locator("//textarea[@name='eventDesc']");
    this.cptcodeEventdetailsPage = page.locator("//textarea[@name='cptcode']");
    this.notesEventDetailsPage = page.locator("//textarea[@name='eventNotes']");
    this.specimanIDField = page.locator("//input[@name='specimen_id']");
    this.longTestResultLabsPage = page.locator("//textarea[@name='longresult']");
    this.notesTestResultLabPage = page.locator("//textarea[@name='notes']");
    this.actionDropdown = page.locator("//select[@name='outaction']");
    this.recoveryDropdown = page.locator("//select[@name='adve_recovery']");
    this.abnormalResultDropdownAddNewPage = page.locator("//select[@id='selectAllAbnresult']");
    this.userFirstName = page.locator("(//input[@name='fname'])[1]|//input[contains(@name,'fname')]");
    this.allButtonClick = page.locator("//span[contains(text(),'All')]");
    this.patientScheduleCheckboxOne = page.locator("(//input[@name='selectedSchedule'])[1]");
    this.studyStatusDate = page.locator("//input[@name='StatusDate']");
    this.eventTwoCheckboxClick = page.locator("(//input[@type='checkbox' and @name='selEvent1'])[2]");
    this.eventThreeCheckboxClick = page.locator("(//input[@type='checkbox' and @name='selEvent2'])[2]");
    this.visitsDropdownSchedulePage = page.locator("//select[contains(@id,'filterNextVisit')]");
    this.moveAllEventsOfThisVisitCheckbox = page.locator("//input[@type='checkbox' and @value='3']");
    this.coverageTypeTooltipImg = page.locator("//table[contains(@class,'scrollTable')]//th//img");
    this.coverageTypeDropDown = page.locator("//select[contains(@name,'ddCoverage')]//option");
    this.getAECodeFromLookup = page.locator("//a[contains(@type,'submit')]/../following-sibling::td");
    this.verifyMultipleAEGradeIsNotNull = page.locator("//td/input[@name='advGradeText0']");
    this.totalPages = page.locator("//span[contains(@id,'1_totalPages')]");
    this.thirdVisitStatusValidFromDropdown = page.locator("(//*[@name='exeon'])[3]");
    this.fourthVisitStatusValidFromDropdown = page.locator("(//*[@name='exeon'])[4]");
    this.patientID = page.locator("//input[@id='patCode']");
    this.getDeleteIcon = page.locator("//tr[@id='yui-rec0']//td[@class='yui-dt0-col-DEL_LINK yui-dt-col-DEL_LINK yui-dt-last']//img");
    this.dateTodayButton = page.locator("//*[@id='ui-datepicker-div']/div[2]/button[1]");
    this.patientIcon = page.locator("//img[@title='Patient Management - Enrolled Patients']|//img[@title='Patient Enrollment']");
    this.printIcon = page.locator("//img[@title='Print']");
  }

  /* ══════════════════════════════════════════════════════════
     Dynamic Locator Methods from Velos_PatientPage.java
     ══════════════════════════════════════════════════════════ */

  patientIconByText(text: string): Locator {
    return this.page.locator(`//a[contains(@href, '${text}')]/img`);
  }

  searchForm(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/following-sibling::td/input | //td[contains(text(),'${text}')]//input | //input[contains(@id,'${text}')] | //td//*[contains(text(),'${text}')]/parent::td/following-sibling::td/input | //td//*[contains(text(),'${text}')]/parent::td/following-sibling::td/b/input | //tr//td[contains(text(),'${text}')]//following::td//textarea | //label[contains(text(),'${text}')]//input | //td//b[contains(text(),'${text}')]/parent::td//following-sibling::td//textarea | //input[contains(@name,'${text}')] | //td[*[contains(text(),'${text}')]]/input[1]/../following-sibling::td[2]`);
  }

  selectedTabByText(tabName: string): Locator {
    return this.page.locator(`//table[@id='patientTabs']//td/table[@class='selectedTab']//a[contains(text(), '${tabName}')]`);
  }

  optionByText(option: string): Locator {
    return this.page.locator(`(//div[@class= 'context-menu-item']//*[contains(text(), '${option}')])[1]`);
  }

  patientAccessByValue(val: string): Locator {
    return this.page.locator(`//input[@value='${val}' and @name='accessFlag']`);
  }

  isDefaultOrgByValue(val: string): Locator {
    return this.page.locator(`//input[@value='${val}' and @name='isDefault']`);
  }

  buttonByText(text: string): Locator {
    return this.page.locator(`//*[(text()='${text}')]`);
  }

  patientIdIconClick(idText: string): Locator {
    return this.page.locator(`(//td[contains(text(),'${idText}')]/../..//td//a)[1]`);
  }

  columnByText(text: string): Locator {
    return this.page.locator(`//td/a/span[contains(text(),'${text}')]|//td/a/span[contains(text(),'${text}')]/parent::a`);
  }

  verifygridLinkAndText(text: string): Locator {
    return this.page.locator(`(//*//a[contains(text(),'${text}')])[1]`);
  }

  verifyColumnName(columnName: string): Locator {
    return this.page.locator(`//th//a[contains(text(),'${columnName}')]|//span//a[contains(text(),'${columnName}')]`);
  }

  serStatusSelectedByText(text: string): Locator {
    return this.page.locator(`//select[@id='patstatus']/option[@selected and text()='${text}']`);
  }

  deleteFirstByText(text: string): Locator {
    return this.page.locator(`(//td[a[contains(text(), '${text}')]]/..//img[@title='Delete'])[1]`);
  }

  deleteSecondByText(text: string): Locator {
    return this.page.locator(`(//td[a[contains(text(), '${text}')]]/..//img[@title='Delete'])[2]`);
  }

  deleteCheckboxwithtext(text: string): Locator {
    return this.page.locator(`//*[text()='${text}']/..//td/*[@type='checkbox' and @name='Del']`);
  }

  reportRadioByText(text: string): Locator {
    return this.page.locator(`(//td[contains(text(), '${text}')]/input[@name='reportName'])[1]`);
  }

  dateFilterRadioByVal(text: string): Locator {
    return this.page.locator(`//input[@name='filterType' and @value='${text}']`);
  }

  downloadOptionByText(text: string): Locator {
    return this.page.locator(`//div[@class='dt-buttons']/a/span[text()='${text}']`);
  }

  adverseEventByStudyText(text: string): Locator {
    return this.page.locator(`//tr[td/a[contains(text(), '${text}')]]//a[contains(@href, 'adveventbrowser')]/img`);
  }

  adverseEventTypeByIndex(i: number): Locator {
    return this.page.locator(`(//select[contains(@name, 'advEtype')])[${i}]`);
  }

  advStartDateByIndex(i: number): Locator {
    return this.page.locator(`(//input[contains(@name, 'startDt')])[${i}]`);
  }

  attributionByIndex(i: number): Locator {
    return this.page.locator(`(//select[contains(@name, 'adveRelation')])[${i}]`);
  }

  clickHereByText(text: string): Locator {
    return this.page.locator(`//*[*[contains(text(), '${text}')]]/..//a/*[contains(text(), 'CLICK HERE')]`);
  }

  deleteFirstMyFilesByText(text: string): Locator {
    return this.page.locator(`(//tr[td//a[contains(text(), '${text}')]]//img[@title='Delete'])[1]`);
  }

  deleteFirstLabByText(text: string): Locator {
    return this.page.locator(`(//tr[td[contains(text(), '${text}')]]//input[@name='Del'])[1]`);
  }

  labCheckboxByText(text: string): Locator {
    return this.page.locator(`//tr[td[contains(text(), '${text}')]]//input`);
  }

  imageByTitleOnPatientSearchPage(name: string, title: string): Locator {
    return this.page.locator(`//tbody/tr[td[*[*[contains(text(),'${name}')]]]]//img[@title='${title}']`);
  }

  formsLinkForStudyOnProtocolPage(studyName: string): Locator {
    return this.page.locator(`//tbody/tr[td[a[contains(text(),'${studyName}')]]]/td//a[contains(text(),'Forms')]`);
  }

  verifyRowUnderformResponseBrowser(text1: string, text2: string, text3: string): Locator {
    return this.page.locator(`//tbody/tr[td[*[contains(text(),'${text1}')]] and *[contains(text(),'${text2}')] and *[contains(text(),'${text3}')]]`);
  }

  radioOptionByVal(text1: string): Locator {
    return this.page.locator(`//input[@name='dayflag'][@value='${text1}']`);
  }

  verifyScheduleName(text1: string): Locator {
    return this.page.locator(`//div[contains(@id,'accordion')]//h3[a[span[contains(text(),'${text1}')]]]`);
  }

  selectedItemFormEventsStatusDropdown(name: string, status: string): Locator {
    return this.page.locator(`//select[@name='${name}']//option[contains(text(),'${status}') and @selected]`);
  }

  checkboxButtonByText(text: string, checkBoxType: string): Locator {
    return this.page.locator(`//table/tbody/tr[td[*[contains(text(),'${text}')]]]//input[contains(@type,'${checkBoxType}')]`);
  }

  inputFieldByTypeAndName(type: string, name: string): Locator {
    return this.page.locator(`input[type='${type}'][name*='${name}']`);
  }

  selectDropdownByName(name: string): Locator {
    return this.page.locator(`select[name*='${name}']`);
  }

  selectDropdownByCompleteName(name: string): Locator {
    return this.page.locator(`select[name='${name}']`);
  }

  imageTitleByTexts(text1: string, imageTitle: string): Locator {
    return this.page.locator(`//tbody//tr[*[*[contains(text(),'${text1}')]]]//*[contains(@title,'${imageTitle}')]//img`);
  }

  eventsRowByText(text: string): Locator {
    return this.page.locator(`//tbody[contains(@id,'eventsDisplay')]//tr//td[contains(text(),'${text}')]`);
  }

  expandScheduleByName(name: string): Locator {
    return this.page.locator(`//div[contains(@id,'accordion')]//h3[a[span[contains(text(),'${name}')]] and //span[contains(@class,'triangle')]]`);
  }

  expandVisitByName(name: string): Locator {
    return this.page.locator(`//div[contains(@id,'VisitAccordian')]//h3[a[contains(text(),'${name}')]]//span[contains(@class,'triangle')]`);
  }

  calendarStatus(calendarName: string): Locator {
    return this.page.locator(`//tbody/tr[*[*[contains(text(),'${calendarName}')]]]//td/a[contains(@href,'calendarstatus')]`);
  }

  textAreaField(name: string): Locator {
    return this.page.locator(`textarea[name*='${name}']`);
  }

  coverageTypeDropdown(name: string): Locator {
    return this.page.locator(`option[data-subtype='${name}']`);
  }

  verifyFontTagText(text: string): Locator {
    return this.page.locator(`//font[contains(text(),'${text}')]`);
  }

  selectCheckBoxByText(text: string, checkBoxType: string): Locator {
    return this.page.locator(`//table//tbody//tr[td[contains(text(),'${text}')]]//input[@type='${checkBoxType}']`);
  }

  checkboxwithText(text: string): Locator {
    return this.page.locator(`//*[text()='${text}']/../td/input[@type='checkbox']`);
  }

  verifyRowsPerPages(dropdownName: string, rowsValue: string): Locator {
    return this.page.locator(`//span[contains(text(),'${dropdownName}')]/following-sibling::select/option[contains(text(),'${rowsValue}')]`);
  }

  excludePatientNotEnrolled(checkboxName: string): Locator {
    return this.page.locator(`//td[contains(.,'${checkboxName}')]/input[contains(@name,'cbxExcludeNotEnrolled')]`);
  }

  deleteEnrolledPatient(patientId: string, actionType: string): Locator {
    return this.page.locator(`//td[*[*[contains(text(),'${patientId}')]]]/following-sibling::td//a[contains(@title,'${actionType}')]`);
  }

  reasonField(fieldName: string): Locator {
    return this.page.locator(`//td[contains(text(),'${fieldName}')]/following-sibling::td/textarea`);
  }

  verifyValueInField(fieldName: string, value: string): Locator {
    return this.page.locator(`//td[contains(text(),'${fieldName}')]/following-sibling::td/input[@value='${value}']`);
  }

  verifyDropdownValueInGrid(dropdownName: string, value: string): Locator {
    return this.page.locator(`//tr[*[contains(text(),'${dropdownName}')]]/following-sibling::tr//select/option[contains(text(),'${value}')]`);
  }

  adverseEventGradingSelect(gradeType: string): Locator {
    return this.page.locator(`//td[contains(text(),'${gradeType}')]/following-sibling::td/a`);
  }

  patientDropdownByText(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/following-sibling::td/select`);
  }

  patientDropdownBySpan(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/following-sibling::td/span/select`);
  }

  patientFieldByTextInEnrolled(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/following-sibling::td/input`);
  }

  iconClickByText(text: string): Locator {
    return this.page.locator(`//button[contains(@title,'${text}')]`);
  }

  gridSelectDeselect(text: string): Locator {
    return this.page.locator(`(//a[contains(text(), '${text}')])[1]`);
  }

  gridiconTitleClick(icontitle: string): Locator {
    return this.page.locator(`//a[contains(@title, '${icontitle}')]/img`);
  }

  gridPageNumberClick(i: string): Locator {
    return this.page.locator(`//div/a[text()='${i}']|//tr//td//a[contains(text(),'${i}')]`);
  }

  clickOnSelectLinkwithPatientID(patID: string): Locator {
    return this.page.locator(`//a[text()='${patID}']/../..//a[text()='Select']`);
  }

  selectUserLinkbyText(name: string): Locator {
    return this.page.locator(`//tr[td[contains(text(),'${name}')]]//span//a|//tr[td[contains(text(),'${name}')]]//a`);
  }

  iconClick(text: string, title: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/following-sibling::td//img[contains(@title,'${title}')]`);
  }

  iconClickBytextandTitle(text: string, title: string): Locator {
    return this.page.locator(`//*[contains(text(),'${text}')]/../../td//a//img[@title='${title}']|//*[contains(text(),'${text}')]/..//a//img[@title='${title}']`);
  }

  firstTitleClickOnPage(title: string): Locator {
    return this.page.locator(`(//img[@title='${title}'])[1]`);
  }

  iconClickEditByText(text: string): Locator {
    return this.page.locator(`(//*[text()='${text}']/../../../../../../td//a/img[@title='Edit'])[1]`);
  }

  iconClickDeleteByTextandTitle(text: string, title: string): Locator {
    return this.page.locator(`//*[(text()='${text}')]/../a/../../following-sibling::td//a[@title='${title}']/img|//*[contains(text(),'${text}')]/../a/../../following-sibling::td//a[@title='${title}']/img`);
  }

  editTextField(fieldName: string): Locator {
    return this.page.locator(`//*[contains(text(),'${fieldName}')]/following-sibling::td/textarea|//*[contains(text(),'${fieldName}')]/../..//td/textarea`);
  }

  editandDeleteIconwithPDFName(pdfName: string, title: string): Locator {
    return this.page.locator(`//span//a[contains(text(),'${pdfName}')]/../../following-sibling::td//a//img[@title='${title}']`);
  }

  mouseHoverbyText(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]/img|//div[contains(text(),'${text}')]//a//img`);
  }

  verifyDropdownValue(dropdownfieldName: string, dropdownvalue: string): Locator {
    return this.page.locator(`//td[contains(text(),'${dropdownfieldName}')]/following-sibling::td/select/option[contains(text(),'${dropdownvalue}')]|//*[contains(text(),'${dropdownfieldName}')]/following-sibling::select//option[contains(text(),'${dropdownvalue}')]|//select[contains(@name,'${dropdownfieldName}')]//option[contains(text(),'${dropdownvalue}')]`);
  }

  VerifyColumnNameWithText(columnName: string): Locator {
    return this.page.locator(`//th[contains(text(),'${columnName}')]`);
  }

  lookupPageCheckboxWithName(name: string): Locator {
    return this.page.locator(`//td[contains(text(),'${name}')]/../td//input[@type='checkbox']`);
  }

  verifySelectedValueInField(fieldName: string, value: string): Locator {
    return this.page.locator(`//td[contains(text(),'${fieldName}')]/following-sibling::td/select/option[@selected and contains(text(),'${value}')]`);
  }

  validateText(text: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]`);
  }

  patientStudyIDclickWithPatientID(patientId: string, PatientStudyID: string): Locator {
    return this.page.locator(`//td[contains(text(),'${patientId}')]/ancestor::tr//td[3]//div//a[contains(text(),'${PatientStudyID}')]`);
  }

  getPIDForTheStudy(study: string): Locator {
    return this.page.locator(`(//div[contains(text(),'${study}')]/../following-sibling::td//td)[2]`);
  }

  selectFirstLinkByText(text: string): Locator {
    return this.page.locator(`(//td//a[contains(text(),'${text}')])[1]`);
  }

  iconClickForReportWithName(textName: string, iconName: string): Locator {
    return this.page.locator(`//td[contains(text(),'${textName}')]/..//a[contains(@title,'${iconName}')]`);
  }

  pageNavigationIcon(iconName: string): Locator {
    return this.page.locator(`//td/button[contains(@title,'${iconName}')]`);
  }

  verifyPatientIdUnderColumn(columnName: string, patientId: string): Locator {
    return this.page.locator(`//a[contains(text(),'${columnName}')]/../../../../../../following-sibling::tbody//td[contains(text(),'${patientId}')]`);
  }

  verifytotalRecordsOnPage(totalRecords: string): Locator {
    return this.page.locator(`//font[contains(@class,'recNumber') and contains(text(),'${totalRecords}')]`);
  }

  deletePatientEnroll(pid: string): Locator {
    return this.page.locator(`//td[contains(text(),'${pid}')]/../../../../../following-sibling::td[21]/div/div/a[1]`);
  }

  buttonSearch(text: string): Locator {
    return this.page.locator(`//button[contains(text(),${text})]`);
  }

  patientPresence(text: string): Locator {
    return this.page.locator(`//tr//td[contains(@style,'border-style:none') and contains(text(),${text})]`);
  }

  homepageicons(icontitle: string): Locator {
    return this.page.locator(`//img[@title='${icontitle}']`);
  }

  dropdownadverse(value: string): Locator {
    return this.page.locator(`//select[@name='${value}']`);
  }

  rosterPageButtons(text: string): Locator {
    return this.page.locator(`//button[@class='btn btn-sm btn-success' and contains(text(),'${text}')]`);
  }

  iconsClickByImg(text: string): Locator {
    return this.page.locator(`//img[contains(@title,'${text}')]`);
  }

  scheduleDateEditIconFirstEvent(visitName: string): Locator {
    return this.page.locator(`(//span[contains(text(),'${visitName}')]/../../../div//td/a/img[@title='Edit'])[1]`);
  }

  patientScheduleVisitIndicator(visitText: string): Locator {
    return this.page.locator(`//img[contains(@style,'hidden') and contains(@src,'greencheck')]/following-sibling::span[contains(text(),'${visitText}')]`);
  }

  patientScheduleBlueTick(event: string): Locator {
    return this.page.locator(`//a[normalize-space()='${event}']/../following-sibling::td//a//img[@title='Set as Done']`);
  }

  checkEventStatusDate(event: string): Locator {
    return this.page.locator(`//a[normalize-space()='${event}']/../following-sibling::td//a[@title='Event Status History']`);
  }

  selectCheckBoxByText1(text1: string, text2: string): Locator {
    return this.page.locator(`//td[normalize-space()='${text2}']/parent::tr /following-sibling::tr[1]//a[normalize-space()='${text1}']`);
  }

  deleteWithIDstudyPatientPage(id: string): Locator {
    return this.page.locator(`//*[contains(text(),'${id}')]/../../../td[23]//a[@title='Delete']/img`);
  }

  EventDropdownBySpan(text: string, row: string): Locator {
    return this.page.locator(`//td[contains(text(),'${text}')]//following::td//select[contains(@name,'${row}')]`);
  }

  patientDropdownBySchedule(text: string): Locator {
    return this.page.locator(`(//select[contains(@name,'${text}')])[2]`);
  }

  /* ══════════════════════════════════════════════════════════
     Action Methods from Step_VelosPatientPage.java
     ══════════════════════════════════════════════════════════ */

  async createNewPatient(opts: {
    firstName: string; lastName: string; patientId: string;
    dob: string; organization: string; survivalStatus: string;
    eSign?: string;
  }) {
    const dynamic = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(4, 12);
    const pid = opts.patientId || dynamic;
    const lastName = opts.lastName + dynamic;

    await this.PID.fill(pid);
    await this.fName.fill(opts.firstName);
    await this.lName.fill(lastName);

    const dob = opts.dob === 'today'
      ? new Date().toLocaleDateString('en-US')
      : opts.dob;
    await this.DOB.fill(dob);

    await this.Organization.selectOption({ label: opts.organization });
    await this.survivalStatus.selectOption({ label: opts.survivalStatus });
    await this.page.locator('#eSign').first().fill(opts.eSign ?? process.env.ESIGN ?? '1234');
    await this.submitButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterESignatureAndSubmit(eSignature: string) {
    await this.page.locator('#eSign').first().fill(eSignature);
    await this.submitButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clearESignatureField() {
    await this.page.locator('#eSign').first().clear();
  }

  async enterDateInField(dateType: string, field: string) {
    const fieldLocator = this.searchForm(field).first();
    switch (dateType) {
      case 'yesterday':
        await fieldLocator.click();
        await this.selectdateLesserThanCurrentDate.first().click();
        break;
      case 'today':
        await fieldLocator.click();
        await this.selectCurrentDate.first().click();
        break;
      case 'tomorrow':
        await fieldLocator.click();
        await this.selectDateGreaterThanCurrentDate.first().click();
        break;
      default:
        await fieldLocator.clear();
        await fieldLocator.click();
        await fieldLocator.fill(dateType);
        await fieldLocator.press('Enter');
    }
  }

  async enterPatientDetails(pid: string, firstName: string, lastName: string, facilityID: string) {
    await this.PID.fill(pid);
    await this.fName.fill(firstName);
    await this.lName.fill(lastName);
    await this.patientfacilityID.fill(facilityID);
  }

  async enterDOB(dob: string) {
    const dobValue = dob === 'today' ? new Date().toLocaleDateString('en-US') : dob;
    await this.DOB.click();
    await this.DOB.fill(dobValue);
    await this.lName.click();
  }

  async verifyDropdownValuePresent(dropdownfieldName: string, dropdownvalue: string) {
    const isPresent = await this.verifyDropdownValue(dropdownfieldName, dropdownvalue).isVisible().catch(() => false);
    expect(isPresent).toBeTruthy();
  }

  async clickDropdown(text: string) {
    await this.patientDropdownByText(text).first().click();
  }

  async selectGender(value: string) {
    await this.genderDropclick.click();
    await this.genderDropclick.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectCategory(value: string) {
    await this.categoryDropdown.click();
    await this.categoryDropdown.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async editTestResult(text: string) {
    await this.testResult.click();
    await this.testResult.clear();
    await this.testResult.fill(text);
  }

  async selectOrganization(value: string) {
    await this.orgDropdownNew.click();
    await this.orgDropdownNew.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectEnrolledOn(value: string) {
    await this.enrolledOnDropdown.click();
    await this.enrolledOnDropdown.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectPatientStatus(value: string) {
    await this.patientStatusDropdown.click();
    await this.patientStatusDropdown.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectFormStatus(value: string) {
    await this.formStatus.click();
    await this.formStatus.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSearchButton() {
    await this.searchButton.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSubmitButton() {
    await this.submitButton.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickBackButton() {
    await this.backBtn.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async searchPatient(fieldName: string, value: string) {
    await this.page.locator(`input[name='${fieldName}'], input[id='${fieldName}']`).first().fill(value);
    await this.clickSearchButton();
  }

  async fillField(fieldName: string, value: string) {
    await this.searchForm(fieldName).first().clear();
    await this.searchForm(fieldName).first().fill(value);
  }

  async selectDropdownValue(fieldName: string, value: string) {
    const dropdown = this.patientDropdownByText(fieldName).first();
    await dropdown.click();
    await dropdown.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyFieldValue(fieldName: string, value: string) {
    await expect(this.verifyValueInField(fieldName, value).first()).toBeVisible();
  }

  async verifySelectedDropdownValue(fieldName: string, value: string) {
    await expect(this.verifySelectedValueInField(fieldName, value).first()).toBeVisible();
  }

  async tickExcludePatientsNotEnrolled() {
    await this.ExcludePatientsNotCurrentlyEnrolledCheckbox.click();
  }

  async clickEditIconFirstLink() {
    await this.editImageProtocols.click();
  }

  async navigateToProtocolTab() {
    await this.protocolTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectScheduleFromDropdown(scheduleName: string) {
    await this.selectSchedule.selectOption({ label: scheduleName });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSaveButton() {
    await this.saveButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickGoButton() {
    await this.goButton.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyDataSavedSuccessfully() {
    await expect(this.dataSavedMsg.first()).toBeVisible();
  }

  async selectFilterByDate(criteria: string) {
    await this.filterByDateDropdown.click();
    await this.filterByDateDropdown.selectOption({ label: criteria });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAddNewAE() {
    await this.addNewAE.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAddMultipleAE() {
    await this.addMultipleAE.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectAdverseEventType(value: string) {
    await this.adverseEventType.selectOption({ label: value });
  }

  async fillAdverseEventName(value: string) {
    await this.adverseEventName.fill(value);
  }

  async clickDeleteSchedule() {
    this.page.once('dialog', (d) => d.accept());
    await this.deleteSchedule.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickEditMultipleEvents() {
    await this.editMultipleEvents.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickUpdateAllSelectedRows() {
    await this.updateAllSelectedRows.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectStatusDropdown(value: string) {
    await this.statusDropdown.selectOption({ label: value });
  }

  async fillStatusValidFrom(date: string) {
    await this.statusValidFrom.fill(date);
  }

  async clickAddNewTreatmentArm() {
    await this.addNewTreatArm.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectTreatment(value: string) {
    await this.treatment.selectOption({ label: value });
  }

  async selectUnit(value: string) {
    await this.unitDropdown.click();
    await this.unitDropdown.selectOption({ label: value });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyPatientPresent(patientId: string) {
    await expect(this.page.getByText(patientId).first()).toBeVisible();
  }

  async clickCloseButton() {
    await this.firstCloseButton.first().click();
  }

  async clickViewPrevious() {
    await this.viewPrevious.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickEditVisits() {
    await this.editVisitClickLink.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectSchedule_Action(action: string) {
    await this.actionToBePerformed.selectOption({ label: action });
  }

  async clickAddUnscheduledEvent() {
    await this.AddUnscheduledEventFirst.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectReasonForChange(text: string) {
    await this.reasonForChange.fill(text);
  }

  async clickStudyIcon() {
    await this.studyLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickRegisterNewOrg() {
    await this.registerNewOrg.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectOrgDropdown(value: string) {
    await this.orgSelect.selectOption({ label: value });
  }

  async clickSubmitAndAddAnother() {
    await this.submitAndAddAnother.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSelectButton() {
    await this.selectButton.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
