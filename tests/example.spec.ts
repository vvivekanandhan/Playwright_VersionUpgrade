import { test, expect } from '../fixtures/velosFixtures';
import { PatientDetails } from '../pages1/PatientDetails';

test('Create a new patient and verify via search', async ({ login, nav, page, patientData }) => {
  const patientDetails = new PatientDetails(page);
  const uniquePatientId = `${patientData.patientIdPrefix}${Date.now()}`;

  // Create patient
  await nav.navigateTo("Manage", "Patients", "New");
  await patientDetails.createPatient(uniquePatientId);

  // Search and verify patient
  await nav.navigateTo("Manage", "Patients", "Search");
  await patientDetails.searchPatient(uniquePatientId);
  await patientDetails.verifyPatientVisible(uniquePatientId);
});
