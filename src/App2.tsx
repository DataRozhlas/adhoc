import { useEffect } from "react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";
import { ComponentType } from "react";
import './App.css'
import React from "react";

const charts = import.meta.glob('./components/Chart*.tsx', { eager: false }) as Record<
  string,
  () => Promise<{ default: ComponentType<any> }>
>;

type AppProps = {
  id: string,
  chartIds?: string[] // Optional array of chart IDs to render
}

function App(props: AppProps) {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`adhoc-${props.id}`);

  useEffect(() => {
    postHeightMessage();
  }, []);

  const filteredCharts = props.chartIds
    ? Object.entries(charts).filter(([path]) => {
      const chartId = path.match(/Chart(\d+)/)?.[1];
      return props.chartIds?.includes(chartId || '');
    })
    : Object.entries(charts);

  return (
    <div ref={containerRef}>
      {filteredCharts.map(([path, component]) => (
        <React.Suspense key={path} fallback={<div>Loading chart...</div>}>
          {React.createElement(React.lazy(() => component()))}
        </React.Suspense>
      ))}
    </div>
  );
}

export default App;