const moment = require("moment");
const connection = require("../db/connection");
class Atendimento {
  adcAtendimento(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data).format("YYYY-MM-DD HH:MM:SS");

    const dataValidate = moment(data).isSameOrAfter(dataCriacao);
    const clienteIsValid = atendimento.cliente.length >= 5;

    const validations = [
      {
        name: "data",
        valid: dataValidate,
        message: "Data deve ser maior ou igual a data atual.",
      },
      {
        name: "cliente",
        valid: clienteIsValid,
        message: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];

    const errors = validations.filter((campo) => !campo.valid);
    const existErrors = errors.length;

    const atendimentosDatado = { ...atendimento, data, dataCriacao };
    const sql = "INSERT INTO atendimentos SET ?";
    connection.query(sql, atendimentosDatado, (erro, result) => {
      if (existErrors) {
        res.status(400).json(errors);
      } else {
        res.status(201).json(atendimento);
      }
    });
  }
  getAtendimentos(res) {
    const sql = "SELECT * FROM atendimentos";
    connection.query(sql, (erro, result) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(result);
      }
    });
  }
  getAtendimentoById(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;
    connection.query(sql, (erro, result) => {
      const atendimento = result[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }
  alterAtendimento(id, values, res) {
    const sql = "UPDATE atendimentos SET ? WHERE id=?";
    if (values.data) {
      values.data = moment(values.data).format("YYYY-MM-DD HH:MM:SS");
    }
    connection.query(sql, [values, id], (erro, result) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({...values, id});
      }
    });
  }
  deleteAtendimento(id, res) {
    const sql = "DELETE FROM atendimentos WHERE id=?";
    connection.query(sql, id, (erro, result)=>{
      if(erro){
        res.status(400).json(erro);
      }else{
        const message = `Atendimento ${id} deletado com sucesso.`
        res.status(200).json({message});
      }
    })
  }
}
module.exports = new Atendimento();
