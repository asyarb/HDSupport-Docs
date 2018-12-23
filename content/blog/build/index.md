---
title: Creating a Production Build
order: 9
---

###### How to deploy a build of HDSupport to production or any dev subdirectory on UH webservers.

<section id="intro" aria-label="Introduction to building.">

Unfortunately, due to some of the interactions with UH's CAS login system, our reliance on PHP, and deploying to a subdirectory, there a quite a few gotchas you need to be aware of to deploy HDSupport to production successfully.

> ##### You may want to deploy to /dev for your first time.
>
> I highly recommend staging any deploys you make to `/help/hdsupport/dev` _first_ before doing so to the main directory. This means in any instructions referring to `webinfo/1/help/hdsupport`, you can use `webinfo/1/help/hdsupport/dev` instead.

</section>

---

<section id="backend" aria-label="Preparing the backend">

## Unorganizing Our Server Code 🤔

In development, we were able to keep our server code nice and organized in separate subfolders to split our endpoints from our database and utility code. However, in production, you'll find that we wont be able to maintain that same folder structure.

**This is because of the way CAS registers approved URLs.** CAS requires applications to pre-register their directories and _sub-directories_ if we want to authenticate or check authentication from them.

This means that just because `/help/hdsupport` is registered to utilize CAS, doesn't mean `/help/hdsupport/routes` is registered too. If you've made it this far, you've probably wondered why there are two `do_auth.php` files, one in `./server/routes` and one in just `./server`. This is why.

If you wish to register the `/routes` directory with CAS, I highly recommend doing so. I didn't have the time to before I left HD.

_Anyway, enough about CAS._ Let's prepare our backend.

> ##### Before Starting
>
> I want to point out that the folders `browser`, `css`, `functions`, `images`, `img`, and `js` are utilized for the _Browser Recommendations_ portion of HDSupport. You should leave these alone.

1. SSH and SFTP into `webedit.its.hawaii.edu`.
2. `cd` to `/webinfo/1/help/hdsupport`.
3. Notice that there is already a copy of `do_auth.php` in `/webinfo/1/help/hdsupport`. Create a copy and overwrite the copy within your local `./server` if you desire or copy it to `/dev` if needed. **Ensure to not overwrite the local file in `./server/routes`.**
4. Copy the entire contents (all route endpoint .php files) of `./server/routes` into `webinfo/1/help/hdsupport`.
5. Copy the `./server/templates` folder into `webinfo/1/help/hdsupport/templates`.
6. Copy the `./server/database/connect_db_prod.php` file into `webinfo/1/help/hdsupport/database`. Remember to fill in the production login info.
7. Your backend should now be ready!

</section>

---

<section id="frontend" aria-label="Preparing the Frontend">

## Building Our React Client

Thankfully, building our React client should be fairly simple. If the backend is setup properly, you should have little to no issues building and deploying. To deply our frontend, follow these steps:

1. Create a `.env.production` file in the root of your local dev directory. This should be the same location as your `.env.development`. It should have the following contents:

```javascript
REACT_APP_SLACK_TOKEN=
REACT_APP_SLACK_CHANNEL=
REACT_APP_DB_SERVER=https://www.hawaii.edu/help/hdsupport
```

Notice the last line now containing a variable in comparison to our dev version. Be sure to copy the slack tokens as well and update for `/dev` if desired.

2. Ensure the "homepage" value in `package.json` is properly set. It should be set as:

```json
"homepage": "/help/hdsupport/index.php"
```

Append `dev/` after `hdsupport/` if deploying to dev.

3. Run `npm run build` from the root of your dev directory in your terminal.
4. While we're building, _delete_ the `/static` folder from `/webinfo/1/help/hdsupport` if it currently exists. You can delete a directory with `rm -rf dirname`.
5. Delete the following files from `/webinfo/1/help/hdsupport` if they exist:
    - `precache-manifest.LONG_HASH_HERE`
    - `service-worker.js`
    - `asset-manifest.json`
    - `manifest.json`
6. After the build command completes, copy the minifed HTML from `./build/index.html` and replace the minifed HTML within `./server/index.php`.
7. Notice that the href references for our static assets contain `/index.php/` in them. Remove these portions from the hrefs. A find-replace usually works fine here.

```html
<!-- Change this: -->
<link rel="manifest" href="/help/hdsupport/index.php/manifest.json" />

<!-- To this: -->
<link rel="manifest" href="/help/hdsupport/manifest.json" />
```

8. Copy `./server/index.php` into `/webinfo/1/help/hdsupport`.
9. Copy the contents of `./build` into `/webinfo/1/help/hdsupport`. Be sure to copy the contents, not the directory itself.
10. Navigate to [https://hawaii.edu/help/hdsupport](https://hawaii.edu/help/hdsupport) and login to your latest build! 🎉

> ##### Why do we need /index.php in our `homepage`?
>
> This is due to the way UH webserver's `.htaccess` Apache config interacts with CAS. When we authenticate to any page under `/hdsupport`, index.php will always be appended to the URL after we receive a response from CAS. Due to this we need to include it in our `homepage` in `package.json`.

</section>
