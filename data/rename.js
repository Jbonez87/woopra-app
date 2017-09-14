const fs = require('fs');

module.exports = fs.rename('./photos', './photos.json', (err) => {
  if (err) {
    throw err;
  }
  fs.stat('./photos.json', (err, stats) => {
    if (err) {
      throw err;
    }
    console.log(`stats: ${JSON.stringify(stats)}`);
  });
})
