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
      botao.innerText = "Iniciar Aventura";
      botao.style.position = "absolute";
      botao.style.top = "200px";
      botao.style.left = "calc(50% - 100px)";
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
  
        // POST: Enviar nome do jogador
        await fetch("https://SEU_WEBHOOK_POST/webhook/nome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome })
        });
  
        // GET: Buscar história gerada
        const resposta = await fetch("https://SEU_WEBHOOK_GET/webhook/historia");
        const json = await resposta.json();
  
        this.historiaText.setText(json.historia || "História não carregada.");
  
        // Remover inputs após envio
        input.remove();
        botao.remove();
  
        // Botão para seguir para a próxima cena
        const btnContinuar = this.add.text(300, 550, "→ Iniciar Jogo", {
          font: "20px Arial",
          fill: "#00ff00"
        }).setInteractive();
  
        btnContinuar.on("pointerdown", () => {
          this.scene.start("CityScene");
        });
      };
    }
  
    shutdown() {
      // Limpeza dos elementos HTML, se a cena for trocada
      document.getElementById("nomeInput")?.remove();
      document.getElementById("startButton")?.remove();
    }
  }
  