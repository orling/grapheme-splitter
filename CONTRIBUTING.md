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

## New Unicode Version Adoption
On changes to any new version of `GraphemeBreakProperty.txt` or `emoji-data.txt`, run the following scripts
to synchronize upstream changes to JavaScript codes:

For example, if you would like to update the `GraphemeBreakProperty.txt` to a new Unicode version, download
to the `/scripts` folder and synchronize the changes:

```bash
# This script will output the generated codes ready to copy paste into the source
node ./scripts/generate-grapheme-break

# use `pbcopy` to copy into pasteboard if you are on a Mac
node ./scripts/generate-grapheme-break | pbcopy
```

Now replace the code by the pasteboard in a decent IDE which offers automatic text indent.

## Publish
```bash
npm publish
```

Note that `npm publish` will also call `npm run build` since we should publish the compiled source only.
