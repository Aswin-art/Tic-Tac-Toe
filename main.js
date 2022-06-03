
// Elements
const tiles = document.querySelectorAll('.tile')
const strike = document.querySelector('.strike')
const modalResult = document.getElementById('modal-result')
const result = document.getElementById('result')
const restart = document.getElementById('btn-restart')

// Player
const PLAYER_X = 'X'
const PLAYER_O = 'O'
let turn = PLAYER_X

// Board
const boardState = Array(tiles.length)
boardState.fill(null)

// Sounds
const gameOverSound = new Audio('./sounds/sounds_game_over.wav')
const clickSound = new Audio('./sounds/sounds_click.wav')

// Events
tiles.forEach(tile => {
    tile.addEventListener('click', tileClick)
})

tiles.forEach(tile => {
    tile.addEventListener('mouseover', setHover)
})

restart.addEventListener('click', startNewGame)

// Winning condition
const winningCombinations = [
    // Rows
    {
        combo: [
            1, 2, 3
        ],
        strikeClass: 'strike-row-1'
    },
    {
        combo: [
            4, 5, 6
        ],
        strikeClass: 'strike-row-2'
    },
    {
        combo: [
            7, 8, 9
        ],
        strikeClass: 'strike-row-3'
    },

    // Columns
    {
        combo: [
            1, 4, 7
        ],
        strikeClass: 'strike-col-1'
    },
    {
        combo: [
            2, 5, 8
        ],
        strikeClass: 'strike-col-2'
    },
    {
        combo: [
            3, 6, 9
        ],
        strikeClass: 'strike-col-3'
    },

    // Diagonals
    {
        combo: [
            1, 5, 9
        ],
        strikeClass: 'strike-diagonal-1'
    },
    {
        combo: [
            3, 5, 7
        ],
        strikeClass: 'strike-diagonal-2'
    },
]

// Functions
function setHover(event){
    tiles.forEach(tile => {
        tile.classList.remove('x-hover')
        tile.classList.remove('o-hover')
    })

    const hoverClass = `${turn.toLowerCase()}-hover`
    // const hoverTile = event.target
    // if(hoverTile.innerText == ''){
    //     hoverTile.classList.add(hoverClass)
    // }
    tiles.forEach(tile => {
        if(tile.innerText == ''){
            tile.classList.add(hoverClass)
        }
    })
}

function checkWinner(){
    // Check for winner
    for(const winningCombination of winningCombinations){
        const { combo, strikeClass } = winningCombination
        const tileValue1 = boardState[combo[0] - 1]
        const tileValue2 = boardState[combo[1] - 1]
        const tileValue3 = boardState[combo[2] - 1]

        if(tileValue1 != null && tileValue1 == tileValue2 && tileValue1 == tileValue3){
            strike.classList.add(strikeClass)
            gameOverScreen(tileValue1)
            return
        }
    }

    // Check for draw
    const allTileFilledIn = boardState.every(tile => tile !== null) // Every: jika semua kondisi terpenuhi maka akan me return true
    if(allTileFilledIn){
        gameOverScreen(null)
    }
}

function gameOverScreen(winnerText){
    let text = 'Draw!'
    if(winnerText != null){
        text = `Winner is ${winnerText}`
    }

    modalResult.className = 'visible'
    result.innerText = text
    gameOverSound.play()
}

function tileClick(event){
    if(modalResult.classList.contains('visible')){
        return
    }

    const tile = event.target
    const tileNumber = tile.dataset.index

    if(tile.innerText != ''){
        return
    }

    if(turn == PLAYER_X){
        tile.innerText = PLAYER_X
        boardState[tileNumber - 1] = PLAYER_X
        turn = PLAYER_O
    }else{
        tile.innerText = PLAYER_O
        boardState[tileNumber - 1] = PLAYER_O
        turn = PLAYER_X
    }

    clickSound.play()

    setHover()
    checkWinner()
}

function startNewGame(){
    turn = PLAYER_X
    boardState.fill(null)
    modalResult.className = 'hidden'
    strike.className = 'strike'
    tiles.forEach(tile => tile.innerText = '')
}