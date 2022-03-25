require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios').default;

const port = 3000

app.post('/api/auth', async (req, res) => {
  try {
    const getToken = await axios({
      method: 'post',
      url: 'http://10.25.88.173:8080/api/auth',
      auth: {
        username: process.env.GETUSERNAME,
        password: process.env.GETPASSWORD
      },
      headers: { 'client_id': 'keb_hana' }
    });

    console.log(getToken);
    res.status(getToken.status).json(getToken.data)
  } catch (err) {
    console.log(err, '<------------------------------');
    res.status(err.status).json(err.data)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})