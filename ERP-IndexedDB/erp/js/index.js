"use strict";
var sh1;

//Recargar la pagina al darle a Inicio
var activ=document.getElementsByClassName("active");
activ[0].addEventListener("click", function(){
    location.reload(true);
});


if(!window.indexedDB){
	window.alert("Tu navegador no soporta una version estable de indexedDB");
}

const db_NAME = "BD_ERP";
const db_VERSION = 1;

var db;

function IniciarBD(){
    /*if (window.indexedDB) {
        window.indexedDB.deleteDatabase(db_NAME);
    }*/

    var request=window.indexedDB.open(db_NAME, db_VERSION);

    var defaultCategory;

    request.onupgradeneeded=function (event){
        db=event.target.result;

        //Almacenes
		var objectStoreTiendas = db.createObjectStore("Shop",{ keyPath : "cif"});
        var objectStoreCategorias = db.createObjectStore("Category",{ keyPath : "title"});
        var objectStoreProductos = db.createObjectStore("Products",{ keyPath : "SerialNumber"});

        //Creamos tiendas
		var shop1= {cif:"00000001",name:"Tienda 1"};
		var shop2= {cif:"00000002",name:"Tienda 2"};
		var shop3= {cif:"00000003",name:"Tienda 3"};
    	objectStoreTiendas.add(shop1);
    	objectStoreTiendas.add(shop2);
    	objectStoreTiendas.add(shop3);

        //Creamos categorias
		defaultCategory = {title:"PorDefecto",description:"Categoria por defecto"};
		var catcam = {title:"Camaras",description:"Categoria de camaras."};
		var catsmart = {title:"Moviles",description:"Categoria de moviles."};
		var cattele = {title:"Televisiones",description:"Categoria de televisiones."};
		objectStoreCategorias.add(defaultCategory);
    	objectStoreCategorias.add(catcam);
    	objectStoreCategorias.add(catsmart);
        objectStoreCategorias.add(cattele);
        
        //Creamos productos
		var cam1= {SerialNumber:"1274562",name:"Nikon", price:300, images:"imagen0.png"};
		var cam2= {SerialNumber:"1281234",name:"Canon", price:650, images:"imagen1.png"};
        var smart= {SerialNumber:"1329862",name:"Samsung", price:300, images:"imagen2.png", model:8};
        var smart2= {SerialNumber:"1408127",name:"Iphone X", price:1100, images:"imagen4.png", model:10};
		var tv= {SerialNumber:"1577762",name:"Television Panasonic", price:500, images:"imagen3.png", marca:"PANASONIC", pulgadas:50};
        var tv2= {SerialNumber:"1602352",name:"Television Samsung", price:1890, images:"imagen5.png", marca:"SAMSUNG", pulgadas:55};
    	objectStoreProductos.add(cam1);
    	objectStoreProductos.add(cam2);
        objectStoreProductos.add(smart);
        objectStoreProductos.add(smart2);
        objectStoreProductos.add(tv);
        objectStoreProductos.add(tv2);
    };

    request.onsuccess=function(event){
        sh1= new StoreHouse.getInstance();

        db = event.target.result;

        var trans=db.transaction(["Shop", "Category", "Products"], "readonly");

        //Guardar en variables
		var objectStoreShop = trans.objectStore("Shop");
		var objectStoreCategory = trans.objectStore("Category");
        var objectStoreProducts = trans.objectStore("Products");
        
        //extraer el contenido de cada almacen y lo guardamos en un array
		var objectStoreRequestShop = objectStoreShop.getAll();
		var objectStoreRequestCategory = objectStoreCategory.getAll();
        var objectStoreRequestProducts = objectStoreProducts.getAll();
        
        //Si la transacion sobre las tiendas ha salido bien
        objectStoreRequestShop.onsuccess = function(evt){
			for(var i = 0;i < objectStoreRequestShop.result.length; i++){
				sh1.addShop(Shop.getObject(objectStoreRequestShop.result[i])); //Convertir el literal
			}
        };
        
        //Si la transacion sobre las categorias ha salido bien
        objectStoreRequestCategory.onsuccess = function(evt){
			for(var i = 0;i < objectStoreRequestCategory.result.length; i++){
				sh1.addCategory(Category.getObject(objectStoreRequestCategory.result[i])); //Convertir el literal
			}
        };
        
        //Si la transacion sobre los productos ha salido bien
        objectStoreRequestProducts.onsuccess = function(evt){
            //Tienda 1
            var sho=Shop.getObject(objectStoreRequestShop.result[0]);
            var cat=Category.getObject(objectStoreRequestCategory.result[0]);
            var pro=Product.getObject(objectStoreRequestProducts.result[0]);
            sh1.addProductInShop(pro, sho, cat);
            sh1.addQuantityProductInShop(pro, sho, 3);
            var pro=Product.getObject(objectStoreRequestProducts.result[1]);
            sh1.addProductInShop(pro, sho, cat);
            sh1.addQuantityProductInShop(pro, sho, 7);
            var cat=Category.getObject(objectStoreRequestCategory.result[1]);
            var pro=Product.getObject(objectStoreRequestProducts.result[2]);
            sh1.addProductInShop(pro, sho, cat); 
            sh1.addQuantityProductInShop(pro, sho, 2);
            //Tienda 2
            var sho=Shop.getObject(objectStoreRequestShop.result[1]);
            var cat=Category.getObject(objectStoreRequestCategory.result[3]);
            var pro=Product.getObject(objectStoreRequestProducts.result[4]);
            sh1.addProductInShop(pro, sho, cat);
            sh1.addQuantityProductInShop(pro, sho, 4);
            var cat=Category.getObject(objectStoreRequestCategory.result[1]);
            var pro=Product.getObject(objectStoreRequestProducts.result[3]);
            sh1.addProductInShop(pro, sho, cat);
            sh1.addQuantityProductInShop(pro, sho, 6);
            var cat=Category.getObject(objectStoreRequestCategory.result[0]);
            var pro=Product.getObject(objectStoreRequestProducts.result[1]);
            sh1.addProductInShop(pro, sho, cat); 
            sh1.addQuantityProductInShop(pro, sho, 3);
            //Tienda 3
            var sho=Shop.getObject(objectStoreRequestShop.result[2]);
            var cat=Category.getObject(objectStoreRequestCategory.result[1]);
            var pro=Product.getObject(objectStoreRequestProducts.result[2]);
            sh1.addProductInShop(pro, sho, cat);
            sh1.addQuantityProductInShop(pro, sho, 7);
            var cat=Category.getObject(objectStoreRequestCategory.result[0]);
            var pro=Product.getObject(objectStoreRequestProducts.result[0]);
            sh1.addProductInShop(pro, sho, cat);
            sh1.addQuantityProductInShop(pro, sho, 2);
            var cat=Category.getObject(objectStoreRequestCategory.result[3]);
            var pro=Product.getObject(objectStoreRequestProducts.result[5]);
            sh1.addProductInShop(pro, sho, cat); 
            sh1.addQuantityProductInShop(pro, sho, 4);
            
        }
        
        trans.oncomplete = function(){
            shopsMenusPopulate();
            cookForm();
                  
        }
    };

    request.onerror=function(){
        alert("Error"+event.target.errorCode);
    };
}


function init(){
    IniciarBD();
}

//Filtra los productos de una determinada categoria
function productsCategoryShopPopulate(category, shop){
    var sho=shop;
    return function(){
        
        var main=document.getElementById("main");
        var divCab = document.createElement("div");
        divCab.setAttribute("id","cabecera");
        divCab.className = "row";
        main.appendChild(divCab);
    
        var h2Cab = document.createElement("h2");
        h2Cab.setAttribute("id","titleStore");
        h2Cab.className = "col-md-12 text-center";
        
        
        h2Cab.appendChild(document.createTextNode(category.title));
        divCab.appendChild(h2Cab);
    
        
    
        var divProductos = document.createElement("div");
        divProductos.setAttribute("id","items");
        main.appendChild(divProductos);

        
        
        var idDiv = document.createElement("div");
        idDiv.id = "productos";
        main.appendChild(idDiv);
    
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "container");
        idDiv.appendChild(containerDiv);
    
        var h2 = document.createElement("h2");
        containerDiv.appendChild (h2);
        h2.appendChild(document.createTextNode("Productos"));
        
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row text-center");
        containerDiv.appendChild(rowDiv);
    
        
        var iterableItem = sh1.getCategoryProduct(category, sho);
        var items = iterableItem.next();
        
        
        while(!items.done){		
            if(items.value !== ''){
                var colDiv = document.createElement("div");
                colDiv.setAttribute("class", "col-sm-4");
                rowDiv.appendChild(colDiv);

                var thumbnailDiv = document.createElement("div");
                thumbnailDiv.setAttribute("class", "thumbnail");
                colDiv.appendChild(thumbnailDiv);
                
                
                var img = document.createElement("img");
                img.setAttribute("src", "imagenes/"+items.value.images);
                img.setAttribute("alt", "col-sm-4");
                img.setAttribute("width", "400");
                img.setAttribute("height", "300");
                thumbnailDiv.appendChild(img);
                
                
                var p = document.createElement("p");
                var strong = document.createElement("strong");
                strong.appendChild(document.createTextNode(category.title));
                p.appendChild(strong)
                thumbnailDiv.appendChild(p);

                p = document.createElement("p");
                p.appendChild(document.createTextNode(items.value.price + " €"));
                thumbnailDiv.appendChild(p);

                var button = document.createElement("button");
                button.setAttribute("class", "btn");
                button.appendChild(document.createTextNode("Más información"));
                thumbnailDiv.appendChild(button);

                button.addEventListener("click",createFunctionShowItem(items.value,sho));		
            
            }              
                items = iterableItem.next();	
            
        }
    };

}


