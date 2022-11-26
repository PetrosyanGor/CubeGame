//selectors

const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $gameTime = document.querySelector('#game-time');

let color = ['tomato','orange','pink','red'];
let count = 0;  

//events

$start.addEventListener('click',startGame);
$gameTime.addEventListener('change',gameTimer);
$game.addEventListener('click',clickOnBox);

//funcs

function startGame(){
  $result.innerText = '';
  count = 0;
  hide($start);
  $game.style.background = 'white';
  $gameTime.setAttribute('disabled','true');
  const interval = setInterval(()=>{
    let time = $time.innerText;
    if(time <= 0){
      clearInterval(interval);
      endGame();
    }else{
      $time.innerText = (time - 0.1).toFixed(1);
    }
  },100)    
  creatBox();
}

function creatBox(){
  $game.innerHTML = '';

  let {width,height} = $game.getBoundingClientRect();
  let boxsize = random(30,100);
  let maxTop = height - boxsize;
  let maxLeft = width - boxsize;
  let colorIndex = random(0,color.length);

  let box = document.createElement('div');
  box.style.position = 'absolute';
  box.style.top = random(0,maxTop) + 'px';
  box.style.left = random(0,maxLeft) + 'px';
  box.style.width = box.style.height = boxsize + 'px';
  box.style.background = color[colorIndex];

  box.setAttribute('data-box','true');
  $game.appendChild(box);
  
}

function clickOnBox(e){
  if(e.target.dataset.box){
    creatBox();
    count++;
    $result.innerText = count;
  }
}

function gameTimer(){
  $time.innerText = Number($gameTime.value).toFixed(1);
}

function endGame(){
  $game.innerHTML = ''
  show($start);
  $time.innerText = Number($gameTime.value).toFixed(1);
  $result.innerText = count;
  $game.style.background = 'gray';
  $gameTime.removeAttribute('disabled');
}

function show($el){
  $el.classList.remove('hide');
}

function hide($el){
  $el.classList.add('hide');
}

function random(min,max){
  return Math.floor(Math.random() * (max - min) + min)
}