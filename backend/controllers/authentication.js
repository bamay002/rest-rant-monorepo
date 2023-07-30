const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { User } = db

router.post('/', async (req, res) => {
    console.log(`logging in with` , req.body)
    const { email , password } = req.body

    let user = await User.findOne({
        where: {
            email
        }
    })
    if ( !user || !await bcrypt.compare(password, user.passwordDigest)) {
        res.status(404).json({
            message: `Could not find a user with the provided credentials`
        })
    } else {
        const { value } = await jwt.encode(process.env.JWT_SECRET , { userId : user.userId })
        res.status(200).json({ user, token: value })
    }

    console.log(user)
})

router.get('/profile', async(req,res) => {
    try{
       res.status(200).json(req.currentUser)
    } catch(e){
        res.status(500).json({ message: 'server did an oopsie'})
    }
})

module.exports = router
