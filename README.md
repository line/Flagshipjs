# flagshipjs

---

The LINE Open-Feature x Openflagr API SDK for JavaScript is a JavaScript library that provides an API client SDK to integrate a toggle system, named [Openflagr](https://github.com/openflagr/flagr) and follows the [Open-Feature](https://openfeature.dev/) specification.

## Getting started

Before we get started, please make sure you have installed Node and Docker.

### Run Local Flagr Server

```
yarn install
yarn dev:svr
```

### Lint

- Lint will be performed automatically while pushing to the repo. To skip, push with `--no-verify`.

## Examples

| Name                                 | Description                                                     |
| ------------------------------------ | --------------------------------------------------------------- |
| [On / Off](./examples/OnOff)         | An simple example of OpenFeature with OpenFlagr provider        |
| [A/B Testing](./examples/AB-testing) | An A/B testing example of OpenFeature with OpenFlagr provider   |
| [Canary Release](./examples/Canary)  | A canary release example of OpenFeature with OpenFlagr provider |
| [White List](./examples/Whitelist)   | A white list example of OpenFeature with OpenFlagr provider     |

## Contributing

If you believe you found a vulnerability or you have an issue related to security, please **DO NOT** open a public issue. Instead, send us an email at dl_oss_dev@linecorp.com.

Before contributing to this project, please read [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
