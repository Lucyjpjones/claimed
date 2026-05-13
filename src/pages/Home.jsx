import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/ClaimedLogo.png'
import { FaSistrix } from 'react-icons/fa'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const goToSearch = () => {
    if (!searchQuery.trim()) return
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="container">
      <img src={logo} className="logo" alt="Claimed" />

      <div className="searchWrapper">
        <input
          className="searchInput"
          placeholder="Find your next favourite spot"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && goToSearch()}
        />

        <button className="searchButton" onClick={goToSearch}>
          <FaSistrix className="searchIcon" />
        </button>
      </div>
    </div>
  )
}

export default Home