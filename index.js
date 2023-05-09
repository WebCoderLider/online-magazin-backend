const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const {read_file, write_file} = require('./fs/fs')
const app = express()
app.use(express.json())
app.use(cors())

const products = read_file('products')

app.get('/', (req,res) =>{
    res.json(products)
})
app.post('/', (req,res) =>{
    const {img, title, body,} = req.body
    const product = {
        id: uuidv4(),
        img,
        title,
        body
    }
    products.push(product)
    write_file('products', products)
    res.json(product)
})
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        write_file('products', products);
        res.json(deletedProduct);
    } else {
        res.status(404).send("Product not found");
    }
});


app.listen(5000, console.log('server 8080 port da ishga tushdi'))