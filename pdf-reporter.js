const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

class PDFReporter {
  constructor(options) {
    this.outputDir = options?.outputDir || 'playwright-report';
    this.testResults = [];
  }

  onTestEnd(test, result) {
    // Collect screenshots from attachments
    const screenshots = [];
    for (const attachment of result.attachments) {
      if (attachment.contentType && attachment.contentType.startsWith('image/')) {
        if (attachment.path && fs.existsSync(attachment.path)) {
          const imgData = fs.readFileSync(attachment.path).toString('base64');
          screenshots.push(`data:${attachment.contentType};base64,${imgData}`);
        } else if (attachment.body) {
          const imgData = attachment.body.toString('base64');
          screenshots.push(`data:${attachment.contentType};base64,${imgData}`);
        }
      }
    }

    // Collect stdout and stderr
    const stdout = result.stdout?.map(s => (typeof s === 'string' ? s : s.toString('utf-8'))).join('\n') || '';
    const stderr = result.stderr?.map(s => (typeof s === 'string' ? s : s.toString('utf-8'))).join('\n') || '';

    // Collect all errors (there can be multiple)
    const errors = (result.errors || []).map(e => ({
      message: e.message || '',
      stack: e.stack || '',
    }));

    // Fallback to single error if errors array is empty
    if (errors.length === 0 && result.error) {
      errors.push({
        message: result.error.message || '',
        stack: result.error.stack || '',
      });
    }

    this.testResults.push({
      title: test.title,
      suite: test.parent?.title || '',
      file: test.location?.file ? path.basename(test.location.file) : '',
      status: result.status,
      duration: result.duration,
      screenshots,
      errors,
      stdout,
      stderr,
    });
  }

  async onEnd(result) {
    if (this.testResults.length === 0) {
      console.log('\n⚠️  No test results collected. Skipping PDF generation.');
      return;
    }

    await this.generatePDF(result.status);
  }

  _buildHTML(overallStatus) {
    const passed = this.testResults.filter(t => t.status === 'passed').length;
    const failed = this.testResults.filter(t => t.status === 'failed').length;
    const skipped = this.testResults.filter(t => t.status === 'skipped').length;
    const total = this.testResults.length;

    const statusColor = (s) => {
      if (s === 'passed') return '#22c55e';
      if (s === 'failed') return '#ef4444';
      if (s === 'skipped') return '#eab308';
      return '#6b7280';
    };

    const statusBadge = (s) =>
      `<span style="display:inline-block;padding:2px 10px;border-radius:4px;color:#fff;font-size:12px;font-weight:600;background:${statusColor(s)};">${s.toUpperCase()}</span>`;

    let testCards = '';
    for (const t of this.testResults) {
      const screenshotImgs = t.screenshots.length > 0
        ? t.screenshots.map(src =>
            `<div style="margin-top:10px;">
              <img src="${src}" style="max-width:100%;border:1px solid #ddd;border-radius:4px;" />
            </div>`
          ).join('')
        : '<p style="color:#999;font-size:12px;margin-top:8px;">No screenshot captured</p>';

      testCards += `
        <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:20px;page-break-inside:avoid;background:#fff;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <h3 style="margin:0;font-size:16px;color:#1f2937;">${t.title}</h3>
            ${statusBadge(t.status)}
          </div>
          <p style="margin:4px 0;font-size:12px;color:#6b7280;">
            File: ${t.file} ${t.suite ? '| Suite: ' + t.suite : ''} | Duration: ${(t.duration / 1000).toFixed(2)}s
          </p>
          ${t.errors && t.errors.length > 0 ? t.errors.map((err, idx) => `
            <div style="margin-top:10px;">
              <strong style="font-size:13px;color:#991b1b;">Error${t.errors.length > 1 ? ' #' + (idx + 1) : ''}:</strong>
              <pre style="background:#fef2f2;color:#991b1b;padding:8px;border-radius:4px;font-size:11px;overflow-x:auto;margin-top:4px;white-space:pre-wrap;word-break:break-word;">${(err.stack || err.message).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </div>`).join('') : ''}
          ${t.stderr ? `
            <div style="margin-top:10px;">
              <strong style="font-size:13px;color:#991b1b;">Stderr:</strong>
              <pre style="background:#fef2f2;color:#991b1b;padding:8px;border-radius:4px;font-size:11px;overflow-x:auto;margin-top:4px;white-space:pre-wrap;word-break:break-word;">${t.stderr.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </div>` : ''}
          ${t.stdout ? `
            <div style="margin-top:10px;">
              <strong style="font-size:13px;color:#374151;">Stdout:</strong>
              <pre style="background:#f0fdf4;color:#166534;padding:8px;border-radius:4px;font-size:11px;overflow-x:auto;margin-top:4px;white-space:pre-wrap;word-break:break-word;">${t.stdout.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </div>` : ''}
          <div style="margin-top:8px;">
            <strong style="font-size:13px;color:#374151;">Screenshot:</strong>
            ${screenshotImgs}
          </div>
        </div>`;
    }

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #f9fafb; color: #1f2937; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { margin: 0 0 6px 0; font-size: 26px; }
    .summary { display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; }
    .summary-card { padding: 12px 24px; border-radius: 8px; text-align: center; color: #fff; min-width: 80px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Playwright Test Report</h1>
    <p style="color:#6b7280;font-size:14px;">Generated on ${new Date().toLocaleString()}</p>
  </div>

  <div class="summary">
    <div class="summary-card" style="background:#22c55e;"><div style="font-size:24px;font-weight:700;">${passed}</div><div style="font-size:12px;">Passed</div></div>
    <div class="summary-card" style="background:#ef4444;"><div style="font-size:24px;font-weight:700;">${failed}</div><div style="font-size:12px;">Failed</div></div>
    <div class="summary-card" style="background:#eab308;"><div style="font-size:24px;font-weight:700;">${skipped}</div><div style="font-size:12px;">Skipped</div></div>
    <div class="summary-card" style="background:#3b82f6;"><div style="font-size:24px;font-weight:700;">${total}</div><div style="font-size:12px;">Total</div></div>
  </div>

  ${testCards}
</body>
</html>`;
  }

  async generatePDF(overallStatus) {
    try {
      console.log('\n🔄 Generating PDF report with screenshots...');

      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      const htmlContent = this._buildHTML(overallStatus);

      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.setContent(htmlContent, { waitUntil: 'load' });

      const pdfPath = path.join(this.outputDir, 'test-report.pdf');
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
        headerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center; color: #999;">Playwright Test Report</div>',
        footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center; color: #999;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
      });

      await browser.close();
      console.log(`✅ PDF Report generated successfully!\n📄 Location: ${path.resolve(pdfPath)}\n`);
    } catch (err) {
      console.error('\n❌ PDF generation failed:', err.message, '\n');
    }
  }
}

module.exports = PDFReporter;
