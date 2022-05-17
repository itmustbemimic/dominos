require("dotenv").config();
const { v4 } = require('uuid');
const AWS = require('aws-sdk');

awsConfig = {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEYID,
    secretAccessKey: process.env.SECRET_ACCESSKEY,
};
AWS.config.update(awsConfig);

exports.uuid = () => {
    const tokens = v4().split('-')
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
}

exports.docClient = new AWS.DynamoDB.DocumentClient();
exports.date = new Date().toISOString();