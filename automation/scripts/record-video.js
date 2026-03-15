import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function record() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: { dir: path.join(__dirname, '../../ui/videos/') },
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  
  try {
    // Step 1
    await page.goto('http://localhost:5173');
    await page.fill('[data-testid="postcode-input"]', 'SW1A 1AA');
    await page.click('[data-testid="postcode-submit"]');
    await page.waitForSelector('[data-testid="address-list"]');
    await page.click('[data-testid="address-option-addr_1"]');
    
    // Step 2
    await page.waitForURL('**/step/2');
    await page.click('[data-testid="waste-type-general"]');
    await page.click('[data-testid="step2-continue"]');
    
    // Step 3
    await page.waitForURL('**/step/3');
    await page.click('[data-testid="skip-card-4-yard"]');
    await page.click('[data-testid="step3-continue"]');
    
    // Step 4
    await page.waitForURL('**/step/4');
    await page.click('[data-testid="confirm-button"]');
    await page.waitForSelector('[data-testid="booking-success"]');
  } finally {
    // Close context to ensure video is saved
    await context.close();
    await browser.close();
    
    // Rename video
    const videosDir = path.join(__dirname, '../../ui/videos/');
    const files = fs.readdirSync(videosDir);
    const webmFile = files.find(f => f.endsWith('.webm') && f !== 'booking-flow.webm');
    
    if (webmFile) {
      fs.renameSync(
        path.join(videosDir, webmFile),
        path.join(videosDir, 'booking-flow.webm')
      );
      console.log('Video saved to ui/videos/booking-flow.webm ✅');
    }
  }
}

record().catch(console.error);
