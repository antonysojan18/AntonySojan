const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => {
        if (msg.type() === 'error') console.log(`Console Error text: "${msg.text()}"`);
    });
    page.on('pageerror', exception => {
        console.log(`Uncaught exception: "${exception}"`);
    });
    await page.goto('http://localhost:8080/');
    await new Promise(r => setTimeout(r, 6000));
    await browser.close();
})();
