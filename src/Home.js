import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from './constants'
import { Drawer } from './Drawer'
import { Header } from './Header'
import { Upload } from './Upload'

export function Home() {
  const { data } = useQuery({
    queryKey: ['videos'],
    queryFn: () => axios.get(API_URL + '/api/video').then((res) => res.data),
  })
  return (
    <div>
      <Header />
      <div className="flex">
        <Drawer />
        <div className="flex flex-wrap p-3">
          {data && data.videos
            ? data.videos.map((videoMeta) => (
                <Link to={`/watch/${videoMeta.key}`} key={videoMeta.key}>
                  <img
                    src={`${API_URL}/api/video/thumbnail?key=${videoMeta.thumbnailKey}`}
                    className="w-[311px] h-[174px] m-3 bg-slate-400"
                    alt="thumbnail"
                  />
                </Link>
              ))
            : null}
        </div>
      </div>
      <Upload />
    </div>
  )
}
