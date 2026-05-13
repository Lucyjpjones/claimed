import { createContext, useContext, useState } from "react"

const UIContext = createContext()

export function UIProvider({ children }) {
  const [isAlertsOn, setIsAlertsOn] = useState(false)

  const toggleAlerts = () => {
    setIsAlertsOn((prev) => !prev)
  }

  return (
    <UIContext.Provider value={{ isAlertsOn, toggleAlerts }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  return useContext(UIContext)
}