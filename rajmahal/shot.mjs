import { chromium } from "playwright";

const BASE = "http://localhost:4180";
const OUT = "/Users/amnasahamed/Desktop/m3/shots";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/01-gate.png` });

// open the invitation
await page.getByText("Open Invitation").click();
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/02-hero.png` });

const sections = ["invite", "couple", "events", "venue", "rsvp", "footer"];
const selectors = [
  "section:nth-of-type(2)",
  "section:nth-of-type(3)",
  "section:nth-of-type(4)",
  "section:nth-of-type(5)",
  "section:nth-of-type(6)",
  "footer",
];

for (let i = 0; i < selectors.length; i++) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }, selectors[i]);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${OUT}/0${i + 3}-${sections[i]}.png` });
}

await browser.close();
console.log("done");
