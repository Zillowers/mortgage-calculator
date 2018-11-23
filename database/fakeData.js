const faker = require('faker');

const data = [];

const fakeDataGenerator = () => {
  for (let i = 0; i < 100; i += 1) {
    const dataObj = {};
    dataObj.home_price = faker.random.number({ min: 200000, max: 1500000 });
    dataObj.property_tax = faker.random.number({ min: 1000, max: 5000 });
    dataObj.home_insurance = faker.random.number({ min: 400, max: 1000 });
    dataObj.hoa_dues = faker.random.number({ min: 100, max: 500 });
    data.push(dataObj);
  }
};

fakeDataGenerator();
module.exports = data;
