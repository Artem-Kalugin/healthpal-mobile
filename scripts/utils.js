import { spawn } from 'child_process';
import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';
import inquirer from 'inquirer';
import prettier from 'prettier';

const prettierConfigPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../.prettierrc',
);
const prettierConfig = JSON.parse(fs.readFileSync(prettierConfigPath, 'utf8'));

export function executeCommand(command) {
  return new Promise((resolve, reject) => {
    const commandProcess = spawn(command, { shell: true, stdio: 'inherit' });

    commandProcess.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve('');
      }
    });
  });
}

export function processChalkChoices(choices) {
  return choices.map(choice => {
    if (choice.description) {
      return {
        value: choice.value,
        name: `${choice.name} - ${chalk.gray(choice.description)}`,
      };
    }

    return choice;
  });
}

export async function getChoice(message, options) {
  const questions = [
    {
      type: 'list',
      name: 'choice',
      message: message,
      choices: processChalkChoices(options),
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers.choice;
}

export function prettify(content) {
  return prettier.format(content, { parser: 'typescript', ...prettierConfig });
}
