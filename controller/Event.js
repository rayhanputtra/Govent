const event = require('../model/Event.js')
const response = require('../config/response.js')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


exports.inputDataEvent = (data, gambar) =>
    new Promise(async (resolve, reject)=>{
        const eventBaru = new event({
            NamaEvent : data.NamaEvent,
            Penyelenggara : data.Penyelenggara,
            Tanggal : data.Tanggal,
            Lokasi : data.Lokasi,
            Sosmed : data.Sosmed,
            Tentang : data.Tentang,
            gambar : gambar
        })

        await event.findOne({NamaEvent : data.NamaEvent})
            .then(event =>{
                if (event){
                    reject(response.commonErrorMsg('Nama Event Sudah Digunakan'))
                }else {
                    eventBaru.save()
                        .then(r => {
                            resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
                        }).catch(err => {
                        reject(response.commonErrorMsg('Mohon Maaf Input Event Gagal'))
                    })
                }
        }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
    })

    })

exports.lihatDataEvent = ()=>
    new Promise(async (resolve, reject)=>{
        event.find({})
            .then(result=>{
                resolve(response.commonResult(result))
        })
            .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.lihatDetailDataEvent = (NamaEvent)=>
    new Promise(async (resolve, reject)=>{
        event.findOne({NamaEvent : NamaEvent})
            .then(result=>{
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.updateEvent = (id, data, gambar) =>
    new Promise(async (resolve, reject)=>{
        await event.updateOne(
            {_id : ObjectId(id)},
        {
            $set: {
                NamaEvent : data.NamaEvent,
                Penyelenggara : data.Penyelenggara,
                Tanggal : data.Tanggal,
                Lokasi : data.Lokasi,
                Sosmed : data.Sosmed,
                Tentang : data.Tentang,
                gambar : gambar
                }
            }
        ).then(event => {
            resolve(response.commonSuccessMsg('Berhasil Mengubah Data'))
        }).catch(err =>{
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.hapusevent = (_id) =>
    new Promise(async (resolve, reject)=>{
        await event.remove({_id: ObjectId(_id)})
            .then(()=>{
                resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
            }).catch(()=>{
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
            })
    })