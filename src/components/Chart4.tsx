import Highcharts from 'highcharts';
import { HighchartsChart, HighchartsProvider, Chart, PieSeries, XAxis, YAxis, Tooltip } from "react-jsx-highcharts";

const data = [
    ["nevyhnutelné", 96],
    ["vyhnutelné", 4]
];

Highcharts.setOptions({
    lang: {
        numericSymbols: [" tis.", " mil.", " mld.", " bil."],
    },
});



function Chart4() {

    return (
        <HighchartsProvider Highcharts={Highcharts}>
            <h1 className="text-2xl font-bold">Struktura potravinového odpadu při přípravě jídla</h1>
            <h2>Nevyhnutelné jsou ve fázi přípravy zejména hovězí kosti a zbytky ze zpracování zeleniny</h2>

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

                            return `${data[this.point.index][0]}: ${this.y} %`
                        }
                    }

                },

            }}>
                <Chart height={300} />


                <Tooltip shared valueSuffix=' %' />

                <XAxis categories={data.map((line) => String(line[0]))}>

                </XAxis>

                <YAxis
                    labels={{
                        formatter: ({ value, isLast }) => {
                            const label = isLast ? `${value} kg` : `${value}`;
                            return label;
                        }
                    }}>
                    <PieSeries name="podíl" data={data.map((line) => Number(line[1]))} colors={["lightgrey", '#fdae61']} />

                </YAxis>
            </HighchartsChart>
            <p className="text-xs text-end">
                Zdroj dat: INESAN 2023
            </p>

        </HighchartsProvider>
    )
}

export default Chart4;