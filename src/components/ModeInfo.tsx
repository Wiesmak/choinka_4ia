export const ModeInfo = (props: {mode: string, color: string}) => {
  return (
    <div className = "Mode-info" style={{color: props.color, transition: "1s" }}>
      {props.mode}
    </div>
  )
}
