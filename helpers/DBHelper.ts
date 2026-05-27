// eslint-disable-next-line @typescript-eslint/no-var-requires
const oracledb = require('oracledb');

/**
 * Oracle database helper for Playwright tests.
 *
 * Connection defaults (override via constructor options or environment variables):
 *   Host : 3.224.184.93
 *   Port : 1525
 *   SID  : ctrlv13
 */

interface DBConfig {
  user: string;
  password: string;
  host?: string;
  port?: number;
  sid?: string;
}

export class DBHelper {
  private config: Required<DBConfig>;
  private connection: any = null;

  constructor(options?: Partial<DBConfig>) {
    this.config = {
      user: options?.user ?? process.env.DB_USER ?? 'eres',
      password: options?.password ?? process.env.DB_PASSWORD ?? 'eres123',
      host: options?.host ?? process.env.DB_HOST ?? '3.224.184.93',
      port: options?.port ?? (Number(process.env.DB_PORT) || 1525),
      sid: options?.sid ?? process.env.DB_SID ?? 'ctrlv13',
    };
  }

  /** Build the Oracle connect string from host, port and SID. */
  private get connectString(): string {
    return `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${this.config.host})(PORT=${this.config.port}))(CONNECT_DATA=(SID=${this.config.sid})))`;
  }

  /** Open a connection. Safe to call multiple times — returns the existing connection if already open. */
  async connect(): Promise<any> {
    if (this.connection) {
      return this.connection;
    }

    try {
      // Use Thin mode (no Oracle Client required) — available in oracledb 6+
      oracledb.initOracleClient?.();
    } catch {
      // Thin mode is the default in newer versions; ignore if already initialised
    }

    this.connection = await oracledb.getConnection({
      user: this.config.user,
      password: this.config.password,
      connectString: this.connectString,
    });

    console.log('[DBHelper] Connected to Oracle DB');
    return this.connection;
  }

  /**
   * Execute a SQL query and return the result set.
   *
   * @param sql    - SQL statement (use `:name` bind variables for parameters)
   * @param params - Optional bind parameters
   *
   * @example
   *   const rows = await db.execute('SELECT * FROM studies WHERE study_id = :id', { id: 123 });
   */
  async execute<T = any>(sql: string, params: Record<string, any> = {}): Promise<any> {
    const conn = await this.connect();
    const result = await conn.execute(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result;
  }

  /**
   * Convenience wrapper — runs a SELECT and returns just the rows array.
   */
  async query<T = any>(sql: string, params: Record<string, any> = {}): Promise<T[]> {
    const result = await this.execute<T>(sql, params);
    return (result.rows ?? []) as T[];
  }

  /**
   * Return the pk_codelst values for active study status and its corresponding status type.
   * First query: SELECT pk_codelst, codelst_custom_col1 FROM er_codelst
   *              WHERE codelst_subtyp = 'active' AND codelst_type = 'studystat'
   * Second query: SELECT pk_codelst FROM er_codelst WHERE codelst_subtyp = :customCol1Value
   */
  async getActiveEnrollingStudyStatusCode(): Promise<{ pkCodelst: number; statusTypePk: number }> {
    // First query: Get active study status
    const rows = await this.query<{ PK_CODELST: number; CODELST_CUSTOM_COL1: string }>(
      `SELECT pk_codelst, codelst_custom_col1 FROM er_codelst WHERE codelst_subtyp = 'active' AND codelst_type = 'studystat'`
    );
    if (!rows.length) {
      throw new Error('No active study status code found in er_codelst');
    }
    
    const pkCodelst = rows[0].PK_CODELST;
    const customCol1 = rows[0].CODELST_CUSTOM_COL1;
    
    // Second query: Get status type using codelst_custom_col1 value
    const statusTypeRows = await this.query<{ PK_CODELST: number }>(
      `SELECT pk_codelst FROM er_codelst WHERE codelst_subtyp = :customCol1`,
      { customCol1 }
    );
    if (!statusTypeRows.length) {
      throw new Error(`No status type found for codelst_subtyp = '${customCol1}'`);
    }
    
    return {
      pkCodelst: pkCodelst,
      statusTypePk: statusTypeRows[0].PK_CODELST
    };
  }

  /**
   * Get the codelst_desc value for enrolled patient status
   * Query: SELECT codelst_desc FROM er_codelst WHERE codelst_subtyp = 'enrolled'
   */
  async getEnrolledPatientStatus(): Promise<string> {
    const rows = await this.query<{ CODELST_DESC: string }>(
      `SELECT codelst_desc FROM er_codelst WHERE codelst_subtyp = 'enrolled'`
    );
    if (!rows.length) {
      throw new Error('No enrolled patient status found in er_codelst');
    }
    return rows[0].CODELST_DESC;
  }

  /**
   * Get the codelst_desc (label) for the active enrolling study status.
   * This returns the text shown in milestone dropdowns (e.g. 'Enrolled', 'Enrolling').
   */
  async getActiveEnrollingStudyStatusDesc(): Promise<string> {
    const rows = await this.query<{ CODELST_DESC: string }>(
      `SELECT codelst_desc FROM er_codelst WHERE codelst_subtyp = 'active' AND codelst_type = 'studystat'`
    );
    if (!rows.length) {
      throw new Error('No active study status description found in er_codelst');
    }
    return rows[0].CODELST_DESC;
  }

  /** Close the connection gracefully. Call this in `afterAll` / `afterEach`. */
  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      console.log('[DBHelper] Connection closed');
    }
  }
}
