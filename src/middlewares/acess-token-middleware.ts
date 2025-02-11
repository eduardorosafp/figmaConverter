import 'dotenv/config';
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const expectedAccessToken = process.env.SECRET_KEY;
	const accessToken = req.headers['access-token'];

	if (!accessToken || accessToken !== expectedAccessToken) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
			
	next();
}