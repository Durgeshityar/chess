import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export const Landing = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="pt-10 flex justify-center">
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className=" flex justify-center">
            <img
              src={'/chess.png'}
              alt="chess board"
              className=" max-w-96 my-10"
            ></img>
          </div>
          <div className=" text-white mt-28 flex justify-center  p-10 ">
            <div className=" flex flex-col items-center gap-4">
              <h1 className=" text-6xl font-bold">
                {' '}
                Play Chess
                <br /> online <br />
                on #1 site!
              </h1>
              <p className=" text-lg mt-2"> Play chess with your friends</p>
              <Button
                onClick={() => {
                  navigate('/game')
                }}
              >
                Play Online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
