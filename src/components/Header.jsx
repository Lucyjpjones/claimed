import { useState } from "react"
import { Link } from "react-router-dom"
import "./Header.css"
import { FaRegBellSlash, FaRegBell, FaUserCircle } from "react-icons/fa"
import { useUI } from "../context/UIContext"
import Modal from "./Modal"
import Filter from "./Filter"
import SignIn from "./SignIn"

function Header({ isLoggedIn = false }) {
  const { isAlertsOn } = useUI()

  const [openAlerts, setOpenAlerts] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)

  return (
    <header className="header">
      <div className="headerButtons">

        {/* ALERTS BUTTON */}
        <button
          onClick={() => setOpenAlerts(true)}
          className="alertsBtn"
        >
          {isAlertsOn ? <FaRegBell /> : <FaRegBellSlash />}
        </button>

        <Modal
          isOpen={openAlerts}
          onClose={() => setOpenAlerts(false)}
          onSubmit={() => setOpenAlerts(false)}
          submitButton="Set Alert"
          icon={<FaRegBell className="modalIcon" />}
        >
          <Filter />
        </Modal>

        {/* HITLIST LINK */}
        <Link to="/hitlist" className="hitListBtn">
          Hit List
        </Link>

        {/* SIGN IN / PROFILE */}
        {!isLoggedIn ? ( /* REMOVE ! AFTER TESTING */
          <Link to="/profile" className="signInBtn">
            Profile
          </Link>
        ) : (
          <>
            <button
              className="signInBtn"
              onClick={() => setOpenSignIn(true)}
            >
              Sign In
            </button>

            <Modal
              isOpen={openSignIn}
              onClose={() => setOpenSignIn(false)}
              onSubmit={() => setOpenSignIn(false)}
              submitButton="Sign In"
              icon={<FaUserCircle className="modalIcon" />}
            >
              <SignIn />
            </Modal>
          </>
        )}

      </div>
    </header>
  )
}

export default Header