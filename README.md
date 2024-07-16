# APIs-Integration-Testing
npm install jest --save-dev (para instalar o jest)

Você deve testar um arquivo de teste, e depois o outro. (Recomendamos que você renomei, de forma a deixar apenas um como .test). Pois a API não permite fazer muitas requisições ao mesmo tempo.

Documento: ideia inicial de Teste de Integração Usando Axios e Jest
Alunos: Tiago César, Helon de Franca
IC844 - TÓPICOS ESPECIAIS EM ENGENHARIA DE SOFTWARE - T01 (2024.1 - 35T23)

1. Escolher um Conjunto de Serviços Disponíveis através de APIs Públicas Gratuitas:
Serviço Selecionado: Bible API
URL Base: https://bible-api.com/
Documentação: Bible API Documentation
Este é um pequeno aplicativo da web que fornece uma API JSON para obter versículos e passagens da Bíblia.

Informações:
A Bíblia padrão da API é:

Inglês
Bíblia Inglesa Mundial
web (padrão)


Oráculos que usamos:
 https://www.ebooksbrasil.org/eLibris/biblia.html para a versão em português João Ferreira de Almeida.
https://www.aionianbible.org/ para a versão Checa.

https://vulsearch.sourceforge.net/html/Jo.html para a Clementine Latin Vulgate.

E para as demais:
https://www.biblegateway.com/ (versão “WEB” padrão,  KJV, Novo Testamento Cherokee).
2. Casos de Teste (Exemplos)
Verso Único
Requisição: https://bible-api.com/john+3:16
Resposta Esperada: Referência "John 3:16"...
…texto contendo: “For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.".
Intervalo de Versos
Requisição: https://bible-api.com/luke+12:1-2
Resposta Esperada: Referência "Romans 12:1-2"...
…texto contendo: "Meanwhile, when a multitude of many thousands had gathered together, so much so that they trampled on each other, he began to tell his disciples first of all, “Beware of the yeast of the Pharisees, which is hypocrisy. But there is nothing covered up that will not be revealed, nor hidden that will not be known.”.
Múltiplos Intervalos
Requisição: https://bible-api.com/romans+12:1-2,5-7,9,13:1-9
Resposta Esperada: Referência "Psalms 23:1-4, Psalms 27:1, Psalms 37:4-6",...
…texto contendo: "Yahweh is my shepherd: I shall lack nothing. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul. He guides me in the paths of righteousness for his name’s sake. Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me. Yahweh is my light and my salvation. Whom shall I fear? Yahweh is the strength of my life. Of whom shall I be afraid? Also delight yourself in Yahweh, and he will give you the desires of your heart. Commit your way to Yahweh. Trust also in him, and he will do this: he will make your righteousness go out as the light, and your justice as the noon day sun.".
Verso com Tradução Diferente
Requisição: https://bible-api.com/john+3:16?translation=kjv
Resposta Esperada: Referência "John 3:16", tradução "kjv"...
…texto contendo "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.".
Verso Aleatório
Requisição: https://bible-api.com/?random=verse
Resposta Esperada: Propriedades "text" e "reference" presentes.

