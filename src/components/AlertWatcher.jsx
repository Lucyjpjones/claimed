import { useEffect } from "react"
import { useAlerts } from "../context/AlertContext"
import { useHitList } from "../context/HitListContext"
import { useToast } from "../context/ToastContext"

export function AlertWatcher() {
  const { alerts } = useAlerts()
  const { hitlist } = useHitList()
  const { showToast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      alerts.forEach((alert) => {
        const place = hitlist.find((p) => p.id === alert.placeId)
        if (!place) return

        const availableTimes =
          place.availability?.[alert.date] || []

        if (availableTimes.includes(alert.time)) {
          showToast({
            restaurant: place.displayName.text,
            date: alert.date,
            time: alert.time,
            people: alert.people,
          })
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [alerts, hitlist])

  return null
}