/*
 * Copyright (c) 2024-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { FlagrClient, OpenFlagrProvider, OpenFeature } from '../src';
import { OpenFlagrEvaluationResponse, OpenFlagrEvaluationModel } from '../src/definition';

function givenMockFlagrClient(givenResult: OpenFlagrEvaluationResponse): FlagrClient {
  const flagrClient = new FlagrClient('http://foo.com');
  flagrClient.evaluate = jest.fn(async () => new OpenFlagrEvaluationModel(givenResult));
  return flagrClient;
}

describe('resolveBooleanEvaluation', () => {
  it('should return true', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'on',
      variantKey: 'on',
      variantAttachment: {},
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getBooleanValue('on', false);
    expect(result).toBe(true);
  });

  it('should return default', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagKey: 'unknown',
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getBooleanValue('unknown', false);
    expect(result).toBe(false);
  });

  it('should return details', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'on',
      variantKey: 'on',
      variantAttachment: {},
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getBooleanDetails('on', false);
    expect(result.value).toBe(true);
    expect(result.variant).toBe('on');
  });
});

describe('resolveStringEvaluation', () => {
  it('should return variant key', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'variant',
      variantKey: 'variant',
      variantAttachment: {},
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getStringValue('variant', '');
    expect(result).toBe('variant');
  });

  it('should return default', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagKey: 'unknown',
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getStringValue('unknown', '');
    expect(result).toBe('');
  });

  it('should return details', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'variant',
      variantKey: 'variant',
      variantAttachment: {},
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getStringDetails('variant', '');
    expect(result.value).toBe('variant');
    expect(result.variant).toBe('variant');
  });
});

describe('resolveNumberEvaluation', () => {
  it('should return number', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'number',
      variantKey: '1',
      variantAttachment: {},
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getNumberValue('number', -1);
    expect(result).toBe(1);
  });

  it('should return default', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagKey: 'unknown',
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getNumberValue('unknown', -1);
    expect(result).toBe(-1);
  });

  it('should return default if unable to parse number', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'number',
      variantKey: 'unknown',
      variantAttachment: {},
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getNumberValue('number', -1);
    expect(result).toBe(-1);
  });

  it('should return details', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'number',
      variantKey: '1',
      variantAttachment: {},
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getNumberDetails('number', -1);
    expect(result.value).toBe(1);
    expect(result.variant).toBe('1');
  });
});

describe('resolveObjectEvaluation', () => {
  it('should return attachment object', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'attachment',
      variantKey: 'attachment',
      variantAttachment: {
        data: 'data',
      },
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getObjectValue('attachment', null);
    expect(result).toMatchObject({ data: 'data' });
  });

  it('should return default', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagKey: 'unknown',
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getObjectValue('unknown', null);
    expect(result).toBe(null);
  });

  it('should return details', async () => {
    const givenFlagr = givenMockFlagrClient({
      flagID: 1,
      flagKey: 'attachment',
      variantKey: 'attachment',
      variantAttachment: {
        data: 'data',
      },
    });
    const client = OpenFeature.setProvider(new OpenFlagrProvider(givenFlagr)).getClient();
    const result = await client.getObjectDetails('attachment', null);
    expect(result.value).toMatchObject({ data: 'data' });
    expect(result.variant).toBe('attachment');
  });
});
