import { test } from "@playwright/test";

test.beforeAll(async () => {
  console.log("🚀 beforeAll: Setting up once");
});

test.beforeEach(async ({ page }) => {
  console.log("🔧 beforeEach: Navigating before test");
  await page.goto("https://selectors-practice.onrender.com");
  await page.waitForTimeout(3000);
});

test("Test 1", async () => {
  console.log("📝 Running Test 1");
});

test("Test 2", async () => {
  console.log("📝 Running Test 2");
});

test("Test 3", async () => {
  console.log("📝 Running Test 3");
});

test.afterEach(async () => {
  console.log("🧹 afterEach: Finished test");
});

test.afterAll(async () => {
  console.log("🏁 afterAll: All tests complete");
});
