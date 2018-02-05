"use strict";

/*function mostrar() {
    document.getElementById("submenu").style.display="block";
}
function ocultar() {
    document.getElementById("submenu").style.display="none";
}

function mostrarSet(){
    setInterval(mostrar(),20000);
}*/





var ultimoIdMenu = 1;
function Menu(origen, estado){

	this._estado = estado; 
	this._id = ultimoIdMenu;
	this._opciones = []; 
	this._nodo; //para coger el elemento html que corresponde a ese menu
	this._origen = origen; //Opción de la que viene, si es el principal será un div, si es un submenu el origen sera otra opcion
	
	ultimoIdMenu++;

	Object.defineProperty = (this, "_estado", { 
		get:function(){ 
		    return _estado;	
		}
	});
	Object.defineProperty = (this, "_id", { 
		get:function(){ 
		    return _id;	
		}
	});
	Object.defineProperty = (this, "_opciones",{
		get:function(){
			return opcion;
		},
		set:function(opcion){
			_opcion = opcion;
		}
	});
	Object.defineProperty = (this, "_nodo", { 
		get:function(){ 
		    return _nodo;	
		},
		set:function(nodo){
			_nodo = nodo;
		}
	});
	Object.defineProperty = (this, "_origen", { 
		get:function(){ 
		    return _id;	
		},
		set:function(origen){
			_origen = origen;
		}
	});

	this.setOption = function(opcion){
		this._opciones = opcion;
	}
	this.cerrar = function(){
		this._estado = false;
		this._nodo.style.display = 'none';
	}
	this.abrir = function(){
		this._estado = true;
		this._nodo.style.display = 'block';
	}
	this.cerrar_opciones = function(id_origen){
		for(var i = 0; i < this._opciones.length; i++){
			if(this._opciones[i] instanceof Opcion){
				if(this._opciones[i]._id != id_origen){
					this._opciones[i].cerrar();
				}
			}
		}
	}
	this.abrir_opciones = function(id_origen){
		for(var i = 0; i < this._opciones.length; i++){
			if(this._opciones[i] instanceof Opcion){
				if(this._opciones[i]._id != id_origen){
					this._opciones[i].abrir();
				}
			}
		}
	}

	this.drawMenu = function(){

		this._nodo = document.createElement("ul");

		if(this._origen instanceof Opcion){
			this._origen._nodo.appendChild(this._nodo);
		}else if(this._origen != undefined){
			this._origen.appendChild(this._nodo);
		}
		if(this._opciones.length > 0){
			for(var i = 0; i < this._opciones.length; i++){
				if(this._opciones[i] instanceof Opcion){
					this._opciones[i].drawOpcion();
				}
			}
		}
		if(this._estado){
			this._nodo.style.display = '-webkit-box';
		}else{
			this._nodo.style.display = 'none';
		}
		this._nodo.style.listStyle = "none";
		this._nodo.style.backgroundColor = "grey";
		this._nodo.style.paddingTop = "1rem";
		this._nodo.style.paddingBottom = "1rem";
	}

	this.addOption = function(option){
		this._opciones.push(option);
	}
	this.Estilo = function(bColor,color,borde,ancho,margen){
		this._nodo.style.backgroundColor = bColor;
		this._nodo.style.color = color;
		this._nodo.style.border = borde;
		this._nodo.style.width = ancho;
		this._nodo.style.margin= margen;
	};
}

Menu.prototype = {};
Menu.prototype.constructor = Menu;

var ultimoIdOpcion = 1;

