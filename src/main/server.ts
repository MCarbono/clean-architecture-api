import 'dotenv/config'
import 'module-alias/register';
import { MongoHelper } from '@/external/repositories/mongodb/helper';
import app from '../main/config/app';

const port = 5000;

// MongoHelper.connect(process.env.MONGO_URI)
//     .then(async () => {
//         const app = (await import('./config/app')).default
//         app.listen(port, () => {
//             console.log(`Server on. http://localhost:${port}`)
//         })
//     })
//     .catch(console.error)

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