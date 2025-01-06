/*
 * Copyright (c) 2024 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
export function canParseToNumber(value: string) {
  return typeof value !== 'object' && !isNaN(parseFloat(value));
}

export function toNumber(value: string): number {
  return canParseToNumber(value) ? parseFloat(value) : NaN;
}
