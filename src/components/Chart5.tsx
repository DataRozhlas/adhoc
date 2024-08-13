import medals from "../assets/olympic-medals.json"

import { useState, useEffect } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

console.log(medals)

function Chart5() {

    const [medalMethod, setMedalMethod] = useState("all")

    const [relativeMethod, setRelativeMethod] = useState("none")


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
            <ChartContainer config={chartConfig} className={"min-h-[1000px]"}>
                <BarChart
                    accessibilityLayer
                    data={medals}
                    layout="vertical"
                    margin={{
                        right: 16,
                    }}
                    maxBarSize={16}
                    barGap={"10%"}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="cz"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                    />
                    <XAxis dataKey="t" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="t"
                        layout="vertical"
                        fill="var(--color-desktop)"
                        radius={4}
                    >
                        <LabelList
                            dataKey="month"
                            position="insideLeft"
                            offset={8}
                            className="fill-[--color-label]"
                            fontSize={12}
                        />
                        <LabelList
                            dataKey="t"
                            position="right"
                            offset={8}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>

        </div>

    </div>
}

export default Chart5;