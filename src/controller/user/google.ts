import express, { Request, Response } from 'express'

module.exports = async (req: Request, res: Response) => {
  //데이터베이스 작업 필요
  res.send('model google')
}