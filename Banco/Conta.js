class Conta {
  constructor(numero, nome, tipo, limite, qtdeExtrato, qtdeTransf, qtdeDefault) {
    this._extrato = "";
    this._numero = numero;
    this._nome = nome;
    this._tipo = tipo;
    this._limite = limite;
    this._qtdeExtrato = qtdeExtrato;
    this._qtdeTransf = qtdeTransf;
    this._qtdeDefault = qtdeDefault;
    this._saldo = 0;
  }
  get numero() {
    return this._numero;
  }

  set numero(numero) {
    this._numero = numero;
  }

  get nome() {
    return this._nome;
  }

  set nome(nome) {
    this._nome = nome;
  }

  get tipo() {
    return this._tipo;
  }

  set tipo(tipo) {
    this._tipo = tipo;
  }

  get saldo() {
    return this._saldo;
  }

  set saldo(saldo) {
    this._saldo = saldo;
  }

  get qtdeDefault(){
    return this._qtdeDefault;
  }

  set qtdeDefault(valor){
    this._qtdeDefault = valor;
  }

  sacar(valor){
    if (valor <= this._saldo + this._limite) {
      this._saldo = this._saldo - valor;
      this._extrato += 'Saque no valor de R$: ' + valor.toString() + "\n";  
      return true;
    }
    else {
      return false;
    }
  }

  depositar(valor){
    this._saldo = this._saldo + valor;
    this._extrato += 'Deposito no valor de R$: ' + valor.toString() + "\n";  
  }

  transferir(situacao, valor){
    if(situacao === 1){
      this._saldo = this._saldo + valor;
      this._extrato += 'Transferencia recebida no valor de R$: ' + valor.toString() + "\n";  
      return true;
    }
    else if(situacao === 0){
      if(valor <= this._saldo + this._limite){
        if (this._qtdeTransf > 0) {
          this._saldo = this._saldo - valor;
          this._qtdeTransf--;
        }
        else{
          this._saldo = this._saldo - (valor + 0.50);
        }     
        this._extrato += 'Transferencia realizada no valor de R$: ' + valor.toString() + "\n";  
        return true;
      }
      else{
        return false;
      }
    }
  }

  reset(){
    this.qtdeExtrato = this._qtdeDefault;
    this.qtdeTransf = this._qtdeDefault;
  }

  extrato(){
    if(this._qtdeExtrato > 0){
      return this._extrato;
    }
    else{
      this._saldo = this._saldo + 0.50;
      return this._extrato;
    }
  }
}
