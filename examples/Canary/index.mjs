/*
 * Copyright (c) 2024-2025 LY Corporation. All rights reserved.
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

const COLOR_BLUE = '\x1b[34m';
const COLOR_RED = '\x1b[31m';
const COLOR_NONE = '\x1b[0m';

function colorBlue(str) {
  return `${COLOR_BLUE}${str}${COLOR_NONE}`;
}

function colorRed(str) {
  return `${COLOR_RED}${str}${COLOR_NONE}`;
}

function round(num) {
  return Math.round(num * 100) / 100;
}

async function checkCanary() {
  const MAX_CALL_COUNT = 100;
  let totalCount = 0;
  let api1Count = 0;
  let api2Count = 0;
  let callsRecord = '';

  while (totalCount < MAX_CALL_COUNT) {
    totalCount++;
    const on = await client.getBooleanValue('canary-flag', false, { targetingKey: 'uid' + totalCount });
    if (on) {
      api2Count++;
      callsRecord += colorRed('o');
    } else {
      api1Count++;
      callsRecord += colorBlue('+');
    }
  }
  console.log(callsRecord);

  const api1Result = colorBlue(`api1: ${api1Count} calls(${round(api1Count / totalCount)})`);
  const api2Result = colorRed(`api2: ${api2Count} calls(${round(api2Count / totalCount)})`);
  console.log(`===== This Iteration (total count = ${totalCount}) =====`);
  console.log(`|            ${api1Result}                |`);
  console.log(`|            ${api2Result}              |`);
  console.log('=====      End Of This Iteration         =====');
}

async function start() {
  await checkCanary();
  reader.question('\nenter Y to start next iteration (press other to exit):', (yes) => {
    if (yes.toUpperCase() === 'Y') {
      start();
    } else {
      reader.close();
    }
  });
}

start();
