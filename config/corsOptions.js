//Cross-Orgin Resource Sharing(CORS)
const whiteList = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',// take out after developement
  'http://localhost:3000', // take out after development
  'http://localhost:4200'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) { //take out '!orgin' after development
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;