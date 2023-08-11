const {v4: uuid} = require('uuid');

class Feedback {
    constructor (personName, personJob, personFeedback, personPhoto = null) {
        this.id = uuid()
        this.personName = personName;
        this.personJob = personJob;
        this.personPhoto = personPhoto;
        this.personFeedback = personFeedback;
    }
}

module.exports = Feedback;