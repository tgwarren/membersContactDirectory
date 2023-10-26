const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;

//Custome Middleware Function
app.use(logger);

//Cross Origin Resourse Sharing
app.use(cors(corsOptions));

//Built in middleware functions that is in Express.js
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Serve the static files
app.use('/', express.static(path.join(__dirname, '/public')));


//routes
app.use('/', require('./routes/root'));

//API route
app.use('/contact', require('./routes/api/contacts'));


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Contact Directory is listening on port ${PORT}`)
});