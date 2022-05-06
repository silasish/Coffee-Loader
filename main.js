window.onerror = alert

function loadScript(url) {
  fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      eval(responseText)
    }).catch(function (err) {
      alert("Error: Script couldn't be downloaded.\n\n" + err)
    });
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("title-bar")) {
    document.getElementById("title-bar").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.body.insertAdjacentHTML("beforeend", `
  <div id="coffee-loader">
		<div id="title-bar">
			<span>Coffee V1.0.0</span>
			<span class="button">X</span>
		</div>
		<select id="select-menu">
		</select>
		<button id="load-button">Load</button>
	</div>
`)

let style = document.createElement("style")
style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

html, body {
	margin: 0;
}

#coffee-loader {
	top: 0;
	left: 0;
	font-family: 'Roboto Mono', monospace;
	text-align: center;
	position: absolute;
	width: 250px;
	height: 70px;
	background-color: #524237;
	opacity: 1;
	background: radial-gradient(circle, transparent 20%, #524237 20%, #524237 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #524237 20%, #524237 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#3d3129 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #3d3129 2px, #524237 2px) -1px 0;
	background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
	border-radius: 4px 4px 4px 4px;
	color: white;
	transition: all 1ms ease;
	overflow: hidden;
	z-index: 9999999;
}

#coffee-loader #title-bar {
	background: #3d3129;
	color: white;
	border-radius: 4px 4px 0px 0px;
	cursor: move;
	padding: 3px;
}

#coffee-loader button {
	background: #ff7d9d;
	color: white;
	font-family: 'Roboto Mono', monospace;
	border: none;
	border-radius: 4px;
	transition: all 250ms ease;
	text-shadow: 1px 1px 2px #ffc2d1;
}

#coffee-loader select {
	background: #ff7d9d;
	color: white;
	font-family: 'Roboto Mono', monospace;
	border: none;
	border-radius: 4px;
	transition: all 250ms ease;
	text-shadow: 1px 1px 2px #ffc2d1;
	margin-top: 10px;
	outline: none;
}

#coffee-loader select:focus {
	background: #f75c82;
	transform: translateY(2px);
}

#coffee-loader button:active {
	background: #f75c82;
	transform: translateY(2px);
}

#coffee-loader #title-bar .button {
	text-align: right;
	margin-left: 5px;
	cursor: pointer;
}
`
document.body.appendChild(style)

window.coffee = {
	element: document.getElementById("coffee-loader"),
	select: document.getElementById("coffee-loader").querySelector("select")
}

window.coffee.element.querySelector(".button").onclick = () => {
	window.coffee.element.remove()
}

window.coffee.element.querySelector("#load-button").onclick = () => {
		loadScript(window.coffee.select.value)
}

dragElement(window.coffee.element);

fetch("https://raw.githubusercontent.com/Silasssssss/SLoader/main/program_map.json", {cache: "no-store"})
  .then((response) => response.json())
  .then((responseJSON) => {
    responseJSON.programs.forEach(function (program) {
      let option = document.createElement("option")
      option.innerText = program.name
      option.value = program.url
      window.coffee.select.appendChild(option)
    })
});
