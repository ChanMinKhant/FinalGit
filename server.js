require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./config/dbConnect');
const cors = require('cors');
dbConnect();
console.log(process.env.EMAIL_SERVICE);
app.use(
  cors({
    // multiple origin
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', require('./router/index'));
app.use(require('./controllers/errorController'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running at port 3000');
});
