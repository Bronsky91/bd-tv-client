import { Link, useParams } from 'react-router-dom'
import { Drawer } from './Drawer'
import { Header } from './Header'

const comments = [
  'I really like this video!',
  'Wow thanks for sharing.',
  'This is a bit sus.',
  'Who you gonna call?',
  'I love BD!!!!',
]

export function Watch() {
  const { videoId } = useParams()

  return (
    <div>
      <Header />
      <div className="flex">
        <Drawer />
        <div className="flex-1 p-3 flex flex-col">
          <video className="w-full mb-2" src={`/video/${videoId}`} controls />
          <div className="font-medium text-stone-700 mb-2">
            Awesome Video Title About Something You NEED TO KNOW
          </div>
          <div className="mb-2 text-stone-700">
            <span className="bg-slate-400 rounded-[50%] text-xl p-1 mr-2">
              🧔
            </span>
            Mr. BD TV Guy
            <div></div>
          </div>
          <div className="text-stone-700 text-sm mb-4">
            Lorem ipsum video description something about BD. Really cool
            feature that is easily explained in a video that would otherwise
            take a long time to understand with other formats.
          </div>
          <div>
            <div className="text-stone-700">{comments.length} Comments</div>
            {comments.map((comment) => (
              <div key={comment} className="text-stone-700 text-xs p-3">
                {comment}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-slate-800 text-center text-xs pt-3">
            Related Videos
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((label) => (
            <Link to={`/watch/${label}`} key={label}>
              <div className="w-[174px] h-[108px] m-3 bg-slate-400 text-stone-100 flex justify-center items-center">
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
