const mongoose = require("mongoose");
const formularioSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    logoTYPSA: {
      type: String,
      required: false,
      trim: true,
    },
    logoCliente: { type: String, required: false, trim: true },
    imagenFondo: { type: String, required: false, trim: true },
    encabezado: { type: String, required: false, trim: true },
    colores: { type: Object, required: false, trim: true },
    listaVideos: { type: Array, required: false, trim: true },
    mailContacto: { type: String, required: false, trim: true },
    observaciones: { type: String, required: false, trim: true },
    videosPersonalizados: {
      type: String,
      required: false,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Formulario = mongoose.model("formulario", formularioSchema);

module.exports = Formulario;
