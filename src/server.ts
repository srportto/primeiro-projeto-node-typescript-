import express from 'express';
import routes from './routes'; //importando pasta de rotas da aplicação

const app = express();

app.use(express.json()); //pedindo pro node tratar as requisições como json
app.use(routes); //pedindo pra que cada requisição vá para a raiz(index) da pasta de rotas


app.listen(3333, () => {
  console.log('😍 Server started on port 3333!');
});
