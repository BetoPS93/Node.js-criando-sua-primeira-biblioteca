import fs, { link } from "fs";
import chalk from "chalk";

function extraiaLinks(texto) {
  const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({
    [captura[1]]: [captura[2]],
  }));
  return resultados.length !== 0 ? resultados : 'Não há links no arquivo.';
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "Não há arquivo no diretório!"));
}

//async await

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiaLinks(texto);
  } catch (erro) {
    trataErro(erro);
  }
}

export default pegaArquivo;

/* Promises com then()

 function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => console.log(chalk.yellow(texto)))
    .catch(trataErro);
} */

/* function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
    if (erro) {
      trataErro(erro);
    }
    console.log(chalk.green(texto));
  });
} */
