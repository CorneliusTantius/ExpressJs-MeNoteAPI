module.exports = function(app){
    const HelperBase =  require('../AppHelper/HelperBase.js');

    // Entry point
    app.get("/", async function(request, response){
        let AppVer = await HelperBase.GetAppVersion(); 
        response.send(AppVer);
    });
}