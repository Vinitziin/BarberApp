import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Usuarios.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Função para buscar os dados dos usuários
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error("Houve um erro ao buscar os usuários:", error);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div className="usuarios-container">
            <h2>Usuários</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Função</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.role}</td>
                            <td>
                                <button>Editar</button>
                                <button>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
