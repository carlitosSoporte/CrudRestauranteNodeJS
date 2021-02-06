const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://carlosdiaz:eewzwt71@cluster0.qz528.mongodb.net/restaurante?retryWrites=true&w=majority', {
    useNewUrlParser : true
})
.then(db => console.log('Database MongoDB - crud-mongo connected'))
.catch(err => console.log(err));