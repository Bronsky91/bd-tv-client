import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from './constants'
import { Drawer } from './Drawer'
import { Header } from './Header'
import { Upload } from './Upload'

const comments = [
  'I really like this video!',
  'Wow thanks for sharing.',
  'This is a bit sus.',
  'Who you gonna call?',
  'I love BD!!!!',
]

export function Watch() {
  const { videoId } = useParams()

  const { data } = useQuery({
    queryKey: [`get video - ${videoId}`],
    queryFn: () =>
      axios
        .get(API_URL + `/api/video/byid`, { params: { id: videoId } })
        .then((res) => res.data?.video),
  })

  let relatedWord = ''
  if (data?.keywords) {
    const i = data.keywords.indexOf(',')
    if (i > 0) {
      relatedWord = data.keywords.substring(0, i)
    }
  }

  return (
    <>
      <Header />
      <div className="flex h-full">
        <Drawer />
        <div className="flex p-3 pb-[128px] h-full overflow-scroll">
          <div className="flex-1 p-3 flex flex-col">
            <video
              className="w-full flex-1 mb-2"
              src={`${API_URL}/api/video/stream?key=${data?.key}`}
              controls
              autoPlay
              muted
            />
            <div className="flex">
              <div className="flex-1 font-bold text-stone-700 mb-2">
                {data?.title}
              </div>
              <div className="flex justify-end items-center">
                <div className="flex justify-center items-center text-sm text-slate-500 border-2 border-slate-400 rounded-xl px-1 mr-4 min-w-[74px] text-center">
                  <span className="text-xl mr-1">👍</span>
                  {Math.floor(Math.random() * 100) + 1}k
                </div>
                <div className="flex justify-center items-center text-sm text-slate-500 border-2 border-slate-400 rounded-xl px-2 mr-4 min-w-[74px] text-center">
                  <span className="text-xl mr-1">⭐️</span>
                  Favorite
                </div>
                <div className="flex justify-center items-center text-sm text-stone-100 border-2 bg-slate-400 rounded-xl px-1 mr-4 min-w-[74px] text-center">
                  <span className="text-xl mr-1">♢</span>
                  Verified
                </div>
              </div>
            </div>
            <div className="mb-2 text-stone-700">
              <span className="bg-slate-400 rounded-[50%] text-xl p-1 mr-2">
                🧔
              </span>
              Mr. BD TV Guy
              <div></div>
            </div>

            <div className="text-stone-700 font-medium">Description:</div>
            <div className="text-stone-700 text-sm mb-4">
              {data?.description}
            </div>
            <div className="text-stone-700 font-medium">Keywords:</div>
            <div className="text-stone-700 text-sm mb-4">
              {data?.keywords.join(', ')}
            </div>
            <div>
              <div className="text-stone-700 font-medium">
                {comments.length} Comments
              </div>
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
            {data ? (
              <RelatedVideos searchQuery={relatedWord} />
            ) : (
              <Placeholder />
            )}
          </div>
        </div>
      </div>
      <Upload />
    </>
  )
}

function RelatedVideos({ searchQuery }) {
  const { data } = useQuery({
    queryKey: [`video search - ${searchQuery}`],
    queryFn: () =>
      axios
        .get(API_URL + '/api/video/search', { params: { term: searchQuery } })
        .then((res) => res.data),
  })

  if (!data) return <Placeholder />

  const videos = data.videos.map((videoMeta) => (
    <Link to={`/watch/${videoMeta._id}`} key={videoMeta.key}>
      <img
        src={`${API_URL}/api/video/thumbnail?key=${videoMeta.thumbnailKey}`}
        className="w-[174px] h-[108px] m-3 bg-slate-400"
        alt="thumbnail"
      />
      <div className="text-center">{videoMeta?.title}</div>
    </Link>
  ))
  return <>{videos}</>
}

function Placeholder() {
  const skellys = [1, 2, 3, 4, 5, 6, 7].map((label) => (
    <div
      key={label}
      className="w-[174px] h-[108px] m-3 bg-slate-400 text-stone-100 flex justify-center items-center"
    />
  ))
  return <>{skellys}</>
}
