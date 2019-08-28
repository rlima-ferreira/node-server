import { QueryUser, MutationUser } from './user';

export default {
	Query: {
		...QueryUser,
	},
	Mutation: {
		...MutationUser,
	},
};
