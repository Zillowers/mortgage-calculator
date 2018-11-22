const fs = require('fs');
const faker = require('faker');

const wstream = fs.createWriteStream('./database/postgreSQL/mortgageData.tsv');
const fakeDataGenerator = (i) => {
  for (; i <= 10000000; i++) {
    const home_price = faker.finance.amount(100000, 100000000, 0);
    const property_tax = Math.floor(home_price * (faker.random.number({ min: 5, max: 30 }) / 100));
    const home_insurance = Math.floor(home_price * (faker.random.number({ min: 5, max: 10 }) / 100));
    const hoa_dues = Math.floor(home_price * (faker.random.number({ min: 1, max: 5 }) / 100));

    if (!wstream.write(`${home_price}\t${property_tax}\t${home_insurance}\t${hoa_dues}\n`)) {
      wstream.once('drain', () => {
        fakeDataGenerator(i + 1);
      });
      return;
    }
  }
  wstream.end();
};

fakeDataGenerator(1);

// paste -d'\t' idStreetNames.tsv mortgageData.tsv > idStreetPriceData.tsv