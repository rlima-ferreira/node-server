import { GraphQLServer } from 'graphql-yoga';
import photon from '@generated/photon';
import storage from './middlewares/Multer';
import resolvers from './resolvers';

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: (request): any => ({
		...request,
		photon,
	}),
});

server.use(storage);
server.start(() => console.log('Server is running on http://localhost:4000'));
