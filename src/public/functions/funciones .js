  
  
let clickProducto = document.querySelectorAll(".producto").forEach(producto=>{
  producto("click", function(){
  let idProducto = this.id;
  console.log(`prodcuto clickeado${idProducto}`)
  let EncontrarProducto = productos.find(p=> p.id == idProducto)
  if (EncontrarProducto) {
        let contenedorParticular = document.createElement("div");
        contenedorParticular.classList.add("expoProducto"); /*----------------------------------------------------------------------------------------------------------*/
        contenedorParticular.innerHTML=` 
                                        <div id="popup-${EncontrarProducto.id}" class="popup">
                                            <div class="popup-content">
                                                <p id="closePopup-${EncontrarProducto.id}" class="close">X</p>
                                                <div>
                                                    <img src="${EncontrarProducto.img}"/>
                                                    <h2>${EncontrarProducto.nombre}</h2>
                                                    <p>$${EncontrarProducto.precio}</p>
                                                </div>
                                                <div id="contador" class="contador">
                                                    <div>
                                                        <p id="cantProducto" class="cantProducto">0</p>
                                                        <div>
                                                            <button id="btnResta" >-</button>
                                                            <button id="btnSuma">+</button>
                                                        </div>
                                                        
                                                    </div>
        
                                                    <p id="totalPrecioProducto">$0</p>
                                                    <button id="btnAgregar">agregar al carrito<button>
                                                </div>
                                            </div>
                                        </div>
                                    `
        ;
        document.body.appendChild(contenedorParticular);
        console.log(`Popup added to body: popup-${EncontrarProducto.id}`) 
        
        const popup = document.getElementById(`popup-${EncontrarProducto.id}`);
        const closePopup = document.getElementById(`closePopup-${EncontrarProducto.id}`)
        
        console.log(closePopup)
        
        closePopup.addEventListener("click", ()=>{
        popup.style.display = 'none';
        contador = 0;
        precioProducto = `$${0}`;
        document.body.removeChild(contenedorParticular);
        
        
        })
        
        /*---------------------------------------------------------PopUP Producto individual parar comprar---------------------------------------------------------------------*/
        function ActualizarPrecioProducto(){
        const precio = document.getElementById("totalPrecioProducto").innerHTML = `$${precioProducto}`;
        
        }
        
        
        function actualizarContador(){
        document.getElementById("cantProducto").innerText = contador;
        }
        
        
        const btnSuma = document.getElementById("btnSuma");
        const btnResta = document.getElementById("btnResta");
        const btnAgregar = document.getElementById("btnAgregar");
        
        
         
        console.log(contador);
        
        
        
        btnResta.onclick = ()=>{
        contador --;
        precioProducto = EncontrarProducto.precio * contador;
        actualizarContador();
        ActualizarPrecioProducto()
        console.log(contador);
        
        }
        
        btnSuma.onclick = ()=>{
        contador ++;
        precioProducto = EncontrarProducto.precio * contador
        actualizarContador();
        ActualizarPrecioProducto() 
        console.log(contador);
        
        }
        
        
        btnAgregar.onclick = ()=>{
        let prodcutoSeleccionado = {
            id : EncontrarProducto.id,
            img : EncontrarProducto.img,
            nombre : EncontrarProducto.nombre,
            precio : EncontrarProducto.precio,
            precioTotal : precioProducto,
            unidades : contador
        };
        
        
        
        
        carrito.push(prodcutoSeleccionado);
        alert("Productos agregados")
        console.log(carrito);
        document.body.removeChild(contenedorParticular);
        
        }
  
    } else {
        alert("Producto no encontrado");
  
    }})
})
  
  
for (const categoria of categorias ) {
  let contenedorCategoria = document.createElement("ul");
  contenedorCategoria.classList.add("ListaCategorias");
  
  contenedorCategoria.innerHTML=` <li>
                          <p>${categoria.nombre}</p>
                      </li>`
  Subcategorias.appendChild(contenedorCategoria);
};
/*------------------------------------------------------------------------------------------------- carito de compras  ---------------*/
  
