const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:8080/');
        await page.screenshot({
            path: './image0101.png'
        });
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await page.click('#initialize');
        await page.screenshot({
            path: './image0102.png'
        });
    } catch (err) {
        // エラーが起きた際の処理
    } finally {
        await browser.close();
    }
})();