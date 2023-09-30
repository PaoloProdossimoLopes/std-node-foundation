import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform { 
  _transform(chunk, encoding, callback) {
    const transormed = Number(chunk.toString()) * -1
    if (!transormed) {
      callback(new Error('Chunk not valid'))
    }

    console.log(transormed)
    
    callback(null, Buffer.from(String(transormed)))
  }
}

const server = http.createServer(async (request, response) => {
  /**
   * Permite percorrer cada pedaço da stream,
   * e Adiconar esse pedaço no array de buffer
   * 
   * esse await nao vai deixar executar mais nada ate que temmine de ler todos os dados da stream
   */
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return request
  .pipe(new InverseNumberStream())
  .pipe(response)
})

server.listen(3334)