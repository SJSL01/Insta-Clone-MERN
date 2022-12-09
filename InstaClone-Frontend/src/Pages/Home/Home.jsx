import React, { useContext } from 'react'
import AuthContext from '../../context/Auth'

export default function Home() {

    const {name} = useContext(AuthContext)

  return (
    <div>hello {name}</div>
  )
}
