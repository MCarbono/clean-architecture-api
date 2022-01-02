import 'dotenv/config'
import 'module-alias/register';
import { MongoHelper } from '@/external/repositories/mongodb/helper';
import app from '../main/config/app';

const port = 5000;

const start = async () => {
    try {
        await MongoHelper.connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server on. http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();