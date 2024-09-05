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
                { role: 'system', content: 'Jsi pedantická zeměpisářka. Nesnášíš chyby. Dám ti třípísmennou zkratku, anglický a český název státu či území. Některá z nich jsou historické, většina stále existuje. Řekni mi kontinent, na kterém leží. Druhé kritérium je, že se k danému kontinentu řadí na základě mezinárodních sportovních zvyklostí. Kontinenty můžeš vybírat ze sedmi možností: Evropa, Asie, Afrika, Jižní Amerika, Severní Amerika, Austrálie, Antarktida.  Může to být jen jeden dominantní kontinent. Odpovídej jen názvem kontinentu. Ale opravdu se snaž, ať neuděláš žádnou chybu.' },
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


const columns = parsed[0];


const regex = /\d{4}W/;

const selectedColumns = columns.filter((column: string) => {
    return !regex.test(column);
}).filter((column: string) => {
    const winter = ["1994", "1998", "2002", "2006", "2010", "2014", "2018", "2022"];
    const year = column.slice(0, 4);
    return !winter.includes(year);
});

selectedColumns.splice(0, 4);

selectedColumns.splice(-9);


const selectedColumnsNumbers = selectedColumns.map((column: string) => {
    return columns.indexOf(column);
});

const filteredData = parsed.filter((item: any) => {

    const medals = selectedColumnsNumbers.map(index => Number(item[index]));
    console.log(item[0], medals);
    if (medals.some(medal => medal > 0)) {
        return true;
    }
    return false;
});

//console.log(filteredData);