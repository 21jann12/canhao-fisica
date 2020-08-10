 let cano = document.querySelector('#cano');
 let bola = document.querySelector('#bola');
 let tela = document.querySelector('#tela');

 const UP_CORNER = 7;
 const LEFT_CORNER = 8;
 const DOWN_LIMIT = 700;
 const RIGHT_LIMIT = 1499;
 const HIPOTENUSA = 65;


 const framerate = 120;
 let coord = {};
 let boca = true;
 let tempo = 0;
 
 tela.addEventListener('mousemove', event => {

 	let x = event.clientX - LEFT_CORNER;
 	let y = event.clientY - UP_CORNER;
 	let tg = (DOWN_LIMIT-50-y)/(x-35-LEFT_CORNER);
 	let arc = Math.atan(tg);

 	coord = {
 		x,
 		y,
 		tg,
 		arc
 	};
 });

 let xBola;
 let yBola;
 let velocidadeX;
 let velocidadeInicialY;

 function posicionaBola(boca) {

 	if(boca) {

 		yBola = (HIPOTENUSA-5)*Math.sin(coord.arc);
 		xBola = (HIPOTENUSA-5)*Math.cos(coord.arc);
 	}

 	else if(yBola > 0.5 && xBola < 1450) {

 		xBola += velocidadeX;
 		yBola += (velocidadeInicialY * (tempo/75)) - (5 * (tempo/75)**2);
 	}

 	bola.style.left = `${35+xBola-10}px`;
	bola.style.bottom = `${50+yBola-10}px`;
 }

 function posicionaCano() {

 	cano.style.transform = `rotate(-${coord.arc*180/Math.PI}deg)`;
 	cano.style.transformOrigin = `0px 12px`;
 }

 function lancarBola() {
 	tempo = 0;
 	boca = !boca;

 	velocidadeX = 10 * Math.cos(coord.arc);
 	velocidadeInicialY = 10 * Math.sin(coord.arc);
 }

 tela.addEventListener('click', lancarBola);

 function loop() {

 	posicionaBola(boca);
 	console.log(yBola)
 	posicionaCano();
 	tempo++;
 }

 window.setInterval(loop, 1000/framerate);