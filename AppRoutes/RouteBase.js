module.exports = function(app){
    const HelperBase =  require('../AppHelper/HelperBase.js');

    // Entry point
    app.get("/", async function(req, res){
        let AppVer = await HelperBase.GetAppVersion(); 
        res.send(AppVer);
    });
}