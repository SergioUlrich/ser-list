"use strict";
var sh1;

var activ=document.getElementsByClassName("active");
activ[0].addEventListener("click", function(){
    location.reload(true);
});


function Objects(){
    //Creamos el StoreHouse
    sh1= new StoreHouse.getInstance();
    //Creamos categoria y la añadimos al storehouse
    var cat1=new Category("Camaras");
    sh1.addCategory(cat1);
    var cat2=new Category("Moviles");
    sh1.addCategory(cat2);
    var cat3=new Category("Televisiones");
    sh1.addCategory(cat3);

    //Creamos una tienda y la añadimos al storeHouse
    var shop1=new Shop(123 ,"Tienda 1");
    var shop2=new Shop(345 ,"Tienda 2");
    var shop3=new Shop(466 ,"Tienda 3");
    sh1.addShop(shop1);
    sh1.addShop(shop2);
    sh1.addShop(shop3);

    //Creamos productos
    var cam1= new Camera("1274562", "Nikon", 300, "imagen0.png");
    cam1.description="Camara Nikon de 15mp";
    var cam2= new Camera("9871234", "Canon", 650, "imagen1.png");
    cam2.description="Camara Canon con sensor CMOS APS-C de 18 MP";
    var smart= new SmartPhone("1279862", "Samsung", 300,"imagen2.png", 8);
    smart.description="Samsung Modelo 8 Color Negro";
    var smart2= new SmartPhone("4598127", "Iphone X", 1100, "imagen4.png", 10);
    smart2.description="Iphone X en blanco y negro con Super Retina Display";
    var tv= new Television("1277762", "Television Panasonic", 500, "imagen3.png", "PANASONIC", 50);
    tv.description="Panasonic 50 pulgadas";
    var tv2= new Television("1272352", "Television Samsung", 1890, "imagen5.png", "SAMSUNG", 55);
    tv2.description="Samsung 55 pulgadas Curved con panel de 10bit";
    
    //Añadir producto a una tienda
    sh1.addProductInShop(cam1, shop1, cat1); //tienda1
    sh1.addProductInShop(cam2, shop1, cat1); //tienda1
    sh1.addProductInShop(smart, shop1, cat2); //tienda1
    sh1.addProductInShop(tv, shop2, cat3); //tienda2
    sh1.addProductInShop(smart2, shop2, cat2); //tienda2
    sh1.addProductInShop(cam2, shop2, cat1); //tienda2
    sh1.addProductInShop(smart, shop3, cat2); //tienda3
    sh1.addProductInShop(cam1, shop3, cat1); //tienda3
    sh1.addProductInShop(tv2, shop3, cat3); //tienda3
    //Añañdir stock
    sh1.addQuantityProductInShop(cam1, shop1, 3);
    sh1.addQuantityProductInShop(cam2, shop1, 6);
    sh1.addQuantityProductInShop(smart, shop1, 1);
    sh1.addQuantityProductInShop(tv, shop2, 10);
    sh1.addQuantityProductInShop(smart2, shop2, 4);
    sh1.addQuantityProductInShop(cam2, shop2, 9);
    sh1.addQuantityProductInShop(smart, shop3, 11);
    sh1.addQuantityProductInShop(cam1, shop3, 3);
    sh1.addQuantityProductInShop(tv2, shop3, 4);
    
}

