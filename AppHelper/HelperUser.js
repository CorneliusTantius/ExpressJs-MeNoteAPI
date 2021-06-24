const HelperUser = {}
const { query } = require('express');
const ModelBase = require('../AppModel/ModelBase.js');
const ModelUser = require('../AppModel/ModelUser.js');

HelperUser.AddUser = async function(client, body){
    var retVal = new ModelBase.OutputBase(0, "", {})
    var user = new ModelUser.User();
    
    // Reading input data
    if(!user.loadJson(body)){
        retVal.setMessage("Failed to fetch JSON payload");
        return retVal;
    }
    
    // Collection initializing
    const database = client.db("menotedb");
    const userCollection = database.collection("user");

    // Checking username / password exsistance
    let query = { "$or": [ {"username":user.getUsername()}, {"userEmail":user.getUserEmail()} ] }
    let userCheckArray = (await userCollection.find(query).toArray());
    
    if(userCheckArray.length >= 1){
        retVal.setMessage("username / email already exists");
        return retVal
    }
    else{
        await userCollection.insertOne(
            user.getJson()
        ).then(result => {
            retVal.setStatus(result.result.ok);
            retVal.setMessage("User Added");
            retVal.setResult(user);
        }).catch(error => {
            retVal.setResult(error);
        })
        return retVal;
    }
}

HelperUser.GetAllUser = async function(client){
    var retVal = new ModelBase.OutputBase(0, "", {});
    
    const database = client.db("menotedb");
    const userCollection = database.collection("user");

    retVal.setResult((await userCollection.find().toArray()));

    return retVal;
}

module.exports = HelperUser;
