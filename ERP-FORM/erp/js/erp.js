"use strict";


//Objeto StoreHouse

var StoreHouse=(function () {
    var instantiated;

    function init(){ //Singleton

        function StoreHouse(){
            //La funcion se invoca con el operador new
            if (!(this instanceof StoreHouse)) {
                throw new ExceptionAccesoInvalidoConstructor();
            }
           

            /*Atributo nombre*/
            var _name="Alm1";
            Object.defineProperty(this, 'name', {
                get:function(){
                    return _name;
                },
                set:function(name="alm1"){
                    if (name==='undefined') throw new ExceptionValorVacio("name");
                    _name=name;
                }
            });

            /*Array para guardar las categorias */
            var _categories=[];
            Object.defineProperty(this, 'categories', {
                get:function(){
                    var nextIndex=0;
                    return {
                        next: function(){
                            return nextIndex < _categories.length ?
                            {value: _categories[nextIndex++], done:false} :
                            {done: true};
                        }
                    }
                }
            });

            /*Array para guardar shops */
            var _shops=[];
            Object.defineProperty(this, 'shops', {
                get:function(){
                    var nextIndex=0;
                    return {
                        next: function(){
                            return nextIndex < _shops.length ?
                            {value: _shops[nextIndex++].shops, longitud: _shops.length, done:false} :
                            {done: true};
                        }
                    }
                }
            });

            /*Array para guardar products */
            var _products=[];
            Object.defineProperty(this, 'products', {
                get:function(){
                    var nextIndex=0;
                    return {
                        next: function(){
                            return nextIndex < _products.length ?
                            {value: _products[nextIndex++].products, longitud:_products.length, done:false} : //.products
                            {done: true};
                        }
                    }
                }
            });
            /*Array para guardar cantidad de productos */
            /*var _stock=[];
            Object.defineProperty(this, 'stock', {
                get:function(){
                    var nextIndex=0;
                    return {
                        next: function(){
                            return nextIndex < _stock.length ?
                            {value: _stock[nextIndex++], done:false} :
                            {done: true};
                        }
                    }
                }
            });*/

            /* Añadir categorias */
            this.addCategory=function(category){
                if (!(category instanceof Category)) {
                    throw new CategoryException();    
                }
                var pos=getCategoryPosition(category);
                if (pos===-1) {
                    _categories.push(category);
                }
                return _categories.length;
            }
            var DefaultCategory=new Category("PorDefecto");
            this.addCategory(DefaultCategory);

            this.removeCategory=function(category){
                if (!(category instanceof Category)) {
                    throw new CategoryException();    
                }
                var pos=getCategoryPosition(category);
                if (pos!==-1) {
                    if(category.title !== DefaultCategory.title){
                        _categories.splice(pos, 1);
                    }
                }

                return _categories.length;
            }

            //Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
			function getCategoryPosition(category){
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		

				function compareElements(element) {
				  return (element.title === category.title)
				}
				
				return _categories.findIndex(compareElements);		
            }
            
                    

            //Dado un producto, devuelve su posición en tienda
			function getProductPosition(product, shop){
				if (!(product instanceof Product)) { 
					throw new productException();
				}		

				function compareElements(element) {
				  return (element.product.SerialNumber === product.SerialNumber);
				}
				
				return shop.findIndex(compareElements);		
            }

            //Elimina un producto
            this.removeProduct=function(product){
                if (!(product instanceof Product)) { 
					throw new productException();
                }
                var i = _shops.length -1, position = -1;
                while (i >= 0 && position === -1){					
					position = getProductPosition(product, _shops[i].products); 
                    if (position !== -1){
                        _shops[i].products.splice(position, 1);
                        
                    }
                    position=-1;
                    i--;

                }
                return _shops.length;
                
            }

            //Sumar el stock
            
            this.addQuantityProductInShop = function(product,shop,stock){
                if (!(product instanceof Product)) { 
                    throw new productException();
                }	
                if (!(shop instanceof Shop)) { 
                    throw new shopException();
                }	
                var posShop=getShopPosition(shop);
                var position = getProductPosition(product, _shops[posShop].products); 	
                if (position !== -1){
                    _shops[posShop].products[position].stock+=stock;
                    /*_products.push(product);
                    _stock.push(quantity);*/
                }
            }

            //Añade producto a una categoria
            this.addCategoryProduct=function(product, category){
                if (!(product instanceof Product)) { 
					throw new productException();
				}
                if (!(category instanceof Category)) { 
					throw new CategoryException();
                }
                var categoryPosition = getCategoryPosition(category);

                var productPosition = getProductPosition(product);

                _products[productPosition].category.push(category);
                    
                return _products[productPosition].category.length;
            }

            //Añade producto a una tienda
            this.addProductInShop=function(product, shop, category){
               if (!(product instanceof Product)) { 
                    throw new productException();
                }
                if (!(shop instanceof Shop)) { 
                    throw new shopException();
                }

                if (!(category instanceof Category)) { 
					throw new CategoryException();
                }
                

                var shopPosition = getShopPosition(shop);

                var productPosition = getProductPosition(product, _shops[shopPosition].products);

                var categoryPosition=getCategoryPosition(category);


                _shops[shopPosition].products.push({
                    
                    product: product,
                    _categories: [category],
                    stock:0
                });

                /*_products.push({
                    product:product,
                });*/
  
                return _shops[shopPosition].products.length;
            }

            //Devuelve todos los productos de una categoria
			this.getCategoryProduct = function(category, shop){
                
                if (!(shop instanceof Shop)) { 
                    throw new shopException();
                }

                if (!(category instanceof Category)) { 
					throw new CategoryException();
                }
						
                var shopPosition=getShopPosition(shop); 
                	
				var nextIndex = 0;
                var nextCategory = 0;
                var totalCategories = 0;
                return {
                    next: function () {                      
                        if( nextIndex < _shops[shopPosition].products.length ){
                            if( _shops[shopPosition].products[nextIndex]._categories[nextCategory].title === category.title ){
                                nextCategory=0;
                                totalCategories = 0;
                                return { value: _shops[shopPosition].products[nextIndex++].product, done: false };
                            }else if(_shops[shopPosition].products[nextIndex]._categories.length <= ++totalCategories){
                                nextCategory=0;
                                totalCategories = 0;
                                nextIndex++;
                                return { value:'', done: false };
                            }else{
                                nextCategory++;
                                return { value:'', done: false };
                            }
                        }else {
                            return {done: true};
                        } 
                    }
            
                }
            }

            /* Añadir shop */
            this.addShop=function(shop){
                if (!(shop instanceof Shop)) {
                    throw new shopException();    
                }
                var pos=getShopPosition(shop);
                if (pos === -1) {
                    _shops.push({
                        shops: shop,
                        products:[]
                    });
                }
                return _shops.length;
            }

            //Eliminar shop
            this.removeShop=function(shop){
                if (!(shop instanceof Shop)) {
                    throw new shopException();    
                }
                var pos=getShopPosition(shop);
                if (pos!==-1) {
                    _shops.splice(pos, 1);
                }

                return _shops.length;
            }

            //Dada un shop me devuelve la posicion
            function getShopPosition(shop){
				if (!(shop instanceof Shop)) { 
					throw new shopException();
				}		

				function compareElements(element) {
				  return (element.shops.cif === shop.cif);
				}
				
				return _shops.findIndex(compareElements);		
            }

            //Devuelve todos los productos añadidos en una tienda con su stock.
            this.getShopProducts=function(shop){
                if (!(shop instanceof Shop)) { 
					throw new shopException();
                }
                var shopPosition=getShopPosition(shop);
                var nextIndex = 0;
			    return {
			       next: function(){
			           return nextIndex < _shops[shopPosition].products.length ?
			               {value: _shops[shopPosition].products[nextIndex++].product, done: false} :
			               {done: true};
			       }
			    }
            }
            
            this.getStockProduct = function (shop) {
                if(!(shop instanceof Shop)){
                    throw new shopException();
                }
                var shopPosition = getShopPosition(shop);
                
                var nextIndex = 0;
                return{
                    next: function () {
                        return nextIndex < _shops[shopPosition].products.length ?
                            { value: _shops[shopPosition].products[nextIndex++], done: false } :
                            { done: true };
                    }
                }
            }

            this.getStock = function (shop, product) {
                var shop = getShopPosition(shop);
                var esta = false;
                var i = 0;
                var stock = -1;
                while(!esta){
                    if(_shops[shop].products[i].product.SerialNumber === product.SerialNumber){
                        stock = _shops[shop].products[i].stock;
                        esta = true;
                }
                    i++;
                }
                return stock;
            }

            this.globalStock = function (product) {
                var shops = _shops.length;
                var cant = 0;
                var i = 0;
                while(i < shops){
                    var position = getProductPosition(product, _shops[i].products);
                    if(position !== -1){
                        cant += _shops[i].products[position].stock;
                    }
                    i++;
                }
                return cant;
            }
        }
        StoreHouse.prototype={};
        StoreHouse.prototype.constructor=StoreHouse;

        var store=new StoreHouse();
        Object.freeze(store);
        return store;
    }
    return{
        getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
    };
})();

