import React, { useState, useEffect } from "react";
import axios from "axios";
import Carrinho from "./components/Carrinho";

const App = () => {
    const [carrinho, setCarrinho] = useState(null);

    const fetchCarrinho = async () => {
        try {
            const response = await axios.get("http://localhost:8080/carrinhos/1");
            setCarrinho(response.data);
        } catch (error) {
            console.error("Erro ao buscar o carrinho:", error);
        }
    };

    useEffect(() => {
        fetchCarrinho();
    }, []);

    return (
        <div>
            {carrinho ? (
                <Carrinho carrinho={carrinho} atualizarCarrinho={fetchCarrinho} />
            ) : (
                <p>Carregando carrinho...</p>
            )}
        </div>
    );
};

export default App;
