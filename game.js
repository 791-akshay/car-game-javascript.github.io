const score=document.querySelector(".score");
const showMsg=document.querySelector(".showmsg");
const road=document.querySelector(".road");




let keys ={ArrowUp:false , ArrowDown:false , ArrowLeft:false , ArrowRight:false}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
showMsg.addEventListener('click', start);

function keyDown(e)
{
    e.preventDefault();
    keys[e.key]=true;
}
function keyUp(e)
{
    e.preventDefault();
    keys[e.key]=false;
}

let player = { speed : 5, score : 0 };


function collide(a,b)
{
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
    (aRect.right < bRect.left) || (aRect.left > bRect.right))
}


function moveLines()
{
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){
        if(item.y >= 650)
        {
            item.y -= 700;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame()
{
    player.start=false;
    showMsg.classList.remove('hide');
    showMsg.innerHTML = "Game Over <br> Your Score is ' " + " <b> " + player.score + " </b> " +
    " ' <br> Press here to restart the game..."
}


function moveAnimi(car)
{
    let animi = document.querySelectorAll('.animi');

    animi.forEach(function(item){
        if(collide(car,item))
        {
            console.log("hit");
            endGame();
        }

        if(item.y >= 650)
        { 
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 360 ) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function playGame()
{
    let car = document.querySelector('.car');
    let roads = road.getBoundingClientRect();
    if(player.start)
    {
        moveLines();
        moveAnimi(car);
        if(keys.ArrowUp && player.y > (roads.top + 90))
        {
            player.y = player.y - player.speed;
        }
        if(keys.ArrowDown && player.y < (roads.bottom - 75))
        {
            player.y = player.y + player.speed;
        }
        if(keys.ArrowLeft && player.x > 0)
        {
            player.x = player.x - player.speed;
        }
        if(keys.ArrowRight && player.x < (roads.width - 100))
        {
            player.x = player.x + player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(playGame);
        console.log(player.score++);

        player.score++;
        let ps = player.score - 2;
        score.innerHTML = "Score: <br>" + ps;
    }
}
function start()
{
    showMsg.classList.add('hide');
    road.innerHTML = " ";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(playGame);

    for(x=0; x < 6; x++)
    {
        let roadLine =document.createElement('div');
        roadLine.setAttribute('class' , 'lines');
        roadLine.y = (x * 140);
        roadLine.style.top = roadLine.y + 'px';
        road.appendChild(roadLine);
    }
    

    let car =document.createElement('div');
    car.setAttribute('class', 'car');
    road.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for(x=0; x < 3; x++)
    {
        let animiCar =document.createElement('div');
        animiCar.setAttribute('class' , 'animi');
        animiCar.y = ((x+1) * 350) * -1;
        animiCar.style.top = animiCar.y + 'px';
        animiCar.style.left = Math.floor(Math.random() * 350 ) + "px";
        road.appendChild(animiCar);
    }
}