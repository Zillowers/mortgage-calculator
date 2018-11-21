const min = 1;
const max = 10000000;

function randomId(userContext, events, done) {
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  userContext.vars.id = id;
  return done();
}

module.exports = {
  randomId,
};
