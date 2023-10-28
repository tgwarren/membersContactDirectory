const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;

//Custome Middleware Function
app.use(logger);

//Cross Origin Resourse Sharing
app.use(cors(corsOptions));

//Built-in middleware for json
app.use(express.json());

//Built in middleware functions to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//Serve the static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));

//API route
app.use('/contacts', require('./routes/api/contacts'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Contact Directory is listening on port ${PORT}`)
});