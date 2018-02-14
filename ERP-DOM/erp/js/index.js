"use strict";
var sh1;

//Al dar al boton inicio
var activ=document.getElementsByClassName("active");
activ[0].addEventListener("click", function(){
    //removeeChild();
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
      var i=0;
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
        i++;
        img.setAttribute("alt", "col-sm-4");
        img.setAttribute("width", "400");
        img.setAttribute("height", "300");
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

//Elimina los hijos a partir del main
function removeeChild(){
    var main=document.getElementById("main");

    if (main.hasChildNodes()) {
        while (main.childNodes.length>=1) {
            main.removeChild(main.firstChild);
        }
    }
}

//Crea el menu de las tiendas y el contenido principal
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

/*function populate(){
   
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
}*/


//Muestra el contenido de un producto en una tienda
function createFunctionShowItem(item, shop){
    return function(){
        //alert(item.mostrar());
        removeeChild();
        var stock=sh1.getStock(shop, item);
        var globalst=sh1.globalStock(item);
        //      console.log(item.images);

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


window.onload=init;