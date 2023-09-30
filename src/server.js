// const http = require('http') //Common JS
// import http from 'http' //ESModule

import http from 'node:http'; //ESModule
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)
  
  const route = routes.find(
    route => route.method === method &&
    route.path.test(url) //Testing regex
  )

  if (route) {
    const routeParams = request.url.match(route.path)

    const { query, ...params } = routeParams.groups

    request.params = params
    request.query = query ? extractQueryParams(query) : {}

    return route.handler(request, response)
  }

  return response.writeHead(404).end()
})

server.listen(3333)

/**
 * Buffer nada mais é do que uma forma de representar dados 
 * que serao tratados e transacionados de maneira mais 
 * performatica por serem armazenadas de forma binaria 
 * na memoria (geralmente em hexadecimal)
*/

/**
 * Middlewares => Intercepatadores
 * é Uma funcao que ira interceptar um processo (no node sempre recebem req e res)
 */