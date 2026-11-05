import BasePage from "./BasePage";
import HomePage from "./home/HomePage";
import MyAccountPage from "./my-account/MyAccountPage";

export default class Navigation extends BasePage {
  async goToHomePage(): Promise<HomePage> {
    await this.click(
      "div[class='wp-block-navigation__responsive-close'] a[href='https://shopping.beeyor.com/']",
    );

    return new HomePage(this.page);
  }

  async goToMyAccountPage(): Promise<MyAccountPage> {
    await this.click(
      "div[class='wp-block-navigation__responsive-close'] a[href='https://shopping.beeyor.com/my-account/']",
    );

    return new MyAccountPage(this.page);
  }
}
