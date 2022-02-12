# Controlpad

Program to add macro functionality to LaunchPad devices (currently only MK2).

## Building

Builds in release are built using `npm run make -- --arch=all` but the `-- --arch=all` isnt needed for local builds

## TODO

- Be more efficient with device lighting updates
- Add check for update functionality
- Have launchpad display change size
- Fix issues with colors not visually resetting on clear all
- Create updating
- Add functionality for all settings items
- Add refresh button for device selector
- Add device selector
- Add web requests as function
- Add play sound as function
- Fix 5 second delay for device startup (devices boot with animation)
- Add a mapping helper for unknown devices


## Versioning

`npm version prepatch --preid=alpha`
`npm version prepatch --preid=beta`
`npm version patch`

### Undo version

`git reset --hard origin/master`

### Push version

`git push --tags`