const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const posts = [
    {
        title: "I Benefici della Meditazione",
        slug: "i-benefici-della-meditazione",
        content: "La meditazione offre numerosi benefici per la mente e il corpo, come riduzione dello stress e miglioramento della concentrazione.",
        published: true,
        image: "meditazione.jpg"
    },
    {
        title: "Come Creare un Giardino Sostenibile",
        slug: "come-creare-un-giardino-sostenibile",
        content: "Scopri come creare un giardino ecologico e sostenibile utilizzando tecniche di permacultura e piante autoctone.",
        published: true,
        image: "giardino_sostenibile.jpg"
    },
    {
        title: "10 Libri che Ti Cambieranno la Vita",
        slug: "10-libri-che-ti-cambieranno-la-vita",
        content: "Ecco una lista di 10 libri che possono ispirarti e offrirti nuovi punti di vista su vari aspetti della vita.",
        published: false,
        image: "libri_cambiavita.jpg"
    },
    {
        title: "Viaggiare in Islanda: Una Guida Completa",
        slug: "viaggiare-in-islanda-una-guida-completa",
        content: "Tutto quello che devi sapere per organizzare il tuo viaggio in Islanda, tra paesaggi mozzafiato e avventure indimenticabili.",
        published: true,
        image: "islanda.jpg"
    },
    {
        title: "Alimentazione Vegana: Pro e Contro",
        slug: "alimentazione-vegana-pro-e-contro",
        content: "Analisi dettagliata dei benefici e delle sfide di una dieta vegana per chi vuole abbracciare uno stile di vita più etico e salutare.",
        published: true,
        image: "alimentazione_vegana.jpg"
    },
    {
        title: "L'Importanza del Sonno per il Benessere",
        slug: "l'importanza-del-sonno-per-il-benessere",
        content: "Un sonno di qualità è fondamentale per il benessere fisico e mentale. Scopri come migliorare la qualità del tuo riposo.",
        published: false,
        image: "sonno_benessere.jpg"
    }
]


prisma.post.createMany({
    data: posts
})
.then(count => console.log(count))
.catch(err => console.log(err))