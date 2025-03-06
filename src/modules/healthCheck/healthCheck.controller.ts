import { Request, Response } from 'express';

const healthCheck = (req: Request, res: Response) => {
    try{
        res.status(200).json({ message: 'Server is up and running' });
    }
    catch(err){
        res.status(500).send('Internal Server Error');
    }
}

export default healthCheck;