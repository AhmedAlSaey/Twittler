import express from 'express';
import { Request, Response, RequestHandler } from 'express';
import { getUserTweetsController, postUserTweetsController, postTweetCommentController } from './controllers';
import { Controller, HTTPRequest } from './models';

/**
 * This function converts a Controller object (Defined by us) to an express callback function for use in express.
 * The reason we have a separate intterface for the controller that we need to adapt to is to make the controllers
 * generic, and be able to use them with any HTTP application, not just express
 * @function
 * @param  {Controller} controller The controller that we want to convert to an express callback
 * @return {RequestHandler} The express callback handler that is user in the express application
 * */
let makeExpressCallback: (controller: Controller) => RequestHandler = (controller: Controller) => {
	return (req: Request, res: Response) => {
		// Transform express request to controller input interface
		const httpRequest: HTTPRequest = {
			body: req.body,
			query: req.query,
			params: req.params,
			ip: req.ip,
			method: req.method,
			path: req.path,
			headers: {
				'Content-Type': req.get('Content-Type'),
				Referer: req.get('referer'),
				'User-Agent': req.get('User-Agent'),
			},
		};
		controller(httpRequest)
			.then((httpResponse) => {
				// Transform express response to controller output interface
				if (httpResponse.headers) {
					res.set(httpResponse.headers);
				}
				res.type('json');
				if (httpResponse.statusCode) {
					res.status(httpResponse.statusCode).send(httpResponse.body);
				}
			})
			.catch((e) => res.status(500).send({ error: 'An unkown error occurred.' }));
	};
};

// Initialize express applicatiion
const app = express();
app.use(express.json());

// Pass the controller middlewares to the express application
app.get('/users/:userId/tweets', makeExpressCallback(getUserTweetsController));
app.post('/users/:userId/tweets', makeExpressCallback(postUserTweetsController));
app.post('/users/:userId/comments', makeExpressCallback(postTweetCommentController));

// Start the server
app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

export default app;
