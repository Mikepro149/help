export default function ProgressCircle({ value, label }) {
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const offset = (1 - value / 100) * circumference

  return (
    <div className="flex flex-col items-center bg-orange-100 rounded p-4 shadow">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#eee"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="orange"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold">
          {value}%
        </div>
      </div>
      <p className="mt-2">{label}</p>
    </div>
  )
}
