const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
})

exports.profile = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'tmi-image',
    acl: 'public-read',
    key(req, file, cb) {
      console.log(file);
      cb(null, `profile/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
});

exports.profile = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'tmi-image',
    acl: 'public-read',
    key(req, file, cb) {
      console.log(file);
      cb(null, `profile/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
});