var ventanas=[]; //Array para guardar cada ventana abierta
var ventana;

var cerrarVent=document.getElementById("cerrarVentanas");
cerrarVent.addEventListener("click", function(){
    for(var i=0;i<ventanas.length;i++){
		ventanas[i].close();
	}
});

function crearEstructura(item, ventana){
    return function(){
        var main=ventana.document.getElementById("main");
        var imagen = ventana.document.createElement("img");
        imagen.setAttribute("src","imagenes/"+item.images);
        imagen.setAttribute("width", "300");
        imagen.setAttribute("height", "200");
        main.appendChild(imagen);

        var containerDiv = ventana.document.createElement("div");
        containerDiv.setAttribute("class", "container-fluid");
        main.appendChild(containerDiv);

        
        var rowDiv = ventana.document.createElement("div");
        rowDiv.setAttribute("class", "row text-center");
        containerDiv.appendChild(rowDiv);

        
        var colDiv = ventana.document.createElement("div");
        colDiv.setAttribute("class", "col-sm-12");
        rowDiv.appendChild(colDiv);

        var thumbnailDiv = ventana.document.createElement("div");
        thumbnailDiv.setAttribute("class", "thumbnail");
        colDiv.appendChild(thumbnailDiv);

        var p = ventana.document.createElement("p");
        p.setAttribute("alt", "col-sm-12");
        var strong = ventana.document.createElement("strong");
        strong.appendChild(ventana.document.createTextNode(item.name));
        p.appendChild(strong)
        thumbnailDiv.appendChild(p);
        
        p = ventana.document.createElement("p");
        p.appendChild(ventana.document.createTextNode("Descripcion: "+item.description));
        thumbnailDiv.appendChild(p);

        p = ventana.document.createElement("p");
        p.appendChild(ventana.document.createTextNode("Precio: "+item.price + " €"));
        thumbnailDiv.appendChild(p);

        p = ventana.document.createElement("p");
        p.appendChild(ventana.document.createTextNode("Nummero Serie: "+item.SerialNumber));
        thumbnailDiv.appendChild(p);
    }
}

function abrirVentana(item){
    return function(){
        ventana=window.open('NuevaVentana.html', "", "resizable=1, scrollbars=yes, width=350, height=400");
        
        ventanas.push(ventana);

        ventana.onload=crearEstructura(item, ventana);
    }
}


//Cada vez que clickeamos una tienda

function shopPopulate(shop){
    var sho = shop;
    return function(){
      
      var main=document.getElementById("main");
      var divCabecera = document.createElement("div");
      divCabecera.setAttribute("id","cabecera");
      divCabecera.className = "row";
      main.appendChild(divCabecera);
  
      var h2Cabecera = document.createElement("h2");
      h2Cabecera.setAttribute("id","titleStore");
      h2Cabecera.className = "col-md-12 text-center";
      
      
      h2Cabecera.appendChild(document.createTextNode(sho.name));
      divCabecera.appendChild(h2Cabecera);
  
      
  
      var divProductos = document.createElement("div");
      divProductos.setAttribute("id","items");
      main.appendChild(divProductos);

      var menucat=document.getElementById("MenuCat");
      if(!menucat){
        var menu=document.getElementById("menu");
        var li=document.createElement("li");
        li.setAttribute("class","dropdown");
        menu.appendChild(li);
        var a=document.createElement("a");
        a.setAttribute("class","dropdown-toggle");
        a.setAttribute("data-toggle", "dropdown");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode("Categorias"));
        li.appendChild(a);
        var span=document.createElement("span");
        span.setAttribute("class","caret");
        a.appendChild(span);
        var ul=document.createElement("ul");
        ul.setAttribute("class", "dropdown-menu");
        ul.setAttribute("id", "MenuCat");
        li.appendChild(ul);
        menuCategoryShopPopulate(sho);
      }
      
      
      
      var idDiv = document.createElement("div");
      idDiv.id = "productos";
      main.appendChild(idDiv);
  
      var containerDiv = document.createElement("div");
      containerDiv.setAttribute("class", "container");
      idDiv.appendChild(containerDiv);
  
      var h2 = document.createElement("h2");
      containerDiv.appendChild (h2);
      h2.appendChild(document.createTextNode("Productos"));
      
      var rowDiv = document.createElement("div");
      rowDiv.setAttribute("class", "row text-center");
      containerDiv.appendChild(rowDiv);
  
     
      var iterableItem = sh1.getShopProducts(shop);
      var items = iterableItem.next();
      while(!items.done){		
        var item = items.value;
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "col-sm-4");
        rowDiv.appendChild(colDiv);

        var thumbnailDiv = document.createElement("div");
        thumbnailDiv.setAttribute("class", "thumbnail");
        colDiv.appendChild(thumbnailDiv);
        
        
        var img = document.createElement("img");
        img.setAttribute("src", "imagenes/"+items.value.images);
        img.setAttribute("alt", "col-sm-4");
        img.setAttribute("width", "400");
        img.setAttribute("height", "300");
        img.setAttribute("style", "cursor:pointer;");
        img.addEventListener("click", abrirVentana(item));
        thumbnailDiv.appendChild(img);
        
        
        var p = document.createElement("p");
        var strong = document.createElement("strong");
        strong.appendChild(document.createTextNode(item.name));
        p.appendChild(strong)
        thumbnailDiv.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode(item.price + " €"));
        thumbnailDiv.appendChild(p);

        var button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.appendChild(document.createTextNode("Más información"));
        thumbnailDiv.appendChild(button);

        button.addEventListener("click",createFunctionShowItem(item,sho));		

        console.log(item.mostrar());			
        items = iterableItem.next();		
        }

        
   
      
    };
  
}

function removeeChild(){
    var main=document.getElementById("main");

    if (main.hasChildNodes()) {
        while (main.childNodes.length>=1) {
            main.removeChild(main.firstChild);
        }
    }
}

function shopsMenusPopulate(){
    var menushop=document.getElementById("MenuShop");
        
        var main = document.getElementById("main");
    
        var idDiv = document.createElement("div");
        idDiv.id = "productos";
        main.appendChild(idDiv);

        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "container-fluid");
        containerDiv.setAttribute("id","principal")
        main.appendChild(containerDiv);
        
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row text-center");
        containerDiv.appendChild(rowDiv);

        
       
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "col-sm-12");
        rowDiv.appendChild(colDiv);

        var thumbnailDiv = document.createElement("div");
        thumbnailDiv.setAttribute("class", "thumbnail");
        thumbnailDiv.setAttribute("style", "font-size:8rem");
        colDiv.appendChild(thumbnailDiv);

        var p = document.createElement("p");
        var strong = document.createElement("strong");
        strong.appendChild(document.createTextNode("Bienvenido a StoreHouse"));
        p.appendChild(strong)
        thumbnailDiv.appendChild(p);

        var colDiv2 = document.createElement("div");
        colDiv2.setAttribute("class", "col-sm-12");
        rowDiv.appendChild(colDiv2);

        var thumbnailDiv2 = document.createElement("div");
        thumbnailDiv2.setAttribute("class", "thumbnail");
        colDiv2.appendChild(thumbnailDiv2);
        
        
        var img = document.createElement("img");
        img.setAttribute("src", "imagenes/inicio2.jpg");
        img.setAttribute("alt", "col-sm-12");
        img.setAttribute("width", "600");
        img.setAttribute("height", "600");
        thumbnailDiv2.appendChild(img);

        var shop=sh1.shops;
        var sho=shop.next();
    
        while (sho.done !== true){
            var li=document.createElement("li");
            var enlace1 = document.createElement("a");
            enlace1.setAttribute("class", "enlace");
            enlace1.setAttribute("href", "#");
    
            var txt=document.createTextNode(sho.value.name);
            
            
            enlace1.appendChild(txt);
            li.appendChild(enlace1);
            
            menushop.appendChild(li);

            enlace1.setAttribute("onclick", "removeeChild()");
            
            enlace1.addEventListener("click",shopPopulate(sho.value));

            sho = shop.next();
        }
}

