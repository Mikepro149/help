import { Mail } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

export default function MessagesCard({ messages }) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Mail className="w-5 h-5 text-orange-500" />
        <CardTitle>Mensajes de Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {messages?.map((msg) => (
            <li key={msg.id} className="text-sm">
              <strong>{msg.sender}</strong>: {msg.text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
