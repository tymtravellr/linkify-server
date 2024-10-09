const express = require('express');
const app = express("cors");
const cors = require

const PORT = 8080 || process.env.PORT;

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log('Server is running')
})