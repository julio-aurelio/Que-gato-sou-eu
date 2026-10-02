# 🎰 Roleta dos Gatos 😼

Digite seu nome, gire a roleta e descubra **qual gato você é**. As fotos vêm na hora da [The Cat API](https://thecatapi.com/), então cada sorteio é diferente.

🔗 **Acesse:** [que-gato-sou-eu.vercel.app](https://que-gato-sou-eu.vercel.app)

## Como funciona

1. Você digita seu nome e clica em **Roletar 😹**
2. O front chama a rota `/api/roleta` do back-end em Flask
3. O Flask busca 6 fotos aleatórias na The Cat API e devolve para a página
4. A imagem "gira" trocando entre as fotos até parar em uma: esse gato é você!

## Tecnologias

- **Python + Flask**: back-end e rota da API
- **Requests**: consumo da The Cat API
- **HTML, CSS e JavaScript**: interface, animação da roleta e `fetch`
- **Vercel**: hospedagem

O layout é responsivo e funciona no celular.

## Estrutura

```
├── app.py              # servidor Flask e rota /api/roleta
├── templates/
│   └── index.html      # página principal
├── static/
│   ├── style.css       # visual com efeito de vidro
│   ├── roleta.js       # chamada à API e animação da roleta
│   └── fundo.jpg
├── requirements.txt
└── vercel.json         # configuração do deploy
```

## Como rodar localmente

```bash
git clone https://github.com/julio-aurelio/roleta-dos-gatos.git
cd roleta-dos-gatos
python -m venv venv
venv\Scripts\activate        # no Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Depois abra `http://127.0.0.1:5000` no navegador.

---

Feito por **Julio Aurelio Souza** 😼
