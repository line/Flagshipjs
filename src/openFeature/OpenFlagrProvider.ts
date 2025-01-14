/*
 * Copyright (c) 2024-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
// For the implementation docs, see https://openfeature.dev/docs/reference/concepts/provider
import { OpenFeatureEventEmitter } from '@openfeature/server-sdk';
import {
  OpenFlagrEvaluationModel,
  OpenFeatureProvider,
  OpenFeatureErrorCode,
  OpenFeatureEvalutionContext,
  OpenFeatureResolutionDetails,
  OpenFeatureResolutionReasons,
} from '../definition';
import { FlagrClient } from '../openFlagrClient';
import { canParseToNumber, toNumber } from '../utils/number';

export class OpenFlagrProvider implements OpenFeatureProvider {
  readonly metadata = {
    name: 'OpenFlagrProvider',
  } as const;

  events = new OpenFeatureEventEmitter();

  private client: FlagrClient;

  constructor(client: FlagrClient) {
    this.client = client;
  }

  private evaluate(flagKey: string, openfeatureContext: OpenFeatureEvalutionContext = {}): Promise<OpenFlagrEvaluationModel> {
    return this.client.evaluate({
      flagKey,
      entityID: openfeatureContext.targetingKey,
      entityContext: openfeatureContext.entityContext,
    });
  }

  private createSuccessResult(value: any, variant: string): OpenFeatureResolutionDetails<any> {
    return {
      value,
      variant,
      reason: OpenFeatureResolutionReasons.DEFAULT,
    };
  }

  private createNotFoundResult(flagKey: string, value: any): OpenFeatureResolutionDetails<any> {
    return {
      value,
      reason: OpenFeatureResolutionReasons.ERROR,
      errorCode: OpenFeatureErrorCode.FLAG_NOT_FOUND,
      errorMessage: `[OpenFeatureProvider] Find no flagKey of ${flagKey}`,
    };
  }

  private createGeneralErrorResult(flagKey: string, value: any, error: any): OpenFeatureResolutionDetails<any> {
    return {
      value,
      reason: OpenFeatureResolutionReasons.ERROR,
      errorCode: OpenFeatureErrorCode.GENERAL,
      errorMessage: `[OpenFeatureProvider] Fail to fetch flagKey of ${flagKey}: ${String(error)}`,
    };
  }

  async resolveBooleanEvaluation(
    flagKey: string,
    defaultValue: boolean,
    context?: OpenFeatureEvalutionContext,
  ): Promise<OpenFeatureResolutionDetails<boolean>> {
    try {
      const result = await this.evaluate(flagKey, context);
      const variantKey = result.getVariantKey();
      if (!result.isFlagIdExist() || !variantKey) {
        return this.createNotFoundResult(flagKey, defaultValue);
      }
      return this.createSuccessResult(result.isVariantMatched(), variantKey);
    } catch (e) {
      return this.createGeneralErrorResult(flagKey, defaultValue, e);
    }
  }

  async resolveStringEvaluation(
    flagKey: string,
    defaultValue: string,
    context?: OpenFeatureEvalutionContext,
  ): Promise<OpenFeatureResolutionDetails<string>> {
    try {
      const result = await this.evaluate(flagKey, context);
      const variantKey = result.getVariantKey();
      if (!result.isFlagIdExist() || !variantKey) {
        return this.createNotFoundResult(flagKey, defaultValue);
      }
      return this.createSuccessResult(variantKey, variantKey);
    } catch (e) {
      return this.createGeneralErrorResult(flagKey, defaultValue, e);
    }
  }

  async resolveNumberEvaluation(
    flagKey: string,
    defaultValue: number,
    context?: OpenFeatureEvalutionContext,
  ): Promise<OpenFeatureResolutionDetails<number>> {
    try {
      const result = await this.evaluate(flagKey, context);
      const variantKey = result.getVariantKey();
      if (!result.isFlagIdExist() || !variantKey) {
        return this.createNotFoundResult(flagKey, defaultValue);
      }

      if (!canParseToNumber(variantKey)) {
        throw new Error(`Unable to parse variantKey of ${variantKey} to a number`);
      }

      return this.createSuccessResult(toNumber(variantKey), variantKey);
    } catch (e) {
      return this.createGeneralErrorResult(flagKey, defaultValue, e);
    }
  }

  async resolveObjectEvaluation<OpenFlagrAttachment>(
    flagKey: string,
    defaultValue: OpenFlagrAttachment,
    context?: OpenFeatureEvalutionContext,
  ): Promise<OpenFeatureResolutionDetails<OpenFlagrAttachment>> {
    try {
      const result = await this.evaluate(flagKey, context);
      const variantKey = result.getVariantKey();
      const attachment = result.getVariantAttachment();
      if (!result.isFlagIdExist() || !variantKey) {
        return this.createNotFoundResult(flagKey, defaultValue);
      }

      if (!attachment) {
        throw new Error(`No object attachment under variantKey of ${variantKey}`);
      }

      return this.createSuccessResult(attachment as unknown as OpenFlagrAttachment, variantKey);
    } catch (e) {
      return this.createGeneralErrorResult(flagKey, defaultValue, e);
    }
  }
}
