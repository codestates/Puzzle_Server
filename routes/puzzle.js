const express = require('express')
const { puzzleController } = require('../controller')

const puzzleRouter = express.Router()

puzzleRouter.post('/create', puzzleController.create)
puzzleRouter.get('/read/:id', puzzleController.read)
puzzleRouter.patch('/update', puzzleController.update)
puzzleRouter.delete('/delete', puzzleController.remove)


module.exports = puzzleRouter