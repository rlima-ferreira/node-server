import * as env from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import Photon from '../photon';
import resolvers from './resolvers';

env.config();

const photon = new Photon();

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers,
	context: (request): any => ({
		...request,
		photon,
	}),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
