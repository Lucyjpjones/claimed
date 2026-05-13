import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Search from "./pages/Search"
import HitList from "./pages/HitList"
import Profile from "./pages/Profile"
import { AlertWatcher } from "./components/AlertWatcher"

function App() {
  return (
    <div className="appLayout">
      <Header />
      <AlertWatcher />

      <main className="appContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/hitlist" element={<HitList />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App