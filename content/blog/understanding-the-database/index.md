---
title: Understanding The Database
order: 5
---

###### Summary of the various tables and the data stored within the database.

<section id="intro" aria-label="Introduction to the Database">

In production, the database that is used for production data is called `itshdsupport_p`. Within it, there are several tables that store relational data about our users ranging from their personal information, clock-in data, and schedule changes. This page aims to provide an overview of each relevant table within the database schema.

> ##### Heads Up!
>
> This document assumes basic knowledge of SQL concpets such as Super, Candidate, and Primary keys.

The main Super Key for the entire database is `uid`, which is auto incremented for each user added to HDSupport.

</section>

---

<section id="users" aria-label="Tables Relating to User Information">

## Tables for User Data

Detailed below will be an overview of all the tables that store data that is related to our authenticated user.

#### users

Uses `uid` as the Primary/Candidate key. Stores user personal contact information such as UH Number, Full Name, Address, phone, etc.

Also stores whether a user is set to be `expired`. If a user is `expired`, they can't access the app despite authenticating through CAS.

#### user_groups

Used `uid` as the Primary/Candidate key. Stores the roles that a given user has which determines what client-routes they have access to. There are the following roles:

-   `administrator`: Has complete access to all client routes.
-   `manager`: Has complete access to all routes, but cannot toggle off/on `administrator` and `manager` roles from users in the account edit page.
-   `staff`: Has access to routes wrapped by `<UserRoute />`.
-   `helpDesk`: Has access to routes wrapped by `<UserRoute />`. Used to sort students for timesheets.
-   `tech`: Has access to routes wrapped by `<UserRoute />`. Has access to the "Tech Softwarre Download Page" in the heading.
-   `lab`: Has access to routes wrapped by `<UserRoute />`. Has different header links than a `helpDesk` user. Used to sort students for timesheets.
-   `third_shift`: Has access to routes wrapped by `<UserRoute />`. Used to sort students for timesheets.

#### old_schedule

Stores information regarding staff and student outages (sick, vacation, requests). The information on this table is used to populate the outages list on the front page.

Used `sid` as the Primary/Candidate key. Also uses `uid` to identify rows to users.

</section>
