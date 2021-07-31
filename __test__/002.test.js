let page;

beforeAll(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:8080/')
  page.on('dialog', async dialog => {
    await dialog.accept();
  })
  await page.click('#initialize')
})

test('002 初期表示できること（データ初期化後）', async () => {
  await expect(page).toMatch('基礎からわかる、Vue.jsのテスト')
})