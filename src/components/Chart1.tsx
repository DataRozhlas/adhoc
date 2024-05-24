import Highcharts from 'highcharts';
import { HighchartsChart, HighchartsProvider, Chart, Legend, BarSeries, XAxis, YAxis, Tooltip } from "react-jsx-highcharts";

const data = [
    ["Ministerstvo financí", 57498, 58279, 57722, 60122, 61119, 59218, 61004],
    ["Ministerstvo obrany", 56636, 57562, 57654, 59520, undefined, 60990, 60803],
    ["Ministerstvo životního prostředí", 49506, 52193, 54201, 56744, 57899, 53724, 57911],
    ["Úřad vlády České republiky", 47741, 51552, 55647, 56582, 57104, 54477, 55829],
    ["Ministerstvo dopravy", 55631, 56849, 59292, 57841, 59914, 58049, 55145],
    ["Ministerstvo průmyslu a obchodu", 54892, 56973, 56905, 56356, 59065, 56386, 55016],
    ["Ministerstvo pro místní rozvoj", 51321, 52489, 50654, 53413, 54961, 54064, 54634],
    ["Ministerstvo zdravotnictví", 52102, 53531, 57288, 56465, 57915, 52611, 52996],
    ["Ministerstvo práce a sociálních věcí", 50442, 53281, 55022, 56747, 57425, 51671, 52849],
    ["Ministerstvo kultury", 49338, 50884, 51475, 52522, 52868, 52387, 51642],
    ["Ministerstvo spravedlnosti", 49805, 53269, 54804, 55968, 55481, 50626, 50141],
    ["Ministerstvo zemědělství", 50044, 51325, 51092, 51299, 57221, 49668, 49414],
    ["Ministerstvo školství, mládeže a tělovýchovy", 49760, 51785, 51783, 54461, 55258, 51591, 48899],
    ["Ministerstvo zahraničních věcí", 40946, 42986, 45047, 43757, 44623, 41200, 47143],
    ["Ministerstvo vnitra", 46406, 48785, 50576, 51055, undefined, 45903, 46000]
];

const colors = [
    "#3f558c",
    "#5784d9",
    "#806cb3",
    "#f5ab4a",
    "#6cc3d9",
    "#f16084",
    "#34b2b2",
    "#b5b5bf",
]

Highcharts.setOptions({
    lang: {
        numericSymbols: [" tis.", " mil.", " mld.", " bil."],
    }
});

function Chart1() {
    return <HighchartsProvider Highcharts={Highcharts}>
        <h1 className="text-2xl font-bold">Jak se změnily průměrné platy na ministerstvech</h1>
        <h2>Ministerstva vnitra a obrany údaje za rok 2022 neposkytla – jen sloučené s platy vojáků, hasičů a policistů</h2>
        <HighchartsChart plotOptions={{
            bar: {
                pointPadding: 0,
                groupPadding: 0.1,
            },
            series: {
                animation: false,
                states: { hover: { enabled: false } }, // disable hover
            }
        }}>
            <Chart height={750} />

            <Legend layout="horizontal" align="center" verticalAlign="top" />

            <Tooltip shared valueSuffix=' Kč' />

            <XAxis categories={data.map((line) => String(line[0]))}>

            </XAxis>

            <YAxis>
                <YAxis.Title>Průměrné platy (Kč)</YAxis.Title>
                <BarSeries name="2022" data={data.map((line) => Number(line[line.length - 3]))} color={colors[1]} datalbels={{ enabled: false }} />
                <BarSeries name="2024" data={data.map((line) => Number(line[line.length - 1]))} color={colors[0]} dataLabels={{ enabled: true, inside: true, align: "right", formatter: function () { return `${this.y?.toLocaleString("cs-CZ") || null} Kč` } }} />
            </YAxis>
        </HighchartsChart>
        <p className="text-xs text-end">
            Zdroj dat: Ministerstvo financí
        </p>
        <p className="text-xs text-end">
            Údaje ze Státního závěrečného účtu (2022) a ze schváleného rozpočtu (2024)
        </p>


    </HighchartsProvider>;
}

export default Chart1;