import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./index.css"

import { HitListProvider } from "./context/HitListContext"
import { UIProvider } from "./context/UIContext"
import { AlertProvider } from "./context/AlertContext"
import { ToastProvider } from "./context/ToastContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HitListProvider>
      <UIProvider>
        <AlertProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AlertProvider>
      </UIProvider>
    </HitListProvider>
  </BrowserRouter>
)