const fs = require('fs');
const glob = require('glob');

function getFiles() {
  return new Promise((resolve, reject) => {
    glob("./data/**/*.clubs.json", {}, function (err, files) {
      if (err) {
        reject(err);

        return;
      }

      resolve(files);
    });
  })
}

function getClubsFromFile(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8')).clubs;
}

function getUniqueClubs(clubs) {
  const clubsHash = {};

  clubs.forEach(({name, code, country}) => {
    clubsHash[name + code + country] = {name, code, country};
  });

  return Object.values(clubsHash);
}

async function start() {
  const files = await getFiles();
  const allClubs = files.map(getClubsFromFile).flat();
  const uniqueClubs = getUniqueClubs(allClubs);

  fs.writeFileSync('unique-clubs.json', JSON.stringify(uniqueClubs));
}

start();

