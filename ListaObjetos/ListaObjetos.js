"use strict"

function person(name, surname){
        this.name=name;
        this.surname=surname;
}
//Cremos objetos persona
var person1=new person("Sergio","Diaz");
var person2=new person("Victor","Perez");
var person3=new person("Andres","Jimenez");
var person4=new person("Jorge","Ruiz");
var person5=new person("David","Cesar");



function list(){
    if (!this instanceof(list)) {
        throw new ExceptionAccesoInvalidoConstructor();
    }
    var _list=[];
    this.max=10;
    _list.length=0;

    this.isEmpty = function(){
        var empty=false;
        if (_list.length===0) {
            empty=true;
        }
        return empty;
    }

    this.isFull=function(){
        return(_list.length===this.max);
    }

    this.size=function(){
        return _list.length;
    }

    this.capacity=function(){
        return this.max;
    }

    this.add=function(elem){
        if (this.isFull()) {
            throw new ExceptionListaLlena();
        }
        _list.push(elem);
        return _list.length;
    }

    this.addAt=function(elem, index){
        if (this.isFull()) {
            throw new ExceptionListaLlena();
        }
        if (index>this.size()) {
            throw new ExceptionFueraRango();
        }
        _list.splice(index,0,elem);
        return this.size();
    }

    this.get=function(index){
        if (this.isEmpty()) {
            throw new ExceptionListaVacia();
        }
        if (index>this.size()) {
            throw new ExceptionFueraRango();
        }
        var elem=_list[index];
        return elem;

    }

    this.toString=function(){
        var cadena="";
        for (var i = 0; i < _list.length; i++) {
            cadena += _list[i].name+" "+_list[i].surname+"-";
            
        }
        return cadena;
    }

    this.indexOf=function(elem){
        if (this.isEmpty()) {
            throw new ExceptionListaVacia();
        }
        var posicion;
        posicion=_list.indexOf(elem);
        return posicion;
    }

    this.lastIndexOf=function(elem){
        if (this.isEmpty()) {
            throw new ExceptionListaVacia();
        }
        var posicion;
        posicion=_list.lastIndexOf(elem);
        return posicion;
    }

    this.capacity=function(){
        return this.max;
    }

    this.clear=function(){
        _list.length=0;
        return _list;
    }

    this.firstElement=function(){
        if (this.isEmpty()) {
            throw new ExceptionListaVacia();
        }
        var prim=_list[0];
        return prim;
    }

    this.lastElement=function(){
        if (this.isEmpty()) {
            throw new ExceptionListaVacia();
        }
        var ult=_list[this.size()-1];
        return ult;
    }

    this.remove=function(index){
        if (this.isEmpty()) {
            throw new ExceptionListaVacia();
        }
        if (index>this.size()) {
            throw new ExceptionFueraRango();
        }
        var consumido;
        for (var i = 0; i < _list.length; i++) {
            if (index==i) {
                consumido=_list[i];
                _list.splice(index, 1);
            }
        }
        return consumido;
    }

    this.removeElement=function(elem){
        if (this.isEmpty()) {
            throw new ExceptionListaVacia();
        }
        var index=_list.indexOf(elem);
        var consumido=_list.splice(index,1);
        return elem;
    }

    this.set=function(elem, index){
        _list.splice(index, 1, elem);
        return index;
    }
    
}
var list=new list();


function testeo(){
    
    //Comprobamos propiedades de la lista
    console.log("¿Vacia?: "+list.isEmpty());
    console.log("¿Llena?: " + list.isFull());
    console.log("Size: " + list.size()); 
    console.log("Capacity: " + list.capacity());

    //Añadimos un objeto a la lista:
    try{
        console.log("------Añadimos un objeto a la lista:----------")
        console.log("Añadido. Size: "+list.add(person1));
        console.log("Lista: "+list.toString());
        console.log("Size: " + list.size());
        console.log("¿Vacia?: "+list.isEmpty());
    }catch(error){
        console.log(error);
    }

    try{
        console.log("------Añadimos un objeto a la lista en una posicion:----------")
        console.log("Añadido. Size: "+list.addAt(person3,0));
        console.log("Añadido. Size: "+list.addAt(person2,1));
        console.log("Añadido. Size: "+list.addAt(person4,0));
        console.log("Añadido. Size: "+list.addAt(person5,3));
        console.log("Añadido. Size: "+list.addAt(person3,4));
        console.log("Lista: "+list.toString());
        console.log("Size: " + list.size());
        console.log("¿Vacia?: "+list.isEmpty());
    }catch(error){
        console.log(error);
    }

    try{
        console.log("-------funcion get--------");
        console.log("Objeto de la posicion 3:");
        console.log(list.get(3));
        console.log("Objeto de la posicion 0:");
        console.log(list.get(0));
    }catch(error){
        console.log(error);
    }

    console.log("-------Funciones Varias------");
    console.log("Lista: "+list.toString());
    console.log("----------------");
    console.log("IndexOf. Busco el objeto person3:");
    console.log(list.indexOf(person3));
    console.log("----------------");
    console.log("lastIndexOf. Busco el objeto person3:");
    console.log(list.lastIndexOf(person3));
    console.log("----------------");
    console.log("FirstElement:");
    console.log(list.firstElement());
    console.log("----------------");
    console.log("LastElement:");
    console.log(list.lastElement());

    try{
        console.log("-------Eliminar un objeto de la lista------");
        console.log("Elimina el objeto de la posicion 0:");
        console.log(list.remove(0));
        console.log("Lista: "+list.toString());
        console.log("----------------");
        console.log("Elimina el objeto person1:");
        console.log(list.removeElement(person1));
        console.log("Lista: "+list.toString());
    }catch(error){
        console.log(error);
    }

    try{
        console.log("-------Funcion set------");
        console.log("Vamos a poner person1 en la posicion 0:");
        console.log("Posicion: "+list.set(person1, 0));
        console.log("Lista: "+list.toString());
    }catch(error){
        console.log(error);
    }

    console.log("-------Funcion Clear------");
    console.log("Limpiar lista: ");
    console.log(list.clear());
    console.log("Lista: "+list.toString());
    console.log("");

}

window.onload=testeo;
