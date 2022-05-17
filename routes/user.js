const express = require('express');
const router = express.Router();
const AWSCognito = require('amazon-cognito-identity-js');
const cognitoConfig = require('../config/dynamodb/cognitoConfig');

const CognitoUserPool = AWSCognito.CognitoUserPool;
const userPool = new CognitoUserPool(cognitoConfig.config);

//need to test
router.get('/join', (req, res) => {
    let attributeList = [];
    let dataEmail = {
        Name : 'email',
        Value : req.body.email
    };

    const attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(req.body.username, req.body.password, attributeList, null, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        let cognitoUser = result.user;
        console.log('user name is ' +  cognitoUser.getUsername());
        res.send(cognitoUser.getUsername());
    })

})

module.exports = router;
