import React from "react";
import {HexColorPicker} from "react-colorful";
import Color from "../libs/color";

export const Action = (props: { mode: string, color: Color, setColor: any, setUiColor: any, setDualColor: any, dualColor: any}) => {
  switch (props.mode) {
    case "off":
      return <div/>
    case "rainbow":
      return <div/>
    case "static":
      return <div className='row'>
        <HexColorPicker
          color={props.color.color}
          onChange={(color) => {
            props.setUiColor(color)
            props.setColor(new Color({value: props.mode, label: props.mode}))
          }}
        />
      </div>
    case "dual":
      return <div className="row">
        <HexColorPicker
          color={props.color.color}
          onChange={(color) => {
            props.setUiColor(color)
            props.setDualColor([color, props.dualColor[1]])
            props.setColor(new Color({value: props.mode, label: props.mode}))
          }}
        />
        <HexColorPicker
          color={props.color.color}
          onChange={(color) => {
            props.setUiColor(color)
            props.setDualColor([props.dualColor[0], color])
            props.setColor(new Color({value: props.mode, label: props.mode}))
          }}
        />
      </div>
    case "point":
      return <div className='row'>
        <HexColorPicker
          color={props.color.color}
          onChange={(color) => {
            props.setUiColor(color)
            props.setColor(new Color({value: props.mode, label: props.mode}))
          }}
        />
      </div>
    default:
      return <div/>
  }
}
