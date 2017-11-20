"use strict";
var max=10;
//page functions
function addNumber(elem){
    elem=parseInt(document.getElementById("num").value);
    add(list,elem);
}
function getNumber(index){
    index=parseInt(document.getElementById("index").value);
    get(list, index);
}
function indexOfNumber(elem){
    elem=parseInt(document.getElementById("num").value);
    indexOf(list, elem);
}
function removeNumber(index){
    index=parseInt(document.getElementById("index").value);
    remove(list, index);
}
function removeElementNumber(elem){
    elem=parseInt(document.getElementById("num").value);
    removeElement(list, elem);
}



function create(){
    var list=[];
    console.log("Lista creada");
    return list;
}

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
            list[list.length]=elem;
            list.sort(function (elem1, elem2){return elem1-elem2})
            console.log("Numero añadido");
        }else{
            throw "Lista llena";
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
        for (var i=0; i<list.length-1;i++){
            str += list[i] + " - ";
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
            if (elem==list[i]) {
                posicion=i;
                console.log("El elemento se encuentra en la posicion: "+posicion);
            }
        }
        return posicion;
    }catch(error){
        console.log(error);
    }
}

function capacity(list){
    console.log("La capacidad es de "+max);
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
        for (var i = 0; i < list.length; i++) {
            if (index==i) {
                consumido=list[i];
                list[i]=Number.NaN;
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

function mostrar(list){
       console.log(list);
}