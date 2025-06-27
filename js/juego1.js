function juego1() {
  const contenedor = document.getElementById('contenedor-juego');
  contenedor.innerHTML = \`
    <h2>Juego 1: Clasifica las palabras</h2>
    <p>Arrastra las palabras al bloque correspondiente (Mama Danza o Wawa Danza).</p>

    <div style="display: flex; gap: 30px;">
      <img src="./images/mama-danza.jpg" width="200" alt="Mama Danza" />
      <img src="./images/wawa-danza.jpg" width="200" alt="Wawa Danza" />
    </div>

    <div id="palabras" style="margin-top:20px;">
      \${
        ["Cushma", "Chumpi", "Sombrero blanco", "Pinkullu", "Bombo", "Huactana",
        "Pollerín", "Alfanje", "Cascabeles", "Chanta", "Bandas"]
        .map(palabra => \`<div class="draggable" draggable="true" ondragstart="drag(event)" id="\${palabra}">\${palabra}</div>\`).join("")
      }
    </div>

    <h3>Mama Danza</h3>
    <div class="dropzone" id="zona-mama" ondrop="drop(event)" ondragover="allowDrop(event)" data-zona="mama"></div>

    <h3>Wawa Danza</h3>
    <div class="dropzone" id="zona-wawa" ondrop="drop(event)" ondragover="allowDrop(event)" data-zona="wawa"></div>

    <br>
    <button onclick="verificarJuego1()">Verificar</button>
    <button onclick="juego1()">Reintentar</button>
  \`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

const mamaItems = ["Cushma", "Chumpi", "Sombrero blanco", "Pinkullu", "Bombo", "Huactana"];
const wawaItems = ["Chumpi", "Pollerín", "Alfanje", "Cascabeles", "Chanta", "Bandas"];

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  if (!ev.target.classList.contains("dropzone")) return;
  ev.target.appendChild(draggedElement);
}

function verificarJuego1() {
  const zonaMama = document.getElementById("zona-mama");
  const zonaWawa = document.getElementById("zona-wawa");

  const mamaWords = Array.from(zonaMama.children).map(el => el.innerText.trim());
  const wawaWords = Array.from(zonaWawa.children).map(el => el.innerText.trim());

  const mamaCorrect = mamaWords.every(w => mamaItems.includes(w));
  const wawaCorrect = wawaWords.every(w => wawaItems.includes(w));
  const mamaExtra = mamaWords.some(w => !mamaItems.includes(w));
  const wawaExtra = wawaWords.some(w => !wawaItems.includes(w));

  if (mamaCorrect && wawaCorrect && !mamaExtra && !wawaExtra) {
    document.getElementById('retroalimentacion').innerText =
      "¡Excelente! ¡Estás aprendiendo palabras en Kichwa!";
  } else {
    document.getElementById('retroalimentacion').innerText =
      "¡Inténtalo de nuevo! Revisa qué palabra va en cada personaje.";
  }
}