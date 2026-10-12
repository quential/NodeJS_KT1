import 'dotenv/config';

const inputFile = process.env.INPUT_FILE;
const outputFile = process.env.OUTPUT_FILE;
const minAge = Number(process.env.MIN_AGE);
const cityFilter = process.env.CITY_FILTER;

export default {
    inputFile,
    outputFile,
    minAge,
    cityFilter,
}

