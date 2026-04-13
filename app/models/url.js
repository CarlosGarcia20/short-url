import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, 'La URL original es obligatoria'],
        trim: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    accessCount: {
        type: Number,
        required: true,
        default: 0 
    }
   
},  {
        timestamps: true
    }
);

UrlSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        
        delete returnedObject._id;
        delete returnedObject.__v; 
    }
});

export default mongoose.model('Url', UrlSchema)