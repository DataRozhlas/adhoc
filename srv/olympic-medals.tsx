import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: Bun.env.KEY, // This is the default and can be omitted
});

async function getCzechName(input: string) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Jsi pedantická zeměpisářka. Nesnášíš chyby. Dám ti třípísmennou zkratku a anglický název státu či území. Některá z nich jsou historické, většina stále existuje. Řekni mi správný český název. Odpovídej jen názvem státu či území. Můžeš použít i zkratku či zkrácený název jako USA nebo Británie, pokud je srozumitelný a běžně používaný. Ale opravdu se snaž, ať neuděláš žádnou chybu.' },
                { role: 'user', content: input }
            ],
            model: 'gpt-4o-mini',
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('Error in askAI:', error);
        return null;
    }
}

async function getContinent(input: string) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Jsi pedantická zeměpisářka. Nesnášíš chyby. Dám ti třípísmennou zkratku, anglický a český název státu či území. Některá z nich jsou historické, většina stále existuje. Řekni mi kontinent, na kterém leží. Vybírat můžeš ze sedmi možností: Evropa, Asie, Afrika, Jižní Amerika, Severní Amerika, Austrálie, Antarktida.  Může to být jen jeden dominantní kontinent. Odpovídej jen názvem kontinentu. Ale opravdu se snaž, ať neuděláš žádnou chybu.' },
                { role: 'user', content: input }
            ],
            model: 'gpt-4o-mini',
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('Error in askAI:', error);
        return null;
    }
}

const medals = await Bun.file("srv/olympic-medals.json").text();

const parsed = JSON.parse(medals);

parsed.pop();

parsed.splice(0, 2); // Remove the first two elements from the parsed array

const filtered = parsed.map((item: any) => [item[1], item[0], Number(item[4]), Number(item[5]), Number(item[6]), Number(item[4]) + Number(item[5]) + Number(item[6])]);

let result = [] as any[];

for (const item of filtered) {
    const [code, country, gold, silver, bronze, total] = item;
    if (total === 0) {
        continue;
    }
    const input = `${code}, ${country}`;
    const czechName = await getCzechName(input);
    const continent = await getContinent(`${input}, ${czechName}`);
    console.log(`${country} ${code}: ${czechName}, ${continent}`);
    result.push({ ctr: country, code: code, cz: czechName, ct: continent, g: gold, s: silver, b: bronze, t: total });
}

result.sort((a, b) => b.t - a.t);

Bun.write("src/assets/olympic-medals.json", JSON.stringify(result));

export { }