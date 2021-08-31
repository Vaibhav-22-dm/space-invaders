document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    let width = 15
    let currentShooterIndex = 202 //Stores the position of the Shooter
    let currentInvaderIndex = 0 //Stores the positon of invader
    let alienInvadersTakenDown = []
    let result = 0
    let direction = 1
    let invaderId

    //define the initial position of alien invaders inside the grid
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15,16,17,18,19,20,21,22,23,24, 
        30,31,32,33,34,35,36,37,38,39
    ]

    //draw the alien alienInvaders  by adding the class 'invaders' to all the squares having position which is included in 'alienInvaders' array.
    alienInvaders.forEach(invader => {
        squares[currentInvaderIndex + invader].classList.add('invader')
    })
    
    squares[currentShooterIndex].classList.add('shooter')
    squares[currentShooterIndex].innerHTML = `<i class="fas fa-space-shuttle"></i>`

    //Function to move the shooter
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        squares[currentShooterIndex].innerHTML = ``
        switch(e.keyCode){
            case 37:
                if(currentShooterIndex%width !== 0) currentShooterIndex -= 1
                break
            case 39:
                if(currentShooterIndex%width < width - 1) currentShooterIndex += 1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
        squares[currentShooterIndex].innerHTML = `<i class="fas fa-space-shuttle"></i>`
        
    }
    document.addEventListener('keydown', moveShooter)
    
    function screenmoveShooter(key) {
        squares[currentShooterIndex].classList.remove('shooter')
        squares[currentShooterIndex].innerHTML = ``
        switch(key){
            case 37:
                if(currentShooterIndex%width !== 0) currentShooterIndex -= 1
                break
            case 39:
                if(currentShooterIndex%width < width - 1) currentShooterIndex += 1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
        squares[currentShooterIndex].innerHTML = `<i class="fas fa-space-shuttle"></i>`
        
    }
    
    document.querySelector('#left').addEventListener('click', () => {screenmoveShooter(37)})
    document.querySelector('#right').addEventListener('click', () => {screenmoveShooter(39)})
    document.querySelector('#refresh').addEventListener('click', () => {
        window.location.reload()
    })

    //Function to move the Invaders
    function moveInvaders(){
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
            direction = width
        } else if(direction === width){
            if (leftEdge) direction = 1
            else direction = -1
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++){
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for (let i = 0; i <= alienInvaders.length  -1 ; i++){
            alienInvaders[i] += direction
        }
        for (let i = 0; i <= alienInvaders.length  -1 ; i++){
            if(!alienInvadersTakenDown.includes(i)){
                squares[alienInvaders[i]].classList.add('invader')
            }
        }

        //decide a game is over
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')){
            resultDisplay.textContent = 'Game Over'
            squares[currentShooterIndex].classList.add('boom')
            clearInterval(invaderId)
        }

        for (let i = 0; i < alienInvaders.length - 1; i++){
            if(alienInvaders[i] > (squares.length - (width - 1))){
                resultDisplay.textContent = 'Game Over'
                clearInterval(invaderId)
            }
        }

        //decide a winner
        if(alienInvadersTakenDown.length === alienInvaders.length){
            resultDisplay.textContent ='You Win'
            squares[currentShooterIndex].innerHTML = `<i class="fas fa-space-shuttle"></i>`
            clearInterval('invaderId')
        }
    }

    invaderId = setInterval(moveInvaders, 500)
    
    

    //Function to shoot at alienInvaders
    function shoot(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex
        //move the laser from the shooter to the alien Invader
        function moveLaser(){
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].innerHTML = ''
            squares[currentShooterIndex].innerHTML = `<i class="fas fa-space-shuttle"></i>`
            
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            squares[currentLaserIndex].innerHTML = '<i class="fas fa-fire" style="color: orange; font-size: 25px;"></i>'
            if(squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].innerHTML = ''
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
                clearInterval(laserId)

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersTakenDown.push(alienTakenDown)
                result++
                resultDisplay.textContent = result
            }
            if(currentLaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => {
                    squares[currentLaserIndex].classList.remove('laser');
                    squares[currentLaserIndex].innerHTML = ''
                }, 100)
            }
        }
        
        switch(e.keyCode){
            case 32:
                laserId = setInterval(moveLaser, 100)
                break
            
        }
    }
    document.addEventListener('keyup', shoot)
    
    function screenshoot(key) {
        let laserId
        let currentLaserIndex = currentShooterIndex
        //move the laser from the shooter to the alien Invader
        function moveLaser(){
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].innerHTML = ''
            squares[currentShooterIndex].innerHTML = `<i class="fas fa-space-shuttle"></i>`
            
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            squares[currentLaserIndex].innerHTML = '<i class="fas fa-fire" style="color: orange; font-size: 25px;"></i>'
            if(squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].innerHTML = ''
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
                clearInterval(laserId)

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersTakenDown.push(alienTakenDown)
                result++
                resultDisplay.textContent = result
            }
            if(currentLaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => {
                    squares[currentLaserIndex].classList.remove('laser');
                    squares[currentLaserIndex].innerHTML = ''
                }, 100)
            }
        }
        
        switch(key){
            case 32:
                laserId = setInterval(moveLaser, 100)
                break
            
        }
    }
    document.querySelector('#fire').addEventListener('click', () => {screenshoot(32)})
})