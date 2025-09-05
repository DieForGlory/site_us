import React from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Projects from './components/Projects/Projects'
import CompanyStats from './components/CompanyStats/CompanyStats'
import Advantages from './components/Advantages/Advantages'
import News from './components/News/News'
import Cta from './components/Cta/Cta'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Projects />
      <CompanyStats />
      <Advantages />
      <News />
      <Cta />
      <Footer />
    </div>
  )
}

export default App