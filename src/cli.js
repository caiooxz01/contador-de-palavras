import fs from 'fs';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro
        const resultado = contaPalavras(texto);
        criaESalvaArquivo(resultado, endereco)
    } catch(erro) {
        trataErros(erro);
    };
});

async function criaESalvaArquivo(listaDasPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoDasPalavras = montaSaidaArquivo(listaDasPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoDasPalavras);
        console.log('Arquivo criado');
    } catch(erro) {
        throw erro
    };
};