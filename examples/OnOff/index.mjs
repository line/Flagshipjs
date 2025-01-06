/*
 * Copyright (c) 2023-2024 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { FlagrClient, OpenFlagrProvider, OpenFeature } from '../../dist/index.js';

const provider = new OpenFlagrProvider(new FlagrClient('http://127.0.0.1:18000/'));
const client = OpenFeature.setProvider(provider).getClient();

const FLAG_KEY = 'hello-world-enabled';

setInterval(async () => {
  console.clear();
  await delay(500);

  const isHelloWorldEnabled = await client.getBooleanValue(FLAG_KEY, false);
  const helloWorldEnabledString = isHelloWorldEnabled ? 'enabled' : 'disabled';

  console.log('=========================');
  console.log(`| Hello World: ${helloWorldEnabledString}   |`);
  console.log('=========================');
}, 1500);

function delay(s) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, s);
  });
}
