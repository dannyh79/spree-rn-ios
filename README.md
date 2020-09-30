# SpreeExampleRNApp

## Development

### System requirements

* nodejs `14.2.0`
  * yarn: `npm install -g yarn`
* ruby `2.7.1`
  * bundler: `gem install bundler`

> this repo contains `.ruby-version` for [rbenv](https://github.com/rbenv/rbenv), `.node-version` for [nodenv](https://github.com/nodenv/nodenv) and `.tool-versions` for [asdf-vm](https://asdf-vm.com/)

#### Android

* openjdk (2020/01: working openjdk version: `11`
  * homebrew: https://formulae.brew.sh/formula/openjdk@11
  * archlinux: https://www.archlinux.org/packages/extra/x86_64/jdk11-openjdk/
* [Android Studio](https://developer.android.com/studio)
  * environment variable `ANDROID_HOME` need to be set
  * https://reactnative.dev/docs/environment-setup

#### iOS (macOS only)

* XCode, install via mac Appstore
 * After installing XCode, launch XCode to install components and run `sudo xcode-select --switch /Applications/Xcode.app`

### Get code

```bash
git clone git@git.5xruby.com:spree-example/spree-example-rnapp.git
cd spree-example-rnapp
```

### Install dependencies

```bash
yarn
bundle
```

#### for macOS/iOS

```
cd ios/
bundle exec pod install
cd ../
```

> you will need to re-run this after changing to node dependencies

### Start dev server

```
yarn start
```

### Signing

#### iOS

**DO NOT CHECK** `Automatically manage signing`! this might break other developers/CI codesign!

We are using [fastlane match](https://docs.fastlane.tools/actions/match/) to manage and prepare iOS certificates and provisioning profiles, see [how it works here](https://codesigning.guide/)

Every `bundle exec fastlane match` command requires passphrase of `iOS app certs repo`, this will be prompted by the command or set with [`MATCH_PASSWORD`](https://git.5xruby.com/spree-example/spree-example-rnapp/-/wikis/creds#match_password-to-get-certificates)

##### To get certificates for development

```bash
$ bundle exec fastlane match development --readonly
```

this commands will pull [provisioning profiles](https://developer.apple.com/account/ios/profile/) and [certificates](https://developer.apple.com/account/ios/certificate/) from [app certificate repo](https://git.5xruby.com/spree-example/spree-example-ios-cert)

##### To update/fix certificates

After

* updating app capabilities
* certificate expiring
* or someone doing something wrong about certificates and provisioning profiles
  * manually changing [provisioning profiles](https://developer.apple.com/account/ios/profile/) and [certificates](https://developer.apple.com/account/ios/certificate/) on apple dev
  * check `Automatically manage signing` and allow XCode doing something nasty

[Provisioning profiles](https://developer.apple.com/account/ios/profile/) or [certificates](https://developer.apple.com/account/ios/certificate/) may become `invalid` or not sync with [app certificate repo](https://git.5xruby.com/spree-example/spree-example-ios-cert), which will make other developers/CI fail

There is an apple dev id (see `fastlane/Matchfile`) to manage certificates and provisioning profiles, you will need to login to this apple id and its credentials will be requested by `fastlane match` commands: https://git.5xruby.com/spree-example/spree-example-rnapp/-/wikis/creds#managing-apple-certificates

```bash
# for development certificates and provisioning profiles:
$ bundle exec fastlane match nuke development
$ bundle exec fastlane match development

# for appstore and distribution certificates and provisioning profiles:
$ bundle exec fastlane match nuke distribution
$ bundle exec fastlane match appstore
```

These commands will regenerate [provisioning profiles](https://developer.apple.com/account/ios/profile/) and [certificates](https://developer.apple.com/account/ios/certificate/) then sync to [app certificate repo](https://git.5xruby.com/spree-example/spree-example-ios-cert)

> `bundle exec fastlane match` commands will use `login` keychain by default, you will be prompted to enter password for this keychain, this password is your mac's user password

#### Android

This is only required if you want to create a build to upload to play store; **For development, this is NOT REQUIRED**

To prepare apk signing for releasing to google play, export [`ANDROID_SIGNING_PASSWORD`](https://git.5xruby.com/spree-example/spree-example-rnapp/-/wikis/creds#android_signing_password) environments before `gradlew` / `fastlane build`:

```bash
export ANDROID_SIGNING_PASSWORD=...
```

### Run on Devices

#### Android

connect to android device with adb debugging or emulator, use `adb devices -l` to verify, then:

```
yarn android
```

#### iOS

open `ios/SpreeExampleRNApp.xcworkspace`, choose device/emulator to run and press play button

## Release build and deployment (upload)

This is done by [Fastlane](https://fastlane.tools/), please see `fastlane/README.md` and `fastlane/Fastfile`

* Our `fastlane` is installed by bundler, please execute fastlane by `bundle exec fastlane ...`, and there is no need to `gem install fastlane`
* For deployment (uploading) credentials, please see: https://git.5xruby.com/spree-example/spree-example-rnapp/-/wikis/creds#for-app-deployment
* You will probably need to access Google play console / App store connect to manage release or beta testing, ask project manager for the access
