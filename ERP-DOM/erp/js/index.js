"use strict";
var sh1;

var activ=document.getElementsByClassName("active");
activ[0].addEventListener("click", function(){
    removeeChild();
    populate();
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
    var shop1=new Shop("Tienda1");
    sh1.addShop(shop1);
    var shop2=new Shop("Tienda2");
    sh1.addShop(shop2);
    var shop3=new Shop("Tienda3");
    sh1.addShop(shop3);
    //Creamos productos
    var cam1= new Camera("1274562", "Nikon", 300);
    cam1.description="Camara Nikon de 15mp";
    var cam2= new Camera("9871234", "Canon", 650);
    cam2.description="Camara Canon con sensor CMOS APS-C de 18 MP";
    var smart= new SmartPhone("1279862", "Samsung", 300, 8);
    smart.description="Samsung Modelo 8 Color Negro";
    var smart2= new SmartPhone("4598127", "Iphone X", 1100, 10);
    smart2.description="Iphone X en blanco y negro con Super Retina Display";
    var tv= new Television("1277762", "Television Panasonic", 500, "PANASONIC", 50);
    tv.description="Panasonic 50 pulgadas";
    var tv2= new Television("1272352", "Television Samsung", 1890, "SAMSUNG", 55);
    tv2.description="Samsung 55 pulgadas Curved con panel de 10bit";
    //Añadimos productos al StoreHouse 
    sh1.addProduct(cam1);
    sh1.addProduct(smart);
    sh1.addProduct(tv);
    sh1.addProduct(cam2);
    sh1.addProduct(smart2);
    sh1.addProduct(tv2);
    //Añadir producto a una tienda
    sh1.addProductInShop(cam1, shop1, 1); //tienda1
    sh1.addProductInShop(cam2, shop1, 1); //tienda1
    sh1.addProductInShop(smart, shop1, 1); //tienda1
    sh1.addProductInShop(tv2, shop2, 1); //tienda2
    sh1.addProductInShop(smart2, shop2, 1); //tienda2
    sh1.addProductInShop(cam2, shop2, 1); //tienda2
    sh1.addProductInShop(smart, shop3, 1); //tienda3
    sh1.addProductInShop(smart2, shop3, 1); //tienda3
    sh1.addProductInShop(tv2, shop3, 1); //tienda3
    //Añadir producto a una categoria
    sh1.addCategoryProduct(cam1, cat1);
    sh1.addCategoryProduct(cam2, cat1);
    sh1.addCategoryProduct(smart, cat2);
    sh1.addCategoryProduct(smart2, cat2);
    sh1.addCategoryProduct(tv, cat3);
    sh1.addCategoryProduct(tv2, cat3);

}

function init(){
    
    Objects();
    populate();
    menuCategoryShopPopulate();
    shopsMenusPopulate();
}

function productsCategoryShopPopulate(category){

    return function(){
        
        var main=document.getElementById("main");
        var divCab = document.createElement("div");
        divCab.setAttribute("id","cabecera");
        divCab.className = "row";
        main.appendChild(divCab);
    
        var h2Cab = document.createElement("h2");
        h2Cab.setAttribute("id","titleStore");
        h2Cab.className = "col-md-12 text-center";
        
        
        h2Cab.appendChild(document.createTextNode(sh1.categories.next().value.mostrar()));
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
    
        
        var iterableItem = sh1.categories;
        var items = iterableItem.next();
        var i=1;
        var product = sh1.products;
        var products = product.next();
        while(!items.done){		
        var item = items.value;
        var pro=products.value;
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
        strong.appendChild(document.createTextNode(sh1.categories.next().value.mostrar()));
        p.appendChild(strong)
        thumbnailDiv.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode(sh1.products.next().value.product.price + " €"));
        thumbnailDiv.appendChild(p);

        var button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.appendChild(document.createTextNode("Más información"));
        thumbnailDiv.appendChild(button);

        button.addEventListener("click",createFunctionShowItem(pro));		

        			
        items = iterableItem.next();		
    }
    };

}

function shopPopulate(shop){
    
    return function(){

      var main=document.getElementById("main");
      var divCab = document.createElement("div");
      divCab.setAttribute("id","cabecera");
      divCab.className = "row";
      main.appendChild(divCab);
  
      var h2Cab = document.createElement("h2");
      h2Cab.setAttribute("id","titleStore");
      h2Cab.className = "col-md-12 text-center";
      
      
      h2Cab.appendChild(document.createTextNode(sh1.shops.next().value.shop.name));
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

        button.addEventListener("click",createFunctionShowItem(item));		

        console.log(item.product.mostrar());			
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
    
        while (sho.done !== true){
            var li=document.createElement("li");
            var enlace1 = document.createElement("a");
            enlace1.setAttribute("class", "enlace");
            enlace1.setAttribute("href", "#");
    
            var txt=document.createTextNode(sho.value.shop.name);
            
            
            enlace1.appendChild(txt);
            li.appendChild(enlace1);
            
            menushop.appendChild(li);

            enlace1.setAttribute("onclick", "removeeChild()");
            
            enlace1.addEventListener("click",shopPopulate(sho.value.shop.name));

            sho = shop.next();
        }
}


function menuCategoryShopPopulate(){

    var menucat=document.getElementById("MenuCat");

    var cat=sh1.categories; 
    var category=cat.next();

    while (category.done !== true){
        var li=document.createElement("li");
        var enlace1 = document.createElement("a");
        enlace1.setAttribute("class", "enlacecat");
        enlace1.setAttribute("href", "#");

        var txt=document.createTextNode(category.value.mostrar());

        
        enlace1.appendChild(txt);
        li.appendChild(enlace1);
        
        menucat.appendChild(li);

        enlace1.setAttribute("onclick", "removeeChild()");

        enlace1.addEventListener("click",productsCategoryShopPopulate(category.value.mostrar()));
        
        category = cat.next();
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

function createFunctionShowItem(item){
    return function(){
        alert(item.product.mostrar());
        
        //Sacar modal
        /*var body=document.getElementById("main");
        var btn=document.getElementsByClassName("btn");
        var div=document.createElement("div");
        div.setAttribute("id", "modal");
        var modal=document.getElementById("modal");
        body.appendChild(div);
        btn.onclick = function() {
            modal.style.display = "block";
        }*/
    }
}



window.onload=init;