// // 001 Initializeしたときに期待通りの件数が登録される
let page;

beforeAll(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:8080/')
})

test('001-1 初期表示できること（データ初期化前）', async () => {
  await expect(page).toMatch('ブックマーク絞り込み検索')
})

// test('001-2 初期表示できること（データ初期化後）', async () => {
//   await page.on('dialog', async dialog => {
//     await dialog.accept();
//   })
//   await page.click('#initialize')
//   await expect(page).toMatch('基礎からわかる、Vue.jsのテスト')
// })