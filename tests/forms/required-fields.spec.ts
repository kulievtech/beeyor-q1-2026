import { expect, test } from "@playwright/test";

test(
  "Submitting the labeled form without values asks the user to fill both fields",
  { tag: ["@regression", "@forms", "@negative"] },
  async ({ page }) => {
    await test.step("Go to the selectors practice page", async () => {
      await page.goto("https://selectors-practice.onrender.com/");
    });

    const formHeading = page.getByRole("heading", {
      name: "Form with Labels",
    });

    await test.step("Scroll to the Form with Labels section", async () => {
      await formHeading.scrollIntoViewIfNeeded();
    });

    await test.step("Submit the form without filling either input", async () => {
      await page.getByRole("button", { name: "Submit Form" }).click();
    });

    await test.step("Verify the form remains visible and prompts for both fields", async () => {
      await expect(formHeading).toBeVisible();
      await expect(page.getByText("Please fill both fields")).toBeVisible();
    });
  },
);
