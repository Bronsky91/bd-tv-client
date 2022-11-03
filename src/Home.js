import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Link } from 'react-router-dom'
import { API_URL } from './constants'
import { Drawer } from './Drawer'
import { Header } from './Header'
import { Upload } from './Upload'

export function Home() {
  const [query, setQuery] = useState('')
  const [searchQuery] = useDebounce(query, 300)

  const { data } = useQuery({
    queryKey: [`video search - ${searchQuery}`],
    queryFn: () =>
      axios
        .get(API_URL + '/api/video/search', { params: { term: searchQuery } })
        .then((res) => res.data),
  })

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <div className="flex h-full">
        <Drawer />
        <div className="flex flex-wrap p-3 pb-[128px] h-full overflow-scroll">
          {data && data.videos
            ? data.videos.map((videoMeta) => (
                <Link to={`/watch/${videoMeta._id}`} key={videoMeta.key}>
                  <img
                    src={`${API_URL}/api/video/thumbnail?key=${videoMeta.thumbnailKey}`}
                    className="w-[311px] h-[174px] m-3 bg-slate-400"
                    alt="thumbnail"
                  />
                  <div className="text-center">{videoMeta?.title}</div>
                </Link>
              ))
            : null}
        </div>
      </div>
      <Upload />
    </>
  )
}
