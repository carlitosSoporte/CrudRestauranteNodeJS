const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatoSchema = Schema({
  nombrePlato: String,
  disponibilidad: {
    type: Boolean
  },
  fechaCreacion: {
    type: Date
  },
  precioPlato : Number,
  fotoPlato : String
});

module.exports = mongoose.model('platos',PlatoSchema);