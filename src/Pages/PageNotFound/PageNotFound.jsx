import React from 'react'
import { Link } from 'react-router'
export default function PageNotFound() {
  return (
     <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p style={{color:"blue"}}>
      <Link to="/" style={{color:"blue"}}>Go Back Home</Link>

      </p>
    </div>
  )
}
