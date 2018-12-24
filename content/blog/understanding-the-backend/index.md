---
title: Understanding The Backend
order: 4
---

###### Summary of the concepts utilized for the PHP backend of HDSupport.

<section id="intro" aria-label="Introduction to the backend">

While most of the heavy-lifting of HDSupport was offloaded from PHP and onto the React client, we still need some server-side logic and code to handle interactions with our mySQL database. **Before beginning development on HDSupport's backend you shoud posses:**

-   Some understanding of general PHP syntax.
-   A basic understanding of [REST APIs](https://developer.mozilla.org/en-US/docs/Glossary/REST) and [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).
-   A familiarity with basic [SQL](https://www.w3schools.com/sql/).
-   Know the benefits and concepts of [prepared statements](http://php.net/manual/en/mysqli.quickstart.prepared-statements.php).

> ##### Heads up!
>
> From this point onward, it's assumed you are relatively familiar with all of the above concepts in addition to High Order Array functions in JavaScript.

</section>

---

<section id="architecture" aria-label="Backend architecture">

## Architecture

Since our frontend was written in React, it was decided to create a **JSON "REST"-esque API** with PHP. By using JSONs (and Arrays of JSON), we can utilize many of the Higher Order Array and Object manipulation functions in JavaScript to easily display backend data.

```jsx
render() {
    return (
        <div>
            {databaseArray.map(item => <div key={item.id}>{item.someData}</div>)}
        </div>
    )
}
```

Effectively, this "REST" API allows our React components to query any of the PHP files/endpoints for exactly the data they need at runtime. (non-blocking!) You can think of each PHP file as a different "route" (hence, being located in `./server/routes` ) that returns a JSON or array of JSON with data from our database. The `json_encode` function from the [PHP library](http://php.net/manual/en/function.json-encode.php) was used to accomplish this.

These queries typically occur when a component mounts or when a user interaction takes place, such as clocking in. This setup allows for a seamless user experience for workflows such as timesheets or editing schedule changes where our prior _solely_ server-rendered environment required constant page refreshes on each interaction.

</section>

---

<section id="mysql-driver" aria-label="Which mySQL driver was used?">

## mySQLi (PHP mySQL Driver)

The backend of HDSupport was developed with [**PHP 7**](http://php.net/manual/en/migration70.new-features.php#migration70.new-features.scalar-type-declarations). In fact, the primary motivation for the rewrite was the UH web server PHP 7 upgrade from PHP 5.6 at the end of the 2018 calendar year.

Upgrading to PHP 7 would have removed the deprecated [mysql](http://php.net/manual/en/book.mysql.php) extension that HDSupport was currently utilizing, requiring us to rewrite our queries to [mysqli](http://php.net/manual/en/book.mysqli.php) or [PDO](http://php.net/manual/en/ref.pdo-mysql.php). Without doing so, our app would have been completely disfunctional.

[**mysqli**](http://php.net/manual/en/book.mysqli.php) was chosen to be the mySQL driver of choice for HDSupport due to it's similar syntax to the [mysql](http://php.net/manual/en/book.mysql.php) extension, ease of setup, when compared to [PDO](http://php.net/manual/en/ref.pdo-mysql.php) and support for prepared statements.

We setup our mysqli database connection in `./server/database/connect_db.php`. This ties our connection to a global PHP variable called `$mysqli`. For the most part, we can just pass it to functions as expected. However, due to the way PHP handles variable scoping in nested functions, there are some cases we need to use the `$GLOBALS['mysqli']` style instead. You'll see this in some of our timesheet helper functions.

</section>

---

<section id="prepared-statements" aria-label="Prepared Statements">

## Prepared Statements

Whenever we're running SQL statements reliant on user input, it's crucial to be sure we sanitize our inputs by utilizing prepared statements. Thankfully, mysqli ships with a solution out of the box that is easy to use.

Consider the following basic SQL statement:

```sql
SELECT *
FROM users
WHERE username = 'someuser'
```

Typically, you would compose a query in PHP via:

```php
<?php

// $db is our database connection defined somewhere above
$query = "SELECT * FROM users WHERE username = '$_GET["username"]'";
$result = mysqli_query($db, $query);
$row = mysqli_fetch_assoc($result);

$userInfo = $row;

?>
```

Unfortunately, this is open to SQL injection and other exploits, specifically where we use `$_GET` to specify the username. (This is actually how we were interacting with our DB previously. 🤔)

Below is an example of the same statement via prepared statements:

```php
<?php

$stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $_GET["username"]);
$stmt->execute();

$userInfo = $stmt->get_result()->fetch_assoc();

?>
```

Notice the `bind_param` on the line 2 that specifies the type as well as the variable to replace the `?` on line 1. In short, this tells our SQL server a few things in this sequence:

1. _We're going to send a statement to you, but we don't have the variable yet._ This signals to our SQL server to get ready to perform this query, by sending it the query with placeholer values.
2. _Here's the real username_. Our SQL server treats all binded paramters as literals. No escaping or string manipulation is necessary. Goodbye `real_escape_string()`!
3. _Now actually run the query and give me the data_. These are the `execute()` and `get_result()` with `fetch_assoc()` calls.

For more information on prepared statements and examples for each type of common SQL query, I recommend reading [this article](https://websitebeaver.com/prepared-statements-in-php-mysqli-to-prevent-sql-injection).

</section>

---

<section id="creating-routes" aria-label="Creating A New Route">

## Creating Routes

Creating a new route is pretty straightforward. You can base your new route off any of the existing routes that exists in any of the other PHP files, or you can follow along the example below.

##### Create A New PHP File

The filename of the route will be what is called in the client, so be sure to give it a descriptive name of the data it's returning. If you are getting a user's full name, a filename like `get-fullname.php` would suffice.

A `get-fullname.php` file's boilerplate would look something like this. Feel free to alter it to fit your new route as desired.

```php
<?php

session_start();
include "./do_auth.php";

function getFullname($db, $uuid) {
    // [...]
    // prepared statement...

    return json_encode($jsonToReturn);
}

echo getFullname($mysqli, $_GET["uuid"]);

?>
```

If you are writing a POST request, be sure to change your `$_GET` variables to `$_POST` and include the following line above your `echo` statement.

```php
$_POST = json_decode(file_get_contents("php://input"), true);
```

We need to include this snippet since `axios` encodes the HTTP request with a `Content-Type` of `application/json`. Alternatively, you can specify a different `Content-Type` like `application/x-www-form-urlencoded` or `multipart/form-data` in the request headers sent from the client.

</section>
