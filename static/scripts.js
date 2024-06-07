document.getElementById('linkLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('cadastro-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
});

document.getElementById('linkCadastro').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('cadastro-form-container').style.display = 'block';
    document.getElementById('login-form-container').style.display = 'none';
});

document.getElementById('cadastro-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const lembrarSenha = document.getElementById('lembrar-senha').checked;
    const termosUso = document.getElementById('termos-uso').checked;

    if (!termosUso) {
        alert('Você deve concordar com os termos de uso.');
        return;
    }

    const data = {
        nome: nome,
        email: email,
        senha: senha,
        lembrar_senha: lembrarSenha
    };

    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Cadastro realizado com sucesso!');
            document.getElementById('cadastro-form-container').style.display = 'none';
            document.getElementById('login-form-container').style.display = 'block';
        } else {
            const result = await response.json();
            alert('Erro: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados. Tente novamente.');
    }
});

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const data = {
        email: email,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Login realizado com sucesso!');
            // Redirecionar ou fazer algo após o login bem-sucedido
        } else {
            const result = await response.json();
            alert('Erro: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados. Tente novamente.');
    }
});
