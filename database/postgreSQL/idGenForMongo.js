const fs = require('fs');
const faker = require('faker');

const wstream = fs.createWriteStream('./database/id.tsv');
const fakeDataGenerator = (i) => {
  for (; i <= 10000000; i++) {
    if (!wstream.write(`${i}\n`)) {
      wstream.once('drain', () => {
        fakeDataGenerator(i + 1);
      });
      return;
    }
  }
  wstream.end();
};

fakeDataGenerator(1);

// paste -d'\t' id.tsv streetNames.tsv > idStreetNames.tsv
