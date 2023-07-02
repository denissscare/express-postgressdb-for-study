require("dotenv").config();
const express = require('express');
const cliRouter = require("./routes/cli.routes")
const path = require("path");

const PORT = process.env.PORT || 8080;

app = express();
const pub = path.join(__dirname, "public")

app.use('/', express.static(pub));
app.use(express.json());

app.use('/api', cliRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(pub, 'index.html'))
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

