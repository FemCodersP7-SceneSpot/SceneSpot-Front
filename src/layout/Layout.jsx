import React, { useState } from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Modal from '../components/Modal';

function Layout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState('login');

  const handleOpenLogin = (type) =>{
    setMode(type);
    setModalOpen(true);
  }
  const handleCloseModal = () => setModalOpen(false);
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header onOpenLogin={handleOpenLogin}/>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />

      <Modal 
        isOpen={modalOpen}
        onClose={handleCloseModal}
        defaultMode={mode}/>
      
    </div>
  )
}

export default Layout