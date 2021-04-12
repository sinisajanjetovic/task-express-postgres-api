const path = require(`path`);

// =>> STEP =>> 1) Ovdje kreiramo malu funkciju, koja nam omogućava da olakšamo traženje putanje
module.exports = path.dirname(process.mainModule.filename);

// Comment =>> Ovo nam praktično daje putanju app.js, odnosno glavnog js
