AOS.init();


document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita o comportamento padrão do link

        // Seleciona a seção correspondente ao link clicado
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Faz a rolagem suave para a seção com uma duração personalizada
        window.scrollTo({
            top: targetSection.offsetTop - 60, // Ajuste para compensar o menu fixo
            behavior: 'smooth'
        });
    });
});

async function enviarFormulario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
        // Substitua pela URL do seu backend no Render
        const response = await fetch('hhttps://empresa-jdj6.onrender.com/', {  // URL pública do seu backend no Render
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, telefone, mensagem })
        });

        const data = await response.json();
        alert(data.message);

        // Limpa os campos do formulário
        document.getElementById("nome").value = '';
        document.getElementById("email").value = '';
        document.getElementById("telefone").value = '';
        document.getElementById("mensagem").value = '';
    } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        alert("Erro ao enviar o formulário.");
    }
}
