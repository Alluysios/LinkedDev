const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'})
const app = require('./app');


const db = process.env.DATABASE
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log('DATABASE CONNECTED')
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));