"use strict";

function test(){

    console.log("-------------------");
    console.log("Creamos los objetos");
    console.log("-------------------");

    //Objeto coords
    console.log("");
    console.log("Creamos un objeto Coords");
    console.log("-------------------");
    var cord1= new Coords(65.568975, -20.356842);
    console.log("Latitude: "+cord1.latitude);
    console.log("Longitude: "+cord1.longitude);
    console.log(cord1);

    //Objeto shop
    console.log("");
    console.log("Creamos un objeto shop");
    console.log("-------------------");
    var shop1= new Shop("Shop1");
    //Añadimos los valores a las propiedades
    shop1.cif=123;
    shop1.direccion="C/Monte";
    shop1.telefono="666333444";
    console.log("Nombre: "+shop1.name);
    console.log("CIF: "+shop1.cif);
    console.log("Direccion: "+shop1.direccion);
    console.log("Telefono: "+shop1.telefono);
    console.log(shop1);

    //Objeto Camera
    console.log("");
    console.log("Creamos un objeto Camera");
    console.log("-------------------");
    var cam1= new Camera("1274562", "Nikon", 300);
    //Añadimos los valores a las propiedades
    cam1.color="Red";
    cam1.description="Camara Nikon de 20mp";
    console.log("SerialNumber: "+cam1.SerialNumber);
    console.log("Name: "+cam1.name);
    console.log("Price: "+cam1.price);
    console.log("Color: "+cam1.color);
    console.log("Description: "+cam1.description);
    console.log(cam1);

    //Objeto Smartphone
    console.log("");
    console.log("Creamos un objeto SmartPhone");
    console.log("-------------------");
    var smart= new SmartPhone("1279862", "Samsung", 300, 8);
    //Añadimos los valores a las propiedades
    smart.description="Samsung Modelo 8 Color Negro";
    console.log("SerialNumber: "+smart.SerialNumber);
    console.log("Color: "+smart.color);
    console.log("Model: "+smart.model);
    console.log("Price: "+smart.price);
    console.log("Name: "+smart.name);
    console.log("Description: "+smart.description);
    console.log(smart);

    //Objeto Television
    console.log("");
    console.log("Creamos un objeto Television");
    console.log("-------------------");
    var tv= new Television("1277762", "Television1", 500, "PANASONIC", 50);
    //Añadimos los valores a las propiedades
    tv.description="Panasonic 50 pulgadas";
    console.log("SerialNumber: "+tv.SerialNumber);
    console.log("Marca: "+tv.marca);
    console.log("Pulgadas: "+tv.pulgadas);
    console.log("Price: "+tv.price);
    console.log("Name: "+tv.name);
    console.log("Description: "+tv.description);
    console.log(tv);

    //Objeto category
    console.log("");
    console.log("Creamos un objeto category");
    console.log("-------------------");
    var cat1= new Category("Tecnologia");
    //Añadimos los valores a las propiedades
    cat1.description="Categoria dedicada a la tecnologia";
    console.log("Title: "+cat1.title);
    console.log("Description: "+cat1.description);
    console.log(cat1.mostrar());
    console.log(cat1);

    //Objeto StoreHouse
    console.log("");
    console.log("Creamos un objeto StoreHouse");
    console.log("-------------------");
    var sh1= new StoreHouse.getInstance();
    console.log("Name: "+sh1.name);
    console.log(sh1);
    console.log("");

    //Añadimos y eliminamos al store house
    console.log("");
    console.log("--------------------------------");
    console.log("Añadir y eliminar del StoreHouse");
    console.log("--------------------------------");

    console.log("");
    console.log("Añadimos una categoria a StoreHouse(ya tenia antes la de por defecto)");
    console.log("-------------------");
    console.log("Longitud de category: "+sh1.addCategory(cat1));
    
    console.log("");
    console.log("Eliminamos una categoria a StoreHouse");
    console.log("-------------------");
    console.log("Longitud de category: "+sh1.removeCategory(cat1));

    console.log("");
    console.log("Añadimos una tienda a StoreHouse");
    console.log("-------------------");
    console.log("Longitud de shops: "+sh1.addShop(shop1));

    console.log("");
    console.log("Eliminamos una tienda a StoreHouse");
    console.log("-------------------");
    console.log("Longitud de shops: "+sh1.removeShop(shop1));

    console.log("");
    console.log("Añadimos un producto a StoreHouse");
    console.log("-------------------");
    console.log("Longitud de products: "+sh1.addProduct(smart, cat1));

    console.log("");
    console.log("Eliminamos un producto a StoreHouse");
    console.log("-------------------");
    console.log("Longitud de products: "+sh1.removeProduct(smart));

}


window.onload=test;