window.addEventListener("load", function () {

    if (typeof IMAGENS === "undefined") return;

    const imagens = IMAGENS;
    const nome = NOME;

    const img = document.getElementById("imagemRoleta");
    const resultadoNome = document.getElementById("resultadoNome");

    img.style.display = "block";

    let imagensPreCarregadas = [];
    let carregadas = 0;

    imagens.forEach((url) => {
        const novaImg = new Image();
        novaImg.src = url;
        novaImg.onload = () => {
            carregadas++;
            if (carregadas === imagens.length) {
                iniciarRoleta();
            }
        };
        imagensPreCarregadas.push(novaImg);
    });

    function iniciarRoleta() {

        img.classList.add("girando");

        let inicio = null;
        const duracao = 2000;
        const totalImagens = imagensPreCarregadas.length;

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

            img.src = imagensPreCarregadas[index].src;

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