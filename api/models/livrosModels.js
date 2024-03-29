const banco = require('../../config/conexao.js');


module.exports = {
    listarLivros,
    listarAutores,
    listarEditoras,
    gravarLivro,
    editarLivro,
    listarUmLivro,
    inativarLivro
}

function listarLivros(callback) {
    m_sql = 'select a.*, B.aut_apelido, C.edt_nome from livros A left join autores B on A.aut_codigo = B.aut_codigo left join editoras C on A.edt_codigo = C.edt_codigo';

    banco.query(m_sql, callback);

}



function listarAutores(callback) {
    m_sql = 'SELECT * FROM autores ORDER BY aut_apelido';

    banco.query(m_sql, callback);

}

function listarEditoras(callback) {
    m_sql = 'SELECT * from editoras ORDER BY edt_nome';

    banco.query(m_sql, callback);

}

function gravarLivro(dados, callback) {
    m_sql = "INSERT INTO livros SET ?";
    dados.liv_dtcadastro = new Date();
    banco.query(m_sql, dados, callback);
}


function editarLivro(dados, callback) {
    const m_sql = "UPDATE livros SET liv_titulo = '" + dados.liv_titulo +
        "', liv_edicao = '" + dados.liv_edicao +
        "', liv_isbn = '" + dados.liv_isbn +
        "', liv_ano = '" + dados.liv_ano +
        "', liv_ativoinativo = '" + dados.liv_ativoinativo +
        "', aut_codigo = '" + parseInt(dados.aut_codigo) +
        "', edt_codigo = '" + parseInt(dados.edt_codigo) +
        "' where liv_codigo = '" + dados.liv_codigo + "'";
    banco.query(m_sql, callback);

}

function listarUmLivro(id, callback) {
    m_sql = "SELECT * FROM livros WHERE liv_codigo = '" + id + "'";

    banco.query(m_sql, callback);
}

function inativarLivro(id, ativo, callback) {
    m_sql = "UPDATE livros SET liv_ativoinativo =  '" + ativo + "' WHERE liv_codigo = '" + id + "'";

    banco.query(m_sql, function (err, result) {

        banco.query(m_sql, callback)
    });

}