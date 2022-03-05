import { BaseError, Controller, GetUserTweetsDTO, GetUserTweetsUseCase, HTTPError, HTTPStatusCode } from '../models';
import { makeGetUserTweetsController } from './makeGetUserTweetsController';

describe('Test controller for getting user tweets', () => {
	let fakeUseCase: GetUserTweetsUseCase;
	let controller: Controller;

	// Before all the tests
	beforeAll(() => {
		// Create a fake usercase and inject it to any controller for testing
		fakeUseCase = jest.fn(async () => {
			let fakeTweets: GetUserTweetsDTO[] = [
				{
					id: 1,
					content: 'Fake tweet',
					time: new Date(),
					user_id: 1,
					comments: null,
				},
				{
					id: 2,
					content: 'Fake tweet 2',
					time: new Date(),
					user_id: 2,
					comments: [
						{
							id: 1,
							parent_id: null,
							content: 'Fake Comment',
							replies: null,
							time: new Date(),
							tweet_id: 2,
							user_id: 1,
						},
					],
				},
			];
			return fakeTweets;
		});
		// Create the controller to test, and inject the fake usecase into it
		controller = jest.fn(makeGetUserTweetsController(fakeUseCase));
	});

	// Test what will happen if an NaN id is inserted
	test('Make sure invalid user ID is not accepted', () => {
		try {
			controller({
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					userId: 'abc', // Incorrect type
				},
			});
		} catch (error) {
			expect(error).toBeInstanceOf(HTTPError);
			expect((error as HTTPError).statusCode).toBe(HTTPStatusCode.BAD_REQUEST);
			expect((error as HTTPError).message).toBe('User ID must be numeric');
		}
	});

	// Test what will happen when a missing user ID is provided
	test('Make sure missing user ID is not accepted', () => {
		try {
			controller({
				headers: {
					'Content-Type': 'application/json',
				},
				params: {}, // Empty params
			});
		} catch (error) {
			expect(error).toBeInstanceOf(HTTPError);
			expect((error as HTTPError).statusCode).toBe(HTTPStatusCode.BAD_REQUEST);
			expect((error as HTTPError).message).toBe('Please insert a user ID');
		}
	});

	// Test what will happen when a valid user ID is inserted (On the controller level)
	test('Make sure a valid user ID is accepted', async () => {
		let controllerResult = await controller({
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				userId: 1,
			}, // Valid params
		});
		expect(controllerResult.body);
	});
});
