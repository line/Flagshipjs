/*
 * Copyright (c) 2023-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { VARIANT_KEY_ON } from './constants';
import {
  JsonObject,
  EvaluationContext,
  OpenFeature,
  Client as OpenFeatureClient,
  Provider as OpenFeatureProvider,
  ErrorCode as OpenFeatureErrorCode,
  ResolutionDetails as OpenFeatureResolutionDetails,
  StandardResolutionReasons as OpenFeatureResolutionReasons,
} from '@openfeature/server-sdk';

export { OpenFeature, OpenFeatureClient, OpenFeatureProvider, OpenFeatureErrorCode, OpenFeatureResolutionDetails, OpenFeatureResolutionReasons };

export type OpenFeatureEvalutionContext = EvaluationContext & {
  entityContext?: OpenFlagrEntityContext;
};

// Rename to `OpenFlagrEntityContext` to make it clear this is for OpenFlagr, not for OpenFeature
// Probably we should remove the legacy `EntityContext` later
export type OpenFlagrEntityContext = Record<string, unknown>;
export type EntityContext = OpenFlagrEntityContext;

export interface OpenFlagrEvalutionContext {
  entityID?: string;
  entityContext?: OpenFlagrEntityContext;
}

// Rename to `OpenFlagrEvalutionBody` to make it clear this is for OpenFlagr, not for OpenFeature
// Probably we should remove the legacy `EvaluationBody` later
export interface OpenFlagrEvalutionBody extends OpenFlagrEvalutionContext {
  flagKey: string;
  flagID?: number;
  enableDebug?: boolean;
  entityType?: string;
}
export type EvaluationBody = OpenFlagrEvalutionBody;

export type OpenFlagrAttachment = JsonObject | null;

// Rename to `OpenFlagrEvaluationResponse` to make it clear this is for OpenFlagr, not for OpenFeature
// Probably we should remove the legacy `EvaluationResponse` later
export interface OpenFlagrEvaluationResponse {
  flagKey: string;
  flagID?: number;
  evalContext?: object;
  evalDebugLog?: object;
  flagSnapshotID?: number;
  timestamp?: string;
  variantID?: number;
  variantKey?: string;
  segmentID?: number;
  variantAttachment?: OpenFlagrAttachment;
}
export type EvaluationResponse = OpenFlagrEvaluationResponse;

// Rename to `OpenFlagrEvaluationModel` to make it clear this is for OpenFlagr, not for OpenFeature
// Probably we should remove the legacy `EvaluationModel` later
export class OpenFlagrEvaluationModel {
  constructor(private evaluation: OpenFlagrEvaluationResponse) {}

  isFlagIdExist() {
    return !!this.evaluation.flagID;
  }

  isVariantMatched(variantKey?: string) {
    if (variantKey) {
      return variantKey === this.evaluation.variantKey;
    }
    return this.validateWithDefaultVariant(this.evaluation.variantKey);
  }

  getVariantKey() {
    return this.evaluation.variantKey;
  }

  getVariantAttachment() {
    return this.evaluation.variantAttachment || null;
  }

  private validateWithDefaultVariant(variantKey: string | undefined) {
    return variantKey ? Object.values(VARIANT_KEY_ON).includes(variantKey as VARIANT_KEY_ON) : false;
  }
}
export type EvaluationModel = OpenFlagrEvaluationModel;

export interface IsFeatureOnQueryParams {
  variantKey?: string;
}
