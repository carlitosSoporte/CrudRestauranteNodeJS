const { Router } = require('express');
const router = Router();
const Plato = require('../model/plato');
const path = require('path');
const { unlink } = require('fs-extra');


router.get('/', async(req,res)=>{
    const platos = await Plato.find();
    res.render('index',{platos});
});

router.get('/formularioPlatos',(req,res)=>{
    res.render('formularioPlatos');
})

router.get('/prueba',(req,res)=>{
    res.render('prueba')
})

router.post('/registroPlato',async (req,res)=>{
    const plato = new Plato(req.body);
    console.log(req.file);
    if(req.file.mimetype.substring(0,5)!='image'){
        unlink(path.resolve(req.file.path));
        res.redirect('/errorFormato');
        
        return;
    }
    
    if(req.body.disponibilidad){
        plato.disponibilidad = true;
    }
    else{
        plato.disponibilidad = false;
    }
    plato.fechaCreacion = Date.now();
    plato.fotoPlato = '/img/'+req.file.filename;
    await plato.save();
    res.redirect('/')
});

router.post('/editarPlato/:id',async(req,res)=>{
    const plato = await Plato.findById(req.params.id);
    if(req.body.disponibilidad2){
        plato.disponibilidad = true;
    }
    else{
        plato.disponibilidad = false;
    }
    plato.precioPlato = req.body.precioPlato2;
    plato.fechaCreacion = Date.now();
    await Plato.updateOne({_id : req.params.id},plato);
    res.redirect('/');

})
router.get('/eliminarPlato/:id',async(req,res)=>{
    const { id } = req.params;
    const plato = await Plato.findByIdAndRemove(id);
    await unlink(path.resolve('./src/public' + plato.fotoPlato));

    res.redirect('/');
});

router.get('/errorFormato',(req,res)=>{
    res.render('errorFormato')
});

module.exports = router;