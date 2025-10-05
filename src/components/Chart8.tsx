import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import annotations from "highcharts/modules/annotations";
import {
  HighchartsChart,
  HighchartsProvider,
  Chart,
  ScatterSeries,
  LineSeries,
  XAxis,
  YAxis,
  PlotLine,
} from "react-jsx-highcharts";

HighchartsMore(Highcharts);
annotations(Highcharts);
function Chart8() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Vliv demografie obcí na změnu volební účasti mezi lety 2021 a 2025
      </h1>
      <p>
        Každý procentní bod nezaměstnaných v obci znamená zvýšení volbení účasti
        od minulých voleb o 0,376 procentního bodu. Každý procentní bod podílu
        podnikatelů na obyvatelstvu obce znamená snížení úřasti o 0,262
        procentního bodu ve srovnání s rokem 2021. Světle červená ukazuje
        interval spolehlivosti statistického modelu.
      </p>
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart
          plotOptions={{
            series: {
              enableMouseTracking: false,
            },
            line: {
              lineWidth: 14,
              color: "#f0d3d7",
            },
          }}
        >
          <Chart type="scatter" />
          <XAxis
            labels={{
              formatter: ({ value }) => {
                return value.toLocaleString("cs-CZ") + " %";
              },
            }}
            min={-0.45}
            max={0.45}
          >
            <PlotLine
              value={0}
              color="black"
              width={1}
              dashStyle="ShortDot"
              label={{
                text: "← nižší účast",
                align: "left",
                x: -88,
                style: {
                  fontSize: "0.8rem",
                  color: "#666",
                  fontWeight: "bold",
                },
                rotation: 0,
                useHTML: true,
              }}
            />
            <PlotLine
              value={0}
              color="black"
              width={1}
              dashStyle="ShortDot"
              label={{
                text: "vyšší účast →",
                align: "right",
                x: 90,
                rotation: 0,
                style: {
                  fontSize: "0.8rem",
                  color: "#666",
                  fontWeight: "bold",
                },
                useHTML: true,
              }}
            />
          </XAxis>
          <YAxis
            type="category"
            categories={[
              "podíl nezaměstaných v obci",
              "podíl lidí se základním vzděláním",
              "podíl lidí v exekucích",
              "podíl věřících",
              "podíl podnikatelů",
            ]}
            reversed={true}
            min={0}
            max={4}
            gridLineWidth={0}
          >
            <LineSeries
              data={[
                { x: 0.338, y: 0 },
                { x: 0.415, y: 0 },
              ]}
              states={{ hover: { enabled: false } }}
              animation={false}
            />
            <LineSeries
              data={[
                { x: 0.176, y: 1 },
                { x: 0.212, y: 1 },
              ]}
              states={{ hover: { enabled: false } }}
              animation={false}
            />
            <LineSeries
              data={[
                { x: -0.012, y: 2 },
                { x: 0.02, y: 2 },
              ]}
              states={{ hover: { enabled: false } }}
              animation={false}
            />
            <LineSeries
              data={[
                { x: -0.024, y: 3 },
                { x: -0.008, y: 3 },
              ]}
              states={{ hover: { enabled: false } }}
              animation={false}
            />
            <LineSeries
              data={[
                { x: -0.3, y: 4 },
                { x: -0.223, y: 4 },
              ]}
              states={{ hover: { enabled: false } }}
              animation={false}
            />

            <ScatterSeries
              name="scatter"
              states={{ hover: { enabled: false } }}
              animation={false}
              data={[
                {
                  x: 0.376,
                  y: 0,
                  name: "Point2",
                  color: "#d44060",
                  marker: {
                    symbol: "circle",
                    radius: 7,
                  },
                },
                {
                  x: 0.194,
                  y: 1,
                  name: "Point1",
                  color: "#d44060",
                  marker: {
                    symbol: "circle",
                    radius: 7,
                  },
                },
                {
                  x: 0.004,
                  y: 2,
                  name: "Point1",
                  color: "#d44060",
                  marker: {
                    symbol: "circle",
                    radius: 7,
                  },
                },
                {
                  x: -0.016,
                  y: 3,
                  name: "Point1",
                  color: "#d44060",
                  marker: {
                    symbol: "circle",
                    radius: 7,
                  },
                },
                {
                  x: -0.262,
                  y: 4,
                  name: "Point1",
                  color: "#d44060",
                  marker: {
                    symbol: "circle",
                    radius: 7,
                  },
                },
              ]}
              dataLabels={{
                enabled: true,
                padding: 15,
                style: {
                  fontSize: "0.8rem",
                  textOutline: "none",
                },
                formatter: function (this: any) {
                  const value = this.x;
                  const sign = value >= 0 ? "+" : "";
                  return sign + "" + value?.toLocaleString("cs-CZ") + " p.b.";
                },
              }}
            />
          </YAxis>

          {/* <ScatterSeries data={[{x: 0.376, y: "podíl nezaměstnaných (%)"}} />
      <ScatterSeries data={[0.194]} />
      <ScatterSeries data={[0.004]} />
      <ScatterSeries data={[-0.016]} />
      <ScatterSeries data={[-0.262]} /> */}
        </HighchartsChart>
      </HighchartsProvider>
      <p style={{ fontSize: "0.8rem", color: "#ACABAC", textAlign: "end" }}>
        analýza: Jakub Lysek, KPES UPOL | vizualizace: iROZHLAS.cz
      </p>
    </div>
  );
}

export default Chart8;
