const HelperBase = {}

HelperBase.GetAppVersion = async function(){
    const AppVer = "1.0"
    return `<h1>ME-Note API V${AppVer}</h1>`
}

module.exports = HelperBase;