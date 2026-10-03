const express = require("express");
const taskRoute = require("./routes/task")

const port = 3000;

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    });
})

app.use("/", taskRoute);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})