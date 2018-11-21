const faker = require('faker');

const min = 1;
const max = 10000000;
let postId = 10000000;

function randomId(userContext, events, done) {
  const getId = Math.floor(Math.random() * (max - min + 1)) + min;
  userContext.vars.getId = getId;
  return done();
}

function randomData(userContext, events, done) {
  postId += 1;
  const streetName = faker.address.streetName().split(' ').join('-');
  const street = `${postId}-${streetName}`;
  const home_price = faker.finance.amount(100000, 100000000, 0);
  const property_tax = Math.floor(home_price * (faker.random.number({ min: 5, max: 30 }) / 100));
  const home_insurance = Math.floor(home_price * (faker.random.number({ min: 5, max: 10 }) / 100));
  const hoa_dues = Math.floor(home_price * (faker.random.number({ min: 1, max: 5 }) / 100));
  userContext.vars.postId = postId;
  userContext.vars.street = street;
  userContext.vars.home_price = home_price;
  userContext.vars.property_tax = property_tax;
  userContext.vars.home_insurance = home_insurance;
  userContext.vars.hoa_dues = hoa_dues;
  return done();
}

function removeId(userContext, events, done) {
  postId += 1;
  userContext.vars.postId = postId;
  return done();
}

module.exports = {
  randomId,
  randomData,
  removeId,
};
