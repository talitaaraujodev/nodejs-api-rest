const Atendimento = require("../models/atendimentos");
module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.getAtendimentos(res);
  });
  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Atendimento.getAtendimentoById(id, res);
  });
  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Atendimento.adcAtendimento(atendimento, res);
  });
  app.patch("/atendimentos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const values = req.body;
    console.log(values)
    Atendimento.alterAtendimento(id,values,res);
  })
  app.delete("/atendimentos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    Atendimento.deleteAtendimento(id,res);

  })
};
