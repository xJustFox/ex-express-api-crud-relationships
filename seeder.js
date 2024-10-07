const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const posts = [
    {
        title: "I Benefici della Meditazione",
        slug: "i-benefici-della-meditazione",
        content: "La meditazione offre numerosi benefici per la mente e il corpo, come riduzione dello stress e miglioramento della concentrazione.",
        published: true,
        image: "meditazione.jpg",
        tags: [1, 2, 3, 4], // benessere, meditazione, salute, equilibrio
        categoryId: 1 // Benessere e Salute
    },
    {
        title: "Come Creare un Giardino Sostenibile",
        slug: "come-creare-un-giardino-sostenibile",
        content: "Scopri come creare un giardino ecologico e sostenibile utilizzando tecniche di permacultura e piante autoctone.",
        published: true,
        image: "giardino_sostenibile.jpg",
        tags: [5, 6, 7, 8], // giardinaggio, sostenibilità, ambiente, ecologia
        categoryId: 2 // Sostenibilità e Ambiente
    },
    {
        title: "10 Libri che Ti Cambieranno la Vita",
        slug: "10-libri-che-ti-cambieranno-la-vita",
        content: "Ecco una lista di 10 libri che possono ispirarti e offrirti nuovi punti di vista su vari aspetti della vita.",
        published: false,
        image: "libri_cambiavita.jpg",
        tags: [9, 10, 11, 12], // libri, ispirazione, crescita personale, lettura
        categoryId: 4 // Lettura e Ispirazione
    },
    {
        title: "Viaggiare in Islanda: Una Guida Completa",
        slug: "viaggiare-in-islanda-una-guida-completa",
        content: "Tutto quello che devi sapere per organizzare il tuo viaggio in Islanda, tra paesaggi mozzafiato e avventure indimenticabili.",
        published: true,
        image: "islanda.jpg",
        tags: [13, 14, 15, 16], // viaggi, Islanda, natura, avventura
        categoryId: 3 // Viaggi e Natura
    },
    {
        title: "Alimentazione Vegana: Pro e Contro",
        slug: "alimentazione-vegana-pro-e-contro",
        content: "Analisi dettagliata dei benefici e delle sfide di una dieta vegana per chi vuole abbracciare uno stile di vita più etico e salutare.",
        published: true,
        image: "alimentazione_vegana.jpg",
        tags: [17, 18, 19], // alimentazione, vegano, dieta
        categoryId: 1 // Benessere e Salute
    },
    {
        title: "L'Importanza del Sonno per il Benessere",
        slug: "l'importanza-del-sonno-per-il-benessere",
        content: "Un sonno di qualità è fondamentale per il benessere fisico e mentale. Scopri come migliorare la qualità del tuo riposo.",
        published: false,
        image: "sonno_benessere.jpg",
        tags: [20, 21, 3], // sonno, riposo, salute
        categoryId: 1 // Benessere e Salute
    }
];

const newtags = [
    { name: "benessere" },
    { name: "meditazione" },
    { name: "salute" },
    { name: "equilibrio" },
    { name: "giardinaggio" },
    { name: "sostenibilità" },
    { name: "ambiente" },
    { name: "ecologia" },
    { name: "libri" },
    { name: "ispirazione" },
    { name: "crescita personale" },
    { name: "lettura" },
    { name: "viaggi" },
    { name: "Islanda" },
    { name: "natura" },
    { name: "avventura" },
    { name: "alimentazione" },
    { name: "vegano" },
    { name: "dieta" },
    { name: "sonno" },
    { name: "riposo" }
];


const categories = [
    { name: "Benessere e Salute" },
    { name: "Sostenibilità e Ambiente" },
    { name: "Viaggi e Natura" },
    { name: "Lettura e Ispirazione" }
];

prisma.tag.createMany({
    data: newtags
})
.then(count => console.log(count))
.catch(err => console.log(err))

prisma.category.createMany({
    data: categories
})
.then(count => console.log(count))
.catch(err => console.log(err))

posts.forEach(async post => {
    const { title, content, slug, published, image, categoryId, tags } = post;
    const data = {
        title,
        slug,
        content,
        published,
        image,
        categoryId,
        tags: {
            connect: tags.map(id => ({ id }))
        }
    }
    await prisma.post.create({
        data
    })
        .then(count => console.log(count))
        .catch(err => console.log(err))
})



