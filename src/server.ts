import express from 'express';

const app = express();

app.get('/', (requet, response) => response.json({ message: 'hello World' }));

app.listen(3333, () => {
  console.log('😍 Server started on port 3333!');
});
