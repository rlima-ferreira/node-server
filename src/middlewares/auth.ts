import * as jwt from 'jsonwebtoken';
import { Context } from '../utils';

export class AuthError extends Error {
	constructor() {
		super('Not authorized');
	}
}

export function isLogged(resolve, parent, args, ctx: Context): any {
	const Authorization = ctx.request.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = jwt.verify(token, process.env.SECRET) as { userId: number };
		if (userId) {
			return resolve();
		}
	}
	throw new AuthError();
}
