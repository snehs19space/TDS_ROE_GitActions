// scrape.js
const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 74 + i);
const baseUrl = 'https://example.com/seed'; // Replace with actual base URL

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => cell.innerText.trim())
        .filter(text => /^\d+$/.test(text))
        .map(Number)
    );

    const pageSum = numbers.reduce((acc, val) => acc + val, 0);
    console.log(`Seed ${seed} sum:`, pageSum);
    totalSum += pageSum;
  }

  console.log('Total sum across all seeds:', totalSum);
  await browser.close();
})();
