export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <span>🏠</span>
        <h1 className="font-bold text-xl">Inicio</h1> 
      </div>
      <div className="text-sm text-gray-600">
        <p>J&P PERIFERICOS S.A.C.</p>
        <p>Los Olivos</p>
      </div>
    </header>
  )
}
