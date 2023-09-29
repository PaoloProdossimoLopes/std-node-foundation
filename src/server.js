// const http = require('http') //Common JS
// import http from 'http' //ESModule
import http from 'node:http'; //ESModule

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (method === 'GET' && url === '/users') {
    return response.end('Listagem de usuarios')
  } else if (method === 'POST', url === '/users') {
    return response.end('Criação de usuarios')
  } else {
    return response.end('Seja bem vindo')
  }
})

server.listen(3333)