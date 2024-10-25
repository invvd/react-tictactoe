import { useState } from 'react'
import './App.css'

type SquareProps = {
  text: string|null,
  handleClick: () => void
}

function Square({text, handleClick}: SquareProps) {
  return (
    <button onClick={handleClick} className="square">
      <p>{text}</p>
    </button>
  )
}

function App() {
  const TURNS = {
    X: '❌',
    O: '⭕'
  }
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const [turn, setTurn] = useState(TURNS.X)
  const [board, updateBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState('')
  const handleClick = (turn: string, index: number): void => {
    if (winner) {return} // Si alguien ya gano, no hace nada
    if (board[index]) {return} // Si ya esta marcada la casilla, no hace nada
    const newBoard = board
    newBoard[index] = turn
    updateBoard(newBoard)    
    const isXWinner = wins.map(win => {return win.map(pos => {return newBoard[pos] === TURNS.X})}).some(arr => {return (arr[0] && arr[1] && arr[2])})
    const isOWinner = wins.map(win => {return win.map(pos => {return newBoard[pos] === TURNS.O})}).some(arr => {return (arr[0] && arr[1] && arr[2])})
    if (isXWinner) {return setWinner(TURNS.X)}
    if (isOWinner) {return setWinner(TURNS.O)}
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
  }
  return (
    <>
      <h1>
        Tic Tac Toe
      </h1>
      <h3>{(board.some(sqr => !sqr) && !winner) && `Turno de: ${turn.toUpperCase()}`}</h3>
      <div className="gameboard">
        {
          board.map((sqr: (string|null), index: number) => {
            return (<Square text={sqr} handleClick={() => handleClick(turn, index)} key={index}/>)
          })
        }
      </div>
      {
        winner && <h3>{`Ganador: ${winner}`}</h3>
      }
      {
        !board.some(sqr => sqr === null) && !winner && <h3>Empate!</h3>
      }
      <button onClick={() => {updateBoard(Array(9).fill(null)); setWinner('');}}>
        Reiniciar Juego
      </button>
    </>
  )
}

export default App
