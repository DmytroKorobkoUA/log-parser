import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readLogFile = (filePath: string): string[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
};

const calculatePageViewsAndUniqueViews = (logs: string[]): { pageViews: { [url: string]: number }, uniqueViews: { [url: string]: Set<string> } } => {
    const pageViews: { [url: string]: number } = {};
    const uniqueViews: { [url: string]: Set<string> } = {};

    logs.forEach(log => {
        const [url, ip] = log.split(/\s+/);

        if (url) {
            pageViews[url] = (pageViews[url] || 0) + 1;

            if (ip) {
                if (!uniqueViews[url]) {
                    uniqueViews[url] = new Set();
                }
                uniqueViews[url].add(ip);
            }
        }
    });

    return { pageViews, uniqueViews };
};

const printResults = (results: { pageViews: { [url: string]: number }, uniqueViews: { [url: string]: Set<string> } }) => {
    const { pageViews, uniqueViews } = results;

    console.log('Page views:');
    Object.entries(pageViews)
        .sort((a, b) => b[1] - a[1])
        .forEach(([url, count]) => {
            console.log(`${url}: ${count} visits`);
        });

    console.log('\nUnique page views:');
    Object.entries(uniqueViews)
        .map(([url, ips]) => [url, ips.size] as [string, number])
        .sort((a, b) => b[1] - a[1])
        .forEach(([url, count]) => {
            console.log(`${url}: ${count} unique views`);
        });
};

const main = () => {
    const logFilePath = path.join(__dirname, '..', 'logs', 'web.log');
    const logs = readLogFile(logFilePath);

    if (logs.length === 0) {
        console.error('No logs found or log file is empty.');
        return;
    }

    const results = calculatePageViewsAndUniqueViews(logs);
    printResults(results);
};

main();
