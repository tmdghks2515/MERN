import express  from "express";

// Model
import Post from "../../models/post"

const router = express.Router()

//api/post
router.get("/", async(req, res) => {
    const posts = await Post.find()
    console.log(posts, "all post found")
    res.json(posts)
})

router.post("/", async(req, res, next) => {
    try {
        console.log("req", req)
        const {title, content, fileUrl, creator} = req.body
        const newPost = await Post.create({
            title, content, fileUrl, creator
        })
        res.json(newPost)
    } catch (e){
        console.log(e)
    }
})

export default router