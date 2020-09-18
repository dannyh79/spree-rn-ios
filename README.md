# SpreeExampleRNApp

## Development

### System requirements

* nodejs
  * yarn: `npm install -g yarn`
* ruby
  * bundler: `gem install bundler`

#### Android

* openjdk11
  * homebrew: https://formulae.brew.sh/formula/openjdk@11
* [Android Studio](https://developer.android.com/studio)
  * environment variable `ANDROID_HOME` need to be set
  * https://reactnative.dev/docs/environment-setup

#### iOS (macOS only)

* XCode, install via mac Appstore

### Get code

```bash
git clone this_repo
cd this_repo
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

### Start dev server

```
yarn start
```

### Run on Devices

#### Android

connect to android device with adb debugging, use `adb devices -l` to verify

```
yarn android
```

#### iOS

open `ios/SpreeExampleRNApp.xcworkspace`, choose device/emulator to run and press play button
