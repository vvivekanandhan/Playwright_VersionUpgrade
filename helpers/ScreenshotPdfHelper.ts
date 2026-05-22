import { type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Use require for CommonJS module
const PDFDocument = require('pdfkit');

/**
 * Helper class to capture screenshots with comments and save as PDF
 */
export class ScreenshotPdfHelper {
  private page: Page;
  private testName: string;
  private screenshotCount: number = 0;
  private screenshots: Array<{ path: string; comment: string; timestamp: string }> = [];
  private pdfPath: string;

  constructor(page: Page, testName: string) {
    this.page = page;
    this.testName = testName.replace(/[^a-z0-9]/gi, '_');
    
    // Create test-results directory if it doesn't exist
    const testResultsDir = path.join(process.cwd(), 'test-results', this.testName);
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
    }
    
    this.pdfPath = path.join(testResultsDir, `${this.testName}_screenshots.pdf`);
  }

  /**
   * Capture a screenshot with a comment
   * @param comment - Description/comment for the screenshot
   */
  async captureScreenshot(comment: string) {
    this.screenshotCount++;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `screenshot_${this.screenshotCount}_${timestamp}.png`;
    const screenshotDir = path.join(process.cwd(), 'test-results', this.testName);
    const screenshotPath = path.join(screenshotDir, screenshotName);

    // Take screenshot
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Store screenshot info
    this.screenshots.push({
      path: screenshotPath,
      comment: comment,
      timestamp: new Date().toLocaleString()
    });

    console.log(`📸 Screenshot captured: ${comment}`);
  }

  /**
   * Generate PDF from all captured screenshots
   */
  async generatePDF() {
    if (this.screenshots.length === 0) {
      console.log('No screenshots to generate PDF');
      return;
    }

    return new Promise<void>((resolve, reject) => {
      try {
        const doc = new PDFDocument({ 
          autoFirstPage: false,
          bufferPages: true
        });
        const writeStream = fs.createWriteStream(this.pdfPath);
        
        doc.pipe(writeStream);

        // Add title page
        doc.addPage({ margin: 50 });
        doc.fontSize(20).text(`Test Report: ${this.testName}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
        doc.fontSize(12).text(`Total Screenshots: ${this.screenshots.length}`, { align: 'center' });
        
        // Add each screenshot with comment
        this.screenshots.forEach((screenshot, index) => {
          doc.addPage({ margin: 30 });
          
          // Add comment header
          doc.fontSize(14).fillColor('#333333')
            .text(`Screenshot ${index + 1}: ${screenshot.comment}`, { 
              align: 'left',
              underline: true 
            });
          doc.fontSize(10).fillColor('#666666')
            .text(`Captured at: ${screenshot.timestamp}`, { align: 'left' });
          doc.moveDown();

          // Add screenshot image
          try {
            const imageBuffer = fs.readFileSync(screenshot.path);
            const pageWidth = doc.page.width - 60; // accounting for margins
            const pageHeight = doc.page.height - 150; // accounting for text and margins
            
            doc.image(imageBuffer, 30, doc.y, {
              fit: [pageWidth, pageHeight],
              align: 'center'
            });
          } catch (error) {
            doc.fontSize(10).fillColor('red')
              .text(`Error loading screenshot: ${error}`, { align: 'center' });
          }
        });

        doc.end();

        writeStream.on('finish', () => {
          console.log(`📄 PDF generated: ${this.pdfPath}`);
          resolve();
        });

        writeStream.on('error', (error) => {
          console.error('Error writing PDF:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        reject(error);
      }
    });
  }

  /**
   * Get the PDF path
   */
  getPdfPath(): string {
    return this.pdfPath;
  }

  /**
   * Get screenshot count
   */
  getScreenshotCount(): number {
    return this.screenshotCount;
  }
}
