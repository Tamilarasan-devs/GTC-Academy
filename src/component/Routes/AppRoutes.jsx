import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Course from '../pages/Course';
import Contact from '../pages/Contact';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<Course />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
