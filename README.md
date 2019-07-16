# Ephemeris

System Engineering and requirements management application

![Screenshot](./images/screenshot.png)

## Features

-   Manage Stakeholders, Requirements, Functions and Products in one place and link them together
-   Record Requirements and Actions trough the "meeting" panel
-   Build the project breakdown structure
-   Generate overview diagrams, ERD and mindmaps from the project relations
-   Produce text specifications based on your model

## Getting Started

Download the latest version from the [Release](https://github.com/shuart/ephemeris/releases) page.

Once the appropriate ZIP file has been downloaded for your platform, extract it, run "Ephemeris" and follow the instructions.

- Create a new user. This will be you personal session.
- Once logged in, two default projects are already available. Focus on one of them or go to "Manage projects" in the settings menu to rename, add, or re-order the projects.
- When focused on a project, you can go to different views and edit the projects products, functions and requirements.
- The "Relations" and "Interfaces" views allow you to edit the project from a network diagram

## Build and run

### install dependencies
```sh
npm install
```

### build nwjs
```sh
npm run build
# Ephemeris will build into "build/release/Ephemeris"
```
