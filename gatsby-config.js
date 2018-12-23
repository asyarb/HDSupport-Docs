module.exports = {
    siteMetadata: {
        title: 'HDSupport Docs',
        author: 'Anthony Yarbrough',
        description: 'Documentation for HDSupport',
        siteUrl: 'https://gatsby-starter-blog-demo.netlify.com/',
        social: {
            twitter: 'anthodair',
        },
    },
    pathPrefix: '/help/hdsupport/docs',
    plugins: [
        {
            resolve: 'gatsby-plugin-layout',
            options: {
                component: require.resolve('./src/components/Layout'),
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: 'blog',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: 'assets',
            },
        },
        'gatsby-plugin-svgr',
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `HDSupport Docs`,
                short_name: `HDSupport`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#32325d`,
                display: `minimal-ui`,
                icon: `content/assets/gatsby-icon.png`,
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
    ],
};
