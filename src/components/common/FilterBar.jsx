import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function FilterBar({ config, filters, onFilterChange, onSearch }) {
  const renderFilter = (filter) => {
    switch (filter.type) {
      case "text":
        return (
          <Input
            key={filter.key}
            type="text"
            placeholder={filter.placeholder}
            value={filters[filter.key] || ""}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="max-w-xs"
          />
        )

      case "select":
        return (
          <Select
            key={filter.key}
            value={filters[filter.key] || ""}
            onValueChange={(value) => onFilterChange(filter.key, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "date":
        return (
          <Input
            key={filter.key}
            type="date"
            value={filters[filter.key] || ""}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="w-[180px]"
          />
        )

      case "daterange":
        return (
          <div key={filter.key} className="flex items-center gap-2">
            <Input
              type="date"
              placeholder={filter.placeholderStart}
              value={filters[`${filter.key}_start`] || ""}
              onChange={(e) => onFilterChange(`${filter.key}_start`, e.target.value)}
              className="w-[150px]"
            />
            <span className="text-sm text-muted-foreground">al</span>
            <Input
              type="date"
              placeholder={filter.placeholderEnd}
              value={filters[`${filter.key}_end`] || ""}
              onChange={(e) => onFilterChange(`${filter.key}_end`, e.target.value)}
              className="w-[150px]"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-orange-100 p-4 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.filters.map((filter) => (
          <div key={filter.key}>
            <label className="text-sm font-medium mb-2 block">
              {filter.label}
            </label>
            {renderFilter(filter)}
          </div>
        ))}
        
        <div className="flex items-end">
          <Button onClick={onSearch} className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}