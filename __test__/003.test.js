// 003 登録用フォームからデータを追加して、検索にヒットすることを確認し、削除する
let page;
const delay = require('delay');

async function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

beforeAll(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:8080/')
  page.on('dialog', async dialog => {
    await dialog.accept();
  })
  await page.click('#initialize')
})

test('003-1 データ登録前に「Jest」で検索してヒットしないこと', async () => {
    await page.type('.vgt-input', "Jest")
    
    const beforeRegisterData = await page.evaluate(() => document.querySelectorAll('#vgt-table > tbody > tr')[0].innerHTML)
    await expect(beforeRegisterData).not.toContain('Jest/puppeteerを使用する')
})

test('003-2 登録用フォームからデータを登録できること', async () => {
    // 事前準備：Jestが4文字なので、4回バックスペースキーを押して絞り込み検索をクリアする
    for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Backspace');
      }

    await page.type('input[name=newItemName]', "Jest/puppeteerを使用する")
    await page.type('input[name=newItemUrl]', "https://jestjs.io/ja/docs/puppeteer")
    await page.type('input[name=newItemTag]', "Jest, Puppeteer")
    await page.click('#addItem')

    // vue-good-tableの登録日時を取得
    const afterRegistrationDate = await page.evaluate(() => document.querySelectorAll('#vgt-table > tbody > tr')[4].querySelectorAll('td > span > div')[3].innerHTML)

    // 期待値となる実行日を取得（時刻は比較対象外のため取得していない）
    var rawDate = new Date()
    const year = rawDate.getFullYear()
    const month = rawDate.getMonth() + 1
    const day = rawDate.getDate()
    await expect(afterRegistrationDate).toContain(month + '/' + day + '/' + year)
})

test('003-3 データ登録後に「Jest」で検索してヒットすること', async () => {
    await page.type('.vgt-input', "Jest")
    
    const afterRegisterData = await page.evaluate(() => document.querySelectorAll('#vgt-table > tbody > tr')[0].innerHTML)
    await expect(afterRegisterData).toContain('Jest/puppeteerを使用する')
})

test('003-4 データ削除後に「Jest」で検索してヒットしないこと', async () => {

    // TODO: チェックボックスにチェックする
    // TODO: Deleteボタンを押す
    // TODO: popupにOKを押す
    // TODO: 検索ボックスを空にする
    // TODO: テーブルの中に「Jest/puppeteerを使用する」が含まれないことを確認する
})