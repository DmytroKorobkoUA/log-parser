# Log-parser
Test task - log parser (TypeScript)

## Description

A TypeScript log parsing app that outputs pages with the most hits and unique hits from .log files.

## How to run

1. Install dependencies:
    ```sh
    npm install
    ```

2. Compile TypeScript:
    ```sh
    npm run build
    ```

3. Run app:
    ```sh
    npm start
    ```

## Logs

The log file is located in the directory: `logs/web.log`.

### Example

Here is an example of a few log entries that could be found in the `web.log` file:
   ``` sh
   /home 222.5.109.19 
   /about 210.116.153.211 
   /home 130.214.72.84 
   /home 222.5.109.19 
   /about 130.214.72.84 
   /about 153.189.86.214
   ```

In this case, the following results will be displayed in the terminal:
   ``` sh
   Page views: 
   /home: 3 visits 
   /about: 3 visits
   
   Unique page views: 
   /home: 2 unique views 
   /about: 3 unique views
   ```


In this example, `/home` was visited 3 times by 2 unique IP addresses, while `/about` was visited 3 times by 3 unique IP addresses.
