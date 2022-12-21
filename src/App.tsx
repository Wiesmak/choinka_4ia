import React, {useState} from "react"
import {Header} from './components/Header'
import Select from 'react-select'
//import chroma from 'chroma-js'
import './App.sass'
import {Modes} from './libs/modes'
import {ModeInfo} from "./components/ModeInfo"
import Color from "./libs/color"
import {Action} from "./components/Action"
import axios from "axios"
import toast, {Toaster} from "react-hot-toast";

export default function App() {
  const [color, setColor] = useState(new Color(Modes[0]))
  const [rainbow, setRainbow] = useState("#61dafb")
  const [mode, setMode] = useState('off')
  const [uiColor, setUiColor] = useState('#61dafb')
  setInterval(() => setRainbow("#" + Math.floor(Math.random() * 16777215).toString(16)), 1000)

  return (
    <div className="App">
      <Toaster position="bottom-center" reverseOrder={false}/>
      <Header color = {
        mode === "off" ? 'black' :
          mode === "rainbow" ? rainbow :
            mode === "static" ? uiColor :
              mode === "dual" ? uiColor :
                mode === "point" ? uiColor : 'black'
      }/>
      <ModeInfo mode = {"Wyłączone"} color = {
        mode === "off" ? 'black' :
          mode === "rainbow" ? rainbow :
            mode === "static" ? uiColor :
              mode === "dual" ? uiColor :
                mode === "point" ? uiColor : 'black'
      }/>
      <Select options={Modes} className="select"
        theme = {(theme) => ({
          ...theme,
          borderRadius: 0,
            colors: {
              ...theme.colors,
              text: '#282c34',
              neutral0:
                mode === "off" ? 'black' :
                  mode === "rainbow" ? rainbow :
                    mode === "static" ? uiColor :
                      mode === "dual" ? uiColor :
                        mode === "point" ? uiColor : 'black',
              primary25:
                mode === "off" ? 'black' :
                  mode === "rainbow" ? rainbow :
                    mode === "static" ? uiColor :
                      mode === "dual" ? uiColor :
                        mode === "point" ? uiColor : 'black',
              primary:
                mode === "off" ? 'black' :
                  mode === "rainbow" ? rainbow :
                    mode === "static" ? uiColor :
                      mode === "dual" ? uiColor :
                        mode === "point" ? uiColor : 'black'
            }
        })}
        onChange = {(e) => {
          setMode(e?.value ?? "off")
          setColor(new Color({value: e?.value ?? "off", label: e?.label ?? "Wyłączone"}))
        }}
      />
      <Action
        mode = {mode}
        color = {color}
        setColor = {setColor}
        setUiColor={setUiColor}
      />
      <button className="button" style={{
        backgroundColor: mode === "off" ? 'black' :
          mode === "rainbow" ? rainbow :
            mode === "static" ? uiColor :
              mode === "dual" ? uiColor : 'black', transition: "1s"
      }} onClick={async () => {
        const selectedColor = uiColor.replace('#', '0x')
        switch (mode) {
          case "off":
            await toast.promise(
              new Promise<void>(
                async (resolve, reject) => {
                  try {
                    const res = await axios.get('http://localhost:3000/stop')
                    if (res.status === 200) {
                      console.log("Wyłączono")
                      resolve()
                    } else {
                      console.log("Błąd")
                      reject()
                    }
                  } catch {
                    console.log("Błąd")
                    reject()
                  }
                }
              ),
              {
                loading: <b>Ładowanie...</b>,
                success: <b>Wyłączono</b>,
                error: <b>Błąd</b>,
              },
            )
            break
          case "rainbow":
            await toast.promise(
              new Promise<void>(
                async (resolve, reject) => {
                  try {
                    console.log(uiColor)
                    const res = await axios.get('http://localhost:3000/rainbow')
                    if (res.status === 200) {
                      console.log("Włączono tryb rainbow")
                      resolve()
                    } else {
                      console.log("Błąd")
                      reject()
                    }
                  } catch {
                    console.log("Błąd")
                    reject()
                  }
                }
              ),
              {
                loading: <b>Ładowanie...</b>,
                success: <b>Włączono</b>,
                error: <b>Błąd</b>,
              }
            )
            break
          case "static":
            await toast.promise(
              new Promise<void>(
                async (resolve, reject) => {
                  try {
                    const res = await axios.get(`http://localhost:3000/static?color=${selectedColor}`)
                    if (res.status === 200) {
                      console.log("Włączono tryb statyczny")
                      resolve()
                    } else {
                      console.log("Błąd")
                      reject()
                    }
                  } catch {
                    console.log("Błąd")
                    reject()
                  }
                },
              ),
              {
                loading: <b>Ładowanie...</b>,
                success: <b>Włączono</b>,
                error: <b>Błąd</b>,
              }
            )
            break
          case "dual":
            await toast.promise(
              new Promise<void>(
                async (resolve, reject) => {
                  try {
                    //const res = await axios.get(`http://localhost:3000/dual?color=${uiColor}`)
                    const res = await axios.get(`http://localhost:3000/redgreen`)
                    if (res.status === 200) {
                      console.log("Włączono tryb dual")
                      resolve()
                    } else {
                      console.log("Błąd")
                      reject()
                    }
                  } catch {
                    console.log("Błąd")
                    reject()
                  }
                }
              ),
              {
                loading: <b>Ładowanie...</b>,
                success: <b>Włączono</b>,
                error: <b>Błąd</b>,
              }
            )
            break
          case "point":
            await toast.promise(
              new Promise<void>(
                async (resolve, reject) => {
                  try {
                    const res = await axios.get(`http://localhost:3000/point?color=${selectedColor}`)
                    if (res.status === 200) {
                      console.log("Włączono tryb point")
                      resolve()
                    } else {
                      console.log("Błąd")
                      reject()
                    }
                  } catch {
                    console.log("Błąd")
                    reject()
                  }
                },
              ),
              {
                loading: <b>Ładowanie...</b>,
                success: <b>Włączono</b>,
                error: <b>Błąd</b>,
              }
            )
            break
        }
      }}>Zapisz</button>
    </div>
  )
}
