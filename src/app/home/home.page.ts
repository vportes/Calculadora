import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = "0";
  primeiro_elemento: string = "";
  segundo_elemento: string = "";
  operador_selecionado: boolean = false;
  operando: string = "";
  indice_operador: number = -1;


  constructor() {
  }

  digito(valor: string) {

    if (!this.operador_selecionado) {
      if (this.resultado == "0") {
        this.resultado = valor;
      } else {
        this.resultado += valor;
      }
      this.primeiro_elemento = this.resultado;
    } else {
      this.segundo_elemento = this.segundo_elemento + valor;
      this.resultado = this.resultado + valor;
    }


  }

  operador(operador_calculadora: string) {
    if (!this.operador_selecionado) {
      this.primeiro_elemento = this.resultado;
      this.resultado = this.resultado + operador_calculadora;
      this.operador_selecionado = true;
      this.operando = operador_calculadora;
      this.indice_operador = this.resultado.length - 1; //indice do operador é guardado corretamente
    } else {
      // resultado = numeros antes do operador + operador + numeros depois do operador
      this.resultado = this.resultado.substring(0, this.indice_operador) + operador_calculadora + this.resultado.substring(this.indice_operador + 1);
      this.operando = operador_calculadora;
    }
  }

  calcular() {
    if (this.operando == "+") {
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
    } else if (this.operando == "-") {
      this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
    } else if (this.operando == "/") {
      this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
    } else if (this.operando == "*") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
    }
    if (parseFloat(this.resultado) % 1 !== 0) {
      //java tem um bug, ou limitação em que ao realizar diversas operações usando decimais, vai acabar aparecendo
      //numeros com um numero enorme de casas decimais mesmo em operações simples,
      //por isso, não vou deixar a calculadora ter mais de 2 casas decimais
      if (this.resultado.split('.')[1].length === 1) {
        this.resultado = parseFloat(this.resultado).toFixed(1).toString(); //caso haja apenas uma casa decimal, manter uma casa decimal
      } else { //se nao, limitar para 2 casas decimais
        this.resultado = parseFloat(this.resultado).toFixed(2).toString();
      }
    }
    this.primeiro_elemento = this.resultado;
    this.segundo_elemento = "";
    this.operando = "";
    this.operador_selecionado = false;
  }


  redefinir() { //redefine todos os valores possiveis
    this.resultado = "0";
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operando = "";
    this.operador_selecionado = false;
  }
  redefinirElemento() {

  }
  limpar() {
    if (this.resultado.length === 1) { //quando deletar apenas um numero, colocar 0
      this.resultado = "0";
      if (this.operador_selecionado) { //resetar operador e segundo elemento caso operador exista
        this.segundo_elemento = "";
        this.operador_selecionado = false;
      } else { //resetar o resto se nao
        this.primeiro_elemento = "";
        this.operando = "";
      }
    } else if (this.operador_selecionado && this.segundo_elemento.length === 0) { //quando houver operador mas nao segundo elemento, remover operador
      this.resultado = this.resultado.slice(0, -1);
      this.operador_selecionado = false;
    } else if (this.operador_selecionado && this.segundo_elemento.length === 1) {
      //quando houver operador e segundo elemento tiver apenas um digito, remover segundo elemento
      this.resultado = this.resultado.slice(0, -1);
      this.segundo_elemento = "";
    } else {
      this.resultado = this.resultado.slice(0, -1); //remover um digito do resultado
      if (this.operador_selecionado) { //caso haja operador, remover um digito do segundo numero
        this.segundo_elemento = this.segundo_elemento.slice(0, -1);
      } else { //se nao, existe apenas o primeiro elemento que e maior que 1 digito, remover 1 digito
        this.primeiro_elemento = this.primeiro_elemento.slice(0, -1);
        if (this.operando != "" && this.segundo_elemento != "") { //limpa operando e segundo elemento corretamente
          this.segundo_elemento = "";
        }
      }
    }
  }
  porcentagem() {
    //checa se operador nao esta selecionado, primeiro elemento nao esta vazio e resultado nao e zero
    if (!this.operador_selecionado && this.primeiro_elemento !== "" && this.resultado !== "0") {
      //se sim, calcula porcentagem do primeiro elemento
      this.resultado = (parseFloat(this.primeiro_elemento) / 100).toString();
      this.primeiro_elemento = this.resultado;
    } //se um operador esta selecionado e segundo elemento nao e vazio
    else if (this.operador_selecionado && this.segundo_elemento !== "") {
      //segundo elemento muda para a porcentagem calculada dele mesmo (divide-se por 100, vezes o primeiro elemento)
      this.segundo_elemento = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento) / 100).toString();
      this.resultado = this.primeiro_elemento + this.operando + this.segundo_elemento;
    }
  }
  fracao() {
    if (!this.operador_selecionado) {
      //se operador nao esta selecionado, checar se primeiro elemento tem ponto decimal, se nao, adicionar ponto decimal
      if (!this.primeiro_elemento.includes('.')) {
        this.resultado += '.';
        this.primeiro_elemento += '.';
      }
    } else {
      //se operador esta selecionado, checar se segundo elemento tem ponto decimal, se nao, adicionar ponto decimal
      if (!this.segundo_elemento.includes('.')) {
        this.resultado += '.';
        this.segundo_elemento += '.';
      }
    }
  }
  raiz(){
    if (!this.operador_selecionado && this.primeiro_elemento !== "" && this.resultado !== "0") {
      this.resultado = Math.sqrt(parseFloat(this.primeiro_elemento)).toString();
      this.primeiro_elemento = this.resultado;
    } 
    else if (this.operador_selecionado && this.segundo_elemento !== ""){
      this.segundo_elemento = Math.sqrt(parseFloat(this.segundo_elemento)).toString();
      this.resultado = this.resultado.substring(0, this.indice_operador) + this.operando + this.segundo_elemento;
    } 
  }
quadrado(){
    if (!this.operador_selecionado && this.primeiro_elemento !== "" && this.resultado !== "0"){
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.primeiro_elemento)).toString();
      this.primeiro_elemento = this.resultado;
    } else if (this.operador_selecionado && this.segundo_elemento !== ""){
      this.segundo_elemento = (parseFloat(this.segundo_elemento) * parseFloat(this.segundo_elemento)).toString();
      this.resultado = this.resultado.substring(0, this.indice_operador) + this.operando + this.segundo_elemento;
    }
  } 
  fracionar(){

  }
  negar(){
    if (!this.operador_selecionado && this.primeiro_elemento !== "" && this.resultado !== "0"  && !this.resultado.includes('-')){
      this.resultado = "-" + this.resultado;
      this.primeiro_elemento = this.resultado;
    }
    else if (!this.operador_selecionado && this.primeiro_elemento !== "" && this.resultado !== "0"  && this.resultado.includes('-')){
      this.resultado = this.resultado.replace("-","");
    }
    else if (this.operador_selecionado && this.segundo_elemento !== "" && !this.resultado.includes('-')){
      this.resultado = this.resultado.substring(0, this.indice_operador) + this.operando + "-" + this.segundo_elemento;
      this.segundo_elemento = "-" + this.segundo_elemento;
    }
  }
}
