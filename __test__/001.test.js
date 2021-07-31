let page;

beforeAll(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:8080/')
})

test('001 初期表示できること（データ初期化前）', async () => {
  await expect(page).toMatch('俺のブックマーク')
})