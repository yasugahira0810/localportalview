// // 001 Initializeしたときに期待通りの件数が登録される
let page;

beforeAll(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:8080/')
})

test('001-1 初期表示できること（データ初期化前）', async () => {
  await expect(page).toMatch('ブックマーク絞り込み検索')
})

test('001-2 初期表示できること（データ初期化前）', async () => {
  await page.goto('http://localhost:8080/#/Initialize')
  await expect(page).toMatch('ブックマーク初期化')

  // Popup2つ処理する部分はネストで扱う。また、Popupを表示させるボタンを押す前に設定する。
  // 参考: https://qiita.com/khsk/items/0b7ef6d012f0167ed2bb
  await page.once('dialog', async dialog => {
    console.log(dialog.message());

    // OK後のアラートを設定
    await page.once('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    })

    await dialog.accept();
  });

  await page.click('button[type="button"]');

  await page.goto('http://localhost:8080/');

  await expect(page).toMatch('基礎からわかる、Vue.jsのテスト')
})

// test('001-2 初期表示できること（データ初期化後）', async () => {
//   await page.on('dialog', async dialog => {
//     await dialog.accept();
//   })
//   await page.click('#initialize')
//   await expect(page).toMatch('基礎からわかる、Vue.jsのテスト')
// })