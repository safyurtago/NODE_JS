const {v4: uuid} = require('uuid');
const path = require('path')

const IO = require('../utils/io')
const Feedback = require('../models/Feedback.model')

const Feedbacks = new IO(process.cwd() + '/database/feedbacks.json')

const createFeedback = async (req, res) => {
    const {personName, personJob, personFeedback} = req.body;
    const file = req.files?.photo
    const feedbacks = await Feedbacks.read()
    const photoName = uuid() + path.extname(file.name)
    file.mv(process.cwd() + '/uploads/' + photoName)
    const newFeedback = new Feedback(personName, personJob, personFeedback, photoName)
    const result = feedbacks.length ? [...feedbacks, newFeedback] : [newFeedback]
    await Feedbacks.write(result)
    res.status(201).json({message: "Feedback successfully created"})
}

const getAllFeedback = async (req, res) => {
    const feedbacks = await Feedbacks.read()
    res.status(200).json({message: "Success", feedbacks})
}

const getOneFeedback = async (req, res) => {
    const {id} = req.params
    const feedbacks = await Feedbacks.read()
    const findFeedback = feedbacks.find(feedback => feedback.id === id)
    res.status(200).json({message: "Success", feedback: findFeedback})
}

const updateFeedback = async (req, res) => {
    const {id} = req.params
    const {personName, personJob, personFeedback} = req.body
    const file = req.files.photo
    const personPhotoName = uuid() + path.extname(file.name)
    file.mv(process.cwd() + '/uploads/' + personPhotoName)
    const feedbacks = await Feedbacks.read()
    const findFeedback = feedbacks.find(feedback => feedback.id === id)
    findFeedback.personName = personName
    findFeedback.personJob = personJob
    findFeedback.personFeedback = personFeedback
    findFeedback.personPhoto = personPhotoName
    await Feedbacks.write(feedbacks)
    res.status(200).json({message: "Feedback successfully updated"})
}

const deleteFeedback = async (req, res) => {
    const {id} = req.params
    const feedbacks = await Feedbacks.read()
    const findFeedback = feedbacks.find(feedback => feedback.id === id)
    const index = feedbacks.indexOf(findFeedback)
    feedbacks.splice(index, 1)
    await Feedbacks.write(feedbacks)
    res.status(200).json({message: "Feedback successfully deleted"})
}

module.exports = {
    createFeedback,
    getAllFeedback,
    getOneFeedback,
    updateFeedback,
    deleteFeedback
}