import { chromium } from "playwright";

const BASE = "http://localhost:3404";
const OUT = "/Users/amnasahamed/Desktop/m3/shots";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: `${OUT}/t04-01-hero.png` });

const sections = ["countdown", "invitation", "events", "venue", "footer-mid", "footer-end"];
const selectors = [
  "section:nth-of-type(2)",
  "section:nth-of-type(3)",
  "section:nth-of-type(4)",
  "section:nth-of-type(5)",
  null,
  null,
];

for (let i = 0; i < sections.length; i++) {
  if (selectors[i]) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, selectors[i]);
  } else if (sections[i] === "footer-mid") {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - window.innerHeight * 1.6));
  } else {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/t04-0${i + 2}-${sections[i]}.png` });
}

await browser.close();
console.log("done");
