import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Context } from '../../utils';

const User = {
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

export default User;
