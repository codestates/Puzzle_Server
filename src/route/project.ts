import express from 'express';

const projectRouter = express.Router();

projectRouter.get('/home', (req, res) => {
  return res.json("Ok")
})


export default projectRouter;