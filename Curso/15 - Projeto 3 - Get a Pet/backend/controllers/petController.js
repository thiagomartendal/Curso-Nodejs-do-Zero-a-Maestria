import { Types } from 'mongoose'
import fs from 'fs'
import Pet from '../models/Pet.js'
import token from '../helpers/token.js'

async function getCurrentUser(req) {
    // Resgata o usuário conectado por seu token
    const tk = req.signedCookies.valid
    return await token.getUserByToken(tk)
}

function inputValidation(inputsData) {
    if (!inputsData.name)
        return 'O nome do animal de estimação não foi informado.'

    if (!inputsData.age)
        return 'A idade do animal de estimação não foi informada.'

    if (!inputsData.weight)
        return 'O peso do animal de estimação não foi informado.'

    if (!inputsData.color)
        return 'A cor do animal de estimação não foi informada.'

    return null
}

// Funções de rotas GET

async function getAll(req, res) {
    // Resgata todos os animais de estimação cadastrados
    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({pets: pets})
}

async function getAllUserPets(req, res) {
    // Retorna o usuário atual conectado
    const user = await getCurrentUser(req)

    // Resgata os animais de estimação do usuário conectado
    const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

    res.status(200).json({pets})
}

async function getAllUserAdoptions(req, res) {
    // Busca o usuário por seu token
    const user = await getCurrentUser(req)

    // Resgata os animais de estimação do usuário conectado
    const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

    res.status(200).json({pets})
}

async function getPetById(req, res) {
    const id = req.params.id

    // Verifica se o ID é válido
    if (!Types.ObjectId.isValid(id))
        return res.status(422).json({message: 'Identificador inválido.'})

    // Busca o animal de estimação pelo ID
    const pet = await Pet.findOne({_id: id})
    if (!pet)
        return res.status(404).json({message: 'Animal de estimação não encontrado.'})

    res.status(200).json({pet: pet})
}

// Funções de rotas POST

async function create(req, res) {
    const {name, age, weight, color} = req.body
    const images = req.files
    const available = true

    // Verifica os campos de dados
    const msgInputValidation = inputValidation(req.body)
    if (msgInputValidation)
        return res.status(422).json({message: msgInputValidation})

    // Verifica se foram envidas imagens
    if (images.length === 0)
        return res.status(422).json({message: 'Envie ao menos uma imagem do animal de estimação.'})

    // Busca o usuário por seu token
    const user = await getCurrentUser(req)

    const pet = new Pet({
        name,
        age,
        weight,
        color,
        available,
        images: [],
        user: {
            _id: user._id,
            name: user.name,
            image: user.image,
            phone: user.phone
        }
    })

    images.map(item => 
        pet.images.push(item.filename)
    )

    try {
        const newPet = await pet.save()
        res.status(201).json({
            message: 'Animal de estimação cadastrado.',
            newPet
        })
    } catch (error) {
        images.map(item => fs.unlinkSync('../data/pet/' + item.filename)) // Remove as imagens enviadas em caso de erro no cadastro
        return res.status(500).json({message: error})
    }
}

// Funções de rotas PATCH

