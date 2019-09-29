import * as jwt from 'jsonwebtoken';
import Photon from '../@generated/photon';

export interface Context {
  photon: Photon;
  request: any;
}

export class AuthError extends Error {
	constructor() {
		super('Not authorized');
	}
}

export function getUserId(ctx: Context): Promise<any> {
	const Authorization = ctx.request.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = jwt.verify(token, process.env.SECRET) as { userId: number };
		return userId;
	}

	throw new AuthError();
}
