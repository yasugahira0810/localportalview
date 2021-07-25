// test001.js
const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:8080/');
      page.on('dialog', async dialog => {
        await dialog.accept();
    });
    await page.click('#initialize');
    }, timeout);

    it('002 初期表示できること（データ初期化後）', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('基礎からわかる、Vue.jsのテスト');
    });
  },
  timeout,
);