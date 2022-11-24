import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Menu } from './components/Menu'
import { Footer } from './components/Footer'

import { Inicio } from './pages/Inicio'
import { Sobre } from './pages/Sobre'
import { Portfolio } from './pages/Portfolio'
import { Contato } from './pages/Contato'

export function Router() {
  return(
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
