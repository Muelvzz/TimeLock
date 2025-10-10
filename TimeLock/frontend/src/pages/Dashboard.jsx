import "../css/dashboard.css";
import { useState, useEffect, useRef } from "react";

export default function Dashboard() {

  const [isRunning, setIsRunning] = useState(false)
  const [activity, setActivity] = useState([])
  const [activities, setActivities] = useState([])
  const [time, setTime] = useState(0)

  let interval = useRef(null)

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    } else {
      setTime(0)
      clearInterval(interval.current)
    }

    return () => clearInterval(interval.current)

  }, [isRunning])

  const formatTimer = (time) => {
    const hours = Math.floor(time/ 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    const pad = (num) => String(num).padStart(2, "0")

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!activity.trim()) return

    const newActivity = {
      label: activity,
      time: new Date().toLocaleTimeString(),
      duration: formatTimer(time),
    }

    setActivities((prev) => [newActivity, ...prev])
    setActivity("")
    setTime(0)
    setIsRunning(false)

    console.log(newActivity)
  }

  const removeActivity = (activityToRemove) => {
    setActivities(activities.filter((c) => c !== activityToRemove))
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <form className="header-left" onSubmit={handleSubmit}>
          <h2>What are you working on?</h2>
          <input
            type="text"
            placeholder="Type your activity..."
            className="activity-input"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </form>

        <div className="header-right">
          <span className="timer">{formatTimer(time)}</span>
          <button
            type="submit"
            form="activity-form"
            className="play-btn"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "■" : "▶"}
          </button>
        </div>
      </header>

      <section className="activity-list">
        <h3>Today</h3>
        <ul>
          {activities.map((item, i) => (
            <li key={i}>
              <div className="activity-info">
                <span className="activity-label">{item.label}</span>
                <span className="activity-time">{item.time}</span>
              </div>
              <div className="activity-right-info">
                <span className="activity-duration">{item.duration}</span>
                <button className="remove-btn" onClick={() => removeActivity(item)}>X</button>
              </div>
            </li>
          ))}

        </ul>
      </section>
    </div>
  );
};