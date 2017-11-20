"use strict";
var max=10;
//page functions
function addNumber(elem){
    elem=parseInt(document.getElementById("num").value);
    add(list,elem);
}
function addAtNumber(elem, index){
    elem=parseInt(document.getElementById("num").value);
    index=parseInt(document.getElementById("index").value);
    addAt(list,num,index);
}
function getNumber(index){
    index=parseInt(document.getElementById("index").value);
    get(list, index);
}
function indexOfNumber(elem){
    elem=parseInt(document.getElementById("num").value);
    indexOf(list, elem);
}
function lastIndexOfNumber(elem){
    elem=parseInt(document.getElementById("num").value);
    lastIndexOf(list, elem);
}
function removeNumber(index){
    index=parseInt(document.getElementById("index").value);
    remove(list, index);
}
function removeElementNumber(elem){
    elem=parseInt(document.getElementById("num").value);
    removeElement(list, elem);
}
function setNumber(elem, index){
    elem=parseInt(document.getElementById("num").value);
    index=parseInt(document.getElementById("index").value);
    set(list, elem, index);
}



//functions
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
            list[list.length]=elem; //Asignamos el numero a la lista
            console.log("Numero añadido");
        }else{
            throw "La lista esta llena";
        }
        return size(list);
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
            list[index]=elem;
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

function lastIndexOf(list, elem){
    try{
        var esta=false;
        if (isNaN(elem)) {
            throw "El elemento no es un numero";
        }
        
        for (var i = size(list); i > 0; i--) {
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
}

function clearr(list){
    var list1=[];
    list=list1;
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



/*
function test(){
    
    console.log(list);
    console.log(isEmpty(list));
    console.log(isFull(list));
    console.log("Tamaño de la lista:"+size(list));
    console.log(capacity(list));

    //añadir numeros aleatorios
    for (var i = 0; i < max; i++) {
        var ale=Math.ceil(Math.random()*100);
        console.log(add(list, ale));
    }
  

    console.log("toString: "+toString(list));
    console.log(firstElement(list));
    console.log(lastElement(list));
    console.log(set(list, 88, 0));
    console.log(get(list, 8));
    console.log("IndexOf: "+indexOf(list, 50));
    console.log("LastIndexOf: "+lastIndexOf(list, 34));
    console.log("Numero consumido: "+remove(list,3));
    console.log("Remove Element: "+removeElement(list,20));
    console.log(set(list, 88, 1));

    console.log(clearr(list));
    

}*/