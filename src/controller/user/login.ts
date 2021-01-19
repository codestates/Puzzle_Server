import express, { Request, Response } from 'express'


const login = async (req: Request, res: Response) => {

    res.send('model login')
}

export default login;