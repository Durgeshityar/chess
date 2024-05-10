import { Color, PieceSymbol, Square } from 'chess.js'
import { useState } from 'react'
import { MOVE } from '../pages/Game'

interface Board {
  setBoard: any
  chess: any
  board: ({
    square: Square
    type: PieceSymbol
    color: Color
  } | null)[][]
  socket: WebSocket
}

export const ChessBoard = ({ board, socket, setBoard, chess }: Board) => {
  const [from, setFrom] = useState<null | Square>(null)
  const [to, setTo] = useState<null | Square>(null)

  return (
    <div className=" text-black ">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                '' +
                (8 - i)) as Square
              return (
                <div
                  key={j}
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation)
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      )
                      setFrom(null)
                      // chess.move({
                      //   move: {
                      //     from,
                      //     to: squareRepresentation,
                      //   },
                      // })
                      setBoard(chess.board())
                    }
                  }}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'
                  }`}
                >
                  <div className="w-full , justify-center flex h-full">
                    <div className=" h-full justify-center flex flex-col">
                      {square ? square.type : ''}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
