import React from 'react';
import './index.css';
import MouseEffect from './components/MouseEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import { Stars, Skills, Projects, Contact, Footer } from './components/Sections';

export default function App() {
  return (
    <>
      <MouseEffect />
      <Stars />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
