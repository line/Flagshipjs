# A/B Testing Example

This is an A/B testing example for @linecorp/linengine-jsflagr.

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

## Add flag key "blue-green-exp" and turn on it.

![Flag key](/examples/AB-testing/images/image1.png 'Add flag key "blue-green-exp" and turn on it')

## Set two variant groups "blue" and "green".

![Variants](/examples/AB-testing/images/image2.png 'Set two variant groups "blue" and "green"')

## Set rollout and distribution as you want.

![Rollout and Distribution](/examples/AB-testing/images/image3.png 'Set rollout and distribution as you want')

## Run the example and check the outputs.

```
node examples/AB-testing/index.mjs
```

### Press 1, 2 or 0 to see different userId would retrieve color by distribution.

- 1: user1
- 2: user2
- 0: default user

## Blue on user2

![Blue result on user2](/examples/AB-testing/images/image4.png 'Set user id to blue of user2')

## Green on user2

![Green result on user2](/examples/AB-testing/images/image5.png 'Set user id to green of user2')
