const { Schema, model } = require('mongoose');

const laptopSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        team_id: {
            type: Number,
            required: true
        },
        position_id: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        laptop_name: {
            type: String,
            required: true
        },
        laptop_image: {
            type: String,
            required: true
        },
        laptop_brand: {
            type: String,
            required: true
        },
        laptop_cpu: {
            type: String,
            required: true
        },
        laptop_cpu_cores: {
            type: Number,
            required: true
        },
        laptop_cpu_threads: {
            type: Number,
            required: true
        },
        laptop_ram: {
            type: Number,
            required: true
        },
        laptop_hard_drive_type: {
            type: String,
            required: true
        },
        laptop_state: {
            type: String,
            required: true
        },
        laptop_purchase_date: {
            type: String
        },
        laptop_price: {
            type: Number,
            required: true
        }
    },
    { timeStamps: true }
)

module.exports = model('Laptop', laptopSchema);