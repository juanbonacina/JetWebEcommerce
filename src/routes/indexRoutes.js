import {json, Router} from 'express'
import fs from 'fs'
import {productos, carrito, categorias} from '../serverFunctions/SFunctions.js';
const router = Router();

router.get('/',(req, res)=> res.render('cliente/index'))
router.get('/productosMVendidos', (req, res)=> res.render('cliente/productosMVendidos'))
router.get('/admin/admin', (req, res)=>res.render('admin/admin'))
router.get('/carrito', (req, res)=>res.render('cliente/carrito'))
router.get('/admin/carga', (req, res)=>res.render('admin/carga'));
router.post('admin/carga', (req, res)=> {
    agregarProduto(req.body);
    console.log('elemento cargado')
})


/*----------------   paso de los arrays mediante solicitudes de rutas   -----------------------*/   
router.get('/api/productos', (req, res)=>{
    res.json(productos);
})

router.get('/api/categorias', (req, res)=>{
    res.json(categorias);
})

router.get('/api/carrito', (req, res)=>{
    res.json(carrito);
})

router.post('/api/carrito/agregar', (req, res)=>{
    const producto = req.body;
    carrito.push(producto);
    res.status(201).json({mensaje: 'Producto agregado al carrito', carrito})
})


router.get('/producto/:id', (req, res)=>{
    const {id} = req.params;
    const producto = productos.find(p => p.id == id);
    if (producto){
        res.render('cliente/productoVIew/productoSelec', {producto})
    } else {
        res.status(404).json({ error: 'Producto no encontrado$$$' }); 
    };
})


router.get('/categoria/:categoria', (req, res) => {
    let categoria = req.params.categoria;
    
    // Filtramos los productos según la categoría recibida en el parámetro
    let categoriaSelec = productos.filter(p => p.categoria === categoria);
    
    // Obtenemos la cantidad de productos seleccionados
    let cantidad = categoriaSelec.length;
    
    // Imprimimos la cantidad de productos seleccionados para depuración
    console.log(cantidad);
    
    // Verificamos si la categoría tiene productos (si el array no está vacío)
    if (cantidad > 0) {
        // Renderizamos la vista pasando la variable 'categoriaSeleccionada'
        res.render('cliente/categorias/categorias', { categoriaSelec });
    } else {
        // Si no hay productos, respondemos con un error 404
        res.status(404).json({ error: 'Categoría no encontrada o sin productos' });
    }
});


// ruta carrito

router.get('/carrito', (req, res)=>{
    res.render('cliente/carrito')
})

export default router;