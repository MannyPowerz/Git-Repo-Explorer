import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express'; 

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
 