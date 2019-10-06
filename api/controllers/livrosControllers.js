const livrosController = require('../models/livrosModels.js');
const moment = require('moment');

module.exports = {

  livrosMenu,
  livrosListar,
  livroNovo,
  livroGravar

}

function livrosMenu(req, res) {
  res.render('livros/frm_livrosMenu.ejs', {
    title: 'Livros',
    empresa: 'Fatec Franca - Programação Script - WEB',
    rota: req.originalUrl
  });
}

function livrosListar(req, res) {
  livrosController.listarLivros(function (err, result) {

    if (err) {
      throw err;
    } else {
      res.render('livros/frm_livrosListar.ejs', {
        title: 'Livros Listar',
        empresa: 'Fatec Franca - Programação Script - WEB',
        rota: req.originalUrl,
        obj_livros: result
      });
    }
  });
}

function livroNovo(req, res_livros) {
  var dados = [{
    liv_codigo: "",
    liv_dtcadastro: moment().format('DD/MM/YYYY'),
    liv_titulo: "",
    liv_edicao: "",
    liv_ano: "0",
    liv_ativoInativo: "",
    edt_codigo: "",
    aut_codigo: ""
  }];

  livrosController.listarAutores(function (err, res_autores) {

    if (err) {
      throw err;
    } else {
      livrosController.listarEditoras(function (err, res_editoras) {

        if (err) {
          throw err;
        } else {
          res_livros.render('livros/frm_livrosEditar.ejs', {
            title: 'Livros Editar',
            empresa: 'Fatec Franca - Programação Script - WEB',
            rota: req.originalUrl,
            obj_autores: res_autores,
            obj_editoras: res_editoras,
            obj_livros: dados

          });
        }

      });
    }
  });

}

function livroGravar(req, res_livros) {
  var dados = req.body;
  
  if (dados.liv_codigo == '') {
    dados.liv_codigo = null;
    console.log('Gravando Livros');
    livrosController.gravarLivro(dados, function (err, result) {
      if (err) {
        throw err;
      } else {
      result.redirect("/livros/listarLivros")
      }
    });

  } else {
    console.log('Gravando Livros');
    livrosController.editarLivro(dados, function (err, result) {
      if (err) {
        throw err;
      } else {
        res_livros.redirect("/livros/listarLivros")
      }

    });
  }
}