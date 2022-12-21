export const Header = (props: { color: string }) => {
  return (
    <header className = "App-header">
      <div style = {{ color: props.color, transition: "1s" }}>
        Choinka 4ia
      </div>
    </header>
  )
}
