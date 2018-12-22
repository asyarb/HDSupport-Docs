---
title: Project Structure
order: 2
---

###### The folder structure of the HDSupport repository.

<section id="intro" aria-label="Intro to the repo's folder structure.">

After cloning, your project should look like this:

```shell
hdsupport/
    public/
        index.html
    server/
        css/
        database/
        routes/
        templates/
    src/
        components/
        css/
        images/
        App.js
        index.js
        ...
    package.json
    .gitignore
    .eslint.json
```

For the project to build, **these files must exist with exact filenames:**

-   `public/index.html` is the entry page template.
-   `src/index.js` is the JavaScript entry point for Webpack.

</section>

---

<section id="server" aria-label="Server folder overview">

## 💾 Server Folder

#### css/

This folder can contain any CSS to style any pages that are rendered entirely by the server, such as .php files and .html files. Currently, there is a `timesheet_styles.css` file that is used to compose the generated timesheet for printing.

Generally, it is not recommended to use this as much as possible since we're utilizing CSS-in-JS which will be covered later.

#### database/

This folder contains the .php files to establish our web-server's connection to our mySQL database. You should only need to fill in the following variables with the appropriate information:

```php
$db = ''; // your localhost database name, in production this is 'itshdsupport_p'
$user = ''; // your localhost username, you should know this for production
$pass = ''; // your localhost user password, you should know this for production
```

There is a production and dev version of these files for your convenience.

#### routes/

This folder contains the PHP "_endpoints_" that the client can call. You can read more information about this in [**Understanding the Backend.**](/understanding-the-backend/)

#### templates/

This folder contains the plain text email template files for the Email Generator tool.

</section>

---

<section id="server" aria-label="Server folder overview">

## 💻 Client folder (/src)

#### components/

Contains almost all of the React component JavaScript files. More information on this can be found in [**Understanding the Frontend.**](/understanding-the-frontend/)

#### css/

Contains base and global style definitions for the application. Utilizes CSS custom properties for easy value re-use and dynamic element coloring with CSS-in-JS. This generally shouldn't need to be modified, but feel free to do so.

Keep in mind that changes in here may change several components and pages at once, so tread carefully.

#### images/

Contains several SVG files categorized into approrpriate sub-directories that correspond with the components that use them. Since our Webpack config with Create-React-App utilizes 'SVGR', we can import SVGs as components instead of making HTTP requests or in-lining them.

#### App.js

Base React component that can be considered the "starting point" for the application. Contains the main site router and the Header component that stays rendered on all pages. More information can be found in: [**Understanding the Frontend.**](/understanding-the-frontend/)

#### index.js

Webpack entry point. Required to build the client.

> You generally **_should not_** touch this file. Doing so will **_probably break_** the app. We wrap our LayoutContext component in here around the App component for application level state that **_several_** components need to work.

You should only really alter the service worker registration line shown below, but even then, you probably shouldn't.

```javascript
// If you want your app to work offline and load faster, you can change
// unregister() to register() or vice versa.
serviceWorker.register();
```

#### LayoutContext.js

A React component that implements the Context API. Holds important application level state about the current user logged in.

Placed at the top of the component tree. More information can be found in: [**Understanding the Frontend.**](/understanding-the-frontend/)

</section>

---

<section id="public" aria-label="Public Folder.">

## ♿ Public Folder

If you place a file into the `public` folder, it will **not** be processed by Webpack. Instead, it is copied into the build folder untouched.

#### index.html

Template file that React _hydrates_ after the main JavaScript bundle is loaded. Required for Webpack to build the client. Generally, React hydrates the following DOM node:

```html
<div id="root"></div>
```

This file is useful if you want to include web-fonts such as those from Google Fonts. However, it's generally recommended to [self-serve fonts via webpack](https://www.npmjs.com/package/typeface-open-sans) instead to reduce the number of blocking HTTP requests.

You can also set things such as the page title, meta tags, and other elements you want in your `<head>`.

Only files inside `public` can be used from `public/index.html`. To reference assets in the `public` folder, you can utilize a variable called `PUBLIC_URL` like shown below.

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
```

</section>

---

<section id="other-files" aria-label="Other Files.">

## 📂 Other Files

#### .gitignore

Specifies files that will be ignored when using git. Structured for a typical NodeJS project.

#### .prettierrc

Prettier config file which allows for automatic code formatting. See [Prettier's website](https://prettier.io/) for more info. The current config utilizes trailing commas for object syntax, which means you can have the following in a JavaScript object:

```javascript
state = {
    firstName: 'John',
    lastName: 'Doe',
    Address: {
        Street: '2520 Correa Rd',
        City: 'Honolulu',
        Zip: 96822,
    },
};
```

#### .eslint.json

ESLint config file which enables local ESLint for in-editor use. See [ESLint's website](https://eslint.org/) for more info.

Feel free to edit or discard, as Create-React-App has a built-in ESLint config as well.

</section>
