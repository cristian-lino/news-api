const app = require('./src/app');

const port = 5001

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})