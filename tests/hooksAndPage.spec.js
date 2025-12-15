import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';
import { permission } from 'process';

// Browser => context => page
let browser;
let context;
let page;

test.describe('Describe block for hooks', () => {
    test.beforeAll( async () => {
        // Launch chromium browser before all tests
        browser = await chromium.launch({ headless: true });
        console.log('Before all hook launched Chromium browser!!!');
    });

    test.beforeEach( async () => {
        // Create context for a browser
        context = await browser.newContext();

        // Create a new page in the context
        page = await context.newPage();
        
        // Navigate to the desired URL before each test
        await page.goto('https://the-internet.herokuapp.com');
        console.log('Before each hook launched new page and navigated to URL!!!');

        // Pause execution
        await page.pause();
    });

    test.afterEach( async () => {
        // Close page and context 
        await page.close();
        await context.close();
        console.log('After each hook closed page and context!!!');
    });

    test.afterAll( async () => {
        // Close the browser after all tests
        await browser.close();
        console.log('After all hook closed the browser!!!');
    });

    test('A/B Test', async () => {
        await page.click('text="A/B Testing"');
        const header = await page.textContent('h3');
        expect(header).toBe('A/B Test Control');
    });

    test('Checkbox verification', async () => {
        await page.click('text="Checkboxes"');
        const checkbox = await page.isChecked('input[type="checkbox"]:first-child');
        expect(checkbox).toBe(false);
        
    });

    test.only('Geolocation setting in context and verification', async () => {
        context = await browser.newContext({
            permissions: ['geolocation'],
            geolocation: { latitude: 52.520007, longitude: 13.404954 },
            viewport: { width: 1280, height: 720 }
        });
        page = await context.newPage();
        console.log('Using context and page create within test and not within hooks!')
        await page.goto('https://the-internet.herokuapp.com/geolocation');
        await page.click('button');
        const lat = await page.textContent('#lat-value');
        const long = await page.textContent('#long-value');
        expect(parseFloat(lat)).toBeCloseTo(52.520007, 3);
        expect(parseFloat(long)).toBeCloseTo(13.404954, 3);
    });
});