//Menu con todas las categorias
function menuCategoryShopPopulate(shop){

    var menucat=document.getElementById("MenuCat");

    var cat=sh1.categories; 
    var categor=cat.next();



    while (categor.done !== true){
        var li=document.createElement("li");
        var enlace1 = document.createElement("a");
        enlace1.setAttribute("class", "enlacecat");
        enlace1.setAttribute("href", "#");

        var txt=document.createTextNode(categor.value.title);

        
        enlace1.appendChild(txt);
        li.appendChild(enlace1);
        
        menucat.appendChild(li);

        enlace1.setAttribute("onclick", "removeeChild()");

        
        enlace1.addEventListener("click",productsCategoryShopPopulate(categor.value, shop));
           
        categor = cat.next();

    }

}


//Muestra el contenido de un producto en una tienda
function createFunctionShowItem(item, shop){
    return function(){
        removeeChild();
        var stock=sh1.getStock(shop, item);
        var globalst=sh1.globalStock(item);

        var main = document.getElementById("main");
    
        var idDiv = document.createElement("div");
        idDiv.id = "productos";
        main.appendChild(idDiv);

        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "container-fluid");
        main.appendChild(containerDiv);

        var h2 = document.createElement("h2");
        containerDiv.appendChild (h2);
        h2.appendChild(document.createTextNode("Producto: "));
        
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row text-center");
        containerDiv.appendChild(rowDiv);

        
       
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "col-sm-12");
        rowDiv.appendChild(colDiv);

        var thumbnailDiv = document.createElement("div");
        thumbnailDiv.setAttribute("class", "thumbnail");
        colDiv.appendChild(thumbnailDiv);
        
        
        var img = document.createElement("img");
        img.setAttribute("src", "imagenes/"+item.images);
        img.setAttribute("alt", "col-sm-6");
        img.setAttribute("width", "400");
        img.setAttribute("height", "300");
        thumbnailDiv.appendChild(img);

        var colDiv2 = document.createElement("div");
        colDiv2.setAttribute("class", "col-sm-12");
        rowDiv.appendChild(colDiv2);

        var thumbnailDiv2 = document.createElement("div");
        thumbnailDiv2.setAttribute("class", "thumbnail");
        colDiv2.appendChild(thumbnailDiv2);


        var p = document.createElement("p");
        p.setAttribute("alt", "col-sm-6");
        var strong = document.createElement("strong");
        strong.appendChild(document.createTextNode(item.name));
        p.appendChild(strong)
        thumbnailDiv2.appendChild(p);
        
        p = document.createElement("p");
        p.appendChild(document.createTextNode("Precio: "+item.price + " €"));
        thumbnailDiv2.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Descripcion: "+item.description));
        thumbnailDiv2.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Numero Serie: "+item.SerialNumber));
        thumbnailDiv2.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode(shop.name+" Stock : "+stock));
        thumbnailDiv2.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Stock Total de "+item.name+" en todas las tiendas : "+globalst));
        thumbnailDiv2.appendChild(p);

    }
}


function InicioSesion(){

    var nombre = document.forms[0].usrname.value;
    var pass = document.forms[0].psw.value;

    var user="prueba";
    var psw="prueba";

    if (nombre == user && pass==psw) {

        //Para que se cierre el modal cuando hacemos click en login
        var login=document.getElementById("login");
        login.setAttribute("data-dismiss", "modal");

        //Crear cookie y sesion
        setCookie("username", nombre, 30);  
    }else{
        alert("Usuario o contraseña incorrectos");
    }

    cookForm();
}


//Cookies
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    var user = getCookie("username");
    if (user != "") { //Si existe
        var ini=document.getElementById("Ini");
        ini.setAttribute("style", "display:none;");

        var cerrar=document.getElementById("Cerrar");
        cerrar.setAttribute("style", "display:block;");
    }
}


function cookForm(){
    //Comprobamos si existe la cookie
    var cookie=getCookie("username");
    if(cookie.length>0){ //si existe cookie
        checkCookie();
        //Creamos boton para cerrar sesion
        var cerrarSesion=document.getElementById("Cerrar");
        cerrarSesion.addEventListener("click", function(){
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            var ini=document.getElementById("Ini");
            ini.setAttribute("style", "display:block;");

            var cerrar=document.getElementById("Cerrar");
            cerrar.setAttribute("style", "display:none;");
            
            var form=document.getElementById("li");
            try{
                if (form.hasChildNodes()) {
                    while (form.childNodes.length>=1) {
                        form.removeChild(form.firstChild);
                    }
                }  
                form.parentNode.removeChild(form);
            }catch(err){
                //console.log(err);
            }

            location.reload(true);
        });
        
        
        
        //Menu Formularios
        var menuform=document.getElementById("Form");
        //var menstyle=menuform.style.display;
        var menu=document.getElementById("menu");
        if (!menuform) {
            var li=document.createElement("li");
            li.setAttribute("class","dropdown");
            li.setAttribute("id", "li");
            menu.appendChild(li);
            var a=document.createElement("a");
            a.setAttribute("class","dropdown-toggle");
            a.setAttribute("data-toggle", "dropdown");
            a.setAttribute("href", "#");
            a.setAttribute("id", "Form");
            a.appendChild(document.createTextNode("Formularios"));
            li.appendChild(a);
            var span=document.createElement("span");
            span.setAttribute("class","caret");
            a.appendChild(span);
            var ul=document.createElement("ul");
            ul.setAttribute("class", "dropdown-menu");
            ul.setAttribute("id", "MenuForm");
            li.appendChild(ul);
            var li2=document.createElement("li");
            ul.appendChild(li2);
            var a2=document.createElement("a");
            a2.setAttribute("href", "#");
            a2.setAttribute("onclick", "removeeChild()");
            a2.addEventListener("click", formTienda);
            a2.appendChild(document.createTextNode("Tienda"));
            li2.appendChild(a2);
            var li3=document.createElement("li");
            ul.appendChild(li3);
            var a3=document.createElement("a");
            a3.setAttribute("href", "#");
            a3.setAttribute("onclick", "removeeChild()");

                a3.addEventListener("click", formCategoria);
            a3.appendChild(document.createTextNode("Categoria"));
            li3.appendChild(a3);
            var li4=document.createElement("li");
            ul.appendChild(li4);
            var a4=document.createElement("a");
            a4.setAttribute("href", "#");
            a4.setAttribute("onclick", "removeeChild()");
            a4.addEventListener("click", formProducto);
            a4.appendChild(document.createTextNode("Producto"));
            li4.appendChild(a4);
        }
    }
}



function formTienda(){
    var main=document.getElementById("main");
    var form=document.createElement("form");
    form.setAttribute("class", "form-horizontal");
    form.setAttribute("id", "formtienda");
    main.appendChild(form);
    var fieldset=document.createElement("fieldset");
    form.appendChild(fieldset);
    var legend=document.createElement("legend");
    legend.appendChild(document.createTextNode("Tienda"));
    fieldset.appendChild(legend);
    var div=document.createElement("div");
    div.setAttribute("class", "form-group");
    fieldset.appendChild(div);
    var label=document.createElement("label");
    label.setAttribute("class", "col-md-4 control-label");
    label.appendChild(document.createTextNode("CIF: "));
    div.appendChild(label);
    var div2=document.createElement("div");
    div2.setAttribute("class","col-md-4");
    div.appendChild(div2);
    var input=document.createElement("input");
    input.setAttribute("id", "cif");
    input.setAttribute("name", "cif");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control input-md");
    div2.appendChild(input);
    var span=document.createElement("span");
    span.setAttribute("class", "help-block");
    span.appendChild(document.createTextNode("Para Añadir: Introduce el CIF de la tienda. Para Modificar: Introduce un CIF ya existente. Para eliminar: Introducir cif"));
    div2.appendChild(span);


    var div3=document.createElement("div");
    div3.setAttribute("class", "form-group");
    fieldset.appendChild(div3);
    var label2=document.createElement("label");
    label2.setAttribute("class", "col-md-4 control-label");
    label2.appendChild(document.createTextNode("Nombre: "));
    div3.appendChild(label2);
    var div4=document.createElement("div");
    div4.setAttribute("class","col-md-4");
    div3.appendChild(div4);
    var input2=document.createElement("input");
    input2.setAttribute("id", "nombre");
    input2.setAttribute("name", "nombre");
    input2.setAttribute("type", "text");
    input2.setAttribute("class", "form-control input-md");
    div4.appendChild(input2);
    var span2=document.createElement("span");
    span2.setAttribute("class", "help-block");
    span2.appendChild(document.createTextNode("Introduce el nombre de la tienda"));
    div4.appendChild(span2);

    var div5=document.createElement("div");
    div5.setAttribute("class", "form-group");
    fieldset.appendChild(div5);
    var label3=document.createElement("label");
    label3.setAttribute("class", "col-md-4 control-label");
    label3.appendChild(document.createTextNode("Direccion: "));
    div5.appendChild(label3);
    var div6=document.createElement("div");
    div6.setAttribute("class","col-md-4");
    div5.appendChild(div6);
    var input3=document.createElement("input");
    input3.setAttribute("id", "direccion");
    input3.setAttribute("name", "direccion");
    input3.setAttribute("type", "text");
    input3.setAttribute("class", "form-control input-md");
    div6.appendChild(input3);
    var span3=document.createElement("span");
    span3.setAttribute("class", "help-block");
    span3.appendChild(document.createTextNode("Introduce la direccion de la tienda"));
    div6.appendChild(span3);

    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);    
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-8");
    div7.appendChild(div8);
    var button=document.createElement("button");
    button.setAttribute("id", "insertar");
    button.setAttribute("name", "insertar");
    button.setAttribute("class", "btn btn-success");
    button.setAttribute("type", "button");
    button.addEventListener("click", insertarTienda);
    button.appendChild(document.createTextNode("Insertar/Modificar"));
    div8.appendChild(button);
    var button2=document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("id", "eliminar");
    button2.setAttribute("name", "eliminar");
    button2.setAttribute("class", "btn btn-danger");
    button2.addEventListener("click", eliminarTienda);
    button2.appendChild(document.createTextNode("Eliminar"));
    div8.appendChild(button2);
}

