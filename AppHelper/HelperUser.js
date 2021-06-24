const HelperUser = {}
const { query } = require('express');
const ModelBase = require('../AppModel/ModelBase.js');
const ModelUser = require('../AppModel/ModelUser.js');

HelperUser.AddUser = async function(client, body){
    var retVal = new ModelBase.OutputBase(0, "", {})
    var user = new ModelUser.User();
    
    // Reading input data
    if(!user.loadJson(body)){
        retVal.setMessage("username / userEmail / userPassword not supplied");
        return retVal;
    }
    
    // Collection initializing
    const database = client.db("menotedb");
    const userCollection = database.collection("user");

    // Checking username / password exsistance
    let query = { "$or": [ {"username":user.getUsername()}, {"userEmail":user.getUserEmail()} ] }
    let userCheckArray = (await userCollection.find(query).toArray());
    
    if(userCheckArray.length >= 1){
        retVal.setMessage("username / userEmail already exists");
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
        retVal.setStatus(1);
        return retVal;
    }
}

HelperUser.GetAllUser = async function(client){
    var retVal = new ModelBase.OutputBase(0, "", {});
    
    const database = client.db("menotedb");
    const userCollection = database.collection("user");

    retVal.setResult( (await userCollection.find().toArray()) );
    retVal.setStatus(1);
    return retVal;
}

HelperUser.GetUserByUsername = async function(client, body){
    var retVal = new ModelBase.OutputBase(0, "", {});

    if(body.username == "" || body.username == null){
        retVal.setMessage("username not supplied");
        return retVal;
    }

    const database = client.db("menotedb");
    const userCollection = database.collection("user");

    let query = {"username": body.username};
    
    result = await userCollection.findOne(query);
    if(result == null){
        retVal.setMessage("user not found");
        return retVal
    }
    else{
        retVal.setResult(result);
        retVal.setStatus(1);
        return retVal;
    }
}

HelperUser.UpdatePasswordByUsername = async function(client, body){
    var retVal = new ModelBase.OutputBase(0, "", {});

    if(body.username == "" || body.username == null || body.userPassword == "" || body.userPassword == null){
        retVal.setMessage("username / userPassword not supplied");
        return retVal;
    }

    const database = client.db("menotedb");
    const userCollection = database.collection("user");

    let query = {"username": body.username};
    
    result = await userCollection.findOne(query);
    if(result == null){
        retVal.setMessage("user not found");
        return retVal
    }
    else{
        let user = new ModelUser.User();
        user.loadJson(result);
        user.setUserPassword(body.userPassword);
        await userCollection.updateOne(query, {"$set":user.getJsonWithId()});
        retVal.setResult(user);
        retVal.setMessage("userPassword updated");
        return retVal;
    }
}

module.exports = HelperUser;