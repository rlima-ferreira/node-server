import * as env from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import Photon from '../@generated/photon';
import resolvers from './resolvers';
import middlewares from './middlewares';

env.config();

const photon = new Photon();

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers,
	middlewares,
	context: (request): any => ({
		...request,
		photon,
	}),
});

server.start({
	port: 3000,
	playground: false,
	endpoint: '/api',
});
