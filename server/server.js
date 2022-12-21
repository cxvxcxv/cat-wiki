import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'

import express from 'express'
import breedsRoutes from './routes/breeds.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/breeds', breedsRoutes);

try {
	app.listen(process.env.PORT, () => {
		console.log('Listening on port', process.env.PORT);
	});
} catch(e) {
	console.log(e);
}