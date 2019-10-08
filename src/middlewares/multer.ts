import * as path from 'path';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';
import { Context } from '../utils';

// Armazenamento local
const diskStorage = multer.diskStorage({
	destination: path.resolve(__dirname, '../..', 'uploads'),
	filename(req, file, cb): void {
		const extension = file.originalname.split('.')[1];
		cb(null, `${Date.now()}.${extension}`);
	},
});

// Armazenamento na Amazon S3
const AWS = new S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
});


const awsStorage = multerS3({
	s3: AWS,
	bucket: process.env.BUCKET,
	acl: process.env.ACL,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	// contentDisposition: process.env.CONTENTDISPOSITION,
	metadata(req, file, cb): void {
		cb(null, { fieldName: file.fieldname });
	},
	key(req, file, cb) {
		const extension = file.originalname.split('.')[1];
		cb(null, `${Date.now().toString()}.${extension}`);
	},
});

const storages = {
	local: diskStorage,
	s3: awsStorage,
};


const storage = multer({ storage: storages[process.env.FILESYSTEM] }).fields([
	{ name: 'avatar', maxCount: 1 },
	{ name: 'photos', maxCount: 9 },
]);

const upload = (resolve, parent, args, ctx: Context) => {
	storage;
	return resolve();
};

export default upload;
