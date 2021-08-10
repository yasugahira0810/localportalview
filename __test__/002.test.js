// 002 リンクをクリックすると最終アクセス日時が更新され、クリック回数が1回増える
let page;
const delay = require('delay');

beforeAll(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:8080/')
  page.on('dialog', async dialog => {
    await dialog.accept();
  })
  await page.click('#initialize')
})

test('002-1 vue-good-tableの最終アクセス日時が空欄であること', async () => {
    // vue-good-tableの最終アクセス日時を取得（URLクリック前）
    const beforeLastAccessDate = await page.evaluate(() => document.querySelectorAll('#vgt-table > tbody > tr')[1].querySelectorAll('td > span > div')[4].innerHTML)
    await expect(beforeLastAccessDate).toMatch('  ')
})

test('002-2 vue-good-tableの最終アクセス日時に日付が登録されていること', async () => {
    // vue-good-tableのURLをクリック
    await page.evaluate(() => document.querySelectorAll('#vgt-table > tbody > tr')[1].querySelectorAll('td')[1].querySelectorAll('span > div > a')[0].click())

    // vue-good-tableの最終アクセス日時を取得（URLクリック後）
    const afterLastAccessDate = await page.evaluate(() => document.querySelectorAll('#vgt-table > tbody > tr')[1].querySelectorAll('td > span > div')[4].innerHTML)

    // 期待値となる実行日を取得（時刻は比較対象外のため取得していない）
    var rawDate = new Date()
    const year = rawDate.getFullYear()
    const month = rawDate.getMonth() + 1
    const day = rawDate.getDate()
    await expect(afterLastAccessDate).toContain(month + '/' + day + '/' + year)
})

test('002-3 vue-good-tableのクリック回数が101回になっていること', async () => {
  // クリック自体は002-2で実施済み

  // vue-good-tableのクリック回数を取得（URLクリック後）
  const clickTimes = await page.evaluate(() => document.querySelectorAll('#vgt-table > tbody > tr')[1].querySelectorAll('td > span > div')[5].innerHTML)
  await expect(clickTimes).toContain('101')
})