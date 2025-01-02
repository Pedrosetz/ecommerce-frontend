import React, { useEffect, useState } from 'react';
   import api from '../api';

   const ProductList = ({ addToCart }) => {
     const [products, setProducts] = useState([]);

     useEffect(() => {
       api.get('/produtos').then((response) => {
         setProducts(response.data);
       });
     }, []);

     return (
       <div className="grid grid-cols-3 gap-4">
         {products.map((product) => (
           <div key={product.id} className="border p-4 rounded">
             <h2 className="text-lg font-bold">{product.nome}</h2>
             <p>Preço: {product.preco}</p>
             <button
               className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
               onClick={() => addToCart(product.id)}
             >
               Adicionar ao Carrinho
             </button>
           </div>
         ))}
       </div>
     );
   };

   export default ProductList;