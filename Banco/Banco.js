class Banco {
  constructor() {
    this._contas = [];
    this._indexAtual = undefined;
  }

  /*--------------------------- Banco -----------------------------------------------------*/

  get indexAtual() {
    return this._indexAtual;
  }

  set indexAtual(index) {
    this._indexAtual = index;
  }

  getContas() {
    console.log(this._contas);
    return this._contas;
  }

  verificaNum(num) {
    for (let i = 0; i < this._contas.length; i++) {
      if (num === this._contas[i].numero) {
        return i;
      }
    }
    return -1;
  }

/*----------------------------------------- Operacoes Admin ------------------------------------*/
  criarConta(conta) {
    this._contas.push(conta);
    console.log(this._contas);
    return true;
  }

  listarContas() {
    var tamanho = this._contas.length;
    var lista = "";
    for (let i = 0; i < tamanho; i++) {
      lista +=
        this._contas[i].numero +
        "   " +
        this._contas[i].nome +
        "   " +
        this._contas[i].tipo +
        "\n";
    }
    return lista;
  }

  resetContas(){
    for (let i = 0; i < this._contas.length; i++) {
      this._contas[i].reset();
    }
  }

/*----------------------------------------- Operacoes Cliente ------------------------------------*/
  transferencia(numero, nome, valor) {
    var tamanho = this._contas.length;

    for (let i = 0; i < tamanho; i++) {
      if (this._contas[i].numero === numero && this._contas[i].nome === nome) {
        if(this._contas[this._indexAtual].transferir(0, valor)){
          this._contas[i].transferir(1,valor);
          return true;
        }
      }
    }
    return false;
  }

  saque(valor) {

   if (!this._contas[this._indexAtual].sacar(valor)) {
     return false;
   }
   else{
    console.log(this._contas[this._indexAtual].saldo);
     return true;
   }
  }

  deposito(valor) {
    this._contas[this.indexAtual].depositar(valor);
    console.log(this._contas[this._indexAtual].saldo);
    return true;
   }

   gerarExtrato(){
     var extrato = this._contas[this._indexAtual].extrato();
     return extrato;
   }
}
