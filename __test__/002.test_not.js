// // 002 リンクをクリックすると最終アクセス日時が更新され、クリック回数が1回増える
// let page;
// const TARGET_ROW = 1; // vue-good-tableの配列番号

// beforeAll(async () => {
//   page = await browser.newPage();
//   await page.goto('http://localhost:8080/')
//   page.on('dialog', async dialog => {
//     await dialog.accept();
//   })
//   await page.click('#initialize')
// })

// test('002-1 vue-good-tableの最終アクセス日時が2021/8/8 00:00:00であること', async () => {
//     // vue-good-tableの最終アクセス日時を取得（URLクリック前）
//     const beforeLastAccessDate = await page.evaluate((TARGET_ROW) => document.querySelectorAll('#vgt-table > tbody > tr')[TARGET_ROW].querySelectorAll('td > span > div')[4].innerHTML, TARGET_ROW)
//     await expect(beforeLastAccessDate).toMatch('2021/08/08 00:00')
// })

// test('002-2 vue-good-tableの最終アクセス日時に日付が更新されていること', async () => {
//     // vue-good-tableのURLをクリック
//     await page.evaluate((TARGET_ROW) => document.querySelectorAll('#vgt-table > tbody > tr')[TARGET_ROW].querySelectorAll('td')[1].querySelectorAll('span > div > a')[0].click(), TARGET_ROW)

//     // vue-good-tableの最終アクセス日時を取得（URLクリック後）
//     const afterLastAccessDate = await page.evaluate((TARGET_ROW) => document.querySelectorAll('#vgt-table > tbody > tr')[TARGET_ROW].querySelectorAll('td > span > div')[4].innerHTML, TARGET_ROW)

//     // 期待値となる実行日を取得
//     var rawDate = new Date()
//     var year = rawDate.getFullYear()
//     var month = ("0"+(rawDate.getMonth() + 1)).slice(-2)
//     var day = ("0"+rawDate.getDate()).slice(-2)
//     var hour = ("0"+rawDate.getHours()).slice(-2)
//     var minute = ("0"+rawDate.getMinutes()).slice(-2)
//     await expect(afterLastAccessDate).toContain(year + "/" + month + "/" + day + " " + hour + ":" + minute)
// })

// test('002-3 vue-good-tableのURLクリック時のクリック回数が901回になっていること', async () => {
//   // クリック自体は002-2で実施済み

//   // vue-good-tableのクリック回数を取得（URLクリック後）
//   const clickTimes = await page.evaluate((TARGET_ROW) => document.querySelectorAll('#vgt-table > tbody > tr')[TARGET_ROW].querySelectorAll('td > span > div')[5].innerHTML, TARGET_ROW)
//   await expect(clickTimes).toContain('901')
// })

// test('002-4 vue-good-tableのクリック回数が902回になっていること', async () => {
//     // vue-good-tableのCOPYボタンをクリック
//     await page.evaluate((TARGET_ROW) => document.querySelectorAll('#vgt-table > tbody > tr')[TARGET_ROW].querySelectorAll('td')[1].querySelectorAll('span > div > button')[0].click(), TARGET_ROW)

//   // vue-good-tableのクリック回数を取得（URLクリック後）
//   const clickTimes = await page.evaluate((TARGET_ROW) => document.querySelectorAll('#vgt-table > tbody > tr')[TARGET_ROW].querySelectorAll('td > span > div')[5].innerHTML, TARGET_ROW)
//   await expect(clickTimes).toContain('902')
// })