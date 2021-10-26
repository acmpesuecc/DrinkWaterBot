const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('You have reached the webhook URL of DrinkWaterBot. Refer to the repository for more details https://github.com/acmpesuecc/DrinkWaterBot.')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
