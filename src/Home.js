import { Link } from 'react-router-dom'
import { Drawer } from './Drawer'
import { Header } from './Header'

export function Home() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Drawer />
        <div className="flex flex-wrap p-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((label) => (
            <Link to={`/watch/${label}`} key={label}>
              <div className="w-[311px] h-[174px] m-3 bg-slate-400 text-stone-100 flex justify-center items-center">
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
