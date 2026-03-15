import { chromium } from '@playwright/test'

const DESKTOP = { width: 1280, height: 800 }
const MOBILE = { width: 375, height: 812 }

async function capture() {
  const browser = await chromium.launch()
  
  for (const [device, viewport] of [['desktop', DESKTOP], ['mobile', MOBILE]]) {
    const ctx = await browser.newContext({ viewport })
    const page = await ctx.newPage()
    
    // Step 1 — blank postcode
    await page.goto('http://localhost:5173')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step1-postcode.png`,
      fullPage: true 
    })
    
    // Step 1 — results
    await page.fill('[data-testid="postcode-input"]', 'SW1A 1AA')
    await page.click('[data-testid="postcode-submit"]')
    await page.waitForSelector('[data-testid="address-list"]')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step1-results.png`,
      fullPage: true 
    })
    
    // Step 1 — empty state
    await page.goto('http://localhost:5173')
    await page.fill('[data-testid="postcode-input"]', 'EC1A 1BB')
    await page.click('[data-testid="postcode-submit"]')
    await page.waitForSelector('[data-testid="manual-entry-form"]')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step1-empty-state.png`,
      fullPage: true 
    })
    
    // Step 1 — error state
    await fetch('http://localhost:5173/api/debug/reset-retry')
    await page.goto('http://localhost:5173')
    await page.fill('[data-testid="postcode-input"]', 'BS1 4DJ')
    await page.click('[data-testid="postcode-submit"]')
    await page.waitForSelector('[data-testid="error-state"]')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step1-error-retry.png`,
      fullPage: true 
    })
    
    // Step 1 — manual entry
    await page.click('[data-testid="retry-button"]')
    await page.waitForSelector('[data-testid="address-list"]')
    await page.click('[data-testid="manual-entry-toggle"]')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step1-manual-entry.png`,
      fullPage: true 
    })
    
    // Navigate to Step 2
    await page.goto('http://localhost:5173')
    await page.fill('[data-testid="postcode-input"]', 'SW1A 1AA')
    await page.click('[data-testid="postcode-submit"]')
    await page.waitForSelector('[data-testid="address-list"]')
    await page.click('[data-testid="address-option-addr_1"]')
    
    // Step 2 — waste types
    await page.waitForURL('**/step/2')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step2-waste-types.png`,
      fullPage: true 
    })
    
    // Step 2 — plasterboard options
    await page.click('[data-testid="waste-type-plasterboard"]')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step2-plasterboard-options.png`,
      fullPage: true 
    })
    
    // Navigate to Step 3 — general waste
    await page.click('[data-testid="waste-type-general"]')
    await page.click('[data-testid="step2-continue"]')
    await page.waitForURL('**/step/3')
    await page.waitForSelector('[data-testid^="skip-card"]')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step3-skips.png`,
      fullPage: true 
    })
    
    // Step 3 — disabled skips (navigate back, pick heavy)
    await page.click('[data-testid="step3-back"]')
    await page.click('[data-testid="waste-type-heavy"]')
    await page.click('[data-testid="step2-continue"]')
    await page.waitForURL('**/step/3')
    await page.waitForSelector('[data-testid^="skip-card"]')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step3-disabled-skips.png`,
      fullPage: true 
    })
    
    // Navigate to Step 4
    await page.click('[data-testid="skip-card-4-yard"]')
    await page.click('[data-testid="step3-continue"]')
    await page.waitForURL('**/step/4')
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step4-review.png`,
      fullPage: true 
    })
    
    // Step 4 — price breakdown (scroll into view)
    // Removed scrollIntoViewIfNeeded as page might not scroll
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step4-price-breakdown.png`,
      fullPage: true 
    })
    
    // Step 4 — success
    await page.click('[data-testid="confirm-button"]')
    await page.waitForSelector('[data-testid="booking-success"]', 
      { timeout: 5000 })
    await page.screenshot({ 
      path: `ui/screenshots/${device}/step4-success.png`,
      fullPage: true 
    })
    
    await ctx.close()
  }
  
  await browser.close()
  console.log('All screenshots captured ✅')
}

capture().catch(console.error)
