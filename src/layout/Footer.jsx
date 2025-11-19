import React from 'react'

function Footer() {
  return (
    <footer className="border-t bg-gradient-to-r from-gray-50 to-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Powered by popcorn and geolocation.
          </p>
          <p className="text-gray-500">
            © {new Date().getFullYear()} SceneSpot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer