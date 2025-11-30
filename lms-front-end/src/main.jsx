import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import axios from "axios";
import AppRoutes from './routes/AppRoutes'
axios.defaults.baseURL = "http://localhost:8080";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <AppRoutes />
   
  </React.StrictMode>
)