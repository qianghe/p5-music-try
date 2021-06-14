import React, { useEffect } from 'react'
import P5 from './p5'
import run from './Animation/run'
import './index.css'

function Music() {
  useEffect(() => {
    // load p5 modules
    P5.excute(run)
  }, [])
  return '';
}

export default Music
