import * as jwt from 'jsonwebtoken';
import Photon from '../@generated/photon';

export interface Context {
  photon: Photon;
  request: any;
}

export function getUserId(ctx: Context): number {
	const Authorization = ctx.request.get('Authorization');
	const token = Authorization.replace('Bearer ', '');
	const { userId } = jwt.verify(token, process.env.SECRET) as { userId: number };
	return userId;
}
