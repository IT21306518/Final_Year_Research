import React from 'react';
import Nav from '../components/nav/Nav';
import Hero from '../components/hero/Hero';
import BusinessCard from '../components/cards/BusinessCard';
import { AiFillPhone, AiFillMail, AiFillMoneyCollect } from 'react-icons/ai'
import Footer from '../components/footer/Footer';

const OpenPage = () => {
  return (
    <div className="open-page">
      {/* Header Section */}
      <Nav/>

      {/* Hero Section */}
      <Hero />
      <div className='container-center dark'>
        <div className='content'>
            <h1 className="hero-title-md">SERVICES</h1>
            <p className='hero-subtitle'>Services We Provide</p>
            <hr className='ct-hr-styled'></hr>
        </div>
        
      </div>
      <div className='cards-container dark'>
        <BusinessCard 
            name="Get Insight"
            position="Up-to-date details on Price fluctuations"
            logo={process.env.PUBLIC_URL+'/animations/hand.gif'}
            details={[
                { icon: <AiFillPhone className='icon' />, text: '+00 123 456 789' },
                { icon: <AiFillMail className='icon' />, text: 'email@example.com' },
                { icon: <AiFillMoneyCollect className='icon' />, text: 'www.example.com' },
              ]}
        />
        <BusinessCard 
            name="Get Insight"
            position="Up-to-date details on Price fluctuations"
            logo={process.env.PUBLIC_URL+'/animations/cal.gif'}
            details={[
                { icon: <AiFillPhone className='icon' />, text: '+00 123 456 789' },
                { icon: <AiFillMail className='icon' />, text: 'email@example.com' },
                { icon: <AiFillMoneyCollect className='icon' />, text: 'www.example.com' },
              ]}
        />
      </div>

      {/* Main Content */}
      <main className="content">
        <div className="intro">
          <h2 className="intro-title">Financial Advice for</h2>
          {/* Additional content sections can be added here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OpenPage;
