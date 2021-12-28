require('module-alias/register')
import app from '../main/config/app';

const port = 5000;
app.listen(port, () => {
    console.log(`Server on. http://localhost:${port}`)
})