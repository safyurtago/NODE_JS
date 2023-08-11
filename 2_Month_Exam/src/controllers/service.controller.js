const {v4: uuid} = require('uuid');
const path = require('path');

const IO = require('../utils/io')
const Service = require('../models/Service.model')


const Services = new IO(process.cwd() + '/database/services.json')


const createService = async (req, res) => {
    const {serviceName} = req.body;
    const file = req.files.photo;
    const services = await Services.read()
    const fileName = uuid() + path.extname(file.name)
    file.mv(process.cwd() + '/uploads/' + fileName)
    const newService = new Service(serviceName, fileName);
    const result = services.length ? [...services, newService] : [newService]
    await Services.write(result)
    res.status(201).json({message: 'Created service'})
}

const getAllServices = async (req, res) => {
    const services = await Services.read()
    res.status(200).json(services)
}

const getOneService = async (req, res) => {
    const {id} = req.params
    const services = await Services.read()
    const service = services.find(service => service.id === id)
    if (!service) {
        return res.status(404).json({message: "Service not found"})
    }
    res.status(200).json({message: "Success", service})
}

const deleteService = async (req, res) => {
    const {id} = req.params
    const services = await Services.read()
    const findService = services.find(service => service.id === id)
    if (!findService) {
        return res.status(404).json({message: "Service not found"})
    }
    const result = services.filter(service => service.id!== id)
    await Services.write(result)
    res.status(200).json({message: "Service deleted"})
}

const updateService = async (req, res) => {
    const {id} = req.params
    const {serviceName} = req.body;
    const file = req.files.photo;
    const services = await Services.read()
    const findService = services.find(service => service.id === id)
    if (!findService) {
        return res.status(404).json({message: "Service not found"})
    }
    const fileName = uuid() + path.extname(file.name)
    file.mv(process.cwd() + '/uploads/' + fileName)
    findService.serviceName = serviceName
    findService.servicePhoto = fileName
    await Services.write(services)
    res.status(200).json({message: "Succesfully updated"})
}


module.exports = {
    createService,
    getAllServices,
    getOneService,
    deleteService,
    updateService
}