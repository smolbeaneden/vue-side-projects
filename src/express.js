import express from 'express';

const app = express();
const PORT = 3000;
import cors from 'cors';

const corsOptions ={
	origin:'*',
	credentials:true,            //access-control-allow-credentials:true
	optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.post('/', (req, res) => {
	res.send(req.body);
})

app.listen(PORT, (error) => {
		if(!error)
			console.log("Server is Successfully Running, and App is listening on port "+ PORT);
	else
		console.log("Error occurred, server can't start", error);
	}
);
