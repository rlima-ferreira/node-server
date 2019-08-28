import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Context, getUserId } from '../utils';

export const QueryUser = {
	async login(parent, { email, password }, ctx: Context): Promise<any> {
		const user = await ctx.photon.users.findOne({ where: { email } });
		if (!user) {
			throw new Error(`No such user found for email: ${email}`);
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid password');
		}

		return {
			token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
			user,
		};
	},
};

export const MutationUser = {
	async signup(parent, args, ctx: Context): Promise<any> {
		const password = await bcrypt.hash(args.password, 10);
		const user = await ctx.photon.users.create({ data: { ...args, password } });
		console.log(ctx.request.files.avatar || ctx.request.files.avatar[0].key);
		return {
			token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
			user,
		};
	},

	async updateUser(parent, args, ctx: Context): Promise<any> {
		try {
			const id = getUserId(ctx);
			const pass = await bcrypt.hash(args.password, 10);
			await ctx.photon.users.update({
				where: { id },
				data: { ...args, password: pass },
			});
			return true;
		} catch (e) {
			console.log(e.message);
			return false;
		}
	},

	async destroyUser(parent, args, ctx: Context): Promise<any> {
		try {
			const id = getUserId(ctx);
			await ctx.photon.users.delete({ where: { id } });
			return true;
		} catch (e) {
			console.log(e.message);
			return false;
		}
	},
};
