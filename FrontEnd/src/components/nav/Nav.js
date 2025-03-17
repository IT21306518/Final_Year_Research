import React from 'react'
import './nav.css'

export default function Nav() {

  return (
    <header className="header">
        <div className="contact-info">
          <span className="email">GOLD.COM</span>
          <span className="phone">+94 734 324 924</span>
        </div>
        <nav className="navigations">
          <a href="#home" className="active">Home</a>
          <a href="#pages">Pages</a>
          <a href="#features">Features</a>
          <a href="#shop">Shop</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>
    </header>
  )
}
