import * as env from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import photon from '@generated/photon';
import resolvers from './resolvers';

env.config();

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: (request): any => ({
		...request,
		photon,
	}),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
