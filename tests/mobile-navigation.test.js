const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const pages = ["index.html", "notes.html", "history.html", "relics.html"];

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, "res", page), "utf8");
  assert.match(html, /class="menu-toggle"/,
    `${page} должен содержать кнопку мобильного меню`);
  assert.match(html, /class="mobile-menu"/,
    `${page} должен содержать мобильную панель навигации`);
}

const navigation = fs.readFileSync(
  path.join(root, "res", "js", "navigationHandler.js"),
  "utf8",
);
assert.match(navigation, /aria-expanded/);
assert.match(navigation, /Escape/);
assert.match(navigation, /menu-open/);

console.log("mobile navigation smoke test passed");
