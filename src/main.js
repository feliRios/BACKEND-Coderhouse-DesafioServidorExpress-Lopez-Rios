import express from 'express';

import { ProductManager } from './product_manager.js';

const pm = new ProductManager();

const app = express();

const PORT = 8080;

// Agregado de algunos productos de prueba

// (async () => {
//   try {
//     await pm.addProduct("Microondas", "Un microondas", 123, "imagen.com", 800, 5);
//     await pm.addProduct("TV", "Una TV", 456, "imagen.com", 801, 5);
//     await pm.addProduct("Pantalon", "Un lompa", 789, "imagen.com", 802, 5);
//     await pm.addProduct("Remera", "Una remera", 987, "imagen.com", 803, 5);
//     await pm.addProduct("Mouse wireless", "Un mouse inalambrico", 654, "imagen.com", 804, 5);
//     await pm.addProduct("Teclado mecanico", "Un teclado mecanico", 321, "imagen.com", 805, 5);
//   } catch(err) {
//     console.log("Hubo un error", err);
//   }
// })();


app.listen(PORT, () => {
  console.log("Server running on port", PORT);
})

app.get('/', (req, res) => {
  res.send(`<h1 style="background-color: #49c; text-align: center;">Bienvenido</h1>`);
})

app.get('/products', (req, res) => {
  // ENDPOINT que lee el archivo de productos 'products.json'
  let limit = req.query.limit;
  
  pm.getProducts()
    .then(prods => {
    
    if(!limit) {
      // Si no hay limite, devuelve todos los productos
      res.send(prods);
    } else {
      // Ternario para evitar que el usuario ingrese un limite mayor a la cantidad
      // de productos existentes, y evitar asi que se imprima NULL
      limit <= prods.length ? limit : limit = prods.length;

      let prodsToSend = [];
      for (let _ = 0; _ < limit; _++){
        prodsToSend.push(prods[_])
      }
      res.send(prodsToSend)
    }
    
  }).catch((err) => {
    res.send("Hubo un error al intentar traer los productos...");
    console.log(err);
  });
  
})

app.get('/products/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);

  pm.getProductById(pid)
    .then(prod => {
      res.send(prod || `No existe ningun producto con el id ${pid}`);
    })
    .catch(err => {
      console.log(err);
    })
})