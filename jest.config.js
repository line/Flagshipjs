/*
 * Copyright (c) 2024 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.test.tsx?$',
  coverageDirectory: 'coverage',
  testTimeout: 20000,
  verbose: true,
  collectCoverage: true,
};
