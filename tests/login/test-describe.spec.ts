import { test, expect } from "@playwright/test";

test.describe("Positive Login Form Tests", { tag: ["@smoke"] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://selectors-practice.onrender.com");
  });

  test("should have correct title", async ({ page }) => {
    const text = await page.innerText("h2[title='Login-form']");
    expect(text).toBe("Login Form");
  });

  test("should be able to fill the username input", async ({ page }) => {
    const testValue = "alex92";
    await page.fill("#username", testValue);
    const value = await page.inputValue("#username");
    expect(value).toBe(testValue);
  });

  test("should display a correct message when entered empty values", async ({
    page,
  }) => {
    await page.click("#loginForm button");
    const loginElement = page.locator("#loginMessage");
    await loginElement.waitFor({ state: "visible", timeout: 3000 });
    const loginMessage = await loginElement.innerText();
    expect(loginMessage).toContain("Please enter");
  });
});

test.describe("Negative Login Form Tests", { tag: ["@smoke"] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://selectors-practice.onrender.com");
  });

  test("should have correct title", async ({ page }) => {
    const text = await page.innerText("h2[title='Login-form']");
    expect(text).toBe("Login Form");
  });

  test("should be able to fill the username input", async ({ page }) => {
    const testValue = "alex92";
    await page.fill("#username", testValue);
    const value = await page.inputValue("#username");
    expect(value).toBe(testValue);
  });

  test("should display a correct message when entered empty values", async ({
    page,
  }) => {
    await page.click("#loginForm button");
    const loginElement = page.locator("#loginMessage");
    await loginElement.waitFor({ state: "visible", timeout: 3000 });
    const loginMessage = await loginElement.innerText();
    expect(loginMessage).toContain("Please enter");
  });
});
