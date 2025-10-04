import { useState } from 'react'
import './css/landing-page.css'
import Nav from './components/Nav'

function LandingPage() {

  return (
    <>
      <Nav/>
      <main className="landing-page-container">
        <div className="landing-page-title">
          <h1>Where teams and time</h1>
          <h1>tracking data meet.</h1>
        </div>
        <div className="landing-page-slogan">
          <p>The only time tracking software that builds custom reports from your team's</p>
          <p>time data to maximize productivity and revenue.</p>
        </div>
        <div className="landing-page-buttons">
          <button>Start Tracking For Free</button>
          <button>See How it Works</button>
        </div>
      </main>
    </>
  )
}

export default LandingPage
