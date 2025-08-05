// MainScene.js

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    // Texto inicial para instrução
    this.add.text(100, 100, "Digite seu nome para começar a aventura:", {
      font: "20px Arial",
      fill: "#ffffff",
      wordWrap: { width: 600 }
    });

    // Campo de entrada HTML para nome
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Digite seu nome...";
    input.style.position = "absolute";
    input.style.top = "160px";
    input.style.left = "calc(50% - 100px)";
    input.style.width = "200px";
    input.id = "nomeInput";
    document.body.appendChild(input);

    // Botão iniciar
    const botao = document.createElement("button");
    botao.type = "button";
    botao.innerText = "Iniciar Aventura";
    botao.style.position = "absolute";
    botao.style.top = "200px";
    botao.style.left = "calc(50% - 80px)";
    botao.id = "startButton";
    document.body.appendChild(botao);

    // Texto para exibir a história gerada
    this.historiaText = this.add.text(100, 260, "", {
      font: "16px Arial",
      fill: "#ffffff",
      wordWrap: { width: 600 }
    });

    botao.onclick = async () => {
      const nome = input.value.trim();
      if (!nome) return;

      const apiUrl = "https://cors-anywhere.herokuapp.com/https://gogmabog.app.n8n.cloud/webhook/jogos";

      try {
        // Envia o nome e já recebe a história na resposta
        const response = await axios.post(apiUrl, { nickname: nome }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          }
        });
    
        const historia = response.data[0]?.dados?.historia || "História não carregada.";
        this.historiaText.setText(historia);

        // Remove inputs após envio
        input.remove();
        botao.remove();

        // Botão para seguir para próxima cena
        const btnContinuar = this.add.text(300, 550, "→ Iniciar Jogo", {
          font: "20px Arial",
          fill: "#00ff00"
        }).setInteractive();

        btnContinuar.on("pointerdown", () => {
          this.scene.start("CityScene");
        });

      } catch (error) {
        console.error("Erro ao carregar história:", error);
        this.historiaText.setText("Erro ao carregar história.");
      }
    };
  }

  shutdown() {
    // Limpeza dos elementos HTML, se a cena for trocada
    document.getElementById("nomeInput")?.remove();
    document.getElementById("startButton")?.remove();
  }
}

