# On/Off Testing Example

This is an OnOff testing example for @linecorp/linengine-jsflagr.

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

## Add flag key "hello-world-enabled" for feature HelloWorld and turn on it.

![Flag key](/examples/OnOff/images/image1.png 'Add flag key "hello-world-enabled" and turn on it')

## Set two variant groups "Enabled" and "Disabled" to indicate launching feature HelloWorld or not.

![Variants](/examples/OnOff/images/image2.png 'Set two variant groups "Enabled" and "Disabled"')

## Distribute "Enabled" and rollout 100% for going to launch.

![Feature HelloWorld is enabled](/examples/OnOff/images/image3.png 'Set 100% for enabled')

## Distribute "Disabled" and rollout 100% for stopping.

![Feature HelloWorld is disabled](/examples/OnOff/images/image4.png 'Set 100% for disabled')

## Run the example and check the outputs.

```
node examples/OnOff/index.mjs
```

## Enabled

![Feature HelloWorld enabled result](/examples/OnOff/images/image5.png 'Enabled result')

## Disabled

![Feature HelloWorld disabled result](/examples/OnOff/images/image6.png 'Disabled result')
