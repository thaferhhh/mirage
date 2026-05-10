const mysql = require('mysql2/promise');

async function checkTables() {
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/mirage_db");
  const [rows] = await connection.execute('SHOW TABLES');
  console.log('Tables in database:');
  rows.forEach(row => console.log(Object.values(row)[0]));
  await connection.end();
}

checkTables().catch(console.error);
