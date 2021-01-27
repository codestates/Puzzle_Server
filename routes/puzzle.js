const express = require('express')
const { puzzleController } = require('../controller')

const puzzleRouter = express.Router()

puzzleRouter.post('/create', puzzleController.create)
puzzleRouter.get('/read/:id', puzzleController.read)
puzzleRouter.post('/update/:id', puzzleController.update)
puzzleRouter.delete('/delete/:id', puzzleController.remove)


module.exports = puzzleRouter