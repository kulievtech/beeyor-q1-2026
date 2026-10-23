import { test, expect } from "@playwright/test";
import { goToLoginPage, goToStartPage } from "../../actions/navigation";

test(
  "Verify a user can login to the application with valid credentials",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    await test.step("Go to the start page", async () => {
      await goToStartPage(page);
    });

    const loginPage =
      await test.step("Navigate to the Login Page", async () => {
        return goToLoginPage(page);
      });

    await test.step("Wait until the Login Page is loaded", async () => {
      await loginPage.waitUntilPageIsLoaded();
    });

    await test.step("Input username", async () => {
      await loginPage.inputUsername("students");
    });

    await test.step("Input password", async () => {
      await loginPage.inputPassword("Default1!");
    });

    const accountPage =
      await test.step("Click Login and get the My Account Page", async () => {
        return loginPage.clickLoginButton();
      });

    await test.step("Wait until the My Account Page is loaded", async () => {
      await accountPage.waitUntilPageIsLoaded();
    });

    const logOutText = await test.step("Get Log out text", async () => {
      return accountPage.getLogOutText();
    });

    await test.step("Verify login was successful", async () => {
      expect(logOutText).toBe("Log out");
    });
  },
);
