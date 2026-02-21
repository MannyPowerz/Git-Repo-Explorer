import * as dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './config/connection';
import express, { Request, Response } from 'express'; 

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

async function startServer() {
    try{
        await connectToDatabase();
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        }); 
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }       
}

startServer();


