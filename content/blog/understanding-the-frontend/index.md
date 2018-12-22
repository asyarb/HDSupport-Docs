---
title: Understanding The Frontend
order: 3
---

###### Summary of the technologies, folder structure, and libraries within the React client.

<section id="intro" aria-label="Intro to the frontend">

The frontend of HDSupport was developed with the front-end library [**React**](https://reactjs.org/). If you are unfamiliar with React and modern JavaScript, I recommend getting familiar if you plan to continue development of the HDSupport SPA.

If you are looking to get up-to-speed on these topics, here are a few helpful resources.

-   For a general overview of modern JavaScript, [javascript.info](https://javascript.info/) is a great learning resource.
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

The SPA version of HDSupport was written in React 16.6. Due to 16.6 only recently being pushed during HDSupports development (it actually started in 16.5), HDSupport only really takes advantage of the new `contextType` feature that was added in 16.6.

Although `<Suspense>` and `React.lazy()` would be trivial to include, since we're not too concerned about bundle size as an internal app (and our bundle is still under 1MB), it was decided to not do so. That being said, with concurrent-React on the horizon, it would be a great performance boost implement and would decrease initial time-to-interactive.

Right before my end of development for HDSupport, React 16.7 was released. Since 16.7 is a non-breaking update, HDSupport should now (at time of writing) be on React 16.7.

#### React "Advanced" Concepts Used

Outside of the main concepts of React such as _props_ and _state_, HDSupport heavily uses the **Context API** for both application level state and component sub-tree state where applicable to avoid excessive prop-drilling. Prop drilling is still present in some cases though, and could be an area of improvement for future development.

HDSupport also utilizes **Fragments**, **ForwardRefs**, **Refs**, **Portals** and typechecking with **PropTypes**. However, these aren't used too heavily and just in cases where needed such as Refs for declarative animations and Portals for Snackbars on top of the DOM tree.

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
                <UserRoute
                    as={ClockIn}
                    path={`${process.env.PUBLIC_URL}/clock`}
                />
            </Router>
        );
    }
}
```

The `as` prop takes in a component you want to render when the URL is equal to `path`. Within `<UserRoute>`, we can define what happens when the client trying to access is set to be expired in our backend.

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

There is a ton you can do with client-side routing that wont be covered here. Read the [documentation & api](https://reach.tech/router/api/Router) for more information.

### axios

[**axios**](https://github.com/axios/axios) is a lightweight ES6 promise based HTTP library that automatically transforms for JSON data. While the native FetchAPI exists, axios comes with a lot of great defaults and pre-baked response code error handling out of the box. It also supports all major browsers without the need for a polyfill due to using XHR behind the scenes.

Within HDSupport, axios is typically used in conjunction with _async/await_ since it's subjectively easier to read versus .then().catch() chains. A typical example of a component using axios to make a request to our backend.

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
