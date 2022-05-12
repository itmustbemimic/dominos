const express = require('express');
const router = express.Router();
const awsConfig = require('../config/dynamodb/dynamoDBConfig');

const tableName = "news";

//개별 뉴스 조회
router.get('/:id', (req, res) => {
    const params = {
        TableName: tableName,
        Key: {
            _id: req.params.id,
            date: "12312312"
        }
    };

    awsConfig.docClient.get(params, (err, data) => {
        if (err)
            console.error("Unable to read item Error JSON: ", JSON.stringify(err, null, 2));
        else {
            console.log("Get item succeeded: ", JSON.stringify(data, null, 2));

        }
    });
});


//뉴스 업로드
router.post('/', (req, res) => {
    const id = awsConfig.uuid();

    const params = {
        TableName: tableName,
        Item: {
            _id: id,
            date: awsConfig.date
        }
    };

    console.log("Adding a new item...");
    awsConfig.docClient.put(params, (err, data) => {
        if (err)
            console.error("Unable to add item. Error JSON: ", JSON.stringify(err, null, 2));
        else
            console.log("Added item: ", JSON.stringify(data, null, 2));
    });

    res.redirect(`/news/${id}`)
});

module.exports = router;
