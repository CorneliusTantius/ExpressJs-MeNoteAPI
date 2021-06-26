module.exports = function(app, client){
    const HelperUser = require('../AppHelper/HelperUser.js');

    app.post("/user/add", async function(request, response){
        var retVal = await HelperUser.AddUser(client, request.body);
        response.json(retVal);
    });

    app.get("/user/get", async function(request, response){
        var retVal = await HelperUser.GetAllUser(client);
        response.json(retVal);
    });

    app.get("/user/get/username", async function(request, response){
        var retVal = await HelperUser.GetUserByUsername(client, request.body);
        response.json(retVal);
    }); 

    app.post("/user/update/password", async function(request, response){
        var retVal = await HelperUser.UpdatePasswordByUsername(client, request.body);
        response.json(retVal);
    });
}