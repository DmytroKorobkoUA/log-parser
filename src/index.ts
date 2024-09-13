import * as fs from 'fs';
import * as path from 'path';

const readLogFile = (filePath: string): string[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
};

const main = () => {
    const logFilePath = path.join(__dirname, '..', 'logs', 'web.log');
    const logs = readLogFile(logFilePath);
};

main();
