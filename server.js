require('dotenv').config()

const app = require('./backend/src/app.js');
const { checkConnection } = require('./backend/src/config/db.js');

const PORT = process.env.PORT || 4000;

checkConnection();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})