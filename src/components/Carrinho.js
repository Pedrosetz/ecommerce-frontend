import React, { useEffect, useState } from 'react';

const Carrinho = () => {
    const [carrinho, setCarrinho] = useState({ itens: [] });

    const fetchCarrinho = async () => {
        try {
            const response = await fetch("http://localhost:8080/carrinhos/1");
            const data = await response.json();
            setCarrinho(data);
        } catch (error) {
            console.error("Erro ao buscar o carrinho:", error);
        }
    };

    const atualizarQuantidade = async (itemId, novaQuantidade) => {
        try {
            await fetch(`http://localhost:8080/carrinhos/1/itens/${itemId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantidade: novaQuantidade }),
            });
            fetchCarrinho();
        } catch (error) {
            console.error("Erro ao atualizar a quantidade:", error);
        }
    };

    const removerItemDoCarrinho = async (itemId) => {
        try {
            await fetch(`http://localhost:8080/carrinhos/1/itens/${itemId}`, {
                method: "DELETE",
            });
            fetchCarrinho();
        } catch (error) {
            console.error("Erro ao remover item do carrinho:", error);
        }
    };

    useEffect(() => {
        fetchCarrinho();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
            {carrinho.itens && carrinho.itens.length > 0 ? (
                carrinho.itens.map((item, index) => (
                    <div key={index} className="mb-4 border-b pb-2">
                        <p><strong>Produto:</strong> {item.produto.nome}</p>
                        <p><strong>Descrição:</strong> {item.produto.descricao}</p>
                        <p><strong>Preço:</strong> R$ {item.produto.preco.toFixed(2)}</p>
                        <p><strong>Valor total:</strong> R$ {(item.produto.preco * item.quantidade).toFixed(2)}</p>
                        <div className="flex items-center space-x-2">
                            <p><strong>Quantidade:</strong></p>
                            <div className="flex items-center ml-1">
                                <button
                                    className="bg-gray-300 px-3 py-1 rounded"
                                    onClick={() =>
                                        atualizarQuantidade(item.id, Math.max(item.quantidade - 1, 1))
                                    }
                                >
                                    -
                                </button>
                                <p className="mx-2">{item.quantidade}</p>
                                <button
                                    className="bg-gray-300 px-3 py-1 rounded"
                                    onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                            onClick={() => removerItemDoCarrinho(item.id)}
                        >
                            Remover
                        </button>
                    </div>
                ))
            ) : (
                <p>O carrinho está vazio.</p>
            )}
        </div>
    );
};

export default Carrinho;




