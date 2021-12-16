class Tabelas {
  init(connection) {
    this.connection = connection;
    this.criarAtendimento();
  }
  criarAtendimento() {
    const sql =
      "create table if not exists atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))default charset = utf8";
    this.connection.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Atendimentos criada com sucesso");
      }
    });
  }
}
module.exports = new Tabelas();
