const FormularioRoutes = require("express").Router();
const upload = require("../../utils/updateFile.middleware");

const { getAll, getOne, postOne } = require("./formulario.controllers");

FormularioRoutes.get("/", getAll);

FormularioRoutes.get("/:id", getOne);

FormularioRoutes.post("/", upload.array("images"), postOne);


module.exports = FormularioRoutes;
