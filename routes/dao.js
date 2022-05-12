const express = require('express');
const router = express.Router();
const awsConfig = require('../config/dynamodb/dynamoDBConfig');

const tableName = "dao_list";

router.get('/test', (req, res) => {
    res.redirect(`/news/4f017e3cdd33db3fbdf7bb1ae9ab3802`)

})

router.get('/list/:id', (req, res) => {
    const params = {
        TableName: tableName,
        Key: {
            _id: req.params.id
        }
    };

    awsConfig.docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item Error JSON: ", JSON.stringify(err, null, 2));
        }
        else {
            console.log("Get Item Succeeded: ", JSON.stringify(data, null, 2));
        }
    });
});

router.post('/create', (req, res) => {
    const id = awsConfig.uuid();

    const params = {
        TableName: tableName,
        Item: {
            _id: id,
            date: awsConfig.date
        }
    }

    console.log("Adding a dao...");
    awsConfig.docClient.put(params, (err, data) => {
        if (err)
            console.error("Unable to add item. Error JSON: ", JSON.stringify(err, null, 2))
        else
            console.log("Added item: ", JSON.stringify(data, null, 2))
    })

    res.redirect(`/dao/list/${id}`)
})

router.get('/launch', (req, res) => {
    res.send('DAO Launch Page')
})

module.exports = router;
