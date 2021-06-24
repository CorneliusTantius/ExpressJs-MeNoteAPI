const ModelUser = {}

ModelUser.User = class {
    constructor(){
        this._id = null;
        this.username = "";
        this.userEmail = "";
        this.userPassword = "";
    }

    loadJson(data){
        this._id = data['_id'];
        this.username = data['username'];
        this.userEmail = data['userEmail'];
        this.userPassword = data['userPassword'];
        if( this.username == null ||
            this.userEmail == null ||
            this.userPassword == null ) return false;
        return true;
    }
    getJson(){
        return {
            "username": this.username,
            "userEmail": this.userEmail,
            "userPassword": this.userPassword
        };
    }
    getJsonWithId(){
        return {
            "_id":this._id,
            "username": this.username,
            "userEmail": this.userEmail,
            "userPassword": this.userPassword
        };
    }
    
    getId(){return this.id;}
    getUsername(){return this.username;}
    getUserEmail(){return this.userEmail;}
    getUserPassword(){return this.userPassword;}

    setUsername(username){this.username = username}
    setUserEmail(userEmail){this.userEmail = userEmail}
    setUserPassword(userPassword){this.userPassword = userPassword}
}

module.exports = ModelUser;