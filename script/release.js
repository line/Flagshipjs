/*
 * Copyright (c) 2024-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
const https = require('https');
const { version } = require('../package.json');

// API doc: https://docs.github.com/en/enterprise-server@3.5/rest/quickstart
const baseUrl = 'https://git.linecorp.com/api/v3/repos/devops-tw/linengine-jsflagr';
const baseHeadrs = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
};

function getTriggeringRelease() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: baseHeadrs,
    };
    const req = https.request(`${baseUrl}/releases/tags/release`, options, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        try {
          if (resp.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            throw new Error(`getTriggeringRelease failed with ${resp.statusCode}: ${resp.statusMessage}`);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

function removeTriggeringRelease(info) {
  if (!info?.id) {
    return Promise.reject(new Error(`Invalid current triggering release info: ${info}`));
  }

  return new Promise((resolve, reject) => {
    const options = {
      method: 'DELETE',
      headers: baseHeadrs,
    };
    const req = https.request(`${baseUrl}/releases/${info.id}`, options, (resp) => {
      if (resp.statusCode === 204) {
        resolve();
      } else {
        reject(new Error(`removeTriggeringRelease failed with ${resp.statusCode}: ${resp.statusMessage}`));
      }
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

function removeTriggeringReleaseTag() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'DELETE',
      headers: baseHeadrs,
    };

    const req = https.request(`${baseUrl}/git/refs/tags/release`, options, (resp) => {
      if (resp.statusCode === 204) {
        resolve();
      } else {
        reject(new Error(`removeTriggeringReleaseTag failed with ${resp.statusCode}: ${resp.statusMessage}`));
      }
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

function createRelease() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: baseHeadrs,
    };

    const req = https.request(`${baseUrl}/releases`, options, (resp) => {
      if (resp.statusCode === 201) {
        resolve();
      } else {
        reject(new Error(`createRelease failed with ${resp.statusCode}: ${resp.statusMessage}`));
      }
    });

    req.on('error', (e) => {
      reject(e);
    });

    const tag = `release-${version}`;
    req.write(
      JSON.stringify({
        tag_name: tag,
        target_commitish: 'master',
        name: tag,
        body: new Date().toUTCString(),
        draft: false,
        prerelease: false,
        generate_release_notes: false,
      }),
    );

    req.end();
  });
}

getTriggeringRelease()
  .then((info) => Promise.all([removeTriggeringRelease(info), removeTriggeringReleaseTag()]))
  .then(() => {
    return createRelease();
  })
  .catch((e) => {
    console.error(e);
  });
