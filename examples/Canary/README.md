# Canary Testing Example

This is a canary release example for @linecorp/linengine-jsflagr.

## Turn on Docker client then run the local server.

- Build project

```
yarn build
```

- Run the dev flagr server

```
yarn dev:svr
```

- Open `http://localhost:18000/`

## Add flag key for Canary and turn on it.

![Flag key](/examples/Canary/images/setting_1.jpg 'Add flag key and turn on it')

## Create the "on" variant to represent the new version.

![Variants](/examples/Canary/images/setting_2.jpg 'Set two variant groups')

## Create the canary segment(50% rollout) and set the "on" variant distribution to 100%

![Feature A is On](/examples/Canary/images/setting_3.jpg 'Set distributions')

## Run the example and check the outputs on terminal.

```
node examples/Canary/index.mjs
```

![Feature A is On](/examples/Canary/images/terminal_result.jpg 'Terminal result')

## Adjust the canary segment rollout %

![Feature A is On](/examples/Canary/images/setting_3.jpg 'Set rolout')
