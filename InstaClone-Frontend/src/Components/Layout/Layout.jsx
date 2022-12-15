import React, { useContext } from 'react'
import AuthContext from '../../context/Auth'
import Navbar from '../Navbar/Navbar'

export default function Layout({ children }) {
  const { user } = useContext(AuthContext)
  return (
    <div>
      {user && <Navbar />}
      {children}
    </div>
  )
}
