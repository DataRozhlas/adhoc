import { dsvFormat } from "d3-dsv";

const MAPYKEY = process.env.MAPYKEY;

const data = await Bun.file("srv/data/sme-stanice-2024.csv").text();

const parsed = dsvFormat(";").parse(data);

interface ResultRow {
    [key: string]: any;
    geo?: any;
}

const result: ResultRow[] = [];

for (const row of parsed) {
    const address = `${row["Adresa"]}, ${row["PSČ"]} ${row["Město "]}`;
    const geo = await fetch(`https://api.mapy.cz/v1/geocode?query=${encodeURIComponent(address)}&apikey=${MAPYKEY}`).then(r => r.json());
    console.log(geo);
    result.push({
        ...row,
        geo
    });
}


Bun.write("srv/data/sme-stanice-2024-geo.json", JSON.stringify(result));



export { };