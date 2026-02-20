window.addEventListener("load", function () {

    const form = document.getElementById("formGato");
    const img = document.getElementById("imagemRoleta");
    const resultadoNome = document.getElementById("resultadoNome");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nome = document.getElementById("nomeInput").value;

        if (!nome) {
            alert("Digite um nome 😾");
            return;
        }

        resultadoNome.textContent = "";
        img.style.opacity = "1";

        try {
            const resposta = await fetch("/api/roleta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome })
            });

            const dados = await resposta.json();

            if (dados.erro) {
                alert(dados.erro);
                return;
            }

            iniciarRoleta(dados.imagens, dados.nome);

        } catch (erro) {
            alert("Erro no servidor 😿");
        }
    });

    async function iniciarRoleta(imagens, nome) {

        img.classList.remove("final-cat");
        img.classList.add("girando");

        let imagensPreCarregadas = [];

        // Começa animação fake imediata
        let intervalo = setInterval(() => {
            img.src = imagens[Math.floor(Math.random() * imagens.length)];
        }, 100);

        await Promise.all(
            imagens.map(url => {
                return new Promise((resolve) => {
                    const novaImg = new Image();
                    novaImg.src = url;
                    novaImg.onload = () => resolve(novaImg);
                    imagensPreCarregadas.push(novaImg);
                });
            })
        );

        // Para a rotação fake
        clearInterval(intervalo);

        // Escolhe imagem final
        const imagemFinal = imagensPreCarregadas[Math.floor(Math.random() * imagensPreCarregadas.length)];

        img.src = imagemFinal.src;

        img.classList.remove("girando");
        img.classList.add("final-cat");

        resultadoNome.textContent = `${nome}, esse gato é você 😹`;
    }

});