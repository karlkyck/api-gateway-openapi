import { handler } from '../CreatePostHandler';

describe('CreatePostHandler', () => {

	describe('handler', () => {

		it('should succeed', async () => {
			const response = handler();

			expect(response).toEqual(
				{
					statusCode: 200,
					body: JSON.stringify({
						message: 'Hello World'
					})
				});
		});
	});
});