async function updatePet(req, res) {
    const id = req.params.id
    const {name, age, weight, color, avaliable} = req.body
    const images = req.files
    const updatedData = {}

    // Verifica se o animal de estimação está cadastrado
    const pet = await Pet.findOne({_id: id})
    if (!pet)
        return res.status(404).json({message: 'Animal de estimação não encontrado.'})
    const previousImages = pet.images

    // Verifica se o animal de estimação foi cadastrado pelo usuário atual conectado
    const user = await getCurrentUser(req)
    if (pet.user._id.toString() !== user._id.toString())
        return res.status(422).json({message: 'O animal de estimação não foi removido pois não foi cadastrado pelo usuário atual.'})

    // Verifica os campos de dados
    const msgInputValidation = inputValidation(req.body)
    if (msgInputValidation)
        return res.status(422).json({message: msgInputValidation})
    else {
        updatedData.name = name
        updatedData.age = age
        updatedData.weight = weight
        updatedData.color = color
        updatedData.available = avaliable
    }

    // Verifica se foram envidas imagens
    if (images.length > 0) {
        updatedData.images = []
        images.map(item => 
            updatedData.images.push(item.filename)
        )
    }
    
    try {
        // Atualiza os dados
        await Pet.findByIdAndUpdate(id, updatedData)

        if (updatedData.images && updatedData.images.length > 0)
            previousImages.map(item => fs.unlinkSync('../data/pet/' + item))
        
        res.status(200).json({message: 'Os dados do animal de estimação foram atualizados.'})
    } catch (error) {
        images.map(item => fs.unlinkSync('../data/pet/' + item.filename)) // Remove as imagens enviadas em caso de erro na atualização
        res.status(500).json({message: 'Erro ao atualizar os dados do animal de estimação.'})
    }

}

async function schedule(req, res) {
    const id = req.params.id

    // Verifica se o animal de estimação está cadastrado
    const pet = await Pet.findOne({_id: id})
    if (!pet)
        return res.status(404).json({message: 'Animal de estimação não encontrado.'})

    // Verifica se o animal de estimação foi cadastrado pelo usuário atual conectado
    const user = await getCurrentUser(req)
    if (pet.user._id.equals(user._id))
        return res.status(422).json({message: 'Não é possível agendar uma visita com seu próprio animal de estimação.'})

    // Verifica se o usuário atual já marcou uma visita para o animal de estimação
    if (pet.adopter)
        if (pet.adopter._id.equals(user._id))
            return res.status(422).json({message: 'Você já agendou uma visita para este animal de estimação.'})
    
    pet.adopter = {
        _id: user._id,
        name: user.name,
        image: user.image
    }

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({message: `A visita foi agendada. Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}.`})
}

async function concludeAdoption(req, res) {
    const id = req.params.id

    // Verifica se o animal de estimação está cadastrado
    const pet = await Pet.findOne({_id: id})
    if (!pet)
        return res.status(404).json({message: 'Animal de estimação não encontrado.'})

    // Verifica se o animal de estimação foi cadastrado pelo usuário atual conectado
    const user = await getCurrentUser(req)
    if (pet.user._id.toString() !== user._id.toString())
        return res.status(422).json({message: 'A adoção só pode ser confimado pelo dono do animal de estimação.'})

    pet.available = false

    // Atualiza os dados do animal de estimação para indicar que o mesmo não está mais disponível para adoção
    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({message: 'A adoção foi finalizada com sucesso.'})
}

// Funções de rotas DELETE

async function removePetById(req, res) {
    const id = req.params.id

    // Verifica se o ID é válido
    if (!Types.ObjectId.isValid(id))
        return res.status(422).json({message: 'Identificador inválido.'})

    // Verifica se o animal de estimação está cadastrado
    const pet = await Pet.findOne({_id: id})
    if (!pet)
        return res.status(404).json({message: 'Animal de estimação não encontrado.'})

    // Verifica se o animal de estimação foi cadastrado pelo usuário atual conectado
    const user = await getCurrentUser(req)
    if (pet.user._id.toString() !== user._id.toString())
        return res.status(422).json({message: 'O animal de estimação não foi removido pois não foi cadastrado pelo usuário atual.'})

    try {
        // Remove o registro
        await Pet.findOneAndDelete({_id: id})
        
        pet.images.map(item => fs.unlinkSync('../data/pet/' + item))
    
        res.status(200).json({message: 'O animal de estimação foi removido.'})
    } catch (error) {
        res.status(200).json({message: 'Erro ao remover animal de estimação.'})
    }
}

export default {
    getAll,
    getAllUserPets,
    getAllUserAdoptions,
    getPetById,
    create,
    updatePet,
    schedule,
    concludeAdoption,
    removePetById
}