function init(){
    
    Objects();
    shopsMenusPopulate();
    cookForm();
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
    
        var shop=sh1.shops;
        var sho=shop.next();
        
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

function populate(){
   
    var main = document.getElementById("main");
    
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


    
    var iterableItem = sh1.products;
    var items = iterableItem.next();
    var i=1;
    while(!items.done){		
        var item = items.value;
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "col-sm-4");
        rowDiv.appendChild(colDiv);

        var thumbnailDiv = document.createElement("div");
        thumbnailDiv.setAttribute("class", "thumbnail");
        colDiv.appendChild(thumbnailDiv);
        
        
        var img = document.createElement("img");
        img.setAttribute("src", "imagenes/imagen"+i+".png");
        i++;
        img.setAttribute("alt", "col-sm-4");
        img.setAttribute("width", "400");
        img.setAttribute("height", "300");
        thumbnailDiv.appendChild(img);
        
        
        var p = document.createElement("p");
        var strong = document.createElement("strong");
        strong.appendChild(document.createTextNode(item.product.name));
        p.appendChild(strong)
        thumbnailDiv.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode(item.product.price + " €"));
        thumbnailDiv.appendChild(p);

        var button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.appendChild(document.createTextNode("Más información"));
        thumbnailDiv.appendChild(button);

        button.addEventListener("click",createFunctionShowItem(item))		

        console.log(item.product.mostrar());			
        items = iterableItem.next();		
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
    span.appendChild(document.createTextNode("Para Añadir: Introduce el CIF de la tienda. Para Modificar: Introduce un CIF ya existente"));
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
    span2.appendChild(document.createTextNode("Introduce el nombre de la tienda. Para eliminar es suficiente con rellenar este campo"));
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
    var button=document.createElement("button");
    button.setAttribute("id", "insertar");
    button.setAttribute("name", "insertar");
    button.setAttribute("class", "btn btn-success");
    button.setAttribute("type", "button");
    button.addEventListener("click", insertarCat);
    button.appendChild(document.createTextNode("Insertar"));
    div8.appendChild(button);
    var button2=document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("id", "eliminar");
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
    var direccion=document.getElementById("direccion").value;

    var tienda;
    
    var sho=sh1.shops;
    var item = sho.next();
    while (!item.done) {
        if(item.value.cif == cif){
            item.value.name=nombre;
            item.value.direccion=direccion;
            
            break;
        }else{
            tienda= new Shop(cif, nombre);
            tienda.direccion=direccion;
            sh1.addShop(tienda);
            
        }

        item= sho.next();
    }

    

    //Borrar el menu de tiendas para llamarlo despues
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


    //Limpiamos campos
    var nomform=document.getElementById("formtienda").id;
    LimpiarCampos(nomform);
}

function insertarCat(){

    //Borrar el menu de categorias
    try{
        var menucat=document.getElementById("MenuCat");
        if (menucat.hasChildNodes()) {
            while (menucat.childNodes.length>=1) {
                menucat.removeChild(menucat.firstChild);
            }
        }
    }catch(err){
        console.log("No existe el menu Categorias");
    }

    var nombre=document.getElementById("nombrecat").value;
    var descripcion=document.getElementById("descrip").value;

    var nombre= new Category(nombre);
    nombre.description=descripcion;
    sh1.addCategory(nombre);
    alert("Categoria creada");
    
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
}

function insertarPro1(){
    var nserie=document.getElementById("nserie").value;
    var nombre=document.getElementById("nombre").value;
    var precio=document.getElementById("precio").value;
    var shop=document.getElementById("shop").value;
    var categ=document.getElementById("cat").value;
    
    var cam= new Camera(nserie, nombre, precio, "1.jpg");


    var sho=sh1.shops;
    var item = sho.next();
    var cat=sh1.categories;
    var itemcat = cat.next();
    
    while (!item.done) {
        while(!itemcat.done){
            if(item.value.name == shop && itemcat.value.title == categ){

                sh1.addProductInShop(cam, item.value, itemcat.value);
                
                alert("Producto añadido a "+item.value.name+" con categoria de "+itemcat.value.title);
                
            }
            
            itemcat= cat.next();
        }
        item= sho.next();
        cat=sh1.categories;
        itemcat = cat.next();
    }
    
    //Limpiamos campos
    var nomform=document.getElementById("formproducto").id;
    LimpiarCampos(nomform);

}

