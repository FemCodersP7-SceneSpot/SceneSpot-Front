import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header({onOpenLogin}) {
  let navigate = useNavigate();
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          className="flex items-center gap-2 hover:opacity-80 transition-all hover:scale-105"
          onClick={()=> navigate("/")}>
            <img alt="SceneSpot Logo"
                 className="h-16 w-16 object-contain"
                 src='/Film_Reel_Map_Logo.png' />
        </button>
        <div className="flex items-center gap-5">
          <button onClick={() => onOpenLogin('login')}>Log In</button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-sm px-5 py-2 hover:from-blue-700 hover:to-purple-700"
                onClick={() => onOpenLogin('signup')}>Sign Up</button>
      </div>
      </div>

      
    </header>
  )
}

export default Header