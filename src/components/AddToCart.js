import React from 'react';
import api from '../api';

   const AddToCart = ({ productId, onSuccess }) => {
     const handleAddToCart = () => {
       api.post(`/carrinhos/1/itens/${productId}`, { quantidade: 1 }).then(() => {
         onSuccess();
       });
     };

     return (
       <button
         className="bg-green-500 text-white py-1 px-2 rounded"
         onClick={handleAddToCart}
       >
         Adicionar ao Carrinho
       </button>
     );
   };

export default AddToCart;