import { useState, useEffect } from 'react';
import '../css/landing-page.css';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom'

function LandingPage() {
  const [landingPageApi, setLandingPageApi] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/landing-page');
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();
        setLandingPageApi(jsonData);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching data: ', error);
        setStatus('error');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <main className="landing-page-container">

        {status === 'loading' && (
          <div className="landing-page-title">
            <h1>Loading...</h1>
          </div>
        )}

        {status === 'error' && (
          <div className="landing-page-title">
            <h1>Server Offline</h1>
            <p>Please make sure the Flask backend is running.</p>
          </div>
        )}

        {status === 'success' && landingPageApi && (
          <div className="landing-page-title">
            <h1>{landingPageApi.title1}</h1>
            <h1>{landingPageApi.title2}</h1>
          </div>
        )}

        <div className="landing-page-slogan">
          <p>The only time tracking software that builds custom reports from your team's</p>
          <p>time data to maximize productivity and revenue.</p>
        </div>

        <div className="landing-page-buttons">
          <button><Link to="/sign-up" >Start Tracking For Free</Link></button>
          <button>See How it Works</button>
        </div>

      </main>
    </>
  );
}

export default LandingPage;
