import Highcharts from 'highcharts';
import { HighchartsChart, HighchartsProvider, Chart, BarSeries, XAxis, YAxis } from "react-jsx-highcharts";

import medals from "../assets/olympic-medals-pop-gdp.json"

import { useState, useEffect } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


function assignRanks(data: any[]): any[] {
    let rank = 1;
    let prevValue = data[0].t;
    data[0].cz = `<strong>${rank}.</strong> ${data[0].cz}`;

    for (let i = 1; i < data.length; i++) {
        if (data[i].t !== prevValue) {
            rank = i + 1;
            prevValue = data[i].t;
            data[i].cz = `<strong>${rank}.</strong> ${data[i].cz}`;
        }
    }

    return data;
}

function getRank(value: number, data: any[]): number {
    const rank = data.findIndex((country: any) => country.t === value) + 1;
    return rank;
}

function prepareData(medalMethod: string, relativeMethod: string): { cz: string; t: number }[] {
    if (medalMethod === "all") {
        if (relativeMethod === "pop") {
            const result = medals.filter((country: any) => country.pop > 0).map((country: any) => { return { cz: country.cz, t: country.pop / country.t } });
            result.sort((a, b) => a.t - b.t);
            return assignRanks(result);
        }
        if (relativeMethod === "gdp") {
            const result = medals.filter((country: any) => country.gdp > 0).map((country: any) => { return { cz: country.cz, t: country.gdp / 1000000 / country.t } });
            result.sort((a, b) => a.t - b.t);
            return assignRanks(result);
        }
        return assignRanks(medals.map((country: any) => { return { cz: country.cz, t: country.t } }));

    }
    if (medalMethod === "gold") {
        if (relativeMethod === "pop") {
            const result = medals.filter((country: any) => country.g > 0).map((country: any) => { return { cz: country.cz, t: country.pop / country.g } });
            result.sort((a, b) => a.t - b.t);
            return assignRanks(result);
        }
        if (relativeMethod === "gdp") {
            const result = medals.filter((country: any) => country.g > 0 && country.gdp > 0).map((country: any) => { return { cz: country.cz, t: country.gdp / 1000000 / country.g } });
            result.sort((a, b) => a.t - b.t);
            return assignRanks(result);
        }
        return assignRanks(medals.filter((country: any) => country.g > 0).map((country: any) => { return { cz: country.cz, t: country.g } }).sort((a, b) => {
            const diff = b.t - a.t;
            if (diff === 0) {
                return a.cz.localeCompare(b.cz);
            }
            return diff;
        }));
    }
    if (medalMethod === "weighted") {
        if (relativeMethod === "pop") {
            const result = medals.map((country: any) => { return { cz: country.cz, t: country.pop / country.w } });
            result.sort((a, b) => a.t - b.t);
            return assignRanks(result);
        }
        if (relativeMethod === "gdp") {
            const result = medals.map((country: any) => { return { cz: country.cz, t: country.gdp / 1000000 / country.w } });
            result.sort((a, b) => a.t - b.t);
            return assignRanks(result);
        }
        return assignRanks(medals.map((country: any) => { return { cz: country.cz, t: country.w } }).sort((a, b) => {
            const diff = b.t - a.t;
            if (diff === 0) {
                return a.cz.localeCompare(b.cz);
            }
            return diff;
        }));;
    }
    return [];
}