function formCategoria(){
    var main=document.getElementById("main");
    var form=document.createElement("form");
    form.setAttribute("class", "form-horizontal");
    form.setAttribute("id", "formcat");
    main.appendChild(form);
    var fieldset=document.createElement("fieldset");
    form.appendChild(fieldset);
    var legend=document.createElement("legend");
    legend.appendChild(document.createTextNode("Categoria"));
    fieldset.appendChild(legend);
    var div=document.createElement("div");
    div.setAttribute("class", "form-group");
    fieldset.appendChild(div);
    var label=document.createElement("label");
    label.setAttribute("class", "col-md-4 control-label");
    label.appendChild(document.createTextNode("Nombre: "));
    div.appendChild(label);
    var div2=document.createElement("div");
    div2.setAttribute("class","col-md-4");
    div.appendChild(div2);
    var input=document.createElement("input");
    input.setAttribute("id", "nombrecat");
    input.setAttribute("name", "nombre");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control input-md");
    div2.appendChild(input);
    var span=document.createElement("span");
    span.setAttribute("class", "help-block");
    span.appendChild(document.createTextNode("Nombre de la categoria. Para eliminar o modificar introducir un nombre ya existente "));
    div2.appendChild(span);

    var div3=document.createElement("div");
    div3.setAttribute("class", "form-group");
    fieldset.appendChild(div3);
    var label2=document.createElement("label");
    label2.setAttribute("class", "col-md-4 control-label");
    label2.appendChild(document.createTextNode("Descripcion: "));
    div3.appendChild(label2);
    var div4=document.createElement("div");
    div4.setAttribute("class","col-md-4");
    div3.appendChild(div4);
    var textar=document.createElement("textarea");
    textar.setAttribute("class", "form-control");
    textar.setAttribute("id", "descrip");
    textar.appendChild(document.createTextNode("Descripcion de la categoria: "));
    div4.appendChild(textar);

    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);    
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-8");
    div7.appendChild(div8);
    var buttonInsertCat=document.createElement("button");
    buttonInsertCat.setAttribute("id", "insertarCat");
    buttonInsertCat.setAttribute("name", "insertar");
    buttonInsertCat.setAttribute("class", "btn btn-success");
    buttonInsertCat.setAttribute("type", "button");
    buttonInsertCat.addEventListener("click", insertarCat);////////
    buttonInsertCat.appendChild(document.createTextNode("Insertar/Modificar"));
    div8.appendChild(buttonInsertCat);
    var button2=document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("id", "eliminarCat");
    button2.setAttribute("name", "eliminar");
    button2.setAttribute("class", "btn btn-danger");
    button2.addEventListener("click", eliminarCategoria);
    button2.appendChild(document.createTextNode("Eliminar"));
    div8.appendChild(button2);
}

