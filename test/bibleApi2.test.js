const axios = require('axios');

const BASE_URL = 'https://bible-api.com';

describe('Outros testes e Diferentes Traduções (Bible API - Testes de Integração)', () => {
  // Erros Esperados
 test('Deve tratar nome de livro inválido', async () => {
    try {
      await axios.get(`${BASE_URL}/invalidbook 1:1`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test('Deve lidar com capítulo e versículo inválidos', async () => {
    try {
      await axios.get(`${BASE_URL}/john 999:999`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });


  //Testando línguas diferentes (/versões)
  
  // Cherokee - Novo Testamento Cherokee
  test('Deve buscar um versículo do Novo Testamento Cherokee', async () => {
    const response = await axios.get(`${BASE_URL}/ᎣᏍᏛ ᎧᏃᎮᏛ ᏣᏂ ᎤᏬᏪᎳᏅᎯ+3:16?translation=cherokee`);
    expect(response.status).toBe(200);
    expect(response.data.translation_id).toBe('cherokee');
    expect(response.data.reference).toBe('ᎣᏍᏛ ᎧᏃᎮᏛ ᏣᏂ ᎤᏬᏪᎳᏅᎯ 3:16');
    // Adicione verificações específicas conforme necessário
    expect(response.data.text).toMatch('ᎾᏍᎩᏰᏃ ᏂᎦᎥᎩ ᎤᏁᎳᏅᎯ ᎤᎨᏳᏒᎩ ᎡᎶᎯ, ᏕᎤᏲᏒᎩ ᎤᏤᎵᎦ ᎤᏪᏥ ᎾᏍᎩ ᎤᏩᏒᎯᏳ ᎤᏕᏁᎸᎯ, ᎩᎶ ᎾᏍᎩ ᏱᎪᎯᏳᎲᏍᎦ ᎤᏲᎱᎯᏍᏗᏱ ᏂᎨᏒᎾ, ᎬᏂᏛᏉᏍᎩᏂ ᎤᏩᏛᏗ.');
  });

  // Checo - Bíblia kralická
  test('Deve buscar um versículo da Bíblia Tcheca kralická', async () => {
    const response = await axios.get(`${BASE_URL}/Jan+3:16?translation=bkr`);
    expect(response.status).toBe(200);
    expect(response.data.translation_id).toBe('bkr');
    expect(response.data.reference).toBe('Jan 3:16');
    // Adicione verificações específicas conforme necessário
    expect(response.data.text).toMatch('Nebo tak Bůh miloval svět, že Syna svého jednorozeného dal, aby každý, kdož věří v něho, nezahynul, ale měl život věčný.');
  });

  // Inglês - Versão Padrão Americana (1901)
  test('Deve buscar um versículo da American Standard Version (ASV)', async () => {
    const response = await axios.get(`${BASE_URL}/john 3:16?translation=asv`);
    expect(response.status).toBe(200);
    expect(response.data.translation_id).toBe('asv');
    expect(response.data.reference).toBe('John 3:16');
    expect(response.data.text).toMatch(/For God so loved the world/);
  });

  // Português - João Ferreira de Almeida
  test('Deve buscar um verso do João Ferreira de Almeida', async () => {
    const response = await axios.get(`${BASE_URL}/joao 3:16?translation=almeida`);
    expect(response.status).toBe(200);
    expect(response.data.translation_id).toBe('almeida');
    expect(response.data.reference).toBe('João 3:16');
    expect(response.data.text).toMatch(/Porque Deus amou o mundo/);
  });

  // Latim - Vulgata Latina Clementina
  test('Dever buscar um verso da Vulgata Latina Clementina', async () => {
    const response = await axios.get(`${BASE_URL}/Joannes+3:16?translation=clementine`);
    expect(response.status).toBe(200);
    expect(response.data.translation_id).toBe('clementine');
    expect(response.data.reference).toBe('Joannes 3:16');
    // Adicione verificações específicas conforme necessário
    expect(response.data.text).toMatch('Sic enim Deus dilexit mundum, ut Filium suum unigenitum daret : ut omnis qui credit in eum, non pereat, sed habeat vitam æternam.');
  });

  
  // Capítulos Inteiros
  test('Dever buscar o capítulo inteiro dos Salmos', async () => {
    const response = await axios.get(`${BASE_URL}/Psalms23`);
    expect(response.status).toBe(200);
    expect(response.data.verses.length).toBeGreaterThan(0);
    expect(response.data.verses[0].reference).toMatch(/Psalms 23:1/);
  });

  test('Dever buscar o capítulo inteiro de Mateus', async () => {
    const response = await axios.get(`${BASE_URL}/Matthew5`);
    expect(response.status).toBe(200);
    expect(response.data.verses.length).toBeGreaterThan(0);
    expect(response.data.verses[0].reference).toMatch(/Matthew 5:1/);
  });


});



