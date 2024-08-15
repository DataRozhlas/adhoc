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


const medals = await Bun.file("srv/olympic-medals.json").text();

const parsed = JSON.parse(medals);

parsed.pop();

parsed.splice(0, 2); // Remove the first two elements from the parsed array

const filtered = parsed.map((item: any) => {
    return {
        code: item[1],
        country: item[0],
        g24: Number(item[4]),
        s24: Number(item[5]),
        b24: Number(item[6]),
        g20: Number(item[10]),
        s20: Number(item[11]),
        b20: Number(item[12])
    }
});



let result = [] as any[];

for (const item of filtered) {
    if (item.g24 + item.s24 + item.b24 === 0 || item.g20 + item.s20 + item.b20 === 0) {
        continue;
    }
    const input = `${item.code}, ${item.country}`;
    const czechName = await getCzechName(input);
    console.log(`${item.country} ${item.code}: ${czechName}`);
    result.push({ ...item, cz: czechName });
}

result.sort((a, b) => {
    function calculateDifference(item: any) {
        return item.g20 + item.s20 + item.b20 - item.g24 - item.s24 - item.b24;

    }
    const diff = calculateDifference(a) - calculateDifference(b);
    if (diff === 0) {
        return a.cz.localeCompare(b.cz, 'cs');
    }
    return diff;
});

Bun.write("src/assets/olympic-medals-gains-losses.json", JSON.stringify(result));


export { };
