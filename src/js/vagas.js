document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://pridejob-api.onrender.com/api/vaga';
    const cardsContainer = document.getElementById('cards-container');
    const token = localStorage.getItem('token');

    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBtnIcon = mobileBtn.querySelector('i');

    if (token) {
        // Usuário está logado, modificar o botão de login
        const loginButton = document.querySelector('.btn-default');
        const mobileLoginButton = document.querySelector('#mobile-login-btn');
        loginButton.outerHTML = '<i class="fa-solid fa-circle-user" id="user-icon"></i>';
        mobileLoginButton.outerHTML = '<i class="fa-solid fa-circle-user" id="user-icon-mobile"></i>';
    }

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            mobileBtnIcon.classList.remove('fa-bars');
            mobileBtnIcon.classList.add('fa-x');
        } else {
            mobileBtnIcon.classList.remove('fa-x');
            mobileBtnIcon.classList.add('fa-bars');
        }
    });

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(vaga => {
                const card = createCard(vaga);
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar as vagas:', error);
        });
});

function createCard(vaga) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = 'src/img/img-cards-vagas.png';
    img.alt = vaga.nome;

    const title = document.createElement('h2');
    title.textContent = vaga.nome;

    const description = document.createElement('p');
    description.textContent = vaga.descricao;

    const location = document.createElement('p');
    location.className = 'location';
    location.textContent = `Localização: ${vaga.localizacao}`;

    const salary = document.createElement('p');
    salary.textContent = `Salário: R$ ${vaga.salario.toFixed(2)}`;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(location);
    card.appendChild(salary);
    card.appendChild(img);

    return card;
}