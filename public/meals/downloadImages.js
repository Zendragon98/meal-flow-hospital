
// This is a helper script to download the meal images
// You would run this script separately to download all the images
// For a real project, you would upload actual images to the public/meals directory

const fs = require('fs');
const https = require('https');
const path = require('path');

const imageUrls = {
  'hainanese-chicken-rice.jpg': 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec',
  'chili-crab.jpg': 'https://images.unsplash.com/photo-1605209971703-93a3c893786d',
  'laksa.jpg': 'https://images.unsplash.com/photo-1570275239925-4af0aa3d2b8e',
  'char-kway-teow.jpg': 'https://images.unsplash.com/photo-1645696301019-35adcc18fc22',
  'hokkien-mee.jpg': 'https://images.unsplash.com/photo-1563245370-ac0a8d814581',
  'satay.jpg': 'https://images.unsplash.com/photo-1616461046313-cfec36eb6461',
  'bak-chor-mee.jpg': 'https://images.unsplash.com/photo-1574484264858-b20fb4ad3c31',
  'fish-head-curry.jpg': 'https://images.unsplash.com/photo-1626777256105-2a8a9b694e86',
  'nasi-lemak.jpg': 'https://images.unsplash.com/photo-1628982838293-0f4de155f424',
  'roti-prata.jpg': 'https://images.unsplash.com/photo-1550367083-9fa5411cb8a2',
  'bak-kut-teh.jpg': 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed',
  'yong-tau-foo.jpg': 'https://images.unsplash.com/photo-1625398407796-82650a8c9dd8',
  'wanton-mee.jpg': 'https://images.unsplash.com/photo-1583077874340-79db6564638e',
  'beef-rendang.jpg': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84',
  'oyster-omelette.jpg': 'https://images.unsplash.com/photo-1639281126600-48f3866230b5',
  'claypot-rice.jpg': 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9',
  'sambal-stingray.jpg': 'https://images.unsplash.com/photo-1556689020-b74d24421298',
  'fried-carrot-cake.jpg': 'https://images.unsplash.com/photo-1585231014961-a542c72ec805',
  'mee-siam.jpg': 'https://images.unsplash.com/photo-1627308593145-f669c0b6a30c',
  'curry-chicken-bee-hoon.jpg': 'https://images.unsplash.com/photo-1637491613655-5952a00a8a87'
};

// Create directory if it doesn't exist
const directory = path.join(__dirname);
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

// Download each image
Object.entries(imageUrls).forEach(([fileName, url]) => {
  const filePath = path.join(directory, fileName);
  const file = fs.createWriteStream(filePath);
  
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${fileName}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${fileName}: ${err.message}`);
  });
});

console.log('Starting download of meal images...');
