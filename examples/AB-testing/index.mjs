/*
 * Copyright (c) 2024-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { FlagrClient, OpenFlagrProvider, OpenFeature } from '../../dist/index.js';

const provider = new OpenFlagrProvider(new FlagrClient('http://127.0.0.1:18000/'));
const client = OpenFeature.setProvider(provider).getClient();

const COLOR_BLUE = '\x1b[34m';
const COLOR_GREEN = '\x1b[32m';
const COLOR_NONE = '\x1b[0m';

const FLAG_KEY = 'blue-green-exp';
const USER_IDs = ['bd4535a4-5ee6-40bb-ae06-e5f565b2c0ea', 'ae0bd08e-cc87-4ef3-a85b-8acdd4133f07'];
let textColor;
let userId = 'default user';
const stdin = process.stdin;
if (stdin.isTTY) {
  stdin.setRawMode(true);
}
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', (key) => {
  // ctrl-c ( end of text )
  if (key === '\u0003') {
    process.exit();
  }
  if (key === '2') {
    userId = USER_IDs[1];
  }
  if (key === '1') {
    userId = USER_IDs[0];
  }
  if (key === '0') {
    userId = 'default user';
  }
});

setInterval(async () => {
  console.clear();
  let color;
  await client.getStringValue(FLAG_KEY, userId).then((_color) => {
    color = _color;
    if (color === 'blue') {
      textColor = COLOR_BLUE;
    } else if (color === 'green') {
      textColor = COLOR_GREEN;
    } else {
      console.error('There should be some errors... Have you created or turned on the flag?');
    }
  });

  console.log('==================================================');
  console.log(`| User ID:  ${userId}            |`);
  console.log('==================================================');
  console.log(`| ${textColor}Variant Key: ${color}${COLOR_NONE}`);
}, 1500);
