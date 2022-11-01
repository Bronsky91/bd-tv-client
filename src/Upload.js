import { Header } from './Header'

export function Upload() {
  return (
    <div>
      <Header />
      <div
        className="w-full max-w-xl mx-auto bg-slate-400 mt-16 flex justify-center items-center text-stone-100 p-16 rounded-sm border-1 border-slate-700"
        onDragOver={(ev) => {
          ev.preventDefault()
        }}
        onDrop={(ev) => {
          ev.preventDefault()
          if (ev.dataTransfer.items && ev.dataTransfer.items[0]) {
            const file = ev.dataTransfer.items[0]
            console.log(file)
          }
        }}
      >
        Drag n' drop your video here
      </div>
    </div>
  )
}
