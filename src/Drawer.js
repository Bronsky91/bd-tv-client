export function Drawer() {
  return (
    <div className="w-[219px] flex flex-shrink-0 flex-col p-4 border-right-1 border-slate-400 bg-slate-100 text-stone-700">
      {[
        'Favorites',
        'Recently Added',
        'Categories',
        'Most Watched',
        'Most Liked',
        'Most Informational',
        'Most Corporate',
      ].map((label) => (
        <div key={label}>{label}</div>
      ))}
    </div>
  )
}
