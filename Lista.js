"use strict";
var max=10;

//page functions
function addNumber(elem){
    elem=parseInt(document.getElementById("num").value); //Recoge el valor del input con el id num
    add(list,elem); //Llamamos a la funcion pasandole los parametros
}
function addAtNumber(elem, index){
    elem=parseInt(document.getElementById("num").value); //Recoge el valor del input con el id num
    index=parseInt(document.getElementById("index").value); //Recoge el valor del input con el id index
    addAt(list,elem,index);
}
function getNumber(index){
    index=parseInt(document.getElementById("index").value); //Recoge el valor del input con el id index
    get(list, index);
}
function indexOfNumber(elem){
    elem=parseInt(document.getElementById("num").value); //Recoge el valor del input con el id num
    indexOf(list, elem);
}
function lastIndexOfNumber(elem){
    elem=parseInt(document.getElementById("num").value); //Recoge el valor del input con el id num
    lastIndexOf(list, elem);
}
function removeNumber(index){
    index=parseInt(document.getElementById("index").value); //Recoge el valor del input con el id index
    remove(list, index);
}
function removeElementNumber(elem){
    elem=parseInt(document.getElementById("num").value); //Recoge el valor del input con el id num
    removeElement(list, elem);
}
function setNumber(elem, index){
    elem=parseInt(document.getElementById("num").value); //Recoge el valor del input con el id num
    index=parseInt(document.getElementById("index").value); //Recoge el valor del input con el id index
    set(list, elem, index);
}



//functions
function create(){
    var list=[];
    console.log("Lista creada");
    return list;
}

//Creo la lista
var list=create();

function isEmpty(list){
    var vacia=false;
    if (list.length==0) {
        vacia=true;
        console.log("La lista esta vacia");
    }else{
        console.log("La lista NO esta vacia");
    }
    return vacia; 
}

function isFull(list){
    var full=false;
    if (list.length==max) {
        console.log("La lista esta llena")
        full=true;
    }else{
        console.log("La lista NO esta llena");
    }
    return full;
}

function size(list){
    console.log("----Size: "+list.length);
    return list.length;
}

function add(list, elem){
    try{
        if (isNaN(elem)) {
            throw "El elemento no es un numero";
        }
        if (list.length<max) {
            list[list.length]=elem; //Asignamos el numero a la lista
            console.log("Numero añadido");
        }else{
            throw "La lista esta llena";
        }
        return size(list); //Devolvemos el tamaño de la lista cada vez que se instroduce un numero
    }catch(error){
        console.log(error);
    }
    
}

function addAt(list, elem, index){
    try{
        if (isNaN(elem)) {
            throw "El elemento no es un numero";
        }
        if(index>list.length){
            throw "El indice esta fuera del limite";
        }
        if (list.length<max) {
            list[index]=elem; //Asignamos el elemento en la posicion indicada de la lista
            console.log("Numero añadido en la posicion "+index);
        }else{
            throw "La lista esta llena ";
        }
        return size(list);
    }catch(error){
        console.log(error);
    }
    
}

function get(list, index){
    try{
        if(index>list.length){
            throw "El indice esta fuera del limite";
        }
        var elem=list[index]; 
        console.log("get:"+elem);
        return elem;
    }catch(error){
        console.log(error);
    }
}

function toStrings(list){
    var str = "";
    if (list.length!=0){	
        for (var i=0; i<list.length-1;i++){ //Recorremos la lista
            str += list[i] + " - "; //Asignamos a la variable str un numero y un guion por cada elemento de la lista
        } 		 		
        str += list[i]; 
        console.log("ToString: "+str);		
    } 	
    return str;
}

function indexOf(list, elem){
    try{
        var posicion;        
        if (isNaN(elem)) {
            throw "El elemento no es un numero";
        }
        for (var i = 0; i < list.length; i++) {
            if (elem==list[i]) { //Si el elemento coincide con uno de la lista
                posicion=i; //guardamos la posicion
                console.log("El elemento se encuentra en la posicion: "+posicion);
            }
        }
        return posicion;
    }catch(error){
        console.log(error);
    } 
}

function lastIndexOf(list, elem){
    try{
        var esta=false;
        if (isNaN(elem)) {
            throw "El elemento no es un numero";
        }
        for (var i = size(list); i > 0; i--) { //Recorremos la lista del final al principio
            if (list[i]===elem) {
                var prim=i;
                esta=true;
                i=0;
                console.log("El elemento se encuentra en la posicion "+prim);
            }  
        }
        return esta;
    }catch(error){
        console.log(error);
    }
}

function capacity(list){
    console.log("La capacidad es de "+max);
    return max;
}

function clearr(list){
    list.length=0;
    console.log("Lista limpia");
    return list;
}

function firstElement(list){
    try{
        var prim=list[0];

        if (list.length==0) {
            throw "La lista esta vacia";
        }
        console.log("El primer elemento es "+prim);
        return prim;
    }catch(error){
        console.log(error);
    }
}

function lastElement(list){
    try{
        var ultimo=list[list.length-1];

        if (list.length==0) {
            throw "La lista esta vacia";
        }

        console.log("El ultimo elemento es "+ultimo);
        return ultimo;
    }catch(error){
        console.log(error);
    }
}

function remove(list, index){
    try{
        var consumido;
        if(index>list.length){
            throw "El indice esta fuera del limite";
        }
        for (var i = 0; i < list.length; i++) { //Recorremos la lista
            if (index==i) { // Si el indice pasado es igual a la posicion de la lista por la que esta el bucle
                consumido=list[i]; //guardamos en la variable consumido, el numero de esa posicion
                list[i]=Number.NaN;// y en esa posicion añadimos un NaN
                console.log("Consumido: "+consumido);
            }
        }
        return consumido;
    }catch(error){
        console.log(error);
    }
}

function removeElement(list, elem){
    try{
        var borrado=false;
        if (isNaN(elem)) {
            throw "El elemento no es un numero";
        }

        for (var i = 0; i < list.length; i++) {
            if (elem==list[i]) {
                borrado=true;
                list[i]=Number.NaN;
                console.log("Borrado: "+borrado);
            }
        }
        return borrado;
    }catch(error){
        console.log(error);
    }
}

function set(list, elem, index){
    try{
        if (isNaN(elem)) {
            throw "El elemento no es un numero";
        }
        if(index>list.length){
            throw "El indice esta fuera del limite";
        }
        if (list.length<max) {
            list[index]=elem;
            console.log("Numero añadido en la posicion: ");
        }else{
            throw "No se ha podido añadir en la posicion: ";
        }
        return index;
    }catch(error){
        console.log(error);
    }
}

function mostrar(list){
       console.log(list);
}

