import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { API_URL } from './constants'

export function Upload() {
  const location = useLocation()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [videoData, setVideoData] = useState({})
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    const { _id } = videoData
    const { title, description } = data
    axios
      .patch(
        API_URL + '/api/video',
        { _id, title, description },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .finally((res) => {
        window.history.back()
      })
  }

  const handleFile = (file) => {
    setLoading(true)

    const formData = new FormData()
    formData.append('video', file)
    axios
      .post(API_URL + '/api/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res, rej) => {
        const { data } = res
        setVideoData(data)
      })
      .finally((err) => {
        setLoading(false)
      })
    setFile(file)
  }

  useEffect(() => {
    if (videoData.keywords) {
      reset({ keywords: videoData.keywords })
    }
  }, [videoData, reset])

  if (!location.search.includes('upload')) return null

  return (
    <div
      className="absolute left-0 right-0 top-0 bottom-0 bg-slate-500/50 cursor-default"
      onClick={(ev) => {
        if (ev.target !== ev.currentTarget || loading) return
        setFile(null)
        window.history.back()
      }}
    >
      <div className="w-full max-w-md mx-auto mt-16 flex rounded-sm border-1 border-slate-700">
        {file ? (
          <div className="flex-1 p-4 bg-slate-400 text-stone-100">
            <div className="text-center mb-7">{file.name}</div>
            {/* <div className="text-center mb-7">file name</div> */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Title
                <input
                  {...register('title')}
                  className="flex-1 w-full max-w-2xl p-3 border border-slate-400 rounded mt-2 ring-slate-400 outline-slate-400 text-stone-700 mb-7"
                  autoComplete="off"
                />
              </label>

              <label>
                Description
                <input
                  {...register('description')}
                  className="flex-1 w-full max-w-2xl p-3 border border-slate-400 rounded mt-2 ring-slate-400 outline-slate-400 text-stone-700 mb-7"
                  autoComplete="off"
                />
              </label>

              <label>
                Keywords
                <input
                  {...register('keywords')}
                  className="flex-1 w-full max-w-2xl p-3 border border-slate-400 rounded mt-2 ring-slate-400 outline-slate-400 text-stone-700 mb-7"
                  autoComplete="off"
                  disabled
                />
              </label>
              <div>
                {loading ? (
                  <div className="flex flex-col justify-center items-center">
                    <ThreeDots
                      height="80"
                      width="80"
                      radius="9"
                      color="#767b94"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                    <div>File uploading...</div>
                  </div>
                ) : (
                  <input
                    type="submit"
                    className="py-2 px-6 bg-slate-500 rounded-md float-right"
                  />
                )}
              </div>
            </form>
          </div>
        ) : (
          <div
            className="flex-1 text-center text-stone-100 bg-slate-400 p-16 py-24"
            onDragOver={(ev) => {
              ev.preventDefault()
            }}
            onDrop={(ev) => {
              ev.preventDefault()
              ev.stopPropagation()
              if (ev.dataTransfer.items && ev.dataTransfer.items[0]) {
                const file = ev.dataTransfer.items[0].getAsFile()
                handleFile(file)
              }
            }}
          >
            Drag n' drop your video here
          </div>
        )}
      </div>
    </div>
  )
}
