import { useParams } from 'react-router-dom'
import { Header } from './Header'

export function Watch() {
  const { videoId } = useParams()

  return (
    <div>
      <Header />
      <h1>Watch {videoId}</h1>
    </div>
  )
}
