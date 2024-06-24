import Highcharts from 'highcharts';
import { HighchartsChart, HighchartsProvider, Chart, BarSeries, XAxis, YAxis, Tooltip } from "react-jsx-highcharts";

const data = [
    ["množství vydaných surovin", 185],
    ["množství připraveného jídla", 213],
    ["množství potravinového odpadu", 47]
];

Highcharts.setOptions({
    lang: {
        numericSymbols: [" tis.", " mil.", " mld.", " bil."],
    },
    colors: ['#d7191c', '#fdae61', '#a6d96a'].reverse()
});


function Chart2() {

    return (
        <HighchartsProvider Highcharts={Highcharts}>
            <h1 className="text-2xl font-bold">Denní množství surovin, jídla a potravinového odpadu</h1>
            <h2>Na jednoho strávníka připadá 120 gramů potravinového odpadu</h2>
            <HighchartsChart plotOptions={{
                bar: {
                    pointPadding: 0,
                    groupPadding: 0.1,
                    colorByPoint: true
                },
                series: {
                    animation: false,
                    states: { hover: { enabled: false } }, // disable hover
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.0f} kg',
                    }
                },

            }}>
                <Chart height={200} marginRight={20} />


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
                    <BarSeries name="hmotnost" data={data.map((line) => Number(line[1]))} />

                </YAxis>
            </HighchartsChart>
            <p className="text-xs text-end">
                Zdroj dat: INESAN 2023
            </p>

        </HighchartsProvider>
    )
}

export default Chart2;