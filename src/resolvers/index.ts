// Query
import UserQuery from './Query/user';

// Mutation
import UserMutation from './Mutation/user';

export default {
	Query: {
		...UserQuery,
	},
	Mutation: {
		...UserMutation,
	},
};
