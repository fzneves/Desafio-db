class Forca {
  dadoDoJogo = {
    letrasChutadas: [],
    vidas: 6,
    palavra: [],
    palavraSecreta: [],
    estado: 'aguardando chute'
  }
  constructor(palavra) {
    this.iniciarPalavra(palavra)
    this.iniciarPalavraSecreta(palavra)
  }

  iniciarPalavra(palavra) {
    const palavraDividia = palavra.split('').map(item => '_')
    this.dadoDoJogo.palavra = palavraDividia
  }

  iniciarPalavraSecreta(palavra) {
    this.palavraSecreta = palavra.toUpperCase().split('')
  }

  chutar(letra) {
    console.log('Chutou:', letra)
    const chutado = this.verificarSeLetraJaFoiChutada(letra)
    this.adicionarLetraChutada(letra)
    if (chutado) {
      return console.log('Voce já chutou essa letra!')
    }
    const existe = this.verificarSeLetraExiste(letra)
    if (existe) {
      return this.acertou()
    } else {
      return this.errou()
    }
  }

  adicionarLetraChutada(letra) {
    const letraUppercase = letra.toUpperCase()
    this.dadoDoJogo.letrasChutadas.push(letraUppercase)
  }

  errou() {
    this.dadoDoJogo.vidas -= 1
    if (this.dadoDoJogo.vidas <= 0) {
      this.estado = 'perdeu'
    }
  }

  acertou() {
    const palavaSecretaString = this.palavraSecreta.toString()
    const palavaString = this.dadoDoJogo.palavra.toString()
    if (palavaSecretaString === palavaString) {
      this.estado = 'ganhou'
    }
  }

  verificarSeLetraJaFoiChutada(letra) {
    const letraUppercase = letra.toUpperCase()
    return this.dadoDoJogo.letrasChutadas.includes(letraUppercase)
  }

  incluirLetraNaPalavra(posicaoLetra, letra) {
    this.dadoDoJogo.palavra[posicaoLetra] = letra
  }

  verificarSeLetraExiste(letra) {
    const letraUppercase = letra.toUpperCase()
    let verificado = false
    this.palavraSecreta.forEach((item, posicao) => {
      if (item === letraUppercase) {
        this.incluirLetraNaPalavra(posicao, letraUppercase)
        verificado = true
      }
    })
    return verificado
  }

  buscarEstado() {
    return this.estado
  }

  buscarDadosDoJogo() {
    return this.dadoDoJogo
  }
}
module.exports = Forca
