
let GetID = document.querySelector(".productoENventa");
let lugarProducto = document.querySelector(".ArtExpuesto");
let Subcategorias = document.querySelector(".AsideCategoria");
let contador = 0;
let precioProducto= 0;
let habilitarBtn = true;
let cuerpoCarrito = document.querySelectorAll(".CuerpoCarrito");
let carritoCompras = document.getElementById("carrito");
let menuTiras = document.querySelector(".menuTiras")
let menuCategorias = document.querySelector(".menuCategorias");
const btnSuma = document.getElementById("btnSuma");
const btnResta = document.getElementById("btnResta");
const btnAgregar = document.getElementById("btnAgregar");



/* -----------------------------------------------------  deploy menu de barra  ------------------------------------------------- */

/*-------------------------------------------------------------- inner de los elementos --------------------------------------------------------------*/
async function mostrarProductos() {
  try { /*---------------------------------------------------fetch */
    const response = await fetch('api/productos');
    const productos = await response.json();

    for (const producto of productos) {
      let contenedorProducto = document.createElement("div");
      contenedorProducto.classList.add("producto");
      contenedorProducto.setAttribute("id", `${producto.id}`)
      
      contenedorProducto.innerHTML = `
                              <a href="/producto/${producto.id}">
                              <img src= ${producto.img}>
                              <h3>${producto.nombre}</h3>
                              <p>${producto.descripcion}</p>
                              <p>$${producto.precio}</p>
                              <a>
                              <div>
                                  <img src="img/me-gusta.png" class="meGusta"/>
                                  <img src="img/carrito-de-compras.png" />
                              </div> 
                             
                                                      `
                              
      lugarProducto.appendChild(contenedorProducto);
      }

  }catch{
    console.log("error mostrar todos los productos")
  }
}
mostrarProductos() /* --------------------------------------------------- llamar a la funcion para que se ejecute --------------------------------------------------------- */

/* inner categorias en menu */
async function mostrarMenuCategorias() {

  const response = await fetch('/api/categorias');
  const categorias = await response.json();
  
  for(cat of categorias){
    let listaCategorias = document.createElement('ul');
    listaCategorias.classList.add('UlMenuCategorias');
    listaCategorias.innerHTML=`
                                <a href="/categoria/${cat.nombre}"><li>${cat.nombre}</li></a>
                                `                          
    menuCategorias.appendChild(listaCategorias);
    }
  }
mostrarMenuCategorias()
  


// funcion del contador y push al carrito
// funcion que trae el carrito desde el storage
function obtenerCarrito() {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}

//funcion que guarde el carrito en el storage 
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

