const customExpress = require("./config/customExpress");
const connection = require('./db/connection');
const Tabelas = require("./db/tables");
connection.connect((erro)=>{
  if(erro){
    console.log(erro);
  }
  const app = customExpress();
  Tabelas.init(connection);
  app.listen(3000, () => {
    console.log("Server rodando...");
  });
  
})