function formProducto(){
    //camara
    var main=document.getElementById("main");
    var form=document.createElement("form");
    form.setAttribute("class", "form-horizontal");
    form.setAttribute("name", "formproducto");
    form.setAttribute("id", "formproducto");
    main.appendChild(form);
    var fieldset=document.createElement("fieldset");
    form.appendChild(fieldset);
    var legend=document.createElement("legend");
    legend.appendChild(document.createTextNode("Camara"));
    fieldset.appendChild(legend);
    var div=document.createElement("div");
    div.setAttribute("class", "form-group");
    fieldset.appendChild(div);
    var label=document.createElement("label");
    label.setAttribute("class", "col-md-4 control-label");
    label.appendChild(document.createTextNode("Numero Serie: "));
    div.appendChild(label);
    var div2=document.createElement("div");
    div2.setAttribute("class","col-md-4");
    div.appendChild(div2);
    var input=document.createElement("input");
    input.setAttribute("id", "nserie");
    input.setAttribute("name", "nserie");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control input-md");
    div2.appendChild(input);
    var span=document.createElement("span");
    span.setAttribute("class", "help-block");
    span.appendChild(document.createTextNode("Numero de serie. Para eliminar introducir nº serie de el producto"));
    div2.appendChild(span);

    var div3=document.createElement("div");
    div3.setAttribute("class", "form-group");
    fieldset.appendChild(div3);
    var label2=document.createElement("label");
    label2.setAttribute("class", "col-md-4 control-label");
    label2.appendChild(document.createTextNode("Nombre: "));
    div3.appendChild(label2);
    var div4=document.createElement("div");
    div4.setAttribute("class","col-md-4");
    div3.appendChild(div4);
    var input2=document.createElement("input");
    input2.setAttribute("id", "nombre");
    input2.setAttribute("name", "nombre");
    input2.setAttribute("type", "text");
    input2.setAttribute("class", "form-control input-md");
    div4.appendChild(input2);
    var span2=document.createElement("span");
    span2.setAttribute("class", "help-block");
    span2.appendChild(document.createTextNode("Nombre de la camara"));
    div4.appendChild(span2);

    var div5=document.createElement("div");
    div5.setAttribute("class", "form-group");
    fieldset.appendChild(div5);
    var label3=document.createElement("label");
    label3.setAttribute("class", "col-md-4 control-label");
    label3.appendChild(document.createTextNode("Precio: "));
    div5.appendChild(label3);
    var div6=document.createElement("div");
    div6.setAttribute("class","col-md-4");
    div5.appendChild(div6);
    var input3=document.createElement("input");
    input3.setAttribute("id", "precio");
    input3.setAttribute("name", "precio");
    input3.setAttribute("type", "text");
    input3.setAttribute("class", "form-control input-md");
    div6.appendChild(input3);
    var span3=document.createElement("span");
    span3.setAttribute("class", "help-block");
    span3.appendChild(document.createTextNode("Precio de la camara"));
    div6.appendChild(span3);

    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    label4.appendChild(document.createTextNode("Shop: "));
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-4");
    div7.appendChild(div8);
    var input4=document.createElement("input");
    input4.setAttribute("id", "shop");
    input4.setAttribute("name", "shop");
    input4.setAttribute("type", "text");
    input4.setAttribute("class", "form-control input-md");
    div8.appendChild(input4);
    var span4=document.createElement("span");
    span4.setAttribute("class", "help-block");
    span4.appendChild(document.createTextNode("Tienda donde se almacena el producto"));
    div8.appendChild(span4);

    var div9=document.createElement("div");
    div9.setAttribute("class", "form-group");
    fieldset.appendChild(div9);
    var label5=document.createElement("label");
    label5.setAttribute("class", "col-md-4 control-label");
    label5.appendChild(document.createTextNode("Categoria: "));
    div9.appendChild(label5);
    var div10=document.createElement("div");
    div10.setAttribute("class","col-md-4");
    div9.appendChild(div10);
    var input5=document.createElement("input");
    input5.setAttribute("id", "cat");
    input5.setAttribute("name", "cat");
    input5.setAttribute("type", "text");
    input5.setAttribute("class", "form-control input-md");
    div10.appendChild(input5);
    var span5=document.createElement("span");
    span5.setAttribute("class", "help-block");
    span5.appendChild(document.createTextNode("Categoria a la que pertenece el producto"));
    div10.appendChild(span5);

    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);    
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-8");
    div7.appendChild(div8);
    var button=document.createElement("button");
    button.setAttribute("id", "insertar");
    button.setAttribute("name", "insertar");
    button.setAttribute("class", "btn btn-success");
    button.setAttribute("type", "button");
    button.addEventListener("click", insertarPro1);
    button.appendChild(document.createTextNode("Insertar"));
    div8.appendChild(button);
    var button2=document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("id", "eliminar");
    button2.setAttribute("name", "eliminar");
    button2.setAttribute("class", "btn btn-danger");
    button2.addEventListener("click", eliminarPro1);
    button2.appendChild(document.createTextNode("Eliminar"));
    div8.appendChild(button2);

    //Smartphone
    var main=document.getElementById("main");
    var form=document.createElement("form");
    form.setAttribute("class", "form-horizontal");
    form.setAttribute("name", "formproducto2");
    form.setAttribute("id", "formproducto2");
    main.appendChild(form);
    var fieldset=document.createElement("fieldset");
    form.appendChild(fieldset);
    var legend=document.createElement("legend");
    legend.appendChild(document.createTextNode("Smartphone"));
    fieldset.appendChild(legend);
    var div=document.createElement("div");
    div.setAttribute("class", "form-group");
    fieldset.appendChild(div);
    var label=document.createElement("label");
    label.setAttribute("class", "col-md-4 control-label");
    label.appendChild(document.createTextNode("Numero Serie: "));
    div.appendChild(label);
    var div2=document.createElement("div");
    div2.setAttribute("class","col-md-4");
    div.appendChild(div2);
    var input=document.createElement("input");
    input.setAttribute("id", "nseriesmart");
    input.setAttribute("name", "nseriesmart");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control input-md");
    div2.appendChild(input);
    var span=document.createElement("span");
    span.setAttribute("class", "help-block");
    span.appendChild(document.createTextNode("Numero de serie. Para eliminar introducir nº serie de el producto"));
    div2.appendChild(span);

    var div3=document.createElement("div");
    div3.setAttribute("class", "form-group");
    fieldset.appendChild(div3);
    var label2=document.createElement("label");
    label2.setAttribute("class", "col-md-4 control-label");
    label2.appendChild(document.createTextNode("Nombre: "));
    div3.appendChild(label2);
    var div4=document.createElement("div");
    div4.setAttribute("class","col-md-4");
    div3.appendChild(div4);
    var input2=document.createElement("input");
    input2.setAttribute("id", "nombresmart");
    input2.setAttribute("name", "nombresmart");
    input2.setAttribute("type", "text");
    input2.setAttribute("class", "form-control input-md");
    div4.appendChild(input2);
    var span2=document.createElement("span");
    span2.setAttribute("class", "help-block");
    span2.appendChild(document.createTextNode("Nombre del smartphone"));
    div4.appendChild(span2);

    var div5=document.createElement("div");
    div5.setAttribute("class", "form-group");
    fieldset.appendChild(div5);
    var label3=document.createElement("label");
    label3.setAttribute("class", "col-md-4 control-label");
    label3.appendChild(document.createTextNode("Precio: "));
    div5.appendChild(label3);
    var div6=document.createElement("div");
    div6.setAttribute("class","col-md-4");
    div5.appendChild(div6);
    var input3=document.createElement("input");
    input3.setAttribute("id", "preciosmart");
    input3.setAttribute("name", "preciosmart");
    input3.setAttribute("type", "text");
    input3.setAttribute("class", "form-control input-md");
    div6.appendChild(input3);
    var span3=document.createElement("span");
    span3.setAttribute("class", "help-block");
    span3.appendChild(document.createTextNode("Precio del smartphone"));
    div6.appendChild(span3);

    var div10=document.createElement("div");
    div10.setAttribute("class", "form-group");
    fieldset.appendChild(div10);
    var label7=document.createElement("label");
    label7.setAttribute("class", "col-md-4 control-label");
    label7.appendChild(document.createTextNode("Modelo: "));
    div10.appendChild(label7);
    var div11=document.createElement("div");
    div11.setAttribute("class","col-md-4");
    div10.appendChild(div11);
    var input7=document.createElement("input");
    input7.setAttribute("id", "modelsmart");
    input7.setAttribute("name", "modelsmart");
    input7.setAttribute("type", "text");
    input7.setAttribute("class", "form-control input-md");
    div11.appendChild(input7);
    var span7=document.createElement("span");
    span7.setAttribute("class", "help-block");
    span7.appendChild(document.createTextNode("Modelo del smartphone"));
    div11.appendChild(span7);

    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    label4.appendChild(document.createTextNode("Shop: "));
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-4");
    div7.appendChild(div8);
    var input4=document.createElement("input");
    input4.setAttribute("id", "shopsmart");
    input4.setAttribute("name", "shopsmart");
    input4.setAttribute("type", "text");
    input4.setAttribute("class", "form-control input-md");
    div8.appendChild(input4);
    var span4=document.createElement("span");
    span4.setAttribute("class", "help-block");
    span4.appendChild(document.createTextNode("Tienda donde se almacena el producto"));
    div8.appendChild(span4);

    var div9=document.createElement("div");
    div9.setAttribute("class", "form-group");
    fieldset.appendChild(div9);
    var label5=document.createElement("label");
    label5.setAttribute("class", "col-md-4 control-label");
    label5.appendChild(document.createTextNode("Categoria: "));
    div9.appendChild(label5);
    var div10=document.createElement("div");
    div10.setAttribute("class","col-md-4");
    div9.appendChild(div10);
    var input5=document.createElement("input");
    input5.setAttribute("id", "catsmart");
    input5.setAttribute("name", "catsmart");
    input5.setAttribute("type", "text");
    input5.setAttribute("class", "form-control input-md");
    div10.appendChild(input5);
    var span5=document.createElement("span");
    span5.setAttribute("class", "help-block");
    span5.appendChild(document.createTextNode("Categoria a la que pertenece el producto"));
    div10.appendChild(span5);

    
    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);    
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-8");
    div7.appendChild(div8);
    var button=document.createElement("button");
    button.setAttribute("id", "insertarsmart");
    button.setAttribute("name", "insertarsmart");
    button.setAttribute("class", "btn btn-success");
    button.setAttribute("type", "button");
    button.addEventListener("click", insertarPro2);
    button.appendChild(document.createTextNode("Insertar"));
    div8.appendChild(button);
    var button2=document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("id", "eliminarsmart");
    button2.setAttribute("name", "eliminarsmart");
    button2.setAttribute("class", "btn btn-danger");
    button2.addEventListener("click", eliminarPro2);
    button2.appendChild(document.createTextNode("Eliminar"));
    div8.appendChild(button2);

    //Television
    var main=document.getElementById("main");
    var form=document.createElement("form");
    form.setAttribute("class", "form-horizontal");
    form.setAttribute("name", "formproducto3");
    form.setAttribute("id", "formproducto3");
    main.appendChild(form);
    var fieldset=document.createElement("fieldset");
    form.appendChild(fieldset);
    var legend=document.createElement("legend");
    legend.appendChild(document.createTextNode("Television"));
    fieldset.appendChild(legend);
    var div=document.createElement("div");
    div.setAttribute("class", "form-group");
    fieldset.appendChild(div);
    var label=document.createElement("label");
    label.setAttribute("class", "col-md-4 control-label");
    label.appendChild(document.createTextNode("Numero Serie: "));
    div.appendChild(label);
    var div2=document.createElement("div");
    div2.setAttribute("class","col-md-4");
    div.appendChild(div2);
    var input=document.createElement("input");
    input.setAttribute("id", "nserietele");
    input.setAttribute("name", "nserietele");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control input-md");
    div2.appendChild(input);
    var span=document.createElement("span");
    span.setAttribute("class", "help-block");
    span.appendChild(document.createTextNode("Numero de serie. Para eliminar introducir nº serie de el producto"));
    div2.appendChild(span);

    var div3=document.createElement("div");
    div3.setAttribute("class", "form-group");
    fieldset.appendChild(div3);
    var label2=document.createElement("label");
    label2.setAttribute("class", "col-md-4 control-label");
    label2.appendChild(document.createTextNode("Nombre: "));
    div3.appendChild(label2);
    var div4=document.createElement("div");
    div4.setAttribute("class","col-md-4");
    div3.appendChild(div4);
    var input2=document.createElement("input");
    input2.setAttribute("id", "nombretele");
    input2.setAttribute("name", "nombretele");
    input2.setAttribute("type", "text");
    input2.setAttribute("class", "form-control input-md");
    div4.appendChild(input2);
    var span2=document.createElement("span");
    span2.setAttribute("class", "help-block");
    span2.appendChild(document.createTextNode("Nombre de la television"));
    div4.appendChild(span2);

    var div5=document.createElement("div");
    div5.setAttribute("class", "form-group");
    fieldset.appendChild(div5);
    var label3=document.createElement("label");
    label3.setAttribute("class", "col-md-4 control-label");
    label3.appendChild(document.createTextNode("Precio: "));
    div5.appendChild(label3);
    var div6=document.createElement("div");
    div6.setAttribute("class","col-md-4");
    div5.appendChild(div6);
    var input3=document.createElement("input");
    input3.setAttribute("id", "preciotele");
    input3.setAttribute("name", "preciotele");
    input3.setAttribute("type", "text");
    input3.setAttribute("class", "form-control input-md");
    div6.appendChild(input3);
    var span3=document.createElement("span");
    span3.setAttribute("class", "help-block");
    span3.appendChild(document.createTextNode("Precio de la television"));
    div6.appendChild(span3);

    var div10=document.createElement("div");
    div10.setAttribute("class", "form-group");
    fieldset.appendChild(div10);
    var label7=document.createElement("label");
    label7.setAttribute("class", "col-md-4 control-label");
    label7.appendChild(document.createTextNode("Pulgadas: "));
    div10.appendChild(label7);
    var div11=document.createElement("div");
    div11.setAttribute("class","col-md-4");
    div10.appendChild(div11);
    var input7=document.createElement("input");
    input7.setAttribute("id", "pulgadas");
    input7.setAttribute("name", "pulgadas");
    input7.setAttribute("type", "text");
    input7.setAttribute("class", "form-control input-md");
    div11.appendChild(input7);
    var span7=document.createElement("span");
    span7.setAttribute("class", "help-block");
    span7.appendChild(document.createTextNode("Pulgadas de la television"));
    div11.appendChild(span7);

    var div10=document.createElement("div");
    div10.setAttribute("class", "form-group");
    fieldset.appendChild(div10);
    var label7=document.createElement("label");
    label7.setAttribute("class", "col-md-4 control-label");
    label7.appendChild(document.createTextNode("Marca: "));
    div10.appendChild(label7);
    var div11=document.createElement("div");
    div11.setAttribute("class","col-md-4");
    div10.appendChild(div11);
    var input7=document.createElement("input");
    input7.setAttribute("id", "marca");
    input7.setAttribute("name", "marca");
    input7.setAttribute("type", "text");
    input7.setAttribute("class", "form-control input-md");
    div11.appendChild(input7);
    var span7=document.createElement("span");
    span7.setAttribute("class", "help-block");
    span7.appendChild(document.createTextNode("Marca de la television(Lg, Samsung, Panasonic, Sony)"));
    div11.appendChild(span7);

    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    label4.appendChild(document.createTextNode("Shop: "));
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-4");
    div7.appendChild(div8);
    var input4=document.createElement("input");
    input4.setAttribute("id", "shoptel");
    input4.setAttribute("name", "shoptel");
    input4.setAttribute("type", "text");
    input4.setAttribute("class", "form-control input-md");
    div8.appendChild(input4);
    var span4=document.createElement("span");
    span4.setAttribute("class", "help-block");
    span4.appendChild(document.createTextNode("Tienda donde se almacena el producto"));
    div8.appendChild(span4);

    var div9=document.createElement("div");
    div9.setAttribute("class", "form-group");
    fieldset.appendChild(div9);
    var label5=document.createElement("label");
    label5.setAttribute("class", "col-md-4 control-label");
    label5.appendChild(document.createTextNode("Categoria: "));
    div9.appendChild(label5);
    var div10=document.createElement("div");
    div10.setAttribute("class","col-md-4");
    div9.appendChild(div10);
    var input5=document.createElement("input");
    input5.setAttribute("id", "cattel");
    input5.setAttribute("name", "cattel");
    input5.setAttribute("type", "text");
    input5.setAttribute("class", "form-control input-md");
    div10.appendChild(input5);
    var span5=document.createElement("span");
    span5.setAttribute("class", "help-block");
    span5.appendChild(document.createTextNode("Categoria a la que pertenece el producto"));
    div10.appendChild(span5);


    var div7=document.createElement("div");
    div7.setAttribute("class", "form-group");
    fieldset.appendChild(div7);    
    var label4=document.createElement("label");
    label4.setAttribute("class", "col-md-4 control-label");
    div7.appendChild(label4);
    var div8=document.createElement("div");
    div8.setAttribute("class","col-md-8");
    div7.appendChild(div8);
    var button=document.createElement("button");
    button.setAttribute("id", "insertartele");
    button.setAttribute("name", "insertartele");
    button.setAttribute("class", "btn btn-success");
    button.setAttribute("type", "button");
    button.addEventListener("click", insertarPro3);
    button.appendChild(document.createTextNode("Insertar"));
    div8.appendChild(button);
    var button2=document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("id", "eliminartele");
    button2.setAttribute("name", "eliminartele");
    button2.setAttribute("class", "btn btn-danger");
    button2.addEventListener("click", eliminarPro3);
    button2.appendChild(document.createTextNode("Eliminar"));
    div8.appendChild(button2);
}


