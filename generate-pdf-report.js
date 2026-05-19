const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

async function generatePDF() {
  const reportDir = 'playwright-report';
  const htmlReportPath = path.join(reportDir, 'index.html');
  
  if (!fs.existsSync(htmlReportPath)) {
    console.log('❌ HTML report not found at:', htmlReportPath);
    process.exit(1);
  }

  try {
    console.log('🔄 Generating PDF report from HTML...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.createBrowserContext();
    const page = await context.newPage();

    // Load HTML report
    const fileUrl = `file://${path.resolve(htmlReportPath)}`;
    await page.goto(fileUrl, { waitUntil: 'networkidle' }).catch(() => {});

    // Generate PDF
    const pdfPath = path.join(reportDir, 'test-report.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 12px; width: 100%; text-align: center; margin-bottom: 10px;">Playwright Test Report</div>',
      footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    });

    await browser.close();
    console.log(`✅ PDF Report generated successfully!\n📄 Location: ${path.resolve(pdfPath)}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ PDF generation failed:', err.message);
    process.exit(1);
  }
}

generatePDF();
