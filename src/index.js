import { writeFile } from 'node:fs/promises';
import { users, usersReady } from './utils/csv.js';
import config from './config/index.js';
const { outputFile, minAge, cityFilter, } = config;

await usersReady;

const filteredUsers = users.filter(user => user.age > minAge && user.city === cityFilter)

function escapeCsv(value) {
    const text = String(value ?? '');

    return /[",\n]/.test(text)
        ? `"${text.replace(/"/g, '""')}"`
        : text;
}

function convertToCsv(rows) {
    if (rows.length === 0) return '';

    const headers = Object.keys(rows[0]);

    return [
        headers.join(','),
        ...rows.map(row =>
            headers.map(header => escapeCsv(row[header])).join(',')
        ),
    ].join('\n');
}

await writeFile(outputFile, convertToCsv(filteredUsers), 'utf8')

console.log(users)
console.log(filteredUsers)
console.log(`файл ${outputFile} создан`)

