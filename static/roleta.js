window.addEventListener("load", function () {

    const form = document.getElementById("formGato");
    const img = document.getElementById("imagemRoleta");
    const resultadoNome = document.getElementById("resultadoNome");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nome = document.getElementById("nomeInput").value;

        if (!nome) {
            alert("Digita o nome infeliz 😾");
            return;
        }

        resultadoNome.textContent = "";
        img.style.display = "block";
        img.src = "";
        img.classList.add("girando");

        try {
            const resposta = await fetch("https://api.thecatapi.com/v1/images/search?limit=6");
            const dados = await resposta.json();

            const imagens = dados.map(g => g.url);

            iniciarRoleta(imagens, nome);

        } catch (erro) {
            alert("Erro ao buscar gatos 😿");
        }
    });

    function iniciarRoleta(imagens, nome) {

        let inicio = null;
        const duracao = 2000;
        const totalImagens = imagens.length;

        function animar(timestamp) {

            if (!inicio) inicio = timestamp;

            let progresso = timestamp - inicio;
            let porcentagem = progresso / duracao;
            if (porcentagem > 1) porcentagem = 1;

            let easeOut = 1 - Math.pow(1 - porcentagem, 3);
            let index = Math.floor(easeOut * totalImagens);

            if (index >= totalImagens) {
                index = totalImagens - 1;
            }

            img.src = imagens[index];

            if (porcentagem < 1) {
                requestAnimationFrame(animar);
            } else {
                finalizar();
            }
        }

        function finalizar() {
            img.classList.remove("girando");
            img.classList.add("final-cat");

            setTimeout(() => {
                resultadoNome.textContent = `${nome}, esse gato é você 😹`;
            }, 300);
        }

        requestAnimationFrame(animar);
    }

});