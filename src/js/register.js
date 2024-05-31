document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');


    function showLoader() {
        const loader = document.getElementById("loader");
        loader.style.display = 'block'; // Exibir o loader
    }

    function hideLoader() {
        const loader = document.getElementById("loader");
        loader.style.display = 'none'; // Ocultar o loader
    }

    function showModal() {
        const modal = document.getElementById("myModal");
        modal.style.display = "block"; // Exibe o modal
    }

    document.querySelector(".close").addEventListener("click", function() {
        document.getElementById("myModal").style.display = "none";
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        showLoader();

        const nome = document.getElementById('nome').value;
        const nomeSocial = document.getElementById('nomeSocial').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const cep = document.getElementById('cep').value;
        const senha = document.getElementById('senha').value;
        const confirmSenha = document.getElementById('confirmSenha').value;

        if (senha !== confirmSenha) {
            alert('As senhas não correspondem.');
            hideLoader();
            return;
        }

        const data = {
            nome: nome,
            nomeSocial: nomeSocial,
            cpf: cpf,
            dataNascimento: dataNascimento,
            cep: cep,
            telefone: telefone,
            email: email,
            senha: senha
        };
        

        try {
            const response = await fetch('https://pridejob-api.onrender.com/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                hideLoader();
                showModal();
                // Redirecione ou mostre uma mensagem de sucesso
            } else {
                const error = await response.json();
                console.error('Error:', error);
                // Mostre uma mensagem de erro para o usuário
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // Mostre uma mensagem de erro para o usuário
        }
    });
});