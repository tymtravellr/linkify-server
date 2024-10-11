const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/', require('./routes/root'))
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/user', require('./routes/userRoute'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
