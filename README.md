# Controlpad

Program to add macro functionality to LaunchPad devices (currently only MK2).

I hope to make this more legit if there are some that actually want to use it but currently it was designed for my uses.


## Building

Builds in release are built using `npm run make -- --arch=all` but the `-- --arch=all` isnt needed for local builds

## TODO

Check issues


## Versioning

`npm version prepatch --preid=alpha`
`npm version prepatch --preid=beta`
`npm version patch`

### Undo version

`git reset --hard origin/master`
`git fetch origin --prune --tags`

### Push version

`git push --tags`
