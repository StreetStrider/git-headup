# git-headup

> Head-up display for git in command line

git aliases, git scripts, zsh prompt with git and npm HUD.

git-headup is for my own use in first place.

```sh
# install `git-headup` locally
$ cd
$ npm i git-headup
```

```ini
# include aliases in your .gitconfig
[include]
  path = ~/node_modules/git-headup/gitconfig
```

```sh
# add `~/node_modules/git-headup/run` to $PATH
$ PATH=~/node_modules/git-headup/run:$PATH
# or you can add whole npm's .bin (mind what you're doing)
$ PATH=~/node_modules/.bin:$PATH
```

```sh
# setup prompt and precmd in your ~/.zshrc
. ~/node_modules/git-headup/run/setup
```

# license
MIT, Copyright © 2015 — 2016 StreetStrider.
