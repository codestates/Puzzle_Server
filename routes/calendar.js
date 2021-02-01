const express = require('express')
const { calendarController } = require('../controller')
const calendarRouter = express.Router();

calendarRouter.get('/:year/:month/:day', calendarController.findlog)

module.exports = calendarRouter