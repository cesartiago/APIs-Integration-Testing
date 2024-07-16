const axios = require('axios');

const BASE_URL = 'https://bible-api.com';

describe('Bible API Tests', () => {
    test('Verso Único: John 3:16', async () => {
        const response = await axios.get(`${BASE_URL}/john+3:16`);
        expect(response.data.reference).toBe('John 3:16');
        expect(response.data.text).toContain('For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.');
    });

    test('Intervalo de Versos: Luke 12:1-2', async () => {
        const response = await axios.get(`${BASE_URL}/luke+12:1-2`);
        expect(response.data.reference).toBe('Luke 12:1-2');
        expect(response.data.text).toContain('Meanwhile, when a multitude of many thousands had gathered together, so much so that they trampled on each other, he began to tell his disciples first of all,\n“Beware of the yeast of the Pharisees, which is hypocrisy.');
    });

    test('Múltiplos Intervalos: Romans 12:1-2,5-7,9,13:1-9', async () => {
        const response = await axios.get(`${BASE_URL}/romans+12:1-2,5-7,9,13:1-9`);
        expect(response.data.reference).toBe('Romans 12:1-2,5-7,9,13:1-9');
        expect(response.data.text).toContain('Therefore I urge you, brothers, by the mercies of God, to present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service.');
    });

    test('Verso com Tradução Diferente: John 3:16 KJV', async () => {
        const response = await axios.get(`${BASE_URL}/john+3:16?translation=kjv`);
        expect(response.data.reference).toBe('John 3:16');
        expect(response.data.translation_id).toBe('kjv');
        expect(response.data.text).toContain('For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.');
    });

    test('Verso Aleatório', async () => {
        const response = await axios.get(`${BASE_URL}/?random=verse`);
        expect(response.data).toHaveProperty('text');
        expect(response.data).toHaveProperty('reference');
    });

    // test('Verso Inexistente', async () => {
    //     const response = await axios.get(`${BASE_URL}/john+999:999`);
    //     expect(response.data.error).toBe('not found');
    // });

    // test('Livro Inexistente', async () => {
    //     const response = await axios.get(`${BASE_URL}/nonexistentbook+1:1`);
    //     expect(response.data.error).toBe('not found');
    // });

    // test('Capítulo e Verso Inexistente', async () => {
    //     const response = await axios.get(`${BASE_URL}/genesis+999:999`);
    //     expect(response.data.error).toBe('not found');
    // });

    // test('Verso com Tradução Diferente Específica: John 3:16 NIV', async () => {
    //     const response = await axios.get(`${BASE_URL}/john+3:16?translation=niv`);
    //     expect(response.data.reference).toBe('John 3:16');
    //     expect(response.data.translation_id).toBe('niv');
    //     expect(response.data.text).toContain('For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.');
    // });

    // test('Verso com Múltiplas Traduções', async () => {
    //     const response = await axios.get(`${BASE_URL}/john+3:16?translation=kjv,niv`);
    //     expect(response.data.reference).toBe('John 3:16');
    //     expect(response.data.text).toContain('For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.');
    //     expect(response.data.text).toContain('For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.');
    // });

    test('Verso em outra tradução ', async () => {
        const response = await axios.get(`${BASE_URL}/john+3:16?translation=almeida`);
        expect(response.data.reference).toBe('João 3:16');
        expect(response.data.translation_id).toBe('almeida');
        expect(response.data.text).toContain('Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.');
    });

     // Versículos Únicos
    test('Deve buscar um único versículo do Gênesis', async () => {
        const response = await axios.get(`${BASE_URL}/genesis 1:1`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('reference', 'Genesis 1:1');
        expect(response.data.text).toMatch(/In the beginning/);
    });

    test('Deve buscar um único verso de João', async () => {
        const response = await axios.get(`${BASE_URL}/john 3:16`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('reference', 'John 3:16');
        expect(response.data.text).toMatch(/For God so loved the world/);
    });

    // Nomes Abreviados de Livros
    test('Deve buscar o versículo usando o nome abreviado do livro (para João)', async () => {
        const response = await axios.get(`${BASE_URL}/jn 3:15`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('reference', 'John 3:15');
        expect(response.data.text).toMatch('that whoever believes in him should not perish, but have eternal life.');
    });

    test('Deve buscar o versículo usando o nome abreviado do livro (para Gênesis)', async () => {
        const response = await axios.get(`${BASE_URL}/gen 1:1`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('reference', 'Genesis 1:1');
        expect(response.data.text).toMatch(/In the beginning/);
    });

    // Ranges de Versículos
    test('Deve buscar vários intervalos do livro de Hebreus', async () => {
        const response = await axios.get(`${BASE_URL}/Hebrews12:1-2,5-7,9,13:1-9&10`);
        expect(response.status).toBe(200);
        expect(response.data.verses.length).toBeGreaterThan(0);
    });

    test('Deve buscar vários intervalos de Salmos', async () => {
        const response = await axios.get(`${BASE_URL}/Psalms23:1-2,4-6`);
        expect(response.status).toBe(200);
        expect(response.data.verses.length).toBeGreaterThan(0);
    });

    // Números de Versículos
    test('Deve buscar versículo com números de versículos incluídos', async () => {
        const response = await axios.get(`${BASE_URL}/john 3:17?verse_numbers=true`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('reference', 'John 3:17');
        expect(response.data.text).toContain('17')
    });

    // JSONP
    test('Deve buscar verso com retorno de chamada JSONP', async () => {
        const response = await axios.get(`${BASE_URL}/john 3:18?callback=func`, {
        responseType: 'text'
        });
        expect(response.status).toBe(200);
        expect(response.data).toMatch(/^func\(/);
    });
});
