import * as mongoose from "mongoose";
import moment from "moment";

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    creatorName: {
        type: String
    }  // DB 에 부담을 덜어주고자 만든 것
})

const Comment = new mongoose.model("comment", CommentSchema)

export default Comment