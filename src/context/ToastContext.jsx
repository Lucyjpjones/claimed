import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = ({ restaurant, date, time, people }) => {
    const id = Date.now()
    const key = `${restaurant}-${date}-${time}-${people}`

    setToasts((prev) => {
      const exists = prev.some((t) => t.key === key)
      if (exists) return prev

      const message = `🍽 ${restaurant} available on ${date} at ${time} for ${people} people`

      return [...prev, { id, key, message, type: "success" }]
    })

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

function ToastContainer({ toasts }) {
  return (
    <div className="toastContainer">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          🔔 {t.message}
        </div>
      ))}
    </div>
  )
}