import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("Check if Load Button exists", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  await expect(page.getByLabel("Sign out")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Brief mode" })
  ).not.toBeVisible();

  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign out")).toBeVisible();
  await expect(page.getByRole("button", { name: "Brief mode" })).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();

  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await expect(
    page.getByRole("button", { name: "Submitted 1 times" })
  ).toBeVisible();
});

test("submitting incorrect dataset updates REPL history", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox").fill("mock command");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.locator(".repl-history")).toContainText(
    "ERROR: could not recognize your command"
  );
});

test("logging out hides REPL components and shows login", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.locator(".repl")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test("invalid command displays error, and updates history on verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox").fill("invalidCommand");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("button", { name: "Brief mode" }).click();
  await expect(page.locator(".repl-history")).toContainText(
    "ERROR: could not recognize your command"
  );
  await expect(page.locator(".repl-history")).toContainText("invalidCommand");
});

test("invalid command displays error, updates history, and then changes to verbose mode to see changes", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox").fill("invalidCommand");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.locator(".repl-history")).toContainText(
    "ERROR: could not recognize your command"
  );
  await expect(page.locator(".repl-history")).toContainText(
    "ERROR: could not recognize your command"
  );
  await page.getByRole("button", { name: "Brief mode" });
  await expect(page.locator(".repl-history")).toContainText(
    "ERROR: could not recognize your command"
  );
});

test("simultaneous command execution", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox").fill("command1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("textbox").fill("command2");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("button", { name: "Brief mode" });
  await expect(page.locator(".repl-history")).toContainText(
    "ERROR: could not recognize your command"
  );
  await expect(page.locator(".repl-history")).toContainText(
    "RROR: could not recognize your command"
  );
});

test("State change after reloading tab", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox").fill("command1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.reload();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
/**
 * Load the data using "load data/census/dol_ri_earnings_disparity_no_header.csv"
 * View using "view"
 * Search using search
 */

test("Can load multiple data sets", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_ri_earnings_disparity_no_header.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_ri_earnings_disparity.csv");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.locator(".repl-history")).toContainText(
    "successfully loaded data/census/dol_ri_earnings_disparity.csv"
  );
  await expect(page.locator(".repl-history")).toContainText(
    "successfully loaded data/census/dol_ri_earnings_disparity_no_header.csv"
  );
});

test("Can load multiple data sets on verbose mode", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Brief mode" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_ri_earnings_disparity_no_header.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_ri_earnings_disparity.csv");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.locator(".repl-history")).toContainText(
    "successfully loaded data/census/dol_ri_earnings_disparity_no_header.csv"
  );
  await expect(page.locator(".repl-history")).toContainText(
    "successfully loaded data/census/dol_ri_earnings_disparity.csv"
  );
  await expect(page.locator(".repl-history")).toContainText(
    "Command: Load data/census/dol_ri_earnings_disparity.csv"
  );
});

/**
 * Do I show the whole dataset?
 */
test("View command displays data correctly", async ({ page }) => {
  await page.goto("http://localhost:8008/");
  await page.getByLabel("Login").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("Load data/census/dol_ri_earnings_disparity.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("cell", { name: "$1,058.47" }).isVisible();
});

test("View command displays data correctly on verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8008/");
  await page.getByLabel("Login").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("Load data/census/dol_ri_earnings_disparity.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("button", { name: "Brief mode" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("cell", { name: "$1,058.47" }).isVisible();
  await expect(page.locator(".repl-history")).toContainText(
    "successfully loaded data/census/dol_ri_earnings_disparity.csv"
  );
});

test("Search command displays data correctly", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_ri_earnings_disparity.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search <Average Weekly Earnings> <$770.26>");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("cell", { name: "$770.26" }).isVisible();
});

test("Search command displays data correctly on verbose mode", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_ri_earnings_disparity.csv");
  await page.getByRole("button", { name: "Brief mode" }).click();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search <Average Weekly Earnings> <$770.26>");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("cell", { name: "$770.26" }).isVisible();
  await expect(page.locator(".repl-history")).toContainText(
    "successfully loaded data/census/dol_ri_earnings_disparity.csv"
  );
});

test("Handles malformed CSV on load", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_RI_earnings_malformed.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await expect(page.locator(".repl-history")).toContainText(
    "ERROR malformed CSV given"
  );
});

test("Handles malformed CSV on view", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_RI_earnings_malformed.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await expect(page.locator(".repl-history")).toContainText(
    "ERROR malformed CSV given"
  );
});

test("Handles malformed CSV on search", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox")
    .fill("Load data/census/dol_RI_earnings_malformed.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await expect(page.locator(".repl-history")).toContainText(
    "ERROR malformed CSV given"
  );

  await page.getByRole("textbox").fill("search 1 2");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  await expect(page.locator(".repl-history")).toContainText(
    "ERROR: calling search when no csv has been loaded"
  );
});
