const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const customMiddleware = require('./middleware');
const mongoose = require('mongoose');
require('dotenv').config();
const logs = require('./api/logs')

const app = express()



mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected ...'))
    .catch((err) => console.log(err))

const PORT = process.env.PORT || 4000;

// middleware
app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api/logs', logs)

// handle not found endpoint
app.use(customMiddleware.notFound)

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use(customMiddleware.handleError)

app.listen(PORT, () => console.log(`server is listening on ${PORT}`))
