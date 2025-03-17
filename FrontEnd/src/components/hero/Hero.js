import React from 'react'
import { useNavigate } from 'react-router-dom'
import './hero.css'
import CustomButton from '../buttons/CustomButton'

function Hero() {
    const navigate  = useNavigate();
  return (
    <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">GOLD PR</h1>
          <p className="hero-subtitle">Finance & Audit</p>
          <hr className='ct-hr-styled'></hr>
          <br></br>
          <ul>
            <li>Gain Idea on Gold Prices</li>
            <li>Gain Insight on outlets</li>
            <li>Gain Idea on new Investment oppurtunities</li>
          </ul>

          <CustomButton 
            text="Join with Us" 
            onClick={() => navigate('/forms/sign-up')} 
            color="#ffb80e" 
            filled={false}
          />

        </div>
        <div className="hero-link">
          {/* <h1 className="hero-title">FINVISION</h1>
          <p className="hero-subtitle">Finance & Audit</p> */}
        </div>
        <img className="hero-image" src={process.env.PUBLIC_URL+'/animations/finance-growth-animation-download-in-lottie-json-gif-static-svg-file-formats--money-plant-saving-pack-business-animations-4657351-ezgif.com-gif-maker.gif'}>
        </img>
    </section>
  )
}

export default Hero