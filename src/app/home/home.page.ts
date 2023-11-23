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


  constructor() {
  }

  digito(valor: string) {

    if (!this.operador_selecionado) {
      if (this.resultado == "0") {
        this.resultado = valor;
      } else {
        this.resultado += valor;
      }
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
    } else {
      console.log("Um operador já foi selecionado");
    }


  }

  calcular() {
    if (this.operando == "+") {
      this.resultado = (parseInt(this.primeiro_elemento) + parseInt(this.segundo_elemento)).toString();
    } else if (this.operando == "-") {
      this.resultado = (parseInt(this.primeiro_elemento) - parseInt(this.segundo_elemento)).toString();
    } else if (this.operando == "/") {
      this.resultado = (parseInt(this.primeiro_elemento) / parseInt(this.segundo_elemento)).toString();
    } else if (this.operando == "*") {
      this.resultado = (parseInt(this.primeiro_elemento) * parseInt(this.segundo_elemento)).toString();
    }
  }


  redefinir() {
    this.resultado = "0";
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operando = "";
    this.operador_selecionado = false;
  }
  limpar(){

  }

  porcentagem() {

  }
}
