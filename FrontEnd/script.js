document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Obrigado por entrar em contato! Em breve responderemos.");
  this.reset();
});

window.devicePixelRatio
// Which will return the figure 3

// Configuração base da API
const API_BASE_URL = 'http://localhost/barberagem-club/backend/api';

// Função para listar agendamentos
async function carregarAgendamentos() {
    try {
        const response = await axios.get(`${API_BASE_URL}/agendamentos.php`);
        const agendamentos = response.data;
        
        // Renderizar agendamentos na página
        const container = document.getElementById('agendamentos-lista');
        container.innerHTML = '';
        
        agendamentos.forEach(agendamento => {
            const div = document.createElement('div');
            div.className = 'agendamento-item';
            div.innerHTML = `
                <h3>${agendamento.cliente_nome}</h3>
                <p>Barbeiro: ${agendamento.nome_barbeiro}</p>
                <p>Serviço: ${agendamento.servico_nome}</p>
                <p>Data: ${agendamento.data_agendamento}</p>
                <p>Horário: ${agendamento.horario_inicio} - ${agendamento.horario_fim}</p>
                <p>Status: ${agendamento.status}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
}

// Função para criar novo agendamento
async function criarAgendamento(dados) {
    try {
        const response = await axios.post(`${API_BASE_URL}/agendamentos.php`, dados);
        if (response.data.success) {
            alert('Agendamento criado com sucesso!');
            carregarAgendamentos(); // Recarregar lista
        }
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        alert('Erro ao criar agendamento');
    }
}




function toggleMobileMenu() {
    // Cria um menu dropdown temporário
    let existingMenu = document.querySelector('.mobile-dropdown');
    if (existingMenu) {
        // Remove o menu se já existir
        existingMenu.remove();
    } else {
        // Cria o menu dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'mobile-dropdown';
        dropdown.innerHTML = `
            <a href="login.html">👤 ENTRAR</a>
            <a href="produtos.html">PRODUTOS</a>
            <a href="parceiros.html">PARCEIROS</a>
            <a href="https://wa.me/5528999354562" target="_blank">
                <img src="whatsapp.png" alt="WhatsApp" style="width: 20px; height: 20px; margin-right: 8px;">
                WhatsApp
            </a>
            <a href="https://www.instagram.com/barbeariabarberagem/?igsh=eHJ3Z2V5NjBoNG4x#" target="_blank">
                <img src="instagram.png" alt="Instagram" style="width: 20px; height: 20px; margin-right: 8px;">
                Instagram
            </a>
        `;

        // Adiciona estilos ao dropdown
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: linear-gradient(135deg, #2c1810, #8b4513);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
            min-width: 200px;
            margin-top: 10px;
        `;

        // Estiliza os links
        const links = dropdown.querySelectorAll('a');
        links.forEach(link => {
            link.style.cssText = `
                color: white;
                text-decoration: none;
                padding: 10px 15px;
                border-radius: 5px;
                transition: all 0.3s ease;
                font-weight: 600;
                text-align: left;
                display: flex;
                align-items: center;
                font-size: 14px;
            `;
            
            link.addEventListener('mouseenter', () => {
                link.style.backgroundColor = 'rgba(255,215,0,0.2)';
                link.style.color = '#ffd700';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.backgroundColor = 'transparent';
                link.style.color = 'white';
            });
        });

        // Adiciona o menu ao nav (garantindo que o nav tenha position relative)
        const nav = document.querySelector('nav');
        nav.style.position = 'relative';
        nav.appendChild(dropdown);

        // Remove o menu ao clicar fora
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!dropdown.contains(e.target) && !document.querySelector('.hamburger-menu').contains(e.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }
}