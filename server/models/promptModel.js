import mongoose from 'mongoose';

const promptSchema = mongoose.Schema( {
    prompt: String,
    user: String
})

const possiblePrompt = mongoose.model('Prompt', promptSchema);

export default possiblePrompt;