carritoCompras.addEventListener("click", function() {
  let contenedorCarrito = document.createElement("div");
  contenedorCarrito.innerHTML= `
                      <div id="popup" class="popupCarrito">
                          <div class="popup-content">
                              <p id="closeCarrito class="close">X</p>
                              <div>
                                  <ul class="listaCarrito" id="listaCarrito">
                                          
                                  </ul>
                              </div>
                              <div>
                                  <div class="totalCarrito" id="totalCarrito">
                                     
                                      <div>
                                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btnPagar"><img src="img/pago-movil (1).png" alt="$" width="30%">Pagar</button>
                                          <button type="button"><img src="img/x.png" alt="C" width="15%"> Cancelar</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                     `
  document.body.appendChild(contenedorCarrito);
  
  carrito.forEach(elementos =>{
  if (carrito.length == 0) {
  console.log("if1")
  window.alert("El carrito esta vacio seleccione elementos para comprar");
  
  } else {
  console.log("if2")
  let listaCarrito = document.getElementById("listaCarrito");
  let elementosEnLista = document.createElement("li");
  elementosEnLista.innerHTML= `
                              
                              <img src="${elementos.img}" alt="ImgProducto">
                                  <p>${elementos.nombre} x Cantidad de unidades: ${elementos.unidades}</p>
                                  <p>$${elementos.precio}</p>
                              </div>
                   `
  listaCarrito.appendChild(elementosEnLista); 
  }
  })
  let sumaPrecioTotal = carrito.reduce((total, elemento)=>total + elemento.precioTotal, 0)
  let totalCarrito = document.getElementById("totalCarrito");
  let contenedorTotal = document.createElement("div");
  contenedorTotal.innerHTML=`
                  <h2>TOTAL</h2>
                  <P>$${sumaPrecioTotal}</P>`
  totalCarrito.appendChild(contenedorTotal);
  
  let btnPagar = document.getElementById("btnPagar").addEventListener("click", function(){
  let contenedorFormPago = document.createElement("div");
  contenedorFormPago.innerHTML= `<div class="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h2 class="modal-title fs-5" id="exampleModalLabel">Informacion de Envio</h2>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <form class="row g-3">
                      <div class="col-md-6">
                          <label for="inputEmail4" class="form-label">Nombre</label>
                          <input type="email" class="form-control" id="inputEmail4">
                        </div>
                        <div class="col-md-6">
                          <label for="inputEmail4" class="form-label">Apellido</label>
                          <input type="email" class="form-control" id="inputEmail4">
                        </div>
                      <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" class="form-control" id="inputEmail4">
                      </div>
                      <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Numero de Telefono</label>
                        <input type="password" class="form-control" id="inputPassword4">
                      </div>
                      <div class="col-12">
                        <label for="inputAddress" class="form-label">Direccion</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Av. Libertador 2345">
                      </div>
                      <div class="col-12">
                        <label for="inputAddress2" class="form-label">Entre Calles</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Entre ... y ...">
                      </div>
                      <div class="col-md-6">
                        <label for="inputCity" class="form-label">Ciudad</label>
                        <input type="text" class="form-control" id="inputCity">
                      </div>
                      <div class="col-md-4">
                        <label for="inputState" class="form-label">Localidad</label>
                        <select id="inputState" class="form-select">
                          <option selected>Choose...</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div class="col-md-2">
                        <label for="inputZip" class="form-label">Codigo Postal</label>
                        <input type="text" class="form-control" id="inputZip">
                      </div>
  
                        <div class="col-md-4">
                          <label for="inputState" class="form-label">Seleccione Horario de Entrega</label>
                          <select id="inputState" class="form-select">
                            <option selected>07:00 - 09:00</option>
                            <option>09:00 - 11:00</option>
                            <option>11:00 - 13:00</option>
                            <option>13:00 - 16:00</option>
                          </select>
                        </div>
  
  
                      <div class="col-12">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck">
                          <label class="form-check-label" for="gridCheck">
                            Check Para confirmar la informacion
                          </label>
                        </div>
                      </div>
                    </form>
              </div>
  
              <div class="modal-header">
                  <h2 class="modal-title fs-5" id="exampleModalLabel">Informacion de Pago</h2>
              </div>
  
              <div class="modal-body">
                  <form class="row g-3">
                      <div class="col-md-6">
                          <label for="inputEmail4" class="form-label">Nombre del Titular</label>
                          <input type="email" class="form-control" id="inputEmail4">
                        </div>
                      <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Numero de Tarjeta</label>
                        <input type="password" class="form-control" id="inputPassword4">
                      </div>
                      <div class="col-md-2">
                        <label for="inputZip" class="form-label">CVV</label>
                        <input type="text" class="form-control" id="inputZip">
                      </div>
                      <div class="col-md-4">
                          <label for="inputState" class="form-label">Mes de Vencimiento</label>
                          <select id="inputState" class="form-select">
                            <option selected>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                          </select>
                      </div>
                      <div class="col-md-4">
                          <label for="inputState" class="form-label">Año de Vencimiento</label>
                          <select id="inputState" class="form-select">
                            <option selected>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                          </select>
                      </div>
              </div>
  
  
  
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <a href="/"><button type="button" class="btn btn-primary" data-bs-dismiss="modal">Confirmar Compra</button><a>  
              </div>
          </div>
      </div>
  </div>`
  document.body.appendChild(contenedorFormPago);
  })
  
  console.log("click")
  console.log(carrito);
  console.log(sumaPrecioTotal);
  })
  
  
  
  /*
  function agregarProduto(req){
    let nuevoProducto = {
      id,
      nombre,
      precio,
      descripcion,
      cantidadUnidades
    }
  
    productos.push(nuevoProducto);
  
  }
  
  
  function mostrarCategoria(categoria){
    let cat = categoria;
    let buscarCategoria = productos.find(p => p.categoria == cat);
    let categoriaSelec = []
    categoriaSelec.push(buscarCategoria);
    categoriaSelec.forEach(p=>{
      let constenedorElementos = document.createElement('div');
      constenedorElementos.classList.add("expoProducto");
      constenedorElementos.innerHTML= `
                                        <img src= ${p.img}>
                                        <h3>${p.nombre}</h3>
                                        <p>${p.descripcion}</p>
                                        <p>$${p.precio}</p>
                                        <div>
                                            <img src="img/me-gusta.png" class="meGusta"/>
                                            <img src="img/carrito-de-compras.png" />
                                        </div> 
                                                      `
    })
  }*/
  