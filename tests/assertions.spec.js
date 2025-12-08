import { test, expect } from '@playwright/test';

test.describe.only('Learning assertions!', () => {
    test('Verify web page behavior', async ({ page }) => {
        // Navigate to the desired web page
        await page.goto('https://the-internet.herokuapp.com/');

        // 1. To have URL
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

        // 2. To have a Title
        await expect(page).toHaveTitle('The Internet');
    });

    test('Continue with assertions - part 1', async ({ page }) => {
        // Navigate to the desired web page
        await page.goto('https://the-internet.herokuapp.com/');

        // 3. Assert visibility of an element
        await expect(page.locator('h1')).toBeVisible();

        // 4. Assert the text content of an element
        await expect(page.locator('h2')).toHaveText('Available Examples');

        // 5. Assert contains text
        await expect(page.locator('body')).toContainText('WYSIWYG');
    });

    test('Continue with assertions - part 2', async ({ page }) => {
        // Navigate to the desired web page
        await page.goto('https://the-internet.herokuapp.com/');

        // 6. Assert the count of elements
        await expect(page.locator('a')).toHaveCount(46);

        // 7. Elements to be checked
        // Navigate to the checkboxes page
        await page.goto('https://the-internet.herokuapp.com/checkboxes');

        await page.waitForTimeout(1000);
        await page.waitForLoadState('networkidle');

        let checkbox =  await page.getByRole('checkbox').nth(0);
        await checkbox.waitFor();

        await page.getByRole('checkbox').nth(0).check();
        await page.getByRole('checkbox').nth(1).uncheck();

        await expect(page.getByRole('checkbox').nth(0)).toBeChecked();
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();
    });

    test('Continue with assertions - part 3', async ({ page }) => {
        // Navigate to the desired web page
        await page.goto('https://the-internet.herokuapp.com/login');

        // 8. Have value assertion
        await page.locator('#username').fill('tomsmith');
        await expect(page.locator('#username')).toHaveValue('tomsmith');


        // 9. Element is enabled assertion
        await expect(page.locator('button[type="submit"]')).toBeEnabled();

        // 10. Element is disabled assertion
        // For demonstration, let's disable the button using JavaScript
        await page.evaluate(() => {
            document.querySelector('button[type="submit"]').disabled = true;
        });
        await expect(page.locator('button[type="submit"]')).toBeDisabled();

    });

    test('Continue with assertions - part 4', async ({ page }) => {
        // Navigate to the desired web page
        await page.goto('https://the-internet.herokuapp.com/');

        // 11. Store text in variable and verify content
        const headerText = await page.locator('h1').textContent();
        expect(headerText).toBe('Welcome to the-internet');
    });
        
    
});
