import { test as base } from "@playwright/test";
import MyAccountPage from "../pages/my-account/MyAccountPage";
import { goToLoginPage, goToStartPage } from "../actions/navigation";
import Navigation from "../pages/Navigation";

type Fixtures = {
  myAccountPage: MyAccountPage;
  navigation: Navigation;
};

export const test = base.extend<Fixtures>({
  myAccountPage: async ({ page }, use) => {
    await goToStartPage(page);
    const loginPage = await goToLoginPage(page);
    await loginPage.waitUntilPageIsLoaded();
    await loginPage.inputUsername("students");
    await loginPage.inputPassword("Default1!");

    const myAccountPage = await loginPage.clickLoginButton();
    await myAccountPage.waitUntilPageIsLoaded();

    await use(myAccountPage);
  },
  navigation: async ({ page }, use) => {
    await goToStartPage(page);
    const navigation = new Navigation(page);
    await use(navigation);
  },
});

export { expect } from "@playwright/test";
