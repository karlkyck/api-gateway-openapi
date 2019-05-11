import { handler } from '../CreatePostHandler';
import { APIGatewayEvent } from 'aws-lambda';
import { Post } from '../domain/Post';
import { CreatePostRequestBody } from '../domain/CreatePostRequestBody';

describe('CreatePostHandler', () => {

	describe('handler', () => {

		let originalDateNowFunction;
		let mockedDateNowFunction;

		beforeEach(() => {
			originalDateNowFunction = Date.now;
			mockedDateNowFunction = jest.fn();
			Date.now = mockedDateNowFunction;
		});

		afterEach(() => {
			Date.now = originalDateNowFunction;
		});

		it('should succeed', async () => {
			const mockCreatePostRequestBody: CreatePostRequestBody = {
				title: 'Mock Title',
				description: 'Mock Description',
				publishedDate: new Date(0),
				content: 'Mock Content'
			};
			const mockApiGatewayEvent = {
				body: JSON.stringify(mockCreatePostRequestBody)
			} as APIGatewayEvent;
			mockedDateNowFunction.mockReturnValue(0);

			const response = await handler(mockApiGatewayEvent, null, null);

			const expectedPost: Post = {
				id: '3',
				createdDate: new Date(0),
				updatedDate: new Date(0),
				title: 'Mock Title',
				description: 'Mock Description',
				publishedDate: new Date(0),
				content: 'Mock Content'
			};

			expect(response).toEqual(
				{
					statusCode: 200,
					body: JSON.stringify(expectedPost)
				});
		});
	});
});