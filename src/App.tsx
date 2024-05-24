import './App.css'

type AppProps = {
  id: string
}

function App(props: AppProps) {

  return (
    <div className="text-xl underline">
      {`${props.id}, volevi dire qualcosa?`}
    </div>
  )
}

export default App
