const mongoose = requrie("mongoose");

const postSchema = new mongoose.Schema({

    user: { type:  mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, "please provide the userId of writer"] },

    title: { type: String, required: [true, "Please provide title of post"], trim: true },
    // Think : should be description here or remove it
    description: { type: String, required: true, trim: true },
    content: { type: String, required: [true, "Please provide the content of post"], trim: true },

    upVote: { type: Number, default: 0 }, // likeCount

    comments: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);