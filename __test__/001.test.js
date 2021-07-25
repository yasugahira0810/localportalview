// test001.js
const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:8080/');
    }, timeout);

    it('001 初期表示できること（データ初期化前）', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('俺のブックマーク');
    });
  },
  timeout,
);