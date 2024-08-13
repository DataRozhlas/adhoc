import Highcharts from 'highcharts';
import { HighchartsChart, HighchartsProvider, Chart, PieSeries, XAxis, YAxis, Tooltip } from "react-jsx-highcharts";

const data = [
    ["jídlo", 77.7],
    ["odpad", 22.3]
];

Highcharts.setOptions({
    lang: {
        numericSymbols: [" tis.", " mil.", " mld.", " bil."],
    },
});


function Chart3() {

    return (
        <HighchartsProvider Highcharts={Highcharts}>
            <h1 className="text-2xl font-bold">Množství odpadu na 100 kg připraveného jídla</h1>
            <HighchartsChart plotOptions={{
                pie: {
                    innerSize: '60%',
                },
                series: {
                    animation: false,
                    states: { hover: { enabled: false } }, // disable hover
                    dataLabels: {
                        enabled: true,
                        formatter: function () {

                            return `${data[this.point.index][0]}: ${this.y} kg`
                        }
                    }

                },

            }}>
                <Chart height={300} />


                <Tooltip shared valueSuffix=' kg' />

                <XAxis categories={data.map((line) => String(line[0]))}>

                </XAxis>

                <YAxis
                    labels={{
                        formatter: ({ value, isLast }) => {
                            const label = isLast ? `${value} kg` : `${value}`;
                            return label;
                        }
                    }}>
                    <PieSeries name="hmotnost" data={data.map((line) => Number(line[1]))} colors={["lightgrey", "#d7191c"]} />

                </YAxis>
            </HighchartsChart>
            <p className="text-xs text-end">
                Zdroj dat: INESAN 2023
            </p>

        </HighchartsProvider>
    )
}

export default Chart3;