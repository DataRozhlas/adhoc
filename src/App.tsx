import './App.css'
import Chart1 from './components/Chart1'

type AppProps = {
  id: string
}

function App(props: AppProps) {

  return (
    <div>
      {props.id === "1" && <Chart1 />}
    </div>
  )
}

export default App
