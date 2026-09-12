import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GanpatiSplashScreen from './GanpatiSplashScreen.jsx'
import './style.css'

function Root() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return <GanpatiSplashScreen duration={2600} onFinish={() => setReady(true)} />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
