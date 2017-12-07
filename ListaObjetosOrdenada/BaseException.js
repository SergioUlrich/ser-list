"use strict";

//Excepción base para ir creando el resto de excepciones.
function BaseException() {
}
BaseException.prototype = new Error(); //Herencia del objeto Error.
BaseException.prototype.constructor = BaseException; //Definimos el constructor
//Sobrescribimos el método toString para personalizarlos
BaseException.prototype.toString = function(){
	return this.name+" "+this.message;
};

//Excepcion de validacion de parametros
function ExceptionValidacionParametro() {
	this.name = "ExcepcionValidacionParametro";
	this.message = "Error en la validación de parámetros.";
}
ExceptionValidacionParametro.prototype = new BaseException(); 
ExceptionValidacionParametro.prototype.constructor = ExceptionValidacionParametro;

//Excepción personalizada para indicar valores vacios.
function ExceptionCampoVacio() {
	this.name = "ExcepcionCampoVacio";
	this.message = "El campo no puede estar vacío";
}
ExceptionCampoVacio.prototype = new ExceptionValidacionParametro(); 
ExceptionCampoVacio.prototype.constructor = ExceptionCampoVacio;

function ExceptionFueraRango() {
	this.name = "ExcepcionFueraRango";
	this.message = "El valor de 'posicion' esta fuera de rango permitido";
}
ExceptionFueraRango.prototype = new ExceptionValidacionParametro(); 
ExceptionFueraRango.prototype.constructor = ExceptionFueraRango;



/*Exepciones _list*/

function ExceptionLista() {
	this.name = "ExcepcionLista";
	this.message = "Error en la lista.";
}
ExceptionLista.prototype = new BaseException();
ExceptionLista.prototype.constructor = ExceptionLista;

function ExceptionListaLlena() {
	this.name = "ExceptionListaLlena";
	this.message = "La lista esta llena";
}
ExceptionListaLlena.prototype = new ExceptionLista();
ExceptionListaLlena.prototype.constructor = ExceptionListaLlena;

function ExceptionListaVacia() {
	this.name = "ExceptionListaVacia";
	this.message = "La lista esta vacía.";
}
ExceptionListaVacia.prototype = new ExceptionLista();
ExceptionListaVacia.prototype.constructor = ExceptionListaVacia;


//Excepción acceso inválido a constructor
function ExceptionAccesoInvalidoConstructor() {
	this.name = "ExcepcionAccesoInvalidoConstructor";
	this.message = "Constructor can’t be called as a function.";
}
ExceptionAccesoInvalidoConstructor.prototype = new BaseException(); 
ExceptionAccesoInvalidoConstructor.prototype.constructor = ExceptionAccesoInvalidoConstructor;