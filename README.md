# SLMN.GG Companion Module

This module gives you control of [SLMN.GG](https://github.com/slmnio/slmngg-sfc) actions and services. You will need to supply an authentication token and have a SLMN.GG profile with production access.

# Installation

### Preparing Companion

- Install [Companion v3](https://user.bitfocus.io/download). You should make sure that any modules you require for production have also been updated to the new v3 format.
- Create a folder somewhere in which you will install external modules, including this one
- Run Companion and press the **developer settings cogwheel** in the top right, which will show the Developer modules path box. Choose your new folder here.

  ![](https://raw.githubusercontent.com/wiki/bitfocus/companion-module-base/images/launcher-developer-mode.png)

You'll now need to download and install this module into a subfolder. You can download the [full-setup.bat](https://github.com/slmnio/companion-module-slmngg/raw/master/full-setup.bat) file into your developer modules folder and run it. Otherwise, you can manually install everything you'll need.

### Manual installation / running the script
This is just an explanation of what the full setup batch file does. If you know what you're doing, just pull the commands you need from here.

- Open a command prompt window in your developer modules folder. 
- Install [Git](https://git-scm.com/) to make it easier to download updates:
  `winget install Git.Git`
- Download the module code: 
  `git clone https://github.com/slmnio/companion-module-slmngg`
- Enter the new downloaded folder
  `cd companion-module-slmngg`
- Install Node (v18 or higher). This installer uses the [v18 LTS](https://nodejs.org/en/blog/release/v18.12.0) version.
  `winget install OpenJS.NodeJS.LTS`
- Install dependencies
  `npm install`

### Operating with SLMN.GG

You should now see SLMN.GG in your [Companion connections list](http://localhost:8000/connections). If you don't quit Companion and re-open it.

The module will be prefilled with the current data server address, but you can change it or use a local address instead.

You'll need to get a token from SLMN.GG. We recommend using the development version (dev.slmn.gg) when working on production since it will have the latest changes. Log in to the [dashboard](https://dev.slmn.gg/dashboard) and choose Token from your user drop-down. It will give you a warning about the dangers of sharing your token, but you should be fine as long as you are using it locally.

![image](https://github.com/slmnio/companion-module-slmngg/assets/15251071/932e8635-5544-459f-ab4b-aa290020717c)

Your token will be checked when you press save on the settings menu, and will warn you if your token is invalid.

![image](https://github.com/slmnio/companion-module-slmngg/assets/15251071/67fa8d8f-b6ab-4067-86a3-548cc0eeee39)

# Using the module

You should now have full access to SLMN.GG through Companion! (or at least the amount of access you're supposed to have, anyway). You can explore the different actions, feedbacks and variables that are pulled from the server into Companion.

There are a few presets you can look through to help you get started.
![image](https://github.com/slmnio/companion-module-slmngg/assets/15251071/823d040e-bba7-4491-94ee-64f843c93369)

The features we add get extensively tested in our productions, so you should find things that will be useful for you. For example, teams can always be referred to as either 1 or 2 (as in the broadcast schedule) or as left or right (as showing on the in-game overlay). You can use this in conjunction with the Swap Teams action to make some reactive displays.

![image](https://github.com/slmnio/companion-module-slmngg/assets/15251071/42011eaf-5e88-4028-87b2-b6ad0ca31663)




