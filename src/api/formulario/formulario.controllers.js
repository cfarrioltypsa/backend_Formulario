const { cloudinary } = require("../../utils/cloudinary");
const Formulario = require("./formulario.model");

const getAll = async (req, res, next) => {
  try {
    const formResponse = await Formulario.find();
    res.status(200).json(formResponse);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const formResponse = await Formulario.findById(id);
    res.status(200).json(formResponse);
  } catch (error) {
    return next(error);
  }
};



const postOne = async (req, res, next) => {


  try {

    let logoCliente = "";
    let imagenFondo = "";
    let encabezado = "";
  
     if (
      req.files.length == 2 &&
      (req.body.images.includes("logo typsa vacio")
      &&
      req.body.images.includes("logo encabezado vacio"))
    ) {
      logoTypsa = "https://res.cloudinary.com/dm3cgnyi7/image/upload/v1658680920/huxi8ccq2ddtimpmaxnc.png"
      logoCliente = req.files[0].path;
      imagenFondo = req.files[1].path;
      encabezado = "";
    } else if (
      req.files.length == 3 &&
      req.body.images.includes("logo encabezado vacio")
    ) {
      logoTypsa = req.files[0].path;
      logoCliente = req.files[1].path;
      imagenFondo = req.files[2].path;
      encabezado = "";
    }
     else if (
      req.files.length == 3 &&
      req.body.images.includes("logo typsa vacio")
    ) {
  
      logoTypsa =
        "https://res.cloudinary.com/dm3cgnyi7/image/upload/v1658680920/huxi8ccq2ddtimpmaxnc.png";
      logoCliente = req.files[0].path;
      imagenFondo = req.files[1].path;
      encabezado = req.files[2].path;
    } 
    else if (req.files.length == 4) {
      logoTypsa = req.files[0].path;
      logoCliente = req.files[1].path;
      imagenFondo = req.files[2].path;
      encabezado = req.files[3].path;
    }
  
    let titulos = [];
  
    if (typeof req.body.tituloVideo === "object") {
      titulos = req.body.tituloVideo.map((titulo, indexVideo) => {
        const video = {};
        req.body.urlVideo.forEach((url, indexUrl) => {
          if (indexVideo === indexUrl) {
            video.tituloVideo = titulo;
            video.urlVideo = url;
          }
        });
        return video;
      });
    }


    const formPost = new Formulario();
    if (typeof req.body.tituloVideo === "string") {
      formPost.listaVideos.push({
        tituloVideo: req.body.tituloVideo,
        urlVideo: req.body.urlVideo,
      });
    } else if (titulos.length) {
      formPost.listaVideos.push(...titulos);
    }
    formPost.mailContacto = req.body.mailContacto;
    formPost.titulo = req.body.titulo;
    formPost.logoTYPSA = logoTypsa;
    formPost.logoCliente = logoCliente;
    formPost.imagenFondo = imagenFondo;
    formPost.encabezado = encabezado;
    formPost.colores = {
      mainColor: req.body.mainColor,
      secondaryColor: req.body.secondaryColor,
    };
    formPost.observaciones = req.body.observaciones;
    formPost.videosPersonalizados = req.body.videosPersonalizados;

    const postGuardado = await formPost.save();
    return res.status(201).json(postGuardado);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  postOne
};
