/*
 * Copyright (c) 2023-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import * as http from 'http';
import * as https from 'https';
import { OpenFlagrEvalutionBody, OpenFlagrEvaluationResponse, OpenFlagrEvaluationModel } from '../definition';

export class FlagrClient {
  private instance: AxiosInstance;

  constructor(flagrServerURL: string, config?: CreateAxiosDefaults) {
    this.instance = axios.create({
      ...config,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
      baseURL: `${flagrServerURL}/api/v1`,
    });
  }

  async evaluate(evaluationBody: OpenFlagrEvalutionBody): Promise<OpenFlagrEvaluationModel> {
    const body = {
      ...evaluationBody,
      enableDebug: true,
    };
    return new OpenFlagrEvaluationModel((await this.instance.post('evaluation', body)).data as OpenFlagrEvaluationResponse);
  }
}
