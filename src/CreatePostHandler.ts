import { APIGatewayEvent, Handler } from 'aws-lambda';
import { Post } from './domain/Post';

const eventToCreatePostRequestBody = (event: APIGatewayEvent) => {
	return JSON.parse(event.body);
};

const dateTimeNow = () => {
	return Date.now();
};

const createPostFromEvent = (event: APIGatewayEvent): Post => {
	const createPostRequestBody = eventToCreatePostRequestBody(event);
	const timeNow = dateTimeNow();

	return {
		id: '3',
		createdDate: new Date(timeNow),
		updatedDate: new Date(timeNow),
		title: createPostRequestBody.title,
		description: createPostRequestBody.description,
		publishedDate: createPostRequestBody.publishedDate,
		content: createPostRequestBody.content
	};
};

export const handler: Handler = async (event: APIGatewayEvent) => {
	return Promise
		.resolve()
		.then(() => {
			const post = createPostFromEvent(event);
			return {
				statusCode: 200,
				body: JSON.stringify(post)
			};
		})
		.catch(error => {
			console.error(new Error(error).message);

			return {
				statusCode: 400,
				body: JSON.stringify({
					errorMessage: 'Bad request'
				})
			};
		});
};