//Objeto Category
function Category(title="PorDefecto"){
    if(!(this instanceof Category)){
        throw new ExceptionAccesoInvalidoConstructor();
    }
    
    var _title=title;
    var _description="";

    Object.defineProperty(this, 'title', {
        get:function(){
            return _title;
        },
        set: function(title="PorDefecto"){
           title=title.trim(); 
           if (title==='undefined') throw new ExceptionValorVacio("title");
           _title=title;
               
        }
    });

    Object.defineProperty(this, 'description', {
        get:function(){
            return _description;
        },
        set:function(value){
            if(value==='undefined')throw new ExceptionValorVacio("description");
            _description=value;
        }
    });

    Category.prototype.mostrar=function(){
        return this.title + " (" + this.description + ")"; 
    }
}
Category.prototype = {};
Category.prototype.constructor = Category;

//Clase abastracta objeto Product
(function(){
    var seguro=false;

    function Product(SerialNumber="", name="", price=0, images){
        if(!(this instanceof Product)){
            throw new ExceptionAccesoInvalidoConstructor();
        }

        if ((seguro)) {
            throw new ExceptionClaseAbastracta("Product");
        }

        var _SerialNumber=SerialNumber;
        var _name=name;
        var _description="";
        var _price=price;
        var _tax;
        var _images=images;

        Object.defineProperty(this, 'SerialNumber', {
            get:function(){
                return _SerialNumber;
            },
            set:function(value){
                if (value === 'undefined' || value === '') throw new EmptyValueException("SerialNumber");
                _SerialNumber = value;
            }		
        });
        
        Object.defineProperty(this, 'name', {
            get:function(){ 
                return _name;
            },
            set:function(value){
                if (value === 'undefined' || value === '') throw new EmptyValueException("name");
                _name = value;
            }		
        });
        
        Object.defineProperty(this, 'description', {
            get:function(){
                return _description;
            },
            set:function(value){
                if (value === 'undefined' || value === '') throw new EmptyValueException("description");
                _description = value;
            }		
        });
        
        Object.defineProperty(this, 'price', {
            get:function(){
                return _price;
            },
            set:function(value){
                if (value === 'undefined' || value === '') throw new EmptyValueException("price");
                _price = value;
            }		
        });

        Object.defineProperty(this, 'tax', {
            get:function(){
                return _tax;
            },
            set:function(value){
                if (value === 'undefined' || value === '') throw new EmptyValueException("tax");
                _tax = value;
            }		
        });

        
        Object.defineProperty(this, 'images', {
            get:function(){
                return _images;
            },
            set: function(ima){
                _images=ima;
            }
        });

    }
    Product.prototype={};
    Product.prototype.constructor=Product;
    Product.prototype.mostrar=function(){
        return "Product: " + this.name + " (" + this.description + ") "+this.price+" €"; 
    }

    //Objetos Heradados de Product
    //camara
    function Camera(SerialNumber="", name="", price=0, images, mp=20){

        //Desactivamos el seguro para la llamada al superconstructor
        seguro=false;
        Product.call(this, SerialNumber, name, price, images);
        

        //Atributos privados
        var _mp=mp;
        var _color="";

        Object.defineProperty(this, 'mp', {
            get:function(){
                return _mp;
            },
            set:function(value){
                value= typeof value !== 'undefined' ? value:0;
                if (value === 0) throw new ExceptionValorInvalido("mp", value);
                _mp = value;
            }		
        });
        Object.defineProperty(this, 'color', {
            get:function(){
                return _color;
            },
            set:function(value){
                if (value === 'undefined' || value === '') throw new EmptyValueException("color");
                _color = value;
            }		
        });
    }
    Camera.prototype=Object.create(Product.prototype);
    Camera.prototype.constructor=Camera;

    //SmartPhone
    function SmartPhone(SerialNumber="", name="", price=0, images, model=1, color="Black"){

        seguro=false;
        Product.call(this, SerialNumber, name, price, images);

        model= typeof model !== 'undefined' ? model : 0;
        if(model===0) throw new ExceptionValorInvalido("model", model);

        //Atributos privados

        var _model=model;
        var _color=color;

        Object.defineProperty(this, 'model', {
            get:function(){
                return _model;
            },
            set:function(value){
                value= typeof value !== 'undefined' ? value:0;
                if (value === 0) throw new ExceptionValorInvalido("model", value);
                _model = value;
            }		
        });

        Object.defineProperty(this, 'color', {
            get:function(){
                return _color;
            },
            set:function(value){
                if (value === 'undefined' || value === '') throw new EmptyValueException("color");
                _color = value;
            }		
        });
    }
    SmartPhone.prototype=Object.create(Product.prototype);
    SmartPhone.prototype.constructor=SmartPhone;

    //television
    function Television(SerialNumber="", name="", price=0, images, marca="LG", pulgadas=0){

        seguro=false;
        Product.call(this, SerialNumber, name, price, images);
        seguro=true;

        marca= typeof marca !== 'undefined' ? marca:"LG";
        if(!/^(LG|SAMSUNG|PANASONIC|SONY)$/.test(marca)) throw new ExceptionValorInvalido("marca", marca);

        var _marca=marca;
        var _pulgadas=pulgadas;

        Object.defineProperty(this, 'marca', {
            get:function(){
                return _marca;
            },
            set:function(value){
                value= typeof value !== 'undefined' ? value:"LG";
                if(!/^(LG|SAMSUNG|PANASONIC|SONY)$/.test(marca)) throw new ExceptionValorInvalido("marca", value);
                _marca = value;
            }		
        });

        Object.defineProperty(this, 'pulgadas', {
            get:function(){
                return _pulgadas;
            },
            set:function(value){
                value= typeof value !== 'undefined' ? value:0;
                if (value === 0) throw new ExceptionValorInvalido("pulgadas", value);
                _pulgadas = value;
            }		
        });
    }
    Television.prototype=Object.create(Product.prototype);
    Television.prototype.constructor=Television;

    Television.prototype.toString= function(){
        return this.constructor.name+" "+this._price+" "+this._marca;
    }

    //Devolvemos constructores
    window.Product=Product;
    window.Camera=Camera;
    window.SmartPhone=SmartPhone;
    window.Television=Television;
})();


