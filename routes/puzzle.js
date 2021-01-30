const express = require('express')
const { puzzleController } = require('../controller')
const { isLoggedIn } = require('../controller/middlewares')
const upload = require('../controller/uploadFunctions/uploadProfile')


const puzzleRouter = express.Router()

puzzleRouter.post('/create', puzzleController.create)
puzzleRouter.get('/read/:id', puzzleController.read)
puzzleRouter.post('/update/:id', puzzleController.update)
puzzleRouter.delete('/delete/:id', puzzleController.remove)
puzzleRouter.get('/finish/:puzzleid', puzzleController.finish)
puzzleRouter.post('/puzzleimage/:projectid/:particle', isLoggedIn, upload.single('image'), puzzleController.puzzleimage)


module.exports = puzzleRouter