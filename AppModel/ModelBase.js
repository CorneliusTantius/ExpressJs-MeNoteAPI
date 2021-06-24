const ModelBase = {}

ModelBase.OutputBase = class {
    constructor(status, message, result){
        this.status = status;
        this.message = message;
        this.result = result;
    }
    getJson(){
        return {
            "status": this.status,
            "message": this.message,
            "result": this.result
        };
    }

    getStatus(){return this.status;}
    getMessage(){return this.message;}
    getResult(){return this.result;}

    setStatus(status){this.status = status;}
    setMessage(message){this.message = message;}
    setResult(result){this.result = result;}
}

module.exports = ModelBase;