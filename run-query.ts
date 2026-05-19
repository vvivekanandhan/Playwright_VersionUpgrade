import { DBHelper } from './helpers/DBHelper';

(async () => {
  const db = new DBHelper();
  try {
    await db.connect();
    const rows = await db.query(
      `SELECT pk_codelst FROM er_codelst WHERE codelst_subtyp = 'active' AND codelst_type = 'studystat'`
    );
    console.log('Result:', rows);
  } catch (err) {
    console.error('Query failed:', err);
  } finally {
    await db.close();
  }
})();
