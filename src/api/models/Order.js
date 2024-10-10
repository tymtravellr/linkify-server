const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectedComplexityTypeSchema = new Schema({
    complexityTypeId: { type: Schema.Types.ObjectId, ref: 'Service.complexityTypes' },
    label: { type: String },
    price: { type: Number }
});

const orderServiceSchema = new Schema({
    // service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceId: { type: Schema.Types.ObjectId },
    serviceName: { type: String },
    selectedComplexityType: selectedComplexityTypeSchema,
    selectedSubServices: [{
        subServiceId: { type: Schema.Types.ObjectId },
        subServiceName: { type: String },
        selectedComplexityType: selectedComplexityTypeSchema
    }],
});

const orderSchema = new Schema({
    customer_first_name: { type: String },
    customer_last_name: { type: String },
    customer_email: { type: String, required: true },
    services: [orderServiceSchema],
    quantity: { type: Number, required: true },
    files: [{ type: String }],
    isFree: {
        type: Boolean,
        default: false
    },
    preferences: {
        time: { type: String },
        add_ons: {
            type: Object
        },
        file_format: [{
            label: { type: String, required: true },
            option: { type: String, required: true }
        }],
        note: { type: String }
    },
    total_price: { type: Number, required: true, min: [0, "Total Price Cannot Be Negetive"], default: 0 },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);