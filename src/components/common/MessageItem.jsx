export default function MessageItem({ text, author }) {
  return (
    <li className="p-2 border rounded-md">
      <p className="text-sm text-gray-700">{text}</p>
      <span className="text-xs text-gray-500">— {author}</span>
    </li>
  )
}
