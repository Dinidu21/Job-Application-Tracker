const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    registrationUrl: 'https://job-application-tracker-rose-psi.vercel.app/register',
    numberOfUsers: 5,
    timeout: 30000,
    screenshotOnError: true,
    debugMode: process.env.DEBUG === 'true'
};

// Generate realistic user data
function generateUserData(index) {
    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const timestamp = Date.now();

    return {
        fullName: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${timestamp}.${index}@testuser.com`,
        password: `TestPass${timestamp}${index}!`
    };
}

// Browser and device configurations for variety
const getBrowserConfig = () => {
    const configs = [
        { browserType: 'chromium', device: 'Desktop Chrome' },
        { browserType: 'chromium', device: 'Pixel 5' },
        { browserType: 'chromium', device: 'iPhone 12' },
        { browserType: 'firefox', device: 'Desktop Firefox' },
        { browserType: 'webkit', device: 'Desktop Safari' }
    ];
    return configs[Math.floor(Math.random() * configs.length)];
};

// Log with timestamp
function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
}

// Save error to file
async function saveError(error, userData, context) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const errorFile = `error_${timestamp}.txt`;

    const errorContent = `
=== Registration Error Report ===
Timestamp: ${new Date().toISOString()}
User Data: ${JSON.stringify(userData, null, 2)}
Context: ${context}

Error Details:
${error.stack || error.message || error}

Environment:
- Node Version: ${process.version}
- Platform: ${process.platform}
- Architecture: ${process.arch}
`;

    await fs.writeFile(errorFile, errorContent, 'utf8');
    log(`Error details saved to ${errorFile}`, 'ERROR');
    return errorFile;
}

// Main registration function
async function registerUser(userData, browserConfig, index) {
    let browser = null;
    let context = null;
    let page = null;

    try {
        log(`Starting registration for user ${index + 1}: ${userData.email}`);

        // Select browser type
        const { browserType, device } = browserConfig;
        let browserEngine;

        switch (browserType) {
            case 'firefox':
                browserEngine = firefox;
                break;
            case 'webkit':
                browserEngine = webkit;
                break;
            default:
                browserEngine = chromium;
        }

        // Launch browser
        log(`Launching ${browserType} browser`);
        browser = await browserEngine.launch({
            headless: process.env.HEADLESS !== 'false'
        });

        // Create context with device emulation if specified
        const contextOptions = {
            locale: 'en-US',
            timezoneId: 'America/New_York'
        };

        // Add device emulation for mobile devices
        if (device.includes('Pixel') || device.includes('iPhone')) {
            const devices = require('playwright').devices;
            Object.assign(contextOptions, devices[device] || {});
        }

        context = await browser.newContext(contextOptions);
        page = await context.newPage();

        // Set longer timeout
        page.setDefaultTimeout(CONFIG.timeout);

        log(`Navigating to ${CONFIG.registrationUrl}`);
        const response = await page.goto(CONFIG.registrationUrl, {
            waitUntil: 'networkidle'
        });

        log(`Page loaded with status: ${response.status()}`);

        // Debug: Take screenshot if enabled
        if (CONFIG.debugMode) {
            await page.screenshot({
                path: `debug_${index + 1}_loaded.png`,
                fullPage: true
            });
            log(`Debug screenshot saved: debug_${index + 1}_loaded.png`);
        }

        // Wait for form to be visible
        log('Waiting for registration form...');
        await page.waitForSelector('input[type="text"], input[name*="name"], input[placeholder*="name"]', {
            state: 'visible',
            timeout: CONFIG.timeout
        });

        // Find and fill form fields
        log('Filling registration form...');

        // Full Name field - try multiple selectors
        const nameSelectors = [
            'input[name="fullName"]',
            'input[name="name"]',
            'input[name="fullname"]',
            'input[placeholder*="name" i]',
            'input[type="text"]:first-of-type'
        ];

        let nameFilled = false;
        for (const selector of nameSelectors) {
            if (await page.locator(selector).count() > 0) {
                await page.fill(selector, userData.fullName);
                log(`Filled name: ${userData.fullName}`);
                nameFilled = true;
                break;
            }
        }

        if (!nameFilled) {
            throw new Error('Could not find name input field');
        }

        // Email field
        const emailSelectors = [
            'input[name="email"]',
            'input[type="email"]',
            'input[placeholder*="email" i]'
        ];

        let emailFilled = false;
        for (const selector of emailSelectors) {
            if (await page.locator(selector).count() > 0) {
                await page.fill(selector, userData.email);
                log(`Filled email: ${userData.email}`);
                emailFilled = true;
                break;
            }
        }

        if (!emailFilled) {
            throw new Error('Could not find email input field');
        }

        // Password field
        const passwordSelectors = [
            'input[name="password"]',
            'input[type="password"]',
            'input[placeholder*="password" i]'
        ];

        let passwordFilled = false;
        for (const selector of passwordSelectors) {
            if (await page.locator(selector).count() > 0) {
                await page.fill(selector, userData.password);
                log(`Filled password`);
                passwordFilled = true;
                break;
            }
        }

        if (!passwordFilled) {
            throw new Error('Could not find password input field');
        }

        // Debug screenshot before submit
        if (CONFIG.debugMode) {
            await page.screenshot({
                path: `debug_${index + 1}_filled.png`,
                fullPage: true
            });
            log(`Debug screenshot saved: debug_${index + 1}_filled.png`);
        }

        // Submit form
        log('Submitting registration form...');
        const submitSelectors = [
            'button[type="submit"]',
            'button:has-text("Register")',
            'button:has-text("Sign up")',
            'button:has-text("Create")',
            'input[type="submit"]'
        ];

        let submitted = false;
        for (const selector of submitSelectors) {
            if (await page.locator(selector).count() > 0) {
                await page.click(selector);
                submitted = true;
                break;
            }
        }

        if (!submitted) {
            throw new Error('Could not find submit button');
        }

        // Wait for navigation or success indicator
        log('Waiting for response...');
        await page.waitForTimeout(3000);

        // Check for success or error messages
        const currentUrl = page.url();
        log(`Current URL after submit: ${currentUrl}`);

        // Debug screenshot after submit
        if (CONFIG.debugMode) {
            await page.screenshot({
                path: `debug_${index + 1}_submitted.png`,
                fullPage: true
            });
            log(`Debug screenshot saved: debug_${index + 1}_submitted.png`);
        }

        // Capture network info
        const userAgent = await page.evaluate(() => navigator.userAgent);
        log(`User-Agent: ${userAgent}`);

        const result = {
            success: true,
            userData,
            userAgent,
            browserType,
            device,
            url: currentUrl,
            timestamp: new Date().toISOString()
        };

        log(`✓ Successfully registered user ${index + 1}: ${userData.email}`, 'SUCCESS');
        return result;

    } catch (error) {
        log(`✗ Failed to register user ${index + 1}: ${error.message}`, 'ERROR');

        // Save screenshot on error
        if (CONFIG.screenshotOnError && page) {
            try {
                await page.screenshot({
                    path: `error_${index + 1}.png`,
                    fullPage: true
                });
                log(`Error screenshot saved: error_${index + 1}.png`);
            } catch (screenshotError) {
                log(`Failed to save error screenshot: ${screenshotError.message}`, 'ERROR');
            }
        }

        // Save error details
        await saveError(error, userData, `User ${index + 1} registration`);

        return {
            success: false,
            userData,
            error: error.message,
            timestamp: new Date().toISOString()
        };

    } finally {
        // Cleanup
        if (page) await page.close().catch(() => { });
        if (context) await context.close().catch(() => { });
        if (browser) await browser.close().catch(() => { });
    }
}

// Main execution
async function main() {
    log('=== User Registration Simulator Started ===');
    log(`Target URL: ${CONFIG.registrationUrl}`);
    log(`Number of users: ${CONFIG.numberOfUsers}`);
    log(`Debug mode: ${CONFIG.debugMode}`);

    const results = [];

    for (let i = 0; i < CONFIG.numberOfUsers; i++) {
        const userData = generateUserData(i);
        const browserConfig = getBrowserConfig();

        log(`\n--- Processing User ${i + 1}/${CONFIG.numberOfUsers} ---`);

        const result = await registerUser(userData, browserConfig, i);
        results.push(result);

        // Add delay between registrations to appear more natural
        if (i < CONFIG.numberOfUsers - 1) {
            const delay = 2000 + Math.random() * 3000;
            log(`Waiting ${Math.round(delay)}ms before next registration...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    // Save results summary
    const summary = {
        totalUsers: CONFIG.numberOfUsers,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results,
        timestamp: new Date().toISOString()
    };

    const summaryFile = `registration_summary_${Date.now()}.json`;
    await fs.writeFile(summaryFile, JSON.stringify(summary, null, 2), 'utf8');

    log('\n=== Registration Summary ===');
    log(`Total: ${summary.totalUsers}`);
    log(`Successful: ${summary.successful}`, 'SUCCESS');
    log(`Failed: ${summary.failed}`, summary.failed > 0 ? 'ERROR' : 'INFO');
    log(`Summary saved to: ${summaryFile}`);

    // Exit with error code if any failed
    process.exit(summary.failed > 0 ? 1 : 0);
}

// Run the script
main().catch(async (error) => {
    log(`Fatal error: ${error.message}`, 'ERROR');
    await saveError(error, {}, 'Main execution');
    process.exit(1);
});