function insertarTienda(){
    var cif=document.getElementById("cif").value;
    var nombre=document.getElementById("nombre").value;
    var dir=document.getElementById("direccion").value;

    if (cif == "") {
        alert("La tienda debe de tener un cif");
    }else{
        var transShop = db.transaction(["Shop"],"readonly"); 
        var objectStoreShop = transShop.objectStore("Shop");
        
        objectStoreShop.openCursor().onsuccess = function(e){
            var result = e.target.result;

            if (result!==null) {
                if(result.value.cif === cif){ 
                    var NewShop = {cif:cif, name:nombre, direccion:dir};
                    var transShop2 = db.transaction(["Shop"],"readwrite");
                    var store = transShop2.objectStore("Shop", { keyPath : "cif"});
                    var request = store.put(NewShop);
                    
                    request.onsuccess = function(){
                        alert("Tienda modificada correctamente");
                        var transShop3 = db.transaction(["Shop"],"readonly");
                        var storeShop = transShop3.objectStore("Shop");
                        var request2 = storeShop.getAll();
    
                        request2.onsuccess = function(){
                            sh1.addShop(Shop.getObject(request2.result[request2.result.length - 1]));
                        };
                        transShop3.oncomplete = function(){
                            
                           var formtienda=document.getElementById("formtienda");
                            if (formtienda.hasChildNodes()) {
                                while (formtienda.childNodes.length>=1) {
                                    formtienda.removeChild(formtienda.firstChild);
                                }
                            }
    
                            //Borrar el menu de tiendas para llamarlo despues
                            var menshop=document.getElementById("MenuShop");
                            
                            if (menshop.hasChildNodes()) {
                                while (menshop.childNodes.length>=1) {
                                    menshop.removeChild(menshop.firstChild);
                                }
                            }
                            
                            var sh=sh1.shops;
                            var it=sh.next();
                            while(!it.done){
                                console.log(it.value);
                                it=sh.next();
                            }

                            //shopsMenusPopulate();
                        };
                        
                        
                    };
            
                    
				}else{
					result.continue();	//pasamos a la siguiente posicion para seguir buscando
                }
            }else{
                
                var NewShop = {cif:cif, name:nombre, direccion:dir};
				var transShop2 = db.transaction(["Shop"],"readwrite");
				var store = transShop2.objectStore("Shop", { keyPath : "cif"});
                var request = store.add(NewShop);
                
                request.onsuccess = function(){
					alert("Tienda creada correctamente");
					var transShop3 = db.transaction(["Shop"],"readonly");
					var storeShop = transShop3.objectStore("Shop");
					var request2 = storeShop.getAll();

					request2.onsuccess = function(){
						sh1.addShop(Shop.getObject(request2.result[request2.result.length - 1]));
					};
					transShop3.oncomplete = function(){
                        
                       var formtienda=document.getElementById("formtienda");
                        if (formtienda.hasChildNodes()) {
                            while (formtienda.childNodes.length>=1) {
                                formtienda.removeChild(formtienda.firstChild);
                            }
                        }

                        //Borrar el menu de tiendas para llamarlo despues
                        var menshop=document.getElementById("MenuShop");
                        
                        if (menshop.hasChildNodes()) {
                            while (menshop.childNodes.length>=1) {
                                menshop.removeChild(menshop.firstChild);
                            }
                        }

                        shopsMenusPopulate();

                    };
                };
            }
        }
    }

}

