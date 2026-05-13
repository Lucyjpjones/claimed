import React, { useState } from "react";
import "./Profile.css";
import { FaRegBell } from "react-icons/fa"
import { FaCircleUser, FaCircle } from "react-icons/fa6"

const types = ["About", "Settings"];

function Profile() {
  const [active, setActive] = useState(types[0]);
  const [dob, setDob] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [time, setTime] = useState("19:00")
  const [people, setPeople] = useState(2)

  return (
    <div className="profilePage">
      <div className="stack">
        <div className="iconWrapper">
          <FaCircle className="circleIcon" />
          <FaCircleUser className="userIcon" />
        </div>
        <div className="titleCard">
          <p className="titleHi">Hi,</p>
          <p className="titleName">Lucy Jones</p>
        </div>
        <div className="profileCard">
          <div className="profileBtnGroup">
            {types.map((type) => (
              <button
                key={type}
                className={`profileTab ${active === type ? "profileTabActive" : ""}`}
                onClick={() => setActive(type)}
              >
                {type === "Settings" ? (
                  <>
                    <FaRegBell className="settingsIcon" />
                  </>
                ) : (
                  type
                )}
              </button>
            ))}
          </div>
          <div className="profileContent">
            {active === "About" &&
              <div className="inputGroup">
                <input
                  className="profileInput"
                  placeholder="First Name"
                />
                <input
                  className="profileInput"
                  placeholder="Last Name"
                />
                <input
                  className="profileInput"
                  placeholder="Email"
                />
                <input
                  className="profileInput"
                  placeholder="Phone Number"
                />
                <input
                  className="profileInput"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            }
            {active === "Settings" && (
              <div className="inputGroup">
                <label className="filterLabel">Date</label>
                <input
                  className="filterInput"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <label className="filterLabel">Time</label>
                <input
                  className="filterInput"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <label className="filterLabel">People</label>
                <div className="peopleControl">
                  <button
                    className="peopleBtn"
                    onClick={() => setPeople(p => Math.max(1, p - 1))}
                  >
                    -
                  </button>

                  <span className="peopleCount">{people}</span>

                  <button
                    className="peopleBtn"
                    onClick={() => setPeople(p => p + 1)}
                  >
                    +
                  </button>
                </div>
                <input
                  className="FilterTextInput"
                  placeholder="Location"
                />
                <input
                  className="FilterTextInput"
                  placeholder="Cuisine"
                />
              </div>
            )}
            <button
              className="saveBtn"
              onClick={() => setOpenSignIn(true)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;