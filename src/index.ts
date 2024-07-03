import { server } from './server/Server'; 
/*eslint-disable-next-line*/
server.listen(process.env.PORT, () => {
  /*eslint-disable-next-line*/
  console.log(`App rodando na porta ${process.env.PORT}`);
});