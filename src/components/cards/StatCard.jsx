import { Activity } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

export default function StatCard({ title, value }) {
  return (
    <Card className="bg-orange-50">
      <CardHeader className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-orange-600" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
