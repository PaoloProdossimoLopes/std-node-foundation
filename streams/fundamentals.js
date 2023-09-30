import { Readable, Transform, Writable } from 'node:stream'

/**
 * Buffer é uma forma de transacionar dados entre as streams
 */

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 100) {
        this.push(null) //Indica que o processo finalizou
      } else {
        const buff = Buffer.from(String(i)) //pode ser chamado de chunk
        this.push(buff) //isso representa o envio para a stream de escrita
      }
    }, 1000)
  }
}

class MultiplyByThenStream extends Writable { //Apenas processa o dado e nao o transforma
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

/**
 * A Stream de tranformação, le dados de um lugar e manda dados para outro lugar, porem transformados,
 * Basicamente um intermediador entre duas Streams
 */
class InverseNumberStream extends Transform { 
  _transform(chunk, encoding, callback) {
    const transormed = Number(chunk.toString()) * -1
    if (!transormed) {
      callback(new Error('Chunk not valid'))
    }
    callback(null, Buffer.from(String(transormed)))
  }
}


new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByThenStream())