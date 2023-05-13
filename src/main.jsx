import React from 'react'
import ReactDOM from 'react-dom/client'
import MyRoute from './MyRoute';

{/*import Bootstrap*/}
import 'bootstrap/dist/css/bootstrap.min.css';

{/*import './index.css'*/}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyRoute />
  </React.StrictMode>,
)
