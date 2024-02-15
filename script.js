// Import necessary modules
const { Builder, By, Key, until } = require('selenium-webdriver');

// Define the URLs of the online retailers
const urls = [
  'https://www.retailer1.com/smartphones',
  'https://www.retailer2.com/smartphones',
  'https://www.retailer3.com/smartphones'
];

// Function to scrape smartphone pricing data
async function scrapeSmartphonePrices() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Iterate through each URL
    for (let url of urls) {
      await driver.get(url);

      // Wait for the page to load
      await driver.wait(until.elementLocated(By.tagName('body')), 10000);

      // Extract smartphone information
      let smartphones = await driver.findElements(By.className('smartphone'));
      let currentTime = new Date().toISOString();

      // Output smartphone details
      for (let smartphone of smartphones) {
        let name = await smartphone.findElement(By.className('name')).getText();
        let price = await smartphone.findElement(By.className('price')).getText();
        console.log(`${currentTime} - ${name}: ${price} at ${url}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver.quit();
  }
}

// Execute the scraping function
scrapeSmartphonePrices();

