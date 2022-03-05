import { Controller, PostUserTweetsUseCase, HTTPError, HTTPStatusCode } from '../models';
import { makePostUserTweetsController } from './makePostUserTweetsController';

describe('Test controller for posting comments', () => {
	let fakeUseCase: PostUserTweetsUseCase;
	let controller: Controller;

	// Before all the tests
	beforeAll(() => {
		// Create a fake usercase and inject it to any controller for testing
		fakeUseCase = jest.fn(async () => {
			return true;
		});
		// Create the controller to test, and inject the fake usecase into it
		controller = jest.fn(makePostUserTweetsController(fakeUseCase));
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
	test('Make sure valid input is accepted', async () => {
		let controllerResult = await controller({
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				userId: 1,
				content: 'Tweet Content',
			}, // Valid params
		});
		expect(controllerResult.body);
	});
});
