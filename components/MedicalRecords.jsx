import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema(
    {
        childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
        date: { type: Date, required: true },
        location: { type: String, enum: ['Doctor Office', 'Hospital', 'Home'], required: true },
        height: { type: Number, required: true }, // in inches
        weight: { type: Number, required: true }, // in pounds
        headCircumference: { type: Number, required: true }, // in inches
        vaccines: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccines', required: true }, // comma separated list of vaccines
        notes: { type: String, required: true },
    }
);

export default mongoose.model('MedicalRecord', medicalRecordSchema);