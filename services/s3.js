const { S3 } = require("aws-sdk");

const s3Upload = async (files) => {
  const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS,
    },
  });

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
const listImages = async (res, req) => {
  const retrieve = await s3Upload
    .listenObjects({ Bucket: process.env.AWS_BUCKET_NAME })
    .promise();
  const imageList = retrieve.Contents.map((file) => file.Key);
  res.send(imageList);
};

const downloadImages = async (req, res) => {
  let allImages = await s3Upload
    .getObject({ Bucket: process.env.AWS_BUCKET_NAME })
    .promise();
  res.send(allImages);
};

module.exports = { s3Upload, listImages, downloadImages };
