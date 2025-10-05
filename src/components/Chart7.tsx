import Highcharts from "highcharts";
import {
  HighchartsChart,
  HighchartsProvider,
  Chart,
  ColumnSeries,
  XAxis,
  YAxis,
  Legend,
} from "react-jsx-highcharts";

function Chart7() {
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono",
        border: "1px solid #ACABAC",
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginBottom: "1.2rem",
        }}
      >
        SLOUPCOVÝ GRAF
      </h1>
      <h2 style={{ color: "#555555" }}>
        Za rok 1806 najdeme v národní bibliografii 16 publikací, které obsahují
        slovo <i>hodnota</i>. Takový rozdíl nejde smysluplně zobrazit na stejném
        stupni. Proto graf obsahuje tři různé stupně.
      </h2>
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart>
          <Chart type="column" style={{ fontFamily: "JetBrains Mono" }} />
          <Legend
            layout="horizontal"
            align="right"
            verticalAlign="top"
            symbolRadius={0}
            itemDistance={30}
          />
          <XAxis type="category" />
          <YAxis
            labels={{
              enabled: true,
              align: "left",
              x: -10,
              formatter: ({ value, isLast }) => {
                return isLast
                  ? `<span style="color:black">${value} VĚCÍ</span>`
                  : `<span style="color:#ACABAC">${value}</span>`;
              },
            }}
            gridLineWidth={1}
            gridLineColor="#E5E5E5"
            // plotLines={[{ value: 12, color: "black", width: 2 }]}
          >
            <ColumnSeries
              data={[3, 2, 1]}
              stacking="normal"
              color="#4BDDDA"
              borderRadius={"10%"}
              borderColor={"black"}
            />
            <ColumnSeries
              data={[3, 2, 1]}
              stacking="normal"
              color="#FFC833"
              borderColor={"black"}
            />
            <ColumnSeries
              data={[3, 2, 1]}
              stacking="normal"
              color="#FF8FB0"
              borderColor={"black"}
            />
            <ColumnSeries
              data={[1, 2, 3]}
              stacking="normal"
              color="#A13CC2"
              borderColor={"black"}
            />
          </YAxis>
        </HighchartsChart>
      </HighchartsProvider>

      <p style={{ fontSize: "0.8rem", color: "#ACABAC" }}>
        data: Česká biskupská konference | vizualizace: iROZHLAS.cz
      </p>
    </div>
  );
}

export default Chart7;
