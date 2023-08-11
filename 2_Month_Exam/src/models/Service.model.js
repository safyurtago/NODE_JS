const {v4: uuid} = require('uuid');

class Service {
    constructor(seviceName, servicePhoto) {
        this.id = uuid()
        this.serviceName = seviceName;
        this.servicePhoto = servicePhoto;
    }
}

module.exports = Service;