function Opcion(origen, texto){

	this._id = ultimoIdOpcion;
	ultimoIdOpcion++;
	
	this._menu = undefined;
	this._origen = origen;
	this._nodo; 
	this._texto = texto;
	this._estado = false;
	
	Object.defineProperty = (this, "_id", {
		get:function(){ //devuelve el id de la opcion
		    return _id;	
		}
	});
	Object.defineProperty = (this, "_menu", {
		get:function(){ //devuelve el titulo de la galería
		    return _menu;	
		},
		set:function(menu){
			_menu = menu;
		}
	});
	Object.defineProperty = (this, "_origen", {
		get:function(){ //devuelve el titulo de la galería
		    return _origen;	
		},
		set:function(origen){
			_origen = origen;
		}
	});
	Object.defineProperty = (this, "_texto", {
		get:function(){ //devuelve el titulo de la galería
		    return _texto;	
		},
		set:function(texto){
			_texto = texto;
		}
	});

	this.abrir = function(){
		if(this._menu instanceof Menu){
			this._menu.abrir();
			this._estado = true;
		}
	}

	this.cerrar = function(){
		if(this._menu instanceof Menu){
			this._menu.cerrar();
			this._estado = false;
		}
	}

	this.drawOpcion = function(){
        this._nodo = document.createElement("li");
		var contenido = document.createTextNode(this._texto);
		this._nodo.appendChild(contenido);
		if(this._origen instanceof Menu){
			this._origen._nodo.appendChild(this._nodo);
			if(this._menu != undefined){
                this._menu.drawMenu();
                
			}
        }
        this._nodo.style.display = "table";
        this._nodo.style.padding = "0px 10px";

		var _this = this;
	
		this._nodo.addEventListener('mouseenter', function(){
			if(_this._origen instanceof Menu){
				_this._origen.cerrar_opciones(_this._id);
			}
			if(_this._estado){
				_this.cerrar(false);
			}else{
				_this.abrir(false);
			}
        });
        
		
	}
	
}
Opcion.prototype = {};
Opcion.prototype.constructor = Opcion; 

var contenedor_menu = document.getElementById("contenido"); //Seleccionamos el contenedor donde vamos a meter nuestros menús


var menu_principal2 = new Menu(contenedor_menu, true);


var op4 = new Opcion(menu_principal2, ' Menus ');
var op5 = new Opcion(menu_principal2, ' Settings ');
var op6 = new Opcion(menu_principal2, ' Contact');


//añadimos la opciones al segundo menu
menu_principal2.addOption(op4);
menu_principal2.addOption(op5);
menu_principal2.addOption(op6);

/*Creando los submenus y les pasamos la opcion correspodiente*/

var submenu_op4 = new Menu(op4, false); 
var submenu_op5 = new Menu(op5, false);
var submenu_op6 = new Menu(op6, false);


//Opciones del submenu4
var op4_1 = new Opcion(submenu_op4, 'Enlace Menu 1 ');
var op4_2 = new Opcion(submenu_op4, 'Enlace Menu 2 ');
var op4_3 = new Opcion(submenu_op4, 'Enlace Menu 3 ');
//Opciones del submenu5
var op5_1 = new Opcion(submenu_op5, 'Enlace Menu 1');
var op5_2 = new Opcion(submenu_op5, 'Enlace Menu 2');
var op5_3 = new Opcion(submenu_op5, 'Enlace Menu 3');
//Opciones del submenu6
var op6_1 = new Opcion(submenu_op6, 'Enlace Menu 1');
var op6_2 = new Opcion(submenu_op6, 'Enlace Menu 2');
var op6_3 = new Opcion(submenu_op6, 'Enlace Menu 3');

/*Añadimos las opciones a los submenus*/


//añadir opciones al submenu4
submenu_op4.addOption(op4_1);
submenu_op4.addOption(op4_2);
submenu_op4.addOption(op4_3);

//añadir opciones al submenu5
submenu_op5.addOption(op5_1);
submenu_op5.addOption(op5_2);
submenu_op5.addOption(op5_3);

//añadir opciones al submenu6
submenu_op6.addOption(op6_1);
submenu_op6.addOption(op6_2);
submenu_op6.addOption(op6_3);

/*Asignamos el submenu correspondiente a cada menu de cada opcion*/

op4._menu = submenu_op4;
op5._menu = submenu_op5;
op6._menu = submenu_op6;

/*Dibujamos los menús principales*/

menu_principal2.drawMenu();

/*Cambiamos los estilos de los menus que queramos*/
menu_principal2.Estilo("black","white","0.1rem solid black","100%","10rem auto");
submenu_op4.Estilo("blue","white","0","80%","0");
submenu_op5.Estilo("blue","white","0","80%","0");
submenu_op6.Estilo("blue","white","0","80%","0");