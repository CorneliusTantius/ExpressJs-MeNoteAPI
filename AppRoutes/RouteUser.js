module.exports = function(app, client){
    const HelperUser = require('../AppHelper/HelperUser.js');

    app.post("/user/add", async function(request, response){
        var retVal = await HelperUser.AddUser(client, request.body);
        response.send(retVal);
    });

    app.get("/user/get", async function(request, response){
        var retVal = await HelperUser.GetAllUser(client);
        response.send(retVal);
    });

}