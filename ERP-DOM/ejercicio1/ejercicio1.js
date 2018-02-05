"use strict";

var recorrer=document.getElementById("recorrer");
var raiz=document.documentElement;

var mostrar=document.getElementById("mostrar");
mostrar.style.display= 'none';

var lista= "<ul>" + recursiva(raiz) + "</ul>";
mostrar.innerHTML=lista;



recorrer.addEventListener("click",function(){
    mostrar.style.display= 'block';
})


function recursiva(padre){
    var contenido="<li>"+ padre.tagName+" ";
    var atributo="";
    for (let i = 0; i < padre.attributes.length; i++) {
        if (atributo != "") {
            atributo+=",";
        }
        atributo += padre.attributes[i].name;
    }
    if (atributo!="") {
        contenido += "[ "+atributo+" ]";
    }
    contenido += "<ul>";
    if (padre.hasChildNodes()) {
        for (let i = 0; i < padre.childNodes.length; i++) {
            if (padre.childNodes[i].nodeType == 1) {
                contenido += recursiva(padre.childNodes[i]);
            }
        }
    }
    contenido += "</ul></li>";
    return contenido;
}


