import { promises as fs } from 'fs';
import path from 'path';

// Define the path to the JSON file

// Function to read the data from the JSON file
export async function readDataFromFile(fileName: string) {
  const dataFilePath = path.join(process.cwd(), `server/${fileName}`);

  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

// Function to write data to the JSON file
export async function writeDataToFile(data: any, fileName: string) {
  const dataFilePath = path.join(process.cwd(), `server/${fileName}`);

  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}
