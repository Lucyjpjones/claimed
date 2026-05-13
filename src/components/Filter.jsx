import { useState } from "react"
import "./Filter.css"

function Filter({ onSubmit }) {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [time, setTime] = useState("19:00")
  const [people, setPeople] = useState(2)

  const handleSubmit = () => {
    onSubmit?.({ date, time, people })
  }

  return (
    <div className="filterContainer">

      <div className="filterRow">

        {/* DATE */}
        <div className="filterGroup">
          <label className="filterLabel">Date</label>
          <input
            className="filterInput"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* TIME */}
        <div className="filterGroup">
          <label className="filterLabel">Time</label>
          <input
            className="filterInput"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* PEOPLE */}
        <div className="filterGroup">
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
        </div>

      </div>

      <div className="filterRow">

        {/* LOCATION */}
        <div className="filterGroup">
          <label className="filterLabel">Location</label>
          <input
            className="FilterTextInput"
          />
        </div>

        {/* CUISINE */}
        <div className="filterGroup">
          <label className="filterLabel">Cuisine</label>
          <input
            className="FilterTextInput"
          />
        </div>

      </div>
    </div>
  )
}

export default Filter