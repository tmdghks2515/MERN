import express from "express"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config'

const {JWT_SECRET} = config

//Model
import User from "../../models/user"

const router = express.Router()

// @router          GET api/user

// @access          public

// @desc            GET all user
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        if(!users) throw Error("No users")
        res.status(200).json(users)
    } catch(e) {
        console.log(e)
        res.status(400).json({msg: e.message})
    }
})

router.post('/', (req, res)=> {
    console.log(req)
    try {
        const {name, email, password} = req.body;

        // simple validation
        if(!name || !email || !password) {
            return res.status(400).json({msg: "모든 필드를 채워주세요"})
        }

        // check for existing user
        User.findOne({email})
            .then(user => {
                if(user) return res.status(400).json({msg: "이미 가입된 유저가 존재합니다"})
                const newUser = new User({
                    name, email, password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err
                        newUser.password = hash
                        newUser.save().then(user => {
                            jwt.sign(
                                {id: user.id},
                                JWT_SECRET,
                                {expiresIn: "10d"},
                                (err, token) => {
                                    if(err) throw err
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        });
                    });
                });
            })
    } catch (e){
        console.log(e)
    }
})


export default router