function insertarPro2(){
    var nserie=document.getElementById("nseriesmart").value;
    var nombre=document.getElementById("nombresmart").value;
    var precio=document.getElementById("preciosmart").value;
    var model=document.getElementById("modelsmart").value;
    var shop=document.getElementById("shopsmart").value;
    var categ=document.getElementById("catsmart").value;
    

    var smart= new SmartPhone(nserie, nombre, precio, "2.jpg", model);


    var sho=sh1.shops;
    var item = sho.next();
    var cat=sh1.categories;
    var itemcat = cat.next();
    
    while (!item.done) {
        while(!itemcat.done){
            if(item.value.name == shop && itemcat.value.title == categ){
                sh1.addProductInShop(smart, item.value, itemcat.value);
                
                alert("Producto añadido a "+item.value.name+" con categoria de "+itemcat.value.title);
            }
            
            itemcat= cat.next();
        }
        item= sho.next();
        cat=sh1.categories;
        itemcat = cat.next();
    }
    

    //Limpiamos campos
    var nomform=document.getElementById("formproducto2").id;
    LimpiarCampos(nomform);

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
    

    var tele= new Television(nserie, nombre, precio, "3.jpg", marca, pulgadas);

    var sho=sh1.shops;
    var item = sho.next();
    var cat=sh1.categories;
    var itemcat = cat.next();

    while (!item.done) {
        while(!itemcat.done){
            if(item.value.name == shop && itemcat.value.title == categ){
                sh1.addProductInShop(tele, item.value, itemcat.value);
                
                alert("Producto añadido a "+item.value.name+" con categoria de "+itemcat.value.title);
               
            }
            
            itemcat= cat.next();
        }
        item= sho.next();
        cat=sh1.categories;
        itemcat = cat.next();
    }
    

    //Limpiamos campos
    var nomform=document.getElementById("formproducto3").id;
    LimpiarCampos(nomform);
}

function eliminarTienda(){
    var nombre=document.getElementById("nombre").value;

    var sho=sh1.shops;
    var item = sho.next();
    while (!item.done) {
        if(item.value.name == nombre){
            sh1.removeShop(item.value);
        }
        item= sho.next();

    }
    alert("Tienda eliminada");
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


    //Limpiamos campos
    var nomform=document.getElementById("formtienda").id;
    LimpiarCampos(nomform);
}

function eliminarCategoria(){
    var nombre=document.getElementById("nombrecat").value;

    
    var sho=sh1.categories;
    var item = sho.next();
    while (!item.done) {
        if(item.value.title == nombre){
            sh1.removeCategory(item.value);
        }
        item= sho.next();
    }
    alert("Categoria eliminada");
    
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
}

function eliminarPro1(){
    var nserie=document.getElementById("nserie").value;

    var sho=sh1.shops;
    var item = sho.next();

    while(!item.done){
        var itr = sh1.getShopProducts(item.value);
        var ite = itr.next();
        while(!ite.done){
            if (ite.value.SerialNumber==nserie) {
                sh1.removeProduct(ite.value);
                alert("Producto "+ite.value.name+" borrado");
                return true;
            }
            
            
            ite = itr.next();
        }

        item= sho.next();

    }
    
    //Limpiamos campos
    var nomform=document.getElementById("formproducto").id;
    LimpiarCampos(nomform);
}

function eliminarPro2(){
    var nserie=document.getElementById("nseriesmart").value;

    var sho=sh1.shops;
    var item = sho.next();

    while(!item.done){
        var itr = sh1.getShopProducts(item.value);
        var ite = itr.next();
        while(!ite.done){
            if (ite.value.SerialNumber==nserie) {
                sh1.removeProduct(ite.value);
                alert("Producto "+ite.value.name+" borrado");
                return true;
            }
            
            
            ite = itr.next();
        }

        item= sho.next();

    }
    
    //Limpiamos campos
    var nomform=document.getElementById("formproducto2").id;
    LimpiarCampos(nomform);
}

function eliminarPro3(){
    var nserie=document.getElementById("nserietele").value;

    var sho=sh1.shops;
    var item = sho.next();

    while(!item.done){
        var itr = sh1.getShopProducts(item.value);
        var ite = itr.next();
        while(!ite.done){
            if (ite.value.SerialNumber==nserie) {
                sh1.removeProduct(ite.value);
                alert("Producto "+ite.value.name+" borrado");
                return true;
            }
            
            
            ite = itr.next();
        }

        item= sho.next();

    }
    
    //Limpiamos campos
    var nomform=document.getElementById("formproducto3").id;
    LimpiarCampos(nomform);
}






function LimpiarCampos(formu){

    document.getElementById(formu).reset();

}

window.onload=init;
