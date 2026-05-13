import { createContext, useContext, useState } from "react"

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([])

  const addAlert = (alert) => {
    setAlerts((prev) => [...prev, alert])
  }

  const removeAlert = (placeId) => {
    setAlerts((prev) => prev.filter((a) => a.placeId !== placeId))
  }

  const isAlertActive = (placeId) =>
    alerts.some((a) => a.placeId === placeId)

  return (
    <AlertContext.Provider
      value={{ alerts, addAlert, removeAlert, isAlertActive }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export function useAlerts() {
  return useContext(AlertContext)
}