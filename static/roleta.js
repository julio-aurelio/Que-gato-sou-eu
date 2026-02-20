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
        img.style.display = "block";

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
                img.classList.add("final-cat");
                resultadoNome.textContent = `${nome}, esse gato é você 😹`;
            }
        }

        requestAnimationFrame(animar);
    }

});