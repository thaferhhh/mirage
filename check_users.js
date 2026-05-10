const mysql = require('mysql2/promise');

async function checkUsers() {
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/mirage_db");
  const [rows] = await connection.execute('SELECT email, password FROM User');
  console.log('Registered Admin Users:');
  rows.forEach(row => console.log(`Email: ${row.email}, Password: ${row.password}`));
  await connection.end();
}

checkUsers().catch(console.error);
