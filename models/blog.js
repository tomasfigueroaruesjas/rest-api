const { Schema, model } = require('mongoose')

const BlogSchema = Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    body: {
        type: String,
        required: [true, 'El cuerpo del posteo es obligatorio']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Blog', BlogSchema)