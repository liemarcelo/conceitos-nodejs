const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url,techs } = request.body;

  const  repository = {id: uuid(), title, url, techs,likes: 0 } ;

  repositories.push(repository);
  
  return response.json(repository); 

});

app.put("/repositories/:id", (request, response) => {
  
  const {title , url, techs} = request.body; 

  const {id} = request.params; 

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0 ){
    return response.status(400).json({errormessage:'Respository not found'});
  }

  const repository = repositories[repositoryIndex];

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  repositories[repositoryIndex] = repository;

   return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const {id} = request.params; 

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0 ){
     return response.status(400).json({errormessage:'Respository not found'});
  }

  repositories.splice(repositoryIndex,1)

  return response.status(204).json({ message:'Repositoy deleted'});

});

app.post("/repositories/:id/like", (request, response) => {
  
  //const repository = repositories.find(repository => id === id);
  const {id} = request.params; 

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0 ){
     response.status(400).json({ message:'Repsoitory not found !'});
  }

  const repository = repositories[repositoryIndex]

  repository.likes += 1

  repositories[repositoryIndex] = repository;

  return response.json(repository); 

});

module.exports = app;
