const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User, Basket, BasketDevice, Device, Rating} = require('../models/models')

const generateJwt = (id,email,role) => {
    return jwt.sign({id, email ,role}, process.env.SECRET_KEY, {expiresIn: "24h"})
}

class UserController {
    async registration(req,res, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest("Invalid email or password"))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest("The user with that email already exists"))
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal("User not found"))
        }
        let comparedPassword = bcrypt.compareSync(password, user.password)
        if (!comparedPassword) {
            return next(ApiError.internal("Incorrect Password"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async basket(req,res,next){
        const {id} = req.user
        const basket = await Basket.findOne({where: {userId: id}})
        const basketDevices = await BasketDevice.findAll({where: {basketId: basket.id}})
        const devices = await Device.findAll({where: {id: basketDevices.map(
            (bd) => bd.deviceId
        )}})
        return res.json(devices)
    }

    async addToBasket(req,res,next){
        const {deviceId} = req.body
        const basket = await Basket.findOne({where: {userId: req.user.id}})
        const duplicate = await BasketDevice.findOne({where: {basketId: basket.id, deviceId}})

        if (duplicate) {
            return next(ApiError.badRequest("This device already exists in the cart"))
        }

        const basketDevice = await BasketDevice.create({deviceId, basketId: basket.id})
        return res.json({basketDevice})
    }  

    async rate(req,res,next){
        const {rate, deviceId} = req.body
        const duplicate = await Rating.findOne({where: {userId: req.user.id, deviceId}})

        if(duplicate){
            return next(ApiError.badRequest("You have already rated this product"))
        }

        const rating = await Rating.create({rate, userId: req.user.id, deviceId})
        const ratings = await Rating.findAll({where: {deviceId}})
        console.log(ratings.reduce((sum, cur) => sum+ cur.rate,0))
        const deviceRate = await Device.update({rating: ratings.reduce(
            (partialSum, r) => partialSum + r.rate,0
            ) / ratings.length}, {where: {id: deviceId}})
        return res.json({deviceRate})
    }   
}

module.exports = new UserController()