const multer = require ('multer')
const fs = require ('fs')
const router = require ('express').Router()
const event = require ('../controller/Event')


var storage = multer.diskStorage({
    filename: function (req, file, cb){
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb){
        cb(null, './gambar')
    }
})

var upload = multer({storage: storage}).single("gambar")

router.post("/input", upload, (req, res)=>{
    event.inputDataEvent(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataevent", (req, res)=> {
    event.lihatDataEvent()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataevent/:id", (req, res)=> {
    event.lihatDetailDataEvent(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res)=> {
    event.hapusevent(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res)=> {
    let fileName;
    if (req.body.gambar){
        fileName = req.body.gambar;
    }else{
        fileName = req.file.filename;
    }
    event.updateEvent(req.params.id, req.body, fileName)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})
module.exports = router