async function contadorProductos(productoID){
  try {
    let buscarProdcuto = productoID;
    console.log(buscarProdcuto)
    
    const response = await fetch('/api/productos')
    const productos = await response.json();



    let productoEncontrado = productos.find(p => p.id == buscarProdcuto);
    let precioTotalProduc = 0
    console.log(productoEncontrado);
    
    let modificadorContador = ()=>{
      document.getElementById('cantProducto').innerText = contador; //modifica la visual dentro del contador para mostrar cuantas unidades se estan seleccioando
      }
    let modificadorPrecio = ()=>{
      document.getElementById('totalPrecioProducto').innerText = `$${precioTotalProduc}`; //modifica la visual para ver cuanto es el total de lo que salen todas las unidades seleccionadas
    }

    btnResta.onclick=()=>{
      contador --;
      console.log(contador);
      precioTotalProduc = contador * productoEncontrado.precio;
      modificadorContador()
      modificadorPrecio()
      console.log(precioTotalProduc)
    }

    btnSuma.onclick=()=>{
      contador ++;
      console.log(contador);
      precioTotalProduc = contador * productoEncontrado.precio;
      modificadorContador()
      modificadorPrecio()
      console.log(precioTotalProduc)
    }
    btnAgregar.onclick=()=>{
      const carrito = obtenerCarrito();
      console.log(carrito)
      const productoEncontradoCarrito = carrito.find(p => p.id == productoEncontrado.id) 
      //incio primer if ----------------------------------------------------------------------------------------
      if (contador > 0) {
        
        //inicio segundo if ------------------------------------------------------------------------------------
        if (productoEncontradoCarrito) {
          console.log('el producto es ' + JSON.stringify(productoEncontradoCarrito));
          const posicion = carrito.indexOf(productoEncontradoCarrito);//me trae la posicion del producto con el ID que machea
          console.log(posicion)
          const productoRepetido = carrito[posicion] //me trae el elemento en la posicion especifica 
          console.log(productoRepetido)
          const producto_agregar ={
            id: productoRepetido.id,
            img: productoRepetido.img,
            nombre: productoRepetido.nombre,
            descripcion: productoRepetido.descripcion,
            precio_unitario : productoRepetido.precio,
            total_Unidades: productoRepetido.total_Unidades + contador,
            precioTotal: productoRepetido.precioTotal + precioTotalProduc
        
          }
          carrito[posicion] = producto_agregar // reemplaza el elemento del carrito en la posicion por el nuevo elemento
          console.log(producto_agregar);
          guardarCarrito(carrito)
          alert('prodcuto agregado')
        } else {
          console.log("el carrito no tienen este prodcuto")
               
          const producto_agregar = {
            id : productoEncontrado.id,
            img : productoEncontrado.img,
            nombre : productoEncontrado.nombre,
            descripcion : productoEncontrado.descripcion,
            precio_unitario : productoEncontrado.precio,
            total_Unidades : contador,
            precioTotal : precioTotalProduc
          }
              
          carrito.push(producto_agregar);
                    
          guardarCarrito(carrito)
          alert('prodcuto agregado')  
        }

      } else {
        alert("no selecciono cuantas unidades desea comprar")
      }

      
    }
  } catch (error) {
    alert(error)
  }
  
};


//mostrar carrito en la pagina

function mostrarCarrito(){
  const carrito = obtenerCarrito();
  let elementosCarrito = document.querySelector('.elementosCarrito')

  console.log();
  if (carrito.length == 0) {
    let contenedorProductoCarrito = document.createElement('div')
    contenedorProductoCarrito.classList.add('moduloProducto')
    contenedorProductoCarrito.innerHTML=` <div>
                                            <h2>no hay productos en el carrito, agregar para comprar</h2> <br>
                                            <a href="/productosMVendidos"><p>click aca para ver nuestros productos mas vendidos que podrian interesarte</p></a>
                                          
                                          </div> `
    elementosCarrito.appendChild(contenedorProductoCarrito); 
  } else {
    for (produc of carrito) {
    
      let contenedorProductoCarrito = document.createElement('div')
      contenedorProductoCarrito.classList.add('moduloProducto')
      contenedorProductoCarrito.innerHTML= `
                                            <div id=productoCarrito${produc.id} class="productoCarrito">
                                              <img src=/${produc.img}>
                                              <div>
                                                <div>
                                                  <h3>${produc.nombre}</h3>
                                                  <p>${produc.descripcion}</p>
                                                </div>
                                                <div>
                                                  <p>precio por uniad: $${produc.precio_unitario}</p>
                                                  <p>total de unidades: ${produc.total_Unidades}</p>
                                                  <p>total: $${produc.precioTotal}</p>
                                                </div> 
                                              </div>
                                              <div class="divX">
                                                <div>
                                                  <div>
                                                    <button id="btnResta">-</button>
                                                    <p id="cantProducto" class="cantProducto">${produc.total_Unidades}</p>
                                                    <button id="btnSuma">+</button>
                                                  </div>
                                                </div>   
                                              </div>                                         
                                            </div>                                          
                                            `
      elementosCarrito.appendChild(contenedorProductoCarrito); 
  
      document.getElementById('borrarCarrito').addEventListener('click', function() {
        localStorage.removeItem('carrito');
        alert('El carrito ha sido borrado.');
        location.reload();
      });
    }
  }
  
}
mostrarCarrito();

// borrar un elemento del localstorage, 1) llamar al local carrito, 2) buscar el elemento via id, 3) borrarlo, reemplazar el carrito por el nuevo.

function borrar1Elem (){
  
}