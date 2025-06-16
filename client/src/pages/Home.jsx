import React from 'react';
import Hero from '../components/Hero';
import DetailPage from '../components/DetailPage';
import Image from '../components/Image';
import MedicalServices from '../components/MedicalServices';
import Footer from "../components/Footer";


function Home() {
  return (
    <>
    <Hero />
    <DetailPage/>
    <Image/>
    <MedicalServices/>
    <Footer />
  </>
  );
}

export default Home;