//Objeto Coords
function Coords(latitude=0, longitude=0){
    if (!(this instanceof Coords)) {
        throw new ExceptionAccesoInvalidoConstructor();
    }

    var _latitude=latitude;
    var _longitude=longitude;

    Object.defineProperty(this, 'latitude',{
        get:function(){
            return _latitude;
        },
        set: function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("latitude");
			_latitude = value;
        }
    });

    Object.defineProperty(this, 'longitude',{
        get:function(){
            return _longitude;
        },
        set: function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("longitude");
			_longitude = value;
        }
    });
}
Coords.prototype={};
Coords.prototype.constructor=Coords;

//Objeto Shop
function Shop(cif,name){
    if (!(this instanceof Shop)) {
        throw new ExceptionAccesoInvalidoConstructor();
    }

    var _cif=cif;
    var _name=name;
    var _direccion;
    var _telefono;
    var _coordenadas=new Coords();

    Object.defineProperty(this, 'cif',{
        get:function(){
            return _cif;
        },
        set: function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("cif");
			_cif = value;
        }
    });

    Object.defineProperty(this, 'name',{
        get:function(){
            return _name;
        },
        set: function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("name");
			_name = value;
        }
    });

    Object.defineProperty(this, 'direccion',{
        get:function(){
            return _direccion;
        },
        set: function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("direccion");
			_direccion = value;
        }
    });

    Object.defineProperty(this, 'telefono',{
        get:function(){
            return _telefono;
        },
        set: function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("telefono");
			_telefono = value;
        }
    });
    Object.defineProperty(this, 'coordenadas',{
        get:function(){
            return _coordenadas;
        },
        set: function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("coordenadas");
			_coordenadas = value;
        }
    });

    Shop.prototype.mostrar=function(){
        return "CIF: "+this.cif+" Name: "+this.name; 
    }

    
}
Shop.prototype={};
Shop.prototype.constructor=Shop;







