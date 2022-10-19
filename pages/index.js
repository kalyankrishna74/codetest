import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './components/globalStyles'
import { lightTheme, darkTheme } from "./components/theme"
import User from './components/User';


export default function Home() {


  return (
    <div className={styles.container}>
      <User />
    </div>

  )
}
