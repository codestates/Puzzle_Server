import express from 'express';

const puzzleRouter = express.Router();

puzzleRouter.get('/home', (req, res) => {
  return res.json("Ok")
})


export default puzzleRouter;