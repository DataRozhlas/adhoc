import Highcharts from 'highcharts';
import { HighchartsChart, HighchartsProvider, Chart, BarSeries, XAxis, YAxis } from "react-jsx-highcharts";

import { useState, useEffect } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Medal, Percent } from 'lucide-react';

import medals from "../assets/olympic-medals-gains-losses.json"


function prepareData(medalMethod: string, relativeMethod: string): { cz: string; t: number }[] {
    if (medalMethod === "all" && relativeMethod === "abs") {
        return medals.map((item: any) => ({ cz: item.cz, t: - (item.g20 + item.s20 + item.b20 - item.g24 - item.s24 - item.b24) }));
    }
    if (medalMethod === "gold" && relativeMethod === "abs") {
        return medals.map((item: any) => ({ cz: item.cz, t: - (item.g20 - item.g24) })).sort((a, b) => {
            const diff = b.t - a.t
            if (diff === 0) {
                return a.cz.localeCompare(b.cz, 'cs');
            }
            return diff
        });
    }
    if (medalMethod === "weighted" && relativeMethod === "abs") {
        return medals.map((item: any) => ({ cz: item.cz, t: -(4 * item.g20 + 2 * item.s20 + item.b20 - 4 * item.g24 - 2 * item.s24 - item.b24) })).sort((a, b) => {
            const diff = b.t - a.t
            if (diff === 0) {
                return a.cz.localeCompare(b.cz, 'cs');
            }
            return diff
        });;
    }
    if (medalMethod === "all" && relativeMethod === "rel") {
        return medals.map((item: any) => ({ cz: item.cz, t: ((item.g24 + item.s24 + item.b24 - item.g20 - item.s20 - item.b20) / (item.g20 + item.s20 + item.b20)) })).sort((a, b) => {
            const diff = b.t - a.t
            if (diff === 0) {
                return a.cz.localeCompare(b.cz, 'cs');
            }
            return diff
        });;
    }
    if (medalMethod === "gold" && relativeMethod === "rel") {
        return medals.filter(item => item.g20 > 0).map((item: any) => ({ cz: item.cz, t: ((item.g24 - item.g20) / item.g20) })).sort((a, b) => {
            const diff = b.t - a.t
            if (diff === 0) {
                return a.cz.localeCompare(b.cz, 'cs');
            }
            return diff
        });;
    }
    if (medalMethod === "weighted" && relativeMethod === "rel") {
        return medals.map((item: any) => ({ cz: item.cz, t: (4 * item.g24 + 2 * item.s24 + item.b24 - 4 * item.g20 - 2 * item.s20 - item.b20) / (4 * item.g20 + 2 * item.s20 + item.b20) })).sort((a, b) => {
            const diff = b.t - a.t
            if (diff === 0) {
                return a.cz.localeCompare(b.cz, 'cs');
            }
            return diff
        });;
    }
    return [];
}


function Chart6() {

    const [medalMethod, setMedalMethod] = useState("all")
    const [relativeMethod, setRelativeMethod] = useState("abs")
    const [data, setData] = useState([] as { cz: string; t: number }[])
    const [czechia, setCzechia] = useState(-6)


    useEffect(() => {
        const newData = prepareData(medalMethod, relativeMethod);
        setData(newData);
    }, [medalMethod, relativeMethod])

    useEffect(() => {
        const czechiaCountry = data.find((country: any) => country.cz.toString().includes("Česká republika"));
        if (czechiaCountry) {
            setCzechia(czechiaCountry.t);
        }
    }, [data])




    return <div className="max-w-[620px] mx-auto">
        <h1 className="text-2xl font-bold">Pořadatelský „doping“: srovnání LOH 2024 a 2020</h1>
        <p className="pb-4">Ve srovnání s předchozí olympiádou v Tokyu přidala nejvíc medailí pořadatelská Francie. Naopak největší propad zaznamenalo v absolutních číslech Japonsko. Česko je třetí od konce. Počítáme jen státy, které na obou akcích získaly aspoň jednu medaili.</p>

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
                <h2 className="font-bold pb-1">Výsledek v medailích, nebo v procentech?</h2>
                <RadioGroup defaultValue="abs" onValueChange={value => setRelativeMethod(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="abs" id="abs" />
                        <Label htmlFor="abs">absolutně</Label>
                        <Medal size={"16px"} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rel" id="rel" />
                        <Label htmlFor="rel">relativně</Label>
                        <Percent size={"16px"} />
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
                                if (this.point.index === 0 || this.point.index === data.length - 1) {
                                    const words = function () {
                                        switch (medalMethod) {
                                            case "gold":
                                                return "zlatých medailí";
                                            case "weighted":
                                                return "vážených medailí";
                                            default:
                                                return "medailí";
                                        }
                                    }

                                    return `${this.point.y?.toLocaleString("cs", { signDisplay: "exceptZero", style: relativeMethod === "rel" ? "percent" : "decimal" })} ${words()}`;
                                };
                                return this.point.y?.toLocaleString("cs", { signDisplay: "exceptZero", style: relativeMethod === "rel" ? "percent" : "decimal" });
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
                                            return "zlatých medailí";
                                        case "weighted":
                                            return "vážených medailí";
                                        default:
                                            return "medailí";
                                    }
                                }


                                const label = isLast ? `${value.toLocaleString("cs", { signDisplay: "exceptZero", style: relativeMethod === "rel" ? "percent" : "decimal" })} ${words()}` : `${value.toLocaleString("cs", { signDisplay: "exceptZero", style: relativeMethod === "rel" ? "percent" : "decimal" })}`;
                                return label;
                            }
                        }}
                        plotLines={[{
                            value: czechia,
                            color: 'grey',
                            width: 2,
                            dashStyle: "ShortDot",
                            label: {
                                text: `Česko ${czechia.toLocaleString("cs", { signDisplay: "exceptZero", style: relativeMethod === "rel" ? "percent" : "decimal" })}`,
                                rotation: 0,
                                x: -10,
                                y: -7
                            }
                        }]}
                    >
                        <BarSeries name={medalMethod === "gold" ? "zlaté medaile" : medalMethod === "weighted" ? "vážené medaile" : "medaile"} data={data.map((country) => Number(country.t))} color={"#009fb8"} negativeColor={"#e63946"} />

                    </YAxis>
                </HighchartsChart>
                <p className="text-xs text-end">
                    Zdroj dat: <a href="https://medalspercapita.com/">Olympic Medals per Capita</a>
                </p>

            </HighchartsProvider >
        </div >

    </div >
}

export default Chart6;