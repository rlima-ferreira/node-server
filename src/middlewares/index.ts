import { isLogged } from './auth';

export default [{
	Query: {
		findUser: isLogged,
	},
	Mutation: {
		updateUser: isLogged,
		destroyUser: isLogged,
	},
}];
