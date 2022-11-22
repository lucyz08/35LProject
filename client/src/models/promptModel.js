import mongoose from 'mongoose';

const promptSchema = mongoose.Schema( {
    prompt: String
})

const possiblePrompt = mongoose.model('PossiblePrompt', promptSchema);

export default possiblePrompt;