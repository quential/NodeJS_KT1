import fs from 'node:fs';
import csv from 'csv-parser';
import config from '../config/index.js';
const { inputFile } = config;

if (!inputFile) {
    console.error('Ошибка: переменная окружения не задана');
    process.exit(0);
}
if (!fs.existsSync(inputFile)) {
    console.error(`Ошибка: файл по данному пути не найден`);
    process.exit(0);
}

export const users = []

export const usersReady = new Promise((resolve, reject) => {
    const stream = fs
        .createReadStream(inputFile)
        .pipe(csv());

    stream
        .on('data', (row) => {
            users.push(row);
        })
        .on('end', () => {
            resolve(users);
        })
        .on('error', reject);
});