function Chart5() {

    const [medalMethod, setMedalMethod] = useState("all")

    const [relativeMethod, setRelativeMethod] = useState("none")

    const [data, setData] = useState([] as { cz: string; t: number }[])

    const [czechia, setCzechia] = useState(5)

    useEffect(() => {
        const newData = prepareData(medalMethod, relativeMethod);
        setData(newData);
    }, [medalMethod, relativeMethod])


    useEffect(() => {
        console.log(data);
        const czechiaCountry = data.find((country: any) => country.cz.toString().includes("Česká republika"));
        if (czechiaCountry) {
            setCzechia(czechiaCountry.t);
        }
    }, [data])

    return <div className="max-w-[620px] mx-auto">
        <h1 className="text-2xl font-bold">Pořadí států podle počtu medailí na LOH 2024 v Paříži</h1>
        <p className="pb-4">Vyzkoušejte si, jak se žebříček změní, když upravíte kritéria.</p>

        <div className="flex flex-wrap pb-4">

            <div className="pb-4 md:w-1/2">
                <h2 className="font-bold pb-1">Jak budeme medaile počítat?</h2>
                <RadioGroup defaultValue="all" onValueChange={value => setMedalMethod(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">Všechny medaile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gold" id="gold" />
                        <Label htmlFor="gold">Jen zlaté</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weighted" id="weighted" />
                        <Label htmlFor="weighted">Vážené <span className="text-xs">(zlato = 4, stříbro = 2, bronz = 1)</span></Label>
                    </div>
                </RadioGroup>
            </div>


            <div className="pb-4 md:w-1/2">
                <h2 className="font-bold pb-1">Zohledníme lidnatost a bohatství států?</h2>
                <RadioGroup defaultValue="none" onValueChange={value => setRelativeMethod(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none">Nezohledňovat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pop" id="pop" />
                        <Label htmlFor="pop">Přepočítat podle počtu obyvatel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gdp" id="gdp" />
                        <Label htmlFor="gdp">Přepočítat podle HDP</Label>
                    </div>
                </RadioGroup>
            </div>


        </div>

        <div>
            <HighchartsProvider Highcharts={Highcharts}>
                <HighchartsChart plotOptions={{
                    bar: {
                        pointPadding: 0,
                        groupPadding: 0.1,
                    },
                    series: {
                        animation: false,
                        states: { hover: { enabled: false } }, // disable hover
                        dataLabels: {
                            enabled: true,
                            formatter: function (this: any) {
                                if (this.point.index === 0) {
                                    const words = function () {
                                        switch (medalMethod) {
                                            case "gold":
                                                if (relativeMethod === "pop") return "obyvatel na zlatou medaili";
                                                if (relativeMethod === "gdp") return "milionů dolarů HDP na zlatou medaili";
                                                return "zlatých medailí";
                                            case "weighted":
                                                if (relativeMethod === "pop") return "obyvatel na váženou medaili";
                                                if (relativeMethod === "gdp") return "milionů dolarů HDP na váženou medaili";
                                                return "vážených medailí";
                                            default:
                                                if (relativeMethod === "pop") return "obyvatel na medaili";
                                                if (relativeMethod === "gdp") return "milionů dolarů HDP na medaili";
                                                return "medailí";
                                        }
                                    }

                                    return `${this.point.y?.toLocaleString("cs", { maximumFractionDigits: 0 })} ${words()}`;
                                };
                                return this.point.y?.toLocaleString("cs", { maximumFractionDigits: 0 });
                            },
                            style: {
                                textOutline: 'none',
                            }
                        }
                    },

                }}>
                    <Chart height={data.length * 25} marginRight={20} marginTop={25} />



                    <XAxis categories={data.map(country => String(country.cz))}
                        labels={{
                            formatter: function ({ value }) {
                                if (value.toString().includes("Česká republika")) {
                                    return `<b>${this.value}</b>`;
                                }
                                return this.value.toString();
                            }
                        }}
                    >

                    </XAxis>

                    <YAxis
                        tickAmount={2}
                        labels={{
                            formatter: ({ value, isLast }) => {
                                const words = function () {
                                    switch (medalMethod) {
                                        case "gold":
                                            if (relativeMethod === "pop") return "obyvatel na zlatou medaili";
                                            if (relativeMethod === "gdp") return "milionů dolarů HDP na zlatou medaili";
                                            return "zlatých medailí";
                                        case "weighted":
                                            if (relativeMethod === "pop") return "obyvatel na váženou medaili";
                                            if (relativeMethod === "gdp") return "milionů dolarů HDP na váženou medaili";
                                            return "vážených medailí";
                                        default:
                                            if (relativeMethod === "pop") return "obyvatel na medaili";
                                            if (relativeMethod === "gdp") return "milionů dolarů HDP na medaili";
                                            return "medailí";
                                    }
                                }


                                const label = isLast ? `${value.toLocaleString("cs", { maximumFractionDigits: 0 })} ${words()}` : `${value}`;
                                return label;
                            }
                        }}
                        plotLines={[{
                            value: czechia,
                            color: 'grey',
                            width: 2,
                            dashStyle: "ShortDot",
                            label: {
                                text: `Česko (${getRank(czechia, data)}. místo)`,
                                rotation: 0,
                                x: -10,
                                y: -7
                            }
                        }]}
                    >
                        <BarSeries name={medalMethod === "gold" ? "zlaté medaile" : medalMethod === "weighted" ? "vážené medaile" : "medaile"} data={data.map((country) => Number(country.t))} />

                    </YAxis>
                </HighchartsChart>
                <p className="text-xs text-end">
                    Zdroj dat: <a href="https://medalspercapita.com/">Olympic Medals per Capita</a>
                </p>

            </HighchartsProvider >
        </div >

    </div >
}

export default Chart5;