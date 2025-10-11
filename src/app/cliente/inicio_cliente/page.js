import TicketStatusCard from "@/components/TicketStatusCard";
import { Calendar } from "react-calendar"; // Si tienes un componente de calendario, usa ese. Si no, puedes dejarlo como placeholder.

export default function InicioCliente() {
  // Simulación de datos
  const ticketsGenerados = 10;
  const ticketsResueltos = 25;
  const cantidadEquipos = 10;
  const ticketsEnProceso = 3;
  const porcentajeResueltos = 80;
  const porcentajeProceso = 25;

  return (
    <div className="min-h-screen bg-[#ededed] flex">
      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl text-[#454545]">🏠</span>
            <h1 className="text-3xl font-bold text-[#454545]">Inicio</h1>
          </div>
          <div className="text-right">
            <div className="font-semibold text-[#454545]">
              J&P PERIFERICOS S.A.C.
            </div>
            <div className="text-sm text-[#bdbdbd]">Los Olivos</div>
          </div>
        </div>

        {/* Tarjetas superiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#ffcc80] rounded-xl p-6 flex flex-col items-center shadow-md">
            <span className="text-4xl mb-2">🎫</span>
            <span className="font-bold text-xl text-[#222] mb-1">
              Tickets Generados
            </span>
            <span className="text-3xl font-bold text-[#222]">
              {ticketsGenerados}
            </span>
            <button className="mt-2 px-6 py-1 rounded bg-white border border-[#222] font-semibold hover:bg-[#fff3e0] transition">
              Ver
            </button>
          </div>
          <div className="bg-[#ffcc80] rounded-xl p-6 flex flex-col items-center shadow-md">
            <span className="text-4xl mb-2">🎟️</span>
            <span className="font-bold text-xl text-[#222] mb-1">
              Tickets Resueltos
            </span>
            <span className="text-3xl font-bold text-[#222]">
              {ticketsResueltos}
            </span>
            <button className="mt-2 px-6 py-1 rounded bg-white border border-[#222] font-semibold hover:bg-[#fff3e0] transition">
              Ver
            </button>
          </div>
          <div className="bg-[#ffcc80] rounded-xl p-6 flex flex-col items-center shadow-md">
            <span className="text-4xl mb-2">💻</span>
            <span className="font-bold text-xl text-[#222] mb-1">
              Cantidad de Equipos
            </span>
            <span className="text-3xl font-bold text-[#222]">
              {cantidadEquipos}
            </span>
            <button className="mt-2 px-6 py-1 rounded bg-white border border-[#222] font-semibold hover:bg-[#fff3e0] transition">
              Ver
            </button>
          </div>
        </div>

        {/* Mensajes y calendario */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Mensajes de Tickets */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-md">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">💬</span>
                <span className="font-bold text-lg">Mensajes de Tickets</span>
              </div>
              <ul className="text-sm text-[#454545] mb-2">
                <li className="mb-1 flex justify-between">
                  <span className="font-semibold text-[#f89e1b]">
                    #T-00000001
                  </span>
                  <span className="flex-1 mx-2 truncate">
                    Fernandes Soporte. Te envió un...
                  </span>
                  <span className="text-gray-400">-hace 20 min</span>
                </li>
                <li className="mb-1 flex justify-between">
                  <span className="font-semibold text-[#bdbdbd]">#T-</span>
                  <span className="flex-1 mx-2 truncate">??????</span>
                  <span className="text-gray-400">-hace 20 min</span>
                </li>
                <li className="mb-1 flex justify-between">
                  <span className="font-semibold text-[#bdbdbd]">#T-</span>
                  <span className="flex-1 mx-2 truncate">??????</span>
                  <span className="text-gray-400">-hace 20 min</span>
                </li>
                <li className="mb-1 flex justify-between">
                  <span className="font-semibold text-[#bdbdbd]">#T-</span>
                  <span className="flex-1 mx-2 truncate">??????</span>
                  <span className="text-gray-400">-hace 20 min</span>
                </li>
              </ul>
              <div className="text-xs text-[#f89e1b] font-semibold text-center">
                Tienes 1 mensaje nuevo por leer
              </div>
            </div>
          </div>
          {/* Calendario */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-[#ffe0b2] rounded-xl shadow-md p-4 w-full max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-[#222]">May 2023</span>
                <div className="flex gap-2">
                  <button className="text-[#f89e1b] text-xl font-bold">
                    &lt;
                  </button>
                  <button className="text-[#f89e1b] text-xl font-bold">
                    &gt;
                  </button>
                </div>
              </div>
              {/* Calendario estático para ejemplo */}
              <table className="w-full text-center text-[#222]">
                <thead>
                  <tr>
                    <th className="py-1">Mo</th>
                    <th className="py-1">Tu</th>
                    <th className="py-1">We</th>
                    <th className="py-1">Th</th>
                    <th className="py-1">Fr</th>
                    <th className="py-1">Sa</th>
                    <th className="py-1">Su</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1 text-[#bdbdbd]">1</td>
                    <td className="py-1 text-[#bdbdbd]">2</td>
                    <td className="py-1 text-[#bdbdbd]">3</td>
                    <td className="py-1 text-[#bdbdbd]">4</td>
                    <td className="py-1 text-[#bdbdbd]">5</td>
                    <td className="py-1 text-[#bdbdbd]">6</td>
                    <td className="py-1 text-[#bdbdbd]">7</td>
                  </tr>
                  <tr>
                    <td className="py-1">8</td>
                    <td className="py-1">9</td>
                    <td className="py-1">10</td>
                    <td className="py-1">11</td>
                    <td className="py-1">12</td>
                    <td className="py-1 bg-[#f89e1b] text-white rounded">13</td>
                    <td className="py-1">14</td>
                  </tr>
                  <tr>
                    <td className="py-1">15</td>
                    <td className="py-1">16</td>
                    <td className="py-1">17</td>
                    <td className="py-1 bg-[#f89e1b] text-white rounded">18</td>
                    <td className="py-1">19</td>
                    <td className="py-1">20</td>
                    <td className="py-1">21</td>
                  </tr>
                  <tr>
                    <td className="py-1">22</td>
                    <td className="py-1">23</td>
                    <td className="py-1">24</td>
                    <td className="py-1">25</td>
                    <td className="py-1">26</td>
                    <td className="py-1">27</td>
                    <td className="py-1">28</td>
                  </tr>
                  <tr>
                    <td className="py-1">29</td>
                    <td className="py-1">30</td>
                    <td className="py-1 text-[#bdbdbd]">1</td>
                    <td className="py-1 text-[#bdbdbd]">2</td>
                    <td className="py-1 text-[#bdbdbd]">3</td>
                    <td className="py-1 text-[#bdbdbd]">4</td>
                    <td className="py-1"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tarjetas de estado abajo */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-xs">
            <span className="font-bold text-lg text-[#222] mb-2">
              Tickets en Proceso
            </span>
            <div className="relative flex items-center justify-center mb-2">
              <svg width="90" height="90">
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  stroke="#e0e0e0"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  stroke="#f89e1b"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={
                    2 * Math.PI * 40 * (1 - porcentajeProceso / 100)
                  }
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="22"
                  fill="#222"
                  fontWeight="bold"
                >
                  {porcentajeProceso}%
                </text>
              </svg>
            </div>
            <span className="text-base text-[#222]">En Proceso</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-xs">
            <span className="font-bold text-lg text-[#222] mb-2">
              Tickets Resueltos
            </span>
            <div className="relative flex items-center justify-center mb-2">
              <svg width="90" height="90">
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  stroke="#e0e0e0"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  stroke="#4caf50"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={
                    2 * Math.PI * 40 * (1 - porcentajeResueltos / 100)
                  }
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="22"
                  fill="#222"
                  fontWeight="bold"
                >
                  {porcentajeResueltos}%
                </text>
              </svg>
            </div>
            <span className="text-base text-[#222]">Resueltos</span>
          </div>
        </div>
      </main>
    </div>
  );
}
