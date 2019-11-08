var banco = new Banco();
var conta;
let form;

/*---------------------- Login/Logout ------------------------------------------------*/

function loginout(button) {
  var done = 0;
  var usuario = document.getElementById("texto-user").value;
  var senha = document.getElementById("texto-password").value;
  var index = banco.verificaNum(usuario);
  /*console.log(usuario);
  console.log(index);*/

  var area_login = document.getElementById('area-login');
  var area_admin = document.getElementById('area-admin');
  var area_cliente = document.getElementById('area-cliente');

  /*console.log(index);
  console.log(banco.getContas());*/
  if (button === 'login') {
    if (usuario == "admin" && senha == "admin") {
      area_login.style.display = 'none';
      area_cliente.style.display = 'none';
      area_admin.style.display = 'block';
      done = 1;
    }
    else if (index >= 0) {
      area_login.style.display = 'none';
      area_admin.style.display = 'none';
      area_cliente.style.display = 'block';
      banco.indexAtual = index;
      done = 1;
    }
    if (done == 0) {
      alert("Dados incorretos, tente novamente");
    }
    else{
      document.getElementsByTagName('body')[0].style.backgroundImage = 'url(background-user.jpg)';
    }
  }

  if (button === 'sair') {
    area_admin.style.display = 'none';
    area_cliente.style.display = 'none';
    area_login.style.display = 'block';
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(background-login.jpg)';
  }
}

/*-------------------------------------- showForm ------------------------------------------*/
function showForm(name) {
  var cform = document[name];
  if (cform !== undefined) {
    if (form !== undefined) {
      form.style.display = "none";
    }

    form = cform;
    form.style.display = "block";
  }

  if (name === "Listar") {
    listarAction();
  }

  else if(name === "Reset"){
    resetarAction();
  }

  else if(name === "Extrato"){
    extratoAction();
  }
}

/*--------------------------------------------------------------------------------------------------------- */
function layout() {
  var _contas_layout = banco.getContas();

  var nome_display = document.getElementById('nome-display');
  var saldo_display = document.getElementsByClassName('saldo-display');

  nome_display.innerHTML ='Seja Bem-Vindo(a), ' + _contas_layout[banco.indexAtual].nome + '!';

  for (let i = 0; i < saldo_display.length; i++) {
    saldo_display[i].innerHTML =  'Saldo: ' + 'R$' + _contas_layout[banco.indexAtual].saldo.toFixed(2);
  }
}

function atualizaSaldo(valor){
  var saldo_atualizado = document.getElementsByClassName('saldo-display');
  for (let i = 0; i < saldo_atualizado.length; i++) {
    saldo_atualizado[i].innerHTML =  'Saldo: ' + 'R$' + valor.toFixed(2);
  }
}
/*--------------------------------------------- Admin ------------------------------------------------------*/
function cadastrarAction(button) {
  var _nome = document.getElementById("texto-nome").value;
  var _numero = document.getElementById("texto-numero").value;
  var _tipo = button;

  if (_tipo === "Estudante") {
    conta = new ContaEstudante(_numero, _nome, _tipo);
  } else if (_tipo === "Basica") {
    conta = new ContaBasica(_numero, _nome, _tipo);
  } else if (_tipo === "Platinum") {
    conta = new ContaPlatinum(_numero, _nome, _tipo);
  }
  if (!banco.criarConta(conta)) {
    alert("Erro ao cadastrar conta...");
  } else {
    alert("Conta criada com sucesso!");
  }
}

function listarAction() {
  document.getElementById("lista-contas").value = banco.listarContas();
}

function resetarAction(){
  banco.resetContas();
  alert('Contas resetadas com sucesso!');
}


/*---------------------------------------------- Cliente --------------------------------------*/

function transferenciaAction() {
  var _contas_layout_transf = banco.getContas();

  var nome_transf = document.getElementById("nome-transf").value;
  var num_transf = document.getElementById("num-transf").value;
  var valor_transf = parseFloat(document.getElementById("valor-transf").value);

  if (!banco.transferencia(num_transf, nome_transf, valor_transf)) {
    alert("Não foi possível realizar a tranferencia...");
  } 
  else {
    alert("Transferência realizada com sucesso!");
    atualizaSaldo(_contas_layout_transf[banco.indexAtual].saldo);
  }
}

function saqueAction() {
  var _contas_layout_saque = banco.getContas();

  var valor_saque = parseFloat(document.getElementById("valor-saque").value);
 
  if (!banco.saque(valor_saque)) {
    alert("Saldo insuficiente...");
  } else {
    alert("Saque realizado com sucesso!");
    atualizaSaldo(_contas_layout_saque[banco.indexAtual].saldo);
  }
}

function depositoAction() {
  var _contas_layout_deposito = banco.getContas();

  var valor_deposito = parseFloat(document.getElementById("valor-deposito").value);

  banco.deposito(valor_deposito);
  alert("Deposito realizado com sucesso!");
  atualizaSaldo( _contas_layout_deposito[banco.indexAtual].saldo);
}

function extratoAction() { 
  document.getElementById("extrato-contas").value = banco.gerarExtrato();
}

/*var filter_nome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/; --- Validação de campos que só aceitam texto
depois basta fazer: if(!filter_nome.test(input){dados invalidos}*/
