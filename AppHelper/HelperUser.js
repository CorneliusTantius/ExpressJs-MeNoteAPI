const HelperUser = {}
const ModelBase = require('../AppModel/ModelBase.js');
const ModelUser = require('../AppModel/ModelUser.js');

HelperUser.AddUser = async function(client, body){
    var user = new ModelUser.User();
    var retVal = new ModelBase.OutputBase(0, "", {})

    if(!user.loadJson(body)){
        retVal.setMessage("Failed to fetch JSON payload");
        return retVal;
    }
    
    const db = client.db("menotedb");
    const userCollection = db.collection("user");
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

module.exports = HelperUser;
