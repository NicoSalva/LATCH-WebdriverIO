## LATCH MOBILE FRAMEWORK

This project is a mobile automation framework utilizing WebdriverIO and Appium. It is set up to run tests on Android devices using the Cucumber BDD design pattern.

## Features
Mobile test automation framework with WebdriverIO.
Integration with Appium for communicating with Android devices.
Utilization of the BDD pattern with Cucumber.
Report generation with Allure.
Local test execution capabilities.

## 🛠️ STACK

- 📊 Allure Reports

- 🟣 Appium

- ☕ Chai Assertions

- 🟨 JavaScript

- 🟢 NodeJs

- 🟦 TypeScript

- 🤖 Webdriver IO

- 🥒 CucumberJs [VS link](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official)


## JDK for macOS:

- install via [Homebrew](https://brew.sh/index)

```
brew install openjdk@17
``` 

We recommend setting up your mobile environment using the appium-installer package:

```
npm install -g appium-installer
```

Using the appium-installer command will initiate the installation helper for the server and drivers.

Appium Drivers: Crucial for interacting with the specific mobile applications of each operating system. Ensure you have installed:

UiAutomator2 (for Android)
XCUITEST (for iOS)
Appium-doctor: This tool is essential for verifying the correct configuration of Appium and alerting about possible issues.

```
npm install -g appium-doctor
```

Once installed, you can run appium-doctor to check that everything is set up correctly.


## INSTALLING THE PROJECT


Clone this repository and navigate to the cloned directory. Install the dependencies using npm:

```
https://github.com/NicoSalva/LATCH-WebdriverIO.git
```

Once you have the project cloned locally, go to the project:

```
cd LATCH-WebdriverIO
```
Run the following command to install all the necessary dependencies for the project:

```
npm install
```
## CONFIGURATION
The main configuration file is wdio-config.ts, which includes all the necessary setup to run your tests. Ensure you update the capabilities and app path according to your device and the location of your APK.

Before running the tests, place the version of your app in the 'apps' folder and replace the name in the capabilities section of the wdio-config.ts file:
```
capabilities: [
  {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "emulator-5554",
    "appium:platformVersion": "13",
    "appium:app": "apps/YourAppName_YourAppVersion.apk",
    "appium:appPackage": "your.app.package",
    "appium:appActivity": "your.app.activity"
  }
],
```
Replace YourAppName_YourAppVersion.apk with the actual app name and version, and ensure the appPackage and appActivity are correctly set for your application.

## RUNNING TESTS
To run all the tests on a local Android device, you can use the following command:
```
npm run android:local
```

You can run specific sets of tests by using tags. For example, to run all smoke tests, you can use:
```
TAG=@smoke npm run android:local
```
Similarly, to run only the tests related to login or logout features, you can use:
```
TAG=@login npm run android:local
```
or
```
TAG=@logout npm run android:local
```

## REPORTS
```
npm run allure
```
```
npm run open-allure
```

## HOOKS
The framework utilizes various WebdriverIO hooks to customize the test execution, such as beforeScenario and afterScenario, which help set up the environment before each scenario and clean up after each one.

## ABOUT THE SOLUTION

I'd like to provide some insights into my solution. Although it implements the Page Object Model (POM) architecture, I've made some modifications to make the project more practical. It's essential to remember that beyond any structure or implicit rule, the prime directive of a project should be to meet the required needs in the most practical manner. Thus, ensuring that we stay focused on the core objective of quality assurance and concentrate on the necessary outcomes.

Working with Cucumber enhances readability for the entire team, allowing individuals without technical expertise to understand our scenarios. That's why my initial approach included a configuration that enables tagging of features or scenarios, thereby allowing isolated test runs which facilitate setting up different pipeline executions.

Regarding the POM, I decided to create a BasePage class to abstract all common methods to our pages, such as tap, type, getElement, getText, and scroll. This approach helps us avoid code repetition across every page we create. Instead of establishing a page for each application screen, I focused on having a LoginPage for all login-related functionalities and only added Pages for screens that require interaction or hold significant importance. Often, frameworks become overloaded with multiple pages that are unclear in their purpose or contain very few declarations and methods.

I chose to work with Allure for reporting since it has always provided excellent results. It's also worth mentioning that if you want to test the solution with an Android phone connected to your PC, you should retrieve the device name using adb devices from the console and replace it in the capabilities.

## LOGIN AND LOGOUT TEST AUTOMATION
I chose to focus on automating the Login and Logout features primarily because these were the only functionalities where the app version and the provided test data allowed me to work comfortably. This decision was based on the fact that they didn't require any additional validation, given I didn't have access to the account with which the provided one by the challenge was created.

## Handling the Permissions Screen
Instead of skipping the permissions screen, I decided to work through it, adding more substance to my testing solution. There's an option to bypass this screen altogether using the appium:autoGrantPermissions capability, but I chose to include explicit handling of this screen in my tests. This approach was intentional, aiming to enhance the test coverage and address scenarios where we might need to verify the user's interaction with the permissions explicitly.

## Explicit Wait During Automation
While interacting with the Android permissions, I found myself compelled to employ a 500ms explicit wait to ensure seamless UI interaction. Typically, forcing waits in automation isn't ideal; however, occasionally, the framework can execute much faster than our app can respond, especially when dealing with native OS UI elements. This mismatch can lead to issues, particularly when engaging with the system's native UI.
