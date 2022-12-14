import { Link, useLocation } from 'react-router-dom'

export function Header({ query, setQuery }) {
  const location = useLocation()

  return (
    <div className="flex items-center h-[88px]">
      <Link to="/" className="flex-shrink-0 mr-4 h-[88px] w-[219px]">
        <img src="/logo.png" alt="BD TV" className="h-[88px] w-[219px]" />
      </Link>

      <div className="my-2 w-full">
        <input
          className="flex-1 w-full max-w-2xl p-2 border border-slate-400 rounded mt-2 ring-slate-400 outline-slate-400"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="flex items-center mt-[.28rem] flex-1">
          {['Planning', 'Mobile', 'Vault', 'QA', 'CX'].map((label) => (
            <div
              key={label}
              className="text-stone-100 bg-slate-400 rounded px-1 mr-4 min-w-[74px] text-center"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="h-[88px]">
        <Link
          to={location.pathname + '?upload=1'}
          className="flex flex-col relative"
        >
          <span className="h-[74px] mx-4 text-[74px] leading-[74px] text-emerald-400 -translate-y-[10px]">
            +
          </span>
          <span className="text-[10px] text-center select-none text-emerald-400 -translate-y-[20px]">
            Upload
          </span>
        </Link>
      </div>
    </div>
  )
}
