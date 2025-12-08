import { test, expect } from '@playwright/test';

test('Learning selectors!', async ({ page }) => {
    // Navigate to the desired web page
    await page.goto('http://127.0.0.1:5500/clickMe.html');
    
    // 1. Selecting by ID
    await page.locator('#clickButton').click();

    // 2. Selecting by Class
    await page.locator('.button-style').click();

    // 3. Selecting by Tag Name and Class
    await page.locator('button.button-style').click();

    // 4. Selecting by Attribute value
    await page.locator('[data-action="increment"]').click();
    // await page.locator('[id="clickButton"]').click();
    // await page.locator('[class="button-style"]').click();

    // 5. Selecting by Partial Attribute value
    await page.locator('[role*="but"]').click();

    // 6. Selecting by Text Content
    await page.locator('text=CLICK ME').click();

    // 7. Combining Selectors for precision, Class and Text Content - find exact text match
    await page.locator('.button-style:text("CLICK ME")').click();

    // 8. Find elements containing specific text, has-text
    await page.locator('button:has-text("click m")').click();

    // 9. Combining Selectors for precision, Attribute and Text 
    await page.locator('[data-action="increment"]:text("CLICK ME")').click();

    // 10. Playwright locators - https://playwright.dev/docs/locators
    // Get by text
    await page.getByText('CLICK ME').click();

    // 11. Playwright locators - https://playwright.dev/docs/locators
    // Get by role
    await page.getByRole('button', { name: /click me/i }).click();

    // Assert the final count is 11
    await expect(page.locator('#counter')).toContainText('11')
});
