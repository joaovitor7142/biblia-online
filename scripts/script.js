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

function executar() {
    const segmento = getSegmentoUrl();

    if (segmento == 'capitulos') { getCapitulos(); }
    if (segmento == 'versos') { getVersos(); }
    if (segmento == 'visualizador') { getVisualizador(); }
}

async function getCapitulos() {
    const { livro } = getParamsUrl();

    const { data } = await supabaseClient
        .from('verses')
        .select('chapter', { count: 'exact' })
        .eq('book', livro)
        .group('chapter');

    if (data && data.length > 0) {
        const quantidade = data.length;

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

    const { data } = await supabaseClient
        .from('verses')
        .select('chapter', { count: 'exact' })
        .eq('book', livro)
        .eq('chapter', capitulo);

    if (data && data.length > 0) {
        const quantidade = data.length; 

        for (let i = 0; i < quantidade; i++) {
            const verso = i + 1;
            const element = document.createElement('a');
            element.href = `visualizador?livro=${livro}&capitulo=${capitulo}&verso=${verso}`;
            element.innerHTML = `<button>${verso}</button>`;
            document.querySelector('.seletor-versos').appendChild(element); 
        }
    }
}

async function getVisualizador() {
    const { livro, capitulo, verso } = getParamsUrl();

    const { data } = await supabaseClient
        .from('verses')
        .select('text')
        .eq('book', livro)
        .eq('chapter', capitulo)
        .eq('verse', verso);

    if (data && data.length > 0) {
        const element = document.querySelector('#visualizador');
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
