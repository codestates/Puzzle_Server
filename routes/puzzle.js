const express = require('express')
const controller = require('../controller')

const puzzleRouter = express.Router()

puzzleRouter.post('/create', controller.puzzle.create)
puzzleRouter.get('/read/:id', controller.puzzle.read)
puzzleRouter.patch('/update', controller.puzzle.update)
puzzleRouter.delete('/delete', controller.puzzle.remove)


module.exports = puzzleRouter