import { exec } from 'child_process'
import fs from 'fs';
import path from 'path';
import { typeDefs } from './graphql';

function runCodegen(): Promise<void> {
  return new Promise((resolve, reject) => {
    exec('npm run codegen', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
}

function copyTypesFile() {
  const sourcePath = path.join(__dirname, './graphql/generated/types.ts');
  const destinationPath = path.join(__dirname, '../../client/src/types.ts');

  fs.copyFileSync(sourcePath, destinationPath);
  console.log(`Copied types.ts from ${sourcePath} to ${destinationPath}`);
}

function updateGeneratedTxt(typeDefs: string) {
  const filePath = path.join(__dirname, './graphql/generated.txt');
  fs.writeFileSync(filePath, typeDefs);
  console.log(`Updated generated.txt at ${filePath}`);
}

async function main() {
  try {
    await runCodegen();
    copyTypesFile();
    updateGeneratedTxt(typeDefs);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

main();
