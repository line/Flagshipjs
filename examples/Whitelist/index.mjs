/*
 * Copyright (c) 2024 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import readline from 'readline';
import { FlagrClient, OpenFlagrProvider, OpenFeature } from '../../dist/index.js';

const provider = new OpenFlagrProvider(new FlagrClient('http://127.0.0.1:18000/'));
const client = OpenFeature.setProvider(provider).getClient();

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function printUserPermissions() {
  const permissionMessages = [];
  for (let i = 1; i <= 9; i++) {
    const uid = 'user' + i;
    const on = await client.getBooleanValue('white-list-flagr', false, { entityContext: { uid } });
    const permission = on ? '     ALLOW     ' : '    DISALLOW   ';
    permissionMessages.push(`|      ${uid}      |${permission}|`);
  }

  console.log('+-----------------+---------------+');
  console.log('|      User       |     Status    |');
  console.log('+-----------------+---------------+');
  console.log(permissionMessages.join('\n'));
  console.log('+-----------------+---------------+');
}

async function start() {
  await printUserPermissions();
  reader.question('\nenter Y to request again (press other to exit):', (yes) => {
    if (yes.toUpperCase() === 'Y') {
      start();
    } else {
      reader.close();
    }
  });
}

start();
