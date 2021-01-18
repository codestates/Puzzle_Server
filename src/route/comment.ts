import express from 'express';

const commentRouter = express.Router();

commentRouter.get('/home', (req, res) => {
  return res.json("Ok")
})


export default commentRouter;