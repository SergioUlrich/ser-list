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

//Excepcion Valor Vacio
function ExceptionValorVacio(param) {
	this.name = "ExceptionValorVacio";
	this.message = "Error: The parameter " + param + " can't be empty.";
}
ExceptionValorVacio.prototype = new ExceptionValidacionParametro();
ExceptionValorVacio.prototype.constructor = ExceptionValorVacio;

//Excepción de valor inválido
function ExceptionValorInvalido(param, value) {
	this.name = "ExceptionValorInvalido";
	this.message = "Error: The paramenter " + param + " has an invalid value. (" + param + ": " + value + ")";
}
ExceptionValorInvalido.prototype = new ExceptionValidacionParametro(); 
ExceptionValorInvalido.prototype.constructor = ExceptionValorInvalido;

//Excepción acceso inválido a constructor
function ExceptionAccesoInvalidoConstructor() {
	this.name = "ExcepcionAccesoInvalidoConstructor";
	this.message = "Constructor can’t be called as a function.";
}
ExceptionAccesoInvalidoConstructor.prototype = new BaseException(); 
ExceptionAccesoInvalidoConstructor.prototype.constructor = ExceptionAccesoInvalidoConstructor;

//Excepción intento de instacia clase abstracta
function ExceptionClaseAbastracta(classValue) {
	this.name = "ExceptionClaseAbastracta";
	this.message = classValue + " is a abstract class.";
}
ExceptionClaseAbastracta.prototype = new BaseException(); 
ExceptionClaseAbastracta.prototype.constructor = ExceptionClaseAbastracta;


//Excepciones StoreHouse
function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error: StoreHouse Generic Exception.";
}
StoreHouseException.prototype = new BaseException(); //Heredamos de BaseException
StoreHouseException.prototype.constructor = StoreHouseException;

function CategoryException() {
	this.name = "CategoryException";
	this.message = "Error: The method needs a Category parameter.";
}
CategoryException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
CategoryException.prototype.constructor = CategoryException;

function productException() {
	this.name = "productException";
	this.message = "Error: The method needs a product parameter.";
}
productException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
productException.prototype.constructor = productException;

function shopException() {
	this.name = "shopException";
	this.message = "Error: The method needs a shop parameter.";
}
shopException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
shopException.prototype.constructor = shopException;