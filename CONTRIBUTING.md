# Development

## Install dependencies
```bash
npm install
```

## Run test
```bash
npm test
```

Note that it will call `npm run build` to compile the artifacts and the unit test is test against the compiled source
instead of the original source code.

## Build artifacts only
```bash
npm run build
```

It is used to test the babel configuration only. If you are developing, you should use `npm test` in most cases.

## Publish
```bash
npm publish
```

Note that `npm publish` will also call `npm run build` since we should publish the compiled source only.
