const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    NamaEvent:{
        type: String
    },
    Penyelenggara:{
        type : String
    },
    Tanggal:{
        type : String
    },
    Lokasi:{
        type : String
    },
    Sosmed:{
        type : String
    },
    Tentang:{
        type : String
    },
    gambar: {
        type: String

    }

})

module.exports = mongoose.model('event', userSchema)

//NamaEvent
// Penyelenggara event
// Tanggal Event
// Lokasi Event
// Sosmed
// Tentang Event