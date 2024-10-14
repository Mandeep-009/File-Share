import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    _id: {type: String,required: true},
    content: {type: Array, default: []},
    createdAt: { type: Date, expires: 900, default: Date.now }
})

const Files = mongoose.model('connections',FileSchema)

export default Files