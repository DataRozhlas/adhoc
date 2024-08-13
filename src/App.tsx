import { useEffect } from "react";

import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";
import Chart1 from './components/Chart1'
import Chart2 from './components/Chart2'
import Chart3 from './components/Chart3'
import Chart4 from './components/Chart4'
import Chart5 from './components/Chart5'



import './App.css'

type AppProps = {
  id: string
}

function App(props: AppProps) {

  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`adhoc-${props.id}`);

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      {props.id === "1" && <Chart1 />}
      {props.id === "2" && <Chart2 />}
      {props.id === "3" && <Chart3 />}
      {props.id === "4" && <Chart4 />}
      {props.id === "5" && <Chart5 />}



    </div>
  )
}

export default App
