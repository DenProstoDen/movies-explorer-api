require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { PORT, MONGO_URL, LIMITER } = require('./utils/config');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleCenterError } = require('./middlewares/handleCenterError');

const app = express();

app.use(cors());

app.use(helmet());

app.use(LIMITER);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleCenterError);

app.listen(PORT);