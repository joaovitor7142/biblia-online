const supabaseUrl = 'aHR0cHM6Ly9taXN5ZmNuZnlua2FoYWNzZGVhcS5zdXBhYmFzZS5jbw==';
const supabaseKey = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBj' +
                    'M01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW0xcGMzbG1ZMjVtZVc1' +
                    'cllXaGhZM05rWldGeElpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlP' +
                    'akUzTWpreE9Ua3hOaklzSW1WNGNDSTZNakEwTkRjM05URTJNbjAuY1VO' +
                    'c3FpcHBDc0ROdElQMmRzbWNtWkFMbkNQbUhqajFOMWIzNHBQVzlucw=='

const decodedUrl = atob(supabaseUrl);
const decodedKey = atob(supabaseKey);

const supabaseClient = supabase.createClient(decodedUrl, decodedKey);

executar();

async function executar() {
    const segmento = getSegmentoUrl();

    if (segmento == 'capitulos') { await getCapitulos(); }
    if (segmento == 'versos') { await getVersos(); }
    if (segmento == 'texto') { await getTexto(); }
}

async function getCapitulos() {
    const { livro } = getParamsUrl();
    document.querySelector('#id_livro').innerHTML = `${livro}`;

    const { data } = await supabaseClient
        .rpc('count_chapters', { p_book: livro });

    if (data) {
        const quantidade = data;

        for (let i = 0; i < quantidade; i++) {
            const capitulo = i + 1;
            const element = document.createElement('a');
            element.href = `versos?livro=${livro}&capitulo=${capitulo}`;
            element.innerHTML = `<button>${capitulo}</button>`;
            document.querySelector('.seletor-capitulos').appendChild(element);
        }
    }
}

async function getVersos() {
    const { livro, capitulo } = getParamsUrl();
    document.querySelector('#id_livro').innerHTML = `${livro}`;
    document.querySelector('#id_capitulo').innerHTML = `${capitulo}`;

    const { data } = await supabaseClient
        .rpc('count_verses', { p_book: livro, p_chapter: capitulo });

    if (data) {
        const quantidade = data; 

        for (let i = 0; i < quantidade; i++) {
            const verso = i + 1;
            const element = document.createElement('a');
            element.href = `texto?livro=${livro}&capitulo=${capitulo}&verso=${verso}`;
            element.innerHTML = `<button>${verso}</button>`;
            document.querySelector('.seletor-versos').appendChild(element); 
        }
    }
}

async function getTexto() {
    const { livro, capitulo, verso } = getParamsUrl();
    document.querySelector('#id_livro').innerHTML = `${livro}`;
    document.querySelector('#id_capitulo').innerHTML = `${capitulo}`;
    document.querySelector('#id_verso').innerHTML = `${verso}`;

    if (Number(verso) - 1 > 0) {
        const buttonAnterior = document.querySelector('#anterior');
        buttonAnterior.addEventListener('click', () => {
            window.location.href = `texto?livro=${livro}&capitulo=${capitulo}&verso=${Number(verso) - 1}`;
        });
    }

    const buttonProximo = document.querySelector('#proximo');    
    buttonProximo.addEventListener('click', () => {
        window.location.href = `texto?livro=${livro}&capitulo=${capitulo}&verso=${Number(verso) + 1}`;
    });

    const { data } = await supabaseClient
        .from('verses')
        .select('text')
        .eq('book', livro)
        .eq('chapter', capitulo)
        .eq('verse', verso);

    if (data && data.length > 0) {
        const element = document.querySelector('#texto');
        element.innerHTML = data[0].text;
    }
}

function getSegmentoUrl() {
    const url = window.location.pathname.split('/')[2];
    const segmento = url.split('?')[0];

    return segmento;
}

function getParamsUrl() {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};

    for (let [key, value] of params.entries()) {
        queryParams[key] = value;
    }

    return queryParams;
}
