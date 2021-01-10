import React from 'react'

import logo from '../logo.png'

function Header(props) {
  return (
    <div className="row header box">
      <img src={logo} alt={'logo'} />
      <h1>Memory Game</h1>
      <div className="scores">
        <span>Max score: 150</span>
        <span>Current score: {props.score}</span>
      </div>
    </div>
  )
}

export default Header
