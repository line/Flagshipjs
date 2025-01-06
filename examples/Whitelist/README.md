# Whitelist Testing Example

This is a whitelist release example for @linecorp/linengine-jsflagr.

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

## Add flag key for whitelist and turn on it.

![Flag key](/examples/Whitelist/images/whitelist_1.jpg 'Add flag key and turn on it')

## Create the "on" variant

![Variants](/examples/Whitelist/images/whitelist_2.jpg 'Set variant')

## Create the whitelist segment(100% rollout) and create the uid constraint

![Feature A is On](/examples/Whitelist/images/whitelist_3.jpg 'Set constraint')

## Run the example and check the outputs on terminal.

```
node examples/Whitelist/index.mjs
```

![Feature A is On](/examples/Whitelist/images/whitelist_4.jpg 'Terminal result')

## Update the uid constraint to see different result

![Variants](/examples/Whitelist/images/whitelist_3.jpg 'Set constraint')