function insertarCat(){
    var nombre=document.getElementById("nombrecat").value;
    var desc=document.getElementById("descrip").value;
    if (nombre == "") {
        alert("La categoria debe de tener un nombre");
    }else{
        var transCat = db.transaction(["Category"],"readonly"); 
        var objectStoreCat = transCat.objectStore("Category");
        
        objectStoreCat.openCursor().onsuccess = function(e){
            var result = e.target.result;

            if (result!==null) {
                if(result.value.title === nombre){ 
					                   
                    var NewCategory = {title:nombre, description:desc};
                    var transCat2 = db.transaction(["Category"],"readwrite");
                    var store = transCat2.objectStore("Category", { keyPath : "title"});///////
                    var request = store.put(NewCategory);
                    
                    request.onsuccess = function(){
                        alert("Categoria modificada correctamente");
                        var transCat3 = db.transaction(["Category"],"readonly");
                        var storeCat = transCat3.objectStore("Category");
                        var request2 = storeCat.getAll();
    
                        request2.onsuccess = function(){
                            sh1.addCategory(Category.getObject(request2.result[request2.result.length - 1]));
                        };
                        transCat3.oncomplete = function(){
                            
                            try{
                                var menucat=document.getElementById("MenuCat");
                                if (menucat.hasChildNodes()) {
                                    while (menucat.childNodes.length>=1) {
                                        menucat.removeChild(menucat.firstChild);
                                    }
                                }
                            }catch(err){
                                console.log("No existe el menu Categorias, pero se ha creado");
                            }
                            try{ 
                                var sho=sh1.shops;
                                var item = sho.next();
                                
                                    menuCategoryShopPopulate(item.value);

                            }catch(err){
                                console.log("Categoria Creada");
                            }
                            
                            //Limpiamos campos
                            var nomform=document.getElementById("formcat").id;
                            LimpiarCampos(nomform);
                            
                        };
                    };

				}else{
					result.continue();	//pasamos a la siguiente posicion para seguir buscando
				}
            }else{
                var NewCategory = {title:nombre, description:desc};
				var transCat2 = db.transaction(["Category"],"readwrite");
				var store = transCat2.objectStore("Category", { keyPath : "title"});
                var request = store.add(NewCategory);
                
                request.onsuccess = function(){
					alert("Categoria creada correctamente");
					var transCat3 = db.transaction(["Category"],"readonly");
					var storeCat = transCat3.objectStore("Category");
					var request2 = storeCat.getAll();

					request2.onsuccess = function(){
						sh1.addCategory(Category.getObject(request2.result[request2.result.length - 1]));
					};
					transCat3.oncomplete = function(){
                        try{
                            var menucat=document.getElementById("MenuCat");
                            if (menucat.hasChildNodes()) {
                                while (menucat.childNodes.length>=1) {
                                    menucat.removeChild(menucat.firstChild);
                                }
                            }
                        }catch(err){
                            console.log("No existe el menu Categorias, pero se ha creado");
                        }
						try{ 
                            var sho=sh1.shops;
                            var item = sho.next();
                                menuCategoryShopPopulate(item.value);
                        
                        }catch(err){
                            console.log("Categoria Creada");
                        }

                        //Limpiamos campos
                        var nomform=document.getElementById("formcat").id;
                        LimpiarCampos(nomform);
					};
				};
            }


        }
    }

}

function insertarPro1(){
    var nserie=document.getElementById("nserie").value;
    var nombre=document.getElementById("nombre").value;
    var precio=document.getElementById("precio").value;
    var shop=document.getElementById("shop").value;
    var categ=document.getElementById("cat").value;

    if (nombre == "") {
        alert("El producto debe de tener un nombre");
    }else{
        var transPro = db.transaction(["Products"],"readonly");
        var objectStorePro = transPro.objectStore("Products");
        
        objectStorePro.openCursor().onsuccess = function(e){
            var result = e.target.result;

            if (result!==null) {
                if(result.value.SerialNumber === nserie){ 
					alert("El producto existe");  //avisamos de que se ha encontrado
					return;  //salimos
				}else{
					result.continue();	//pasamos a la siguiente posicion para seguir buscando
				}
            }else{
                var NewProduct = {SerialNumber:nserie, Nombre:nombre, Precio: precio, Shop: shop, Category: categ};
				var transPro2 = db.transaction(["Products"],"readwrite");
				var store = transPro2.objectStore("Products", { keyPath : "SerialNumber"});
                var request = store.add(NewProduct);
                
                request.onsuccess = function(){
					alert("Producto creado correctamente");
					var transPro3 = db.transaction(["Products"],"readonly");
					var storePro = transPro3.objectStore("Products");
                    var request2 = storePro.getAll();
                    
                    var transShop3 = db.transaction(["Shop"],"readonly");
					var storeShop = transShop3.objectStore("Shop");
                    var requestShop = storeShop.getAll();
                    
                    var transCat3 = db.transaction(["Category"],"readonly");
					var storeCat = transCat3.objectStore("Category");
                    var requestCat = storeCat.getAll();
                    

					request2.onsuccess = function(){
                        var sho=sh1.shops;
                        var item = sho.next();
                        var cat=sh1.categories;
                        var itemcat = cat.next();
                        while(!item.done){
                            while (!item.done && !itemcat.done) {
                                if(item.value.name == shop && itemcat.value.title == categ){
                                    var cam= new Camera(nserie, nombre, precio, "1.jpg")
                                    sh1.addProductInShop(cam,item.value, itemcat.value);
                                    sh1.addQuantityProductInShop(cam, item.value, 1);
                                    console.log("añadido");
                                }
                                itemcat= cat.next();
                            }
                            item= sho.next();
                            cat=sh1.categories;
                            itemcat= cat.next();
                        }
					};
					transPro3.oncomplete = function(){
                        
						//Limpiamos campos
                        var nomform=document.getElementById("formproducto").id;
                        LimpiarCampos(nomform);
					};
				};
            }


        }
    }

}

function insertarPro2(){
    var nserie=document.getElementById("nseriesmart").value;
    var nombre=document.getElementById("nombresmart").value;
    var precio=document.getElementById("preciosmart").value;
    var model=document.getElementById("modelsmart").value;
    var shop=document.getElementById("shopsmart").value;
    var categ=document.getElementById("catsmart").value;


    if (nombre == "") {
        alert("El producto debe de tener un nombre");
    }else{
        var transPro = db.transaction(["Products"],"readonly"); 
        var objectStorePro = transPro.objectStore("Products");
        
        objectStorePro.openCursor().onsuccess = function(e){
            var result = e.target.result;

            if (result!==null) {
                if(result.value.SerialNumber === nserie){ 
					alert("El producto existe");  //avisamos de que se ha encontrado
					return;  //salimos
				}else{
					result.continue();	//pasamos a la siguiente posicion para seguir buscando
				}
            }else{
                var NewProduct = {SerialNumber:nserie, Nombre:nombre, Precio: precio, Shop: shop, Category: categ};
				var transPro2 = db.transaction(["Products"],"readwrite");
				var store = transPro2.objectStore("Products", { keyPath : "SerialNumber"});///////
                var request = store.add(NewProduct);
                
                request.onsuccess = function(){
					alert("Producto creado correctamente");
					var transPro3 = db.transaction(["Products"],"readonly");
					var storePro = transPro3.objectStore("Products");
                    var request2 = storePro.getAll();
                    
                    var transShop3 = db.transaction(["Shop"],"readonly");
					var storeShop = transShop3.objectStore("Shop");
                    var requestShop = storeShop.getAll();
                    
                    var transCat3 = db.transaction(["Category"],"readonly");
					var storeCat = transCat3.objectStore("Category");
                    var requestCat = storeCat.getAll();
                    

					request2.onsuccess = function(){
                        var sho=sh1.shops;
                        var item = sho.next();
                        var cat=sh1.categories;
                        var itemcat = cat.next();
                        while(!item.done){
                            while (!item.done && !itemcat.done) {
                                if(item.value.name == shop && itemcat.value.title == categ){
                                    var smart= new SmartPhone(nserie, nombre, precio, "2.jpg", model);
                                    sh1.addProductInShop(smart,item.value, itemcat.value);
                                    sh1.addQuantityProductInShop(smart, item.value, 1);
                                    console.log("añadido");
                                    
                                }
                                itemcat= cat.next();
                            }
                            item= sho.next();
                            cat=sh1.categories;
                            itemcat= cat.next();
                        }
					};
					transPro3.oncomplete = function(){
                        
						//Limpiamos campos
                        var nomform=document.getElementById("formproducto2").id;
                        LimpiarCampos(nomform);
					};
				};
            }


        }
    }

}

