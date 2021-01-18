import express from 'express';

const homeRouter = express.Router();

homeRouter.get('/home', (req, res) => {
  return res.json("Ok")
})


export default homeRouter;