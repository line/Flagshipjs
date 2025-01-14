/*
 * Copyright (c) 2023-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { GenericContainer, StartedTestContainer } from 'testcontainers';

const containers: StartedTestContainer[] = [];

const initServer = async (): Promise<{ port: number }> => {
  const SERVER_PORT = 18000;

  const flagrContainer = await new GenericContainer('ghcr.io/openflagr/flagr').withExposedPorts(SERVER_PORT).withName('FlagrServer').start();
  containers.push(flagrContainer);
  console.debug({ mappedPort: flagrContainer.getMappedPort(SERVER_PORT) });
  return { port: flagrContainer.getMappedPort(SERVER_PORT) };
};

afterAll(async () => {
  await close();
});

async function close(): Promise<void> {
  await Promise.all(
    containers.map(async (container) => {
      console.debug(`Container[${container.getName()}] is closing...`);
      await container.stop();
      console.debug('Container is closed.');
    }),
  );
}

export { initServer };