function insertarPro3(){
    var nserie=document.getElementById("nserietele").value;
    var nombre=document.getElementById("nombretele").value;
    var precio=document.getElementById("preciotele").value;
    var pulgadas=document.getElementById("pulgadas").value;
    var marca=document.getElementById("marca").value;
    marca=marca.toUpperCase();
    var shop=document.getElementById("shoptel").value;
    var categ=document.getElementById("cattel").value;


    if (nombre == "") {
        alert("El producto debe de tener un nombre");
    }else{
        var transPro = db.transaction(["Products"],"readonly"); 
        var objectStorePro = transPro.objectStore("Products");
        
        objectStorePro.openCursor().onsuccess = function(e){
            var result = e.target.result;

            if (result!==null) {
                if(result.value.SerialNumber === nserie){ 
					alert("El producto existe");  //avisamos de que se ha encontrado
					return;  //salimos
				}else{
					result.continue();	//pasamos a la siguiente posicion para seguir buscando
				}
            }else{
                var NewProduct = {SerialNumber:nserie, Nombre:nombre, Precio: precio, Shop: shop, Category: categ};
				var transPro2 = db.transaction(["Products"],"readwrite");
				var store = transPro2.objectStore("Products", { keyPath : "SerialNumber"});
                var request = store.add(NewProduct);
                
                request.onsuccess = function(){
					alert("Producto creado correctamente");
					var transPro3 = db.transaction(["Products"],"readonly");
					var storePro = transPro3.objectStore("Products");
                    var request2 = storePro.getAll();
                    
                    var transShop3 = db.transaction(["Shop"],"readonly");
					var storeShop = transShop3.objectStore("Shop");
                    var requestShop = storeShop.getAll();
                    
                    var transCat3 = db.transaction(["Category"],"readonly");
					var storeCat = transCat3.objectStore("Category");
                    var requestCat = storeCat.getAll();
                    

					request2.onsuccess = function(){
                        var sho=sh1.shops;
                        var item = sho.next();
                        var cat=sh1.categories;
                        var itemcat = cat.next();
                        while(!item.done){
                            while (!item.done && !itemcat.done) {
                                if(item.value.name == shop && itemcat.value.title == categ){
                                    var tele= new Television(nserie, nombre, precio, "3.jpg", marca, pulgadas);
                                    sh1.addProductInShop(tele,item.value, itemcat.value);
                                    sh1.addQuantityProductInShop(tele, item.value, 1);
                                    console.log("añadido");
                                    
                                }
                                itemcat= cat.next();
                            }
                            item= sho.next();
                            cat=sh1.categories;
                            itemcat= cat.next();
                        }
					};
					transPro3.oncomplete = function(){
                        
						//Limpiamos campos
                        var nomform=document.getElementById("formproducto3").id;
                        LimpiarCampos(nomform);
					};
				};
            }


        }
    }
}


function eliminarTienda(){
        var cif=document.getElementById("cif").value;


		var transactionR = db.transaction(['Shop'], 'readonly');
	    var store = transactionR.objectStore('Shop');
	    var requestR = store.get(cif);
	    
	    requestR.onsuccess = function(){};

	    transactionR.oncomplete = function(){
	    	var transaccionD = db.transaction(['Shop'], 'readwrite');
	    	var storeCat = transaccionD.objectStore('Shop');
	    	var requestD = storeCat.delete(cif);
	    	
	    	requestD.onsuccess= function(){
	    		alert("La tienda se ha eliminado correctamente");
	    	};
	    	transaccionD.oncomplete = function(){
                var sho=sh1.shops;
                var item = sho.next();
                while (!item.done) {
                    if(item.value.cif == cif){
                        sh1.removeShop(item.value);
                    }
                    item= sho.next();
                }
                
                var menshop=document.getElementById("MenuShop");
                
                    if (menshop.hasChildNodes()) {
                        while (menshop.childNodes.length>=1) {
                            menshop.removeChild(menshop.firstChild);
                        }
                    }
            
                shopsMenusPopulate();
            
                var formtienda=document.getElementById("formtienda");
                if (formtienda.hasChildNodes()) {
                    while (formtienda.childNodes.length>=1) {
                        formtienda.removeChild(formtienda.firstChild);
                    }
                }
	    	};
	    };

}

function eliminarCategoria(){
    var nombre=document.getElementById("nombrecat").value;   
    
    var transactionR = db.transaction(['Category'], 'readonly');
    var store = transactionR.objectStore('Category');
    var requestR = store.get(nombre);
    
    requestR.onsuccess = function(){};

    transactionR.oncomplete = function(){
        var transaccionD = db.transaction(['Category'], 'readwrite');
        var storeCat = transaccionD.objectStore('Category');
        var requestD = storeCat.delete(nombre);
        
        requestD.onsuccess= function(){
            alert("La Categoria se ha eliminado correctamente");
        };
        transaccionD.oncomplete = function(){
            var cat=sh1.categories;
            var item = cat.next();
            while (!item.done) {
                if(item.value.title == nombre){
                    sh1.removeCategory(item.value);
                }
                item= cat.next();
            }
            
            var menshop=document.getElementById("MenuCat");
            
                if (menshop.hasChildNodes()) {
                    while (menshop.childNodes.length>=1) {
                        menshop.removeChild(menshop.firstChild);
                    }
                }
            
            var sho=sh1.shops;
            var item = sho.next();
            if(!item.done) {
                menuCategoryShopPopulate(item.value);
            }
        
        
            //Limpiamos campos
            var nomform=document.getElementById("formcat").id;
            LimpiarCampos(nomform);
        };
    };
}

function eliminarPro1(){
    var nserie=document.getElementById("nserie").value;

    var transactionR = db.transaction(['Products'], 'readonly');
    var store = transactionR.objectStore('Products');
    var requestR = store.get(nserie);
    
    requestR.onsuccess = function(){};

    transactionR.oncomplete = function(){
        var transaccionD = db.transaction(['Products'], 'readwrite');
        var storeCat = transaccionD.objectStore('Products');
        var requestD = storeCat.delete(nserie);
        
        requestD.onsuccess= function(){};
        transaccionD.oncomplete = function(){
            var sho=sh1.shops;
            var item = sho.next();
        
            while(!item.done){
                var itr = sh1.getShopProducts(item.value);
                var ite = itr.next();
                while(!ite.done){
                    if (ite.value.SerialNumber==nserie) {
                        sh1.removeProduct(ite.value);
                        alert("El producto se ha eliminado correctamente");
                        return true;
                    }
                    
                    
                    ite = itr.next();
                }
        
                item= sho.next();
        
            }
        
            //Limpiamos campos
            var nomform=document.getElementById("formproducto").id;
            LimpiarCampos(nomform);
            
        };
    };

}

function eliminarPro2(){
    var nserie=document.getElementById("nseriesmart").value;

    var transactionR = db.transaction(['Products'], 'readonly');
    var store = transactionR.objectStore('Products');
    var requestR = store.get(nserie);
    
    requestR.onsuccess = function(){};

    transactionR.oncomplete = function(){
        var transaccionD = db.transaction(['Products'], 'readwrite');
        var storeCat = transaccionD.objectStore('Products');
        var requestD = storeCat.delete(nserie);
        
        requestD.onsuccess= function(){
            alert("El producto se ha eliminado correctamente");
        };
        transaccionD.oncomplete = function(){
            var sho=sh1.shops;
            var item = sho.next();
        
            while(!item.done){
                var itr = sh1.getShopProducts(item.value);
                var ite = itr.next();
                while(!ite.done){
                    if (ite.value.SerialNumber==nserie) {
                        sh1.removeProduct(ite.value);
                        return true;
                    }
                    
                    
                    ite = itr.next();
                }
        
                item= sho.next();
        
            }
        
            //Limpiamos campos
            var nomform=document.getElementById("formproducto2").id;
            LimpiarCampos(nomform);
            
        };
    };
}

function eliminarPro3(){
    var nserie=document.getElementById("nserietele").value;

    var transactionR = db.transaction(['Products'], 'readonly');
    var store = transactionR.objectStore('Products');
    var requestR = store.get(nserie);
    
    requestR.onsuccess = function(){};

    transactionR.oncomplete = function(){
        var transaccionD = db.transaction(['Products'], 'readwrite');
        var storeCat = transaccionD.objectStore('Products');
        var requestD = storeCat.delete(nserie);
        
        requestD.onsuccess= function(){
            alert("El producto se ha eliminado correctamente");
        };
        transaccionD.oncomplete = function(){
            var sho=sh1.shops;
            var item = sho.next();
        
            while(!item.done){
                var itr = sh1.getShopProducts(item.value);
                var ite = itr.next();
                while(!ite.done){
                    if (ite.value.SerialNumber==nserie) {
                        sh1.removeProduct(ite.value);
                        return true;
                    }
                    
                    
                    ite = itr.next();
                }
        
                item= sho.next();
        
            }
        
            //Limpiamos campos
            var nomform=document.getElementById("formproducto3").id;
            LimpiarCampos(nomform);
            
        };
    };

}






function LimpiarCampos(formu){
    document.getElementById(formu).reset();
}


window.onload=init;
