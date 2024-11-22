import React, { useState } from 'react';

const FormularioUsuario = () => {
    const [formulario, setFormulario] = useState({
        user: '',
        senha: '',
        email: '',
        logado: true
    });

    const lidarMudanca = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const lidarEnvio = (e) => {
        e.preventDefault();
        if (formulario.logado) {
            // Lógica de login
            console.log('Login:', formulario);
        } else {
            // Lógica de cadastro
            console.log('Cadastro:', formulario);
        }
    };

    const alternarFormulario = () => {
        setFormulario({
            ...formulario,
            logado: !formulario.logado
        });
    };

    return (
        <div>
            <h2>{formulario.logado ? 'Login' : 'Cadastro'}</h2>
            <form onSubmit={lidarEnvio}>
                <div>
                    <label>Usuário:</label>
                    <input
                        type="text"
                        name="user"
                        value={formulario.user}
                        onChange={lidarMudanca}
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        name="senha"
                        value={formulario.senha}
                        onChange={lidarMudanca}
                    />
                </div>
                {!formulario.logado && (
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formulario.email}
                            onChange={lidarMudanca}
                        />
                    </div>
                )}
                <button type="submit">{formulario.logado ? 'Login' : 'Cadastrar'}</button>
            </form>
            <button onClick={alternarFormulario}>
                {formulario.logado ? 'Ir para Cadastro' : 'Ir para Login'}
            </button>
        </div>
    );
};

export default FormularioUsuario;