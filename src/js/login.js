document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const passwordInput = form.querySelector('input[type="password"]');

        function showModal(token, username) {
            const modal = document.getElementById("myModal");
            const tokenSpan = document.getElementById("sessionToken");
            const userSpan = document.getElementById("username")
            userSpan.textContent = username;
            tokenSpan.textContent = token; // Define o token de sessão no modal
            modal.style.display = "block"; // Exibe o modal
        }

        document.querySelector(".close").addEventListener("click", function() {
            document.getElementById("myModal").style.display = "none";
        });

        const userData = {
            email: emailInput.value,
            senha: passwordInput.value
        };

        try {
            const response = await fetch('https://pridejob-api.onrender.com/api/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao fazer login');
            }

            const data = await response.json();
            console.log('Login bem-sucedido:', data);
            localStorage.setItem('token', data.jwt);
            const mockSessionToken = data.jwt;
            const mockUsername = data.nome;
            showModal(mockSessionToken, mockUsername);
        } catch (error) {
            console.error('Erro:', error.message);
        }
    });
});