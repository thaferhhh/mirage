const mysql = require('mysql2/promise');

async function test() {
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/mirage_db");
  const [rows] = await connection.execute('SELECT title FROM Blog');
  console.log('Blog Posts in Database:');
  rows.forEach(row => console.log('- ' + row.title));
  
  const [pkgs] = await connection.execute('SELECT title FROM Package');
  console.log('\nPackages in Database:');
  pkgs.forEach(pkg => console.log('- ' + pkg.title));
  
  await connection.end();
}

test().catch(console.error);
