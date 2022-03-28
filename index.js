require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios').default;

const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let accessToken = ''

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

    // console.log(getToken);
    accessToken = getToken.data.access_token
    res.status(getToken.status).json(getToken.data)
  } catch (err) {
    console.log(err, '<------------------------------');
    res.status(err.status).json(err.data)
  }
})

app.get('/api/v1/data/nik/:NIK', async (req, res) => {
  try {
    const {NIK} = req.params
    // console.log(accessToken, '<---------------------');
    const getData = await axios({
      method: 'get',
      url: `http://10.25.88.173:8081/api/v1/data/nik/${NIK}`,
      headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyMi0wMy0yOCIsInVzZXJJZCI6ImJrZWJoYW5hIiwidGltZSI6IjAzOjE0OjU0In0.1NFfHDsFaK8jfIiYltYsnbMDKWPc44erBvLBWg5CY7U' }
    });

    // console.log(getData, '<-----------------------');
    res.status(getData.status).json(getData.data)
  } catch (err) {
    //console.log(err, '<+++++++++++++++++');
    res.status(err.response.status).json(err.response.data)
  }
})


app.get('/api/v2/data/nik/:NIK', async (req, res) => {
  try {
    const {NIK} = req.params

    const getToken = await axios({
      method: 'post',
      url: 'http://10.25.88.173:8080/api/auth',
      auth: {
        username: process.env.GETUSERNAME,
        password: process.env.GETPASSWORD
      },
      headers: { 'client_id': 'keb_hana' }
    });

    accessToken = getToken.data.access_token

    const getData = await axios({
      method: 'get',
      url: `http://10.25.88.173:8081/api/v1/data/nik/${NIK}`,
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    // console.log(getData, '<-----------------------');
    res.status(getData.status).json(getData.data)
  } catch (err) {
    //console.log(err, '<+++++++++++++++++');
    res.status(err.response.status).json(err.response.data)
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})