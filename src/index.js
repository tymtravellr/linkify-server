const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

connectDB();

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/', require('./routes/root'))
app.use('/user', require('./routes/authRoute'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
