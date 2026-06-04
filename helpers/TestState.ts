import fs from 'fs';
import path from 'path';

const envFilePath = path.resolve(process.cwd(), process.env.ENV_FILE || '.env.ctrlv13');

/**
 * Centralized test state manager.
 * - Setting a property auto-persists it to the .env file and process.env.
 * - Getting a property resolves from in-memory first, then falls back to process.env.
 * - Throws if a value is missing on get.
 */
export class TestState {
  private cache: Record<string, string> = {};

  private static readonly keyMap: Record<string, string> = {
    categoryName: 'LAST_CREATED_CATEGORY_NAME',
    formCategoryName: 'LAST_CREATED_FORM_CATEGORY_NAME',
    formName: 'LAST_CREATED_FORM_NAME',
    eventCategoryName: 'LAST_CREATED_EVENT_CATEGORY_NAME',
    calendarName: 'LAST_CREATED_CALENDAR_NAME',
    patientId: 'LAST_CREATED_PATIENT_ID',
    studyNumber: 'LAST_CREATED_STUDY_NUMBER',
    invoiceNumber: 'LAST_CREATED_INVOICE_NUMBER',
    studyStatusLabel: 'STUDY_STATUS_LABEL',
    patientStatusLabel: 'PATIENT_STATUS_LABEL',
  };

  constructor() {
    return new Proxy(this, {
      get(target, prop: string) {
        if (prop in TestState.keyMap) {
          const envKey = TestState.keyMap[prop];
          const value = target.cache[prop] || process.env[envKey];
          if (!value) {
            throw new Error(`${prop} is missing. Generate it in a prior test or set ${envKey} in ${envFilePath}.`);
          }
          return value;
        }
        return (target as any)[prop];
      },
      set(target, prop: string, value: string) {
        if (prop in TestState.keyMap) {
          if (value == null) return true; // Ignore undefined from class field init
          target.cache[prop] = value;
          const envKey = TestState.keyMap[prop];
          process.env[envKey] = value;
          TestState.upsertEnvValue(envKey, value);
          return true;
        }
        (target as any)[prop] = value;
        return true;
      },
    });
  }

  private static upsertEnvValue(key: string, value: string) {
    const safeValue = value.replace(/\r?\n/g, ' ').trim();
    const existingContent = fs.existsSync(envFilePath)
      ? fs.readFileSync(envFilePath, 'utf8')
      : '';

    const keyLineRegex = new RegExp(`^${key}=.*$`, 'm');
    const nextLine = `${key}=${safeValue}`;
    const updatedContent = keyLineRegex.test(existingContent)
      ? existingContent.replace(keyLineRegex, nextLine)
      : `${existingContent}${existingContent.endsWith('\n') || existingContent.length === 0 ? '' : '\n'}${nextLine}\n`;

    fs.writeFileSync(envFilePath, updatedContent, 'utf8');
  }

  // Properties managed by proxy
  categoryName!: string;
  formCategoryName!: string;
  formName!: string;
  eventCategoryName!: string;
  calendarName!: string;
  patientId!: string;
  studyNumber!: string;
  invoiceNumber!: string;
  studyStatusLabel!: string;
  patientStatusLabel!: string;
}
