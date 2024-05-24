import { useEffect } from "react";

import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";
import Chart1 from './components/Chart1'

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
    </div>
  )
}

export default App
