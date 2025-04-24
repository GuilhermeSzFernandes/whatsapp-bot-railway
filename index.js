const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.waitForSelector('canvas[aria-label="Scan me!"]', { timeout: 0 });
  console.log('QR Code carregado!');
  const title = await page.title();
  await browser.close();
  res.send(`Título da página: ${title}`);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
