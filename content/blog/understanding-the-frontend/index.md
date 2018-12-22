---
title: Understanding The Frontend
order: 3
---

###### Summary of the libraries, advanced concepts, and notable components within the React client.

<section id="intro" aria-label="Intro to the frontend">

The frontend of HDSupport was developed with the frontend library [**React**](https://reactjs.org/). If you are unfamiliar with React and modern JavaScript, its recommend to become familiar with ES6+ syntax if you plan to continue development of the HDSupport SPA.

If you are looking to get up-to-speed on these topics, here are a few helpful resources:

-   For a general overview of modern JavaScript, [javascript.info](https://javascript.info/) is a great resource.
-   [React's official documentation](https://reactjs.org/docs/getting-started.html). Our docs are styled based on theirs!
-   Traversy Media's youtube channel. Listed below are useful videos/playlists to get up-to-par on modern JavaScript. Most of the concepts covered in these videos are _heavily_ utilzed in the React implementation of HDSupport.
    -   [JavaScript Fundamentals](https://www.youtube.com/watch?v=vEROU2XtPR8)
    -   [ES6 Overview Playlist](https://www.youtube.com/watch?v=2LeqilIw-28&list=PLillGF-RfqbZ7s3t6ZInY3NjEOOX7hsBv)
    -   [JavaScript OOP course](https://www.youtube.com/watch?v=vDJpGenyHaA)
    -   [Overview of Higher Order Functions & Arrays](https://www.youtube.com/watch?v=rRgD1yVwIvE)
    -   [Async/Await Overview](https://www.youtube.com/watch?v=PoRJizFvM7s&index=11&list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX)

</section>

---

<section id="react-concepts" aria-label="React concepts used">

## React

#### Versioning

The SPA version of HDSupport was written in React 16.6. Due to 16.6 only recently being pushed during HDSupport's development (actually started in 16.5), HDSupport only utilizes the new `contextType` property that was added in 16.6.

Although `<Suspense>` and `React.lazy()` would be trivial to include, we're not too concerned about bundle size with a guaranteed threshold of network performance from our users. Not to mention our bundle size is still under 1MB _with images_ included. That being said, with concurrent-React on the horizon, it would still be a great performance boost and would decrease initial time-to-interactive, so it's something to consider.

Right before my end of development for HDSupport, React 16.7 was released. Since 16.7 is a non-breaking update, HDSupport is now on React 16.7.

#### Webpack Config

Our React frontend was bootstrapped with [Create-React-App](https://github.com/facebook/create-react-app). If you're unfamiliar, Create-React-App (CRA) provides a solid Webpack configuration and flexible development environment for deploying React apps. Because we use CRA, **_all_** of [their documentation](https://facebook.github.io/create-react-app/docs/documentation-intro) applies for this project. It's recommended to give it a read if you haven't used it before.

> Moving forward, it's assumed you are familiar with both CRA's and React's official documentation and modern JavaScript.

#### React "Advanced" Concepts Used

Outside of the main concepts of React such as _props_ and _state_, HDSupport heavily uses the [**Context API**](https://reactjs.org/docs/context.html) for both application level state and component sub-tree state to avoid excessive prop-drilling. Prop drilling is still present in some cases though, and could be an area of improvement for future development.

HDSupport also utilizes [**Fragments**](https://reactjs.org/docs/fragments.html), [**ForwardRefs**](https://reactjs.org/docs/forwarding-refs.html), [**Refs**](https://reactjs.org/docs/refs-and-the-dom.html), [**Portals**](https://reactjs.org/docs/portals.html) and typechecking with [**PropTypes**](https://reactjs.org/docs/typechecking-with-proptypes.html). However, these aren't used too heavily and just in cases where needed such as Refs for declarative animations and Portals for Snackbars on top of the DOM tree.

#### Hooks

If you are reading this anytime in the near future, it's likely that Hooks are probably the new standard or general pattern for developing in React. During the time of development for HDSupport, Hooks were still in alpha so it was naturally avoided for production. I can't comment on how to integrate Hooks into HDSupport, so that's up to you. 😁

</section>

---

<section id="libraries" aria-label="Libraries used in HDSupport">

## Other Libraries Used in Conjunction With React

By utizing React, we open ourselves to the possibility of integrating various other libraries and workflows such as CSS-in-JS, animation solutions, and client-side routing. Below is a list of other libraries HDSupport utilizes:

### Styled Components

[**Styled Components**](https://www.styled-components.com/) is a CSS-in-JS solution that allows us to utilize ES6 template literals to attach CSS to our components. This allows us to scope our CSS to our components, avoid CSS naming and cascading issues, ensure correct CSS selector assignments, and dynamically load only the critical CSS we need to display any given route.

It also allows for trivial and dynamic styling based on _props_. See below for an example:

```jsx
const ColoredButton = styled.button`
    background: ${({ color }) => (color ? `var(--${color})` : `var(--green`)};
`;
```

We can pass a color to `<ColoredButton color="blue" />` and at runtime the component will dynamically look for a CSS variable with that declaration. Read more about styled components in their [documentation](https://www.styled-components.com/docs).

Toward the end of development, I heavily considered switching to [**emotion**](https://emotion.sh/) due to it being virtually identical to styled components while boasting a smaller bundle size, better performance, and identical syntax. Due to time constraints, HDSupport didn't make the switch.

### React Pose

[**React Pose**](https://popmotion.io/pose/) is an animation library that allows us to declaratively create animations for components within React. It provides tooling out of the box to handle enter and exit transitions for components with the `<PoseGroup>` component as well as run animations based on state.

React Pose also integrates and works wonderfully with styled components, allowing us to create "posed-styled-components" like shown below:

```jsx
const animatedBox = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
});

const Box = styled(animatedBox)`
    height: 100px;
    width: 100px;
    background-color: red;
`;

render() {
    const { isVisible } = this.state;
    return <Box pose={isVisible ? 'visible' : 'hidden'} />;
}
```

Read more about React Pose in their [documentation](https://popmotion.io/pose/learn/popmotion-get-started/).

### @reach/router

[**@reach/router**](https://reach.tech/router) is an accessibility first client-side routing solution for React. Reach manages the focus of the app on route transitions and provides an intuitive developer experience. If you are familiar with the APIs and usage of `react-router-dom` v4, it'll be an easy transition to `@reach/router`.

Within HDSupport we have two wrapper components to protect our routes. They both can be found within `./src/components` as `<UserRoute>` and `<AdminRoute>` respectively. As their names imply, they protect a route wrapped by them to only users with the appropriate roles.

Here is an example of `<UserRoute>` being used in our `<SiteRouter>` component:

```jsx
class SiteRouter extends Component {
    render() {
        return (
            <Router>
                <UserRoute as={ClockIn} path={`/clock`} />
            </Router>
        );
    }
}
```

The `as` prop takes in a component you want to render when the URL is equal to `path`. Within `<UserRoute>`, we can define what happens when the client trying to access the route has access or when they lack the appropriate permissions.

```jsx
class UserRoute extends Component {
    render() {
        let { as: Comp, ...props } = this.props;
        let value = this.context;
        const { isExpired } = value;

        return !isExpired ? <Comp {...props} /> : <NoAuth />;
    }
}
```

In the example above, if our authenticated user is not expired, we render the component passed to `as`. Otherwise, we render a `<NoAuth />` component.

There is a ton you can do with client-side routing that wont be covered here. Read the [documentation & api](https://reach.tech/router/api/Router) for more information.

### axios

[**axios**](https://github.com/axios/axios) is a lightweight ES6 promise based HTTP library that automatically transforms for JSON data. While the native FetchAPI exists, axios comes with a lot of great defaults and pre-baked error response code handling out of the box. It also supports all major browsers without the need for a polyfill due to using XHR behind the scenes.

Within HDSupport, axios is used in conjunction with _async/await_ since it's subjectively easier to read versus .then().catch() chains. A typical example of a component using axios to make a request to our backend.

```jsx
async componentDidMount() {
    try {
        const request = await axios.get(`/get-name.php?uuid=${uuid}`);
        const data = request.data;

        this.setState({
            firstName: data.first_name,
            lastName: data.last_name,
        });
    } catch (error) {
        // runs when a HTTP error response such as 404, 403, 500 is received or connection fails
        // FetchAPI doesn't handle those HTTP error responses natively
        // Set error state here
    }
}
```

</section>

---

<section id="notable-components" aria-label="Notable Components.">

## Notable Components

Most of the components found within `./src/components` are pretty standard fare, though listed below are some that you should be aware of.

#### LayoutContext.js

Top level component that stores application level state. `<LayoutContext />` can track whether the application should be fullscreen as well as stores commonly reused user data such as their name, roles, username, and UH number. The easiest way to utilize this data in any component is via the Context API's `contextType` property introduced in React 16.6.

When mounted, `<LayoutContext />` performs a few AJAX calls:

-   Fetches the active `$_SESSION` variables set when a user authenticates via UH CAS. This is just the UH Username and UH Number.
-   Fetches the first name of the user from our database with the provided UH Number from CAS.
-   Fetches the active roles of the logged in user from our database.

All the above information is stored into state and can be accessed via the `value` render prop/`contextType`.

#### SiteRouter.js

Located within `./src/components`, `<SiteRouter />` is where we handle all of our routes. You'll see a mixture of different protected routes, so be sure to utilize the appropriate wrapper when creating new ones.

Notice that the paths are typically prefixed with `process.env.PUBLIC_URL`:

```jsx
<AdminRoute as={SchedMgmt} path={`${process.env.PUBLIC_URL}/schedmgmt`} />
```

This is to ensure parity with links between development and production. The `PUBLIC_URL` property is defined in `package.json` under `"homepage"` and should be updated to whatever subdirectory the application is hosted from hawaii.edu. It is currently set as `/help/hdsupport/index.php`.

Keep in mind that `<Link />` components will also need to have the same prefix as well:

```jsx
<Link to={`${process.env.PUBLIC_URL}/clock`} />
```

#### Spinner.js

Located within `./src/components`, `<Spinner />` is a loading indicator you can re-use anywhere you know a loading state may take a long period of time such as when fetching data from Slack's API or a large amount of data from our backend.

`<Spinner />` takes two props, `size` and `margin` and `fullscreen`. `size` and `margin` are self descriptive, but `fullscreen` is a boolean that allows you to specify if the loader will take up the fullscreen width and height of the page. This is particularly useful if you plan on implementing lazy loading for routes, need a global fallback for a `<Suspense />` component high in the component tree, or just need to wait until everything is loaded before displaying a component.

</section>
