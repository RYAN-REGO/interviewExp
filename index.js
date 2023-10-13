import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
//Routes
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import notiRoutes from './routes/notices.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());


app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/noti', notiRoutes);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.port || 5000;

//serving the front-end
app.use(express.static(path.join(__dirname, './client/build')));

app.get("*", (req,res) => {
    res.sendFile(
        path.join(__dirname, './client/build/index.html'),
        function(err)
        {
            res.status(500).send(err)
        }
    )
})

mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true} )
    .then(()=>app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error)=> error.message)

