---
title: Getting Started
order: 1
---

###### This page is an overview of HDSupport and setting up your dev environment.

<section id="intro" aria-label="Introduction to HDSupport development">

The latest version of **HDSupport** was currently developed with the following technologies:

-   **Apache** as the webserver. (UH's webserver solution)
-   **MySQL** with PHP MyAdmin as the DBMS. (UH's webserver solution)
-   **PHP 7** with [mysqli prepared statements.](https://websitebeaver.com/prepared-statements-in-php-mysqli-to-prevent-sql-injection)
-   **React** for the view layer/front-end. This means knowledge with NodeJS, its package manager NPM, and modern Javascript (ES6+ syntax) is highly recommended. [Create-React-App](https://github.com/facebook/create-react-app) was utilized to scaffold the client.
-   **HTML/SCSS**. A strong foundation in semantic markup and [SCSS](https://sass-lang.com/) concepts is recommended. SCSS is particularly important since our CSS-in-JSS solution borrows a lot of composition patterns from SCSS.

These docs assume familiarity with the above technologies in addition to **Git**. If you plan to continue development or add features to **HDSupport**, it is highly recommended that you become familiar with all of the above before starting.

> #### What if I don't want to use React or SCSS?
>
> It is not technically a requirement to utilize React or SCSS. Additional pages can be added via standalone PHP/HTML and normal CSS files if you prefer. However, keep in mind you would lose the benefit SPAs provide such as client-side routing, state management, scoped CSS selectors, and many others.

</section>

---

<section id="setup" aria-label="Setup your environment">

## 🚀 Development Environment Setup

To setup your development environment for **HDSupport**, there are a few pre-requisites we need to install.

1. Install [**NodeJS**](https://nodejs.org/en/). You can install either the LTS or current version. Either is fine, just stick to a version in development.
2. Install a web-server solution like [**XAMPP**](https://www.apachefriends.org/index.html) or [**MAMP**](https://www.mamp.info/en/). This guide is tailored for use with XAMPP, but MAMP should work just as well. You can alternatively setup your own Apache, MariaDB/MySQL and PHP web server if you want, but I don't recommend doing so.
3. Clone the HDSupport git repository [**here:**](https://github.com/asyarb/React-HDSupport)

### Setting Up The Backend

4. **Export** a copy of the HDSupport MySQL database.
    1. **Log-in** to HDSupport.
    2. Navigate to **Administration** -> **PHP MyAdmin**.
    3. **Log-in** with credentials. (If you don't know these, ask around)
    4. Expand the left-hand collapse menu to: **itshdsupport_p**
    5. Click on **Export** in the top menu.
    6. Leave the options as their default (or configure it if you know what you're doing) and click **Go**. This should download a .sql file you will import later.
5. Navigate to your **PHP MyAdmin** or equivalent console within MAMP.
6. **Create an empty database**. You can leave the encoding/collation as 'utf8-general-ci'.
7. **Define a user account**. This user should generally have all global privileges.
8. **Import** the .sql file we exported in step 3. You should see the full DB structure in a few minutes.
    > #### Having trouble with importing?
    >
    > You may need to change the maximum allowed memory a script can utilize to successfully import the .sql file. You can change this in your php.ini file in your Apache config.
9. Update the `connect_db.php` file within `./server/database` to contain the appropriate information you specified in steps 5 and 6.
10. Update the `do_auth.php` file within `./server/routes`. Set your UH Number and Username in the appropriate `$_SESSION` variable.
11. Create a directory within `htdocs` (for XAMPP) that will serve your server files. I would recommend something like: `hdsupport-server`.
12. Copy the contents of `./server` to the htdocs directory you specified in step 11.

### Setting Up The Frontend

13. Run `npm install` in the root directory. This should take a few minutes.
14. Update the `package.json` file within the root directory and change the `proxy` field to point to the `/routes` folder you copied over in step 12. You should see a sample of this already present.
15. Create an `env.development` file in the root directory with the following contents:

```javascript
REACT_APP_SLACK_TOKEN=
REACT_APP_SLACK_CHANNEL=
REACT_APP_DB_SERVER=
```

Fill in the information with the appropriate API token and announcement channel ID from the Help Desk Slack. Leave _REACT-APP-DB-SERVER_ blank for development since we'll be proxying our requests instead.

You can get the Slack Token from [**Slack's API**](https://api.slack.com/apps) by clicking on _Announcement Handler_ -> _OAuth & Permissions_ -> _OAuth Access Token_. The channel ID for _#announcements_ is: **C4UFGG7QT**.

16. Start the development server by running `npm start` in the root directory. You can access the dev server via [**localhost:3000.**](http://localhost:3000)
17. (_**Optional but recommended**_) Setup ESLint with the 'react' plugin, 'babel-eslint' parser and 'react-app' extension.
18. You should now be ready to begin development! 😎

</section>

---

<section id="common-issues" aria-label="Common Issues">

## ❗ Common Issues

-   **Blank webpage when connecting to localhost:**
    -   Check your browser's console for any errors. Typically, a blank page means the frontend failed query the backend. This is typically caused by an incorrect proxy or DB user permissions.
    -   Check the URL and responses that your AJAX GET/POST requests are getting. The network tab under your browser dev tools can help with this.
-   **Unable to run development server:**
    -   Be sure to check if `npm install` ran correctly. You should see a corresponding **node_modules** in your root directory if done correctly.

</section>
