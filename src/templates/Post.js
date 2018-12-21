import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import SEO from '../components/seo';

class Post extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;

        return (
            <React.Fragment>
                <SEO
                    title={post.frontmatter.title}
                    description={post.excerpt}
                />
                <Heading>{post.frontmatter.title}</Heading>
                <Content dangerouslySetInnerHTML={{ __html: post.html }} />
            </React.Fragment>
        );
    }
}

export default Post;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
            }
        }
    }
`;

const Heading = styled.h1`
    margin: 12rem 0 0.85em;
    font-size: 5.25rem;
`;

const Content = styled.article`
    h2,
    h3,
    h4 {
        margin: 1em 0;
    }

    h2 {
        font-size: 3.5rem;
    }

    h3 {
        font-size: 2.6rem;
    }

    h4 {
        font-size: 1.75rem;
    }

    h6 {
        font-size: 2.4rem;
        font-weight: 300;
        color: var(--grey);
        margin: 1.35em 0;

        @media (max-width: 900px) {
            font-size: 1.8rem;
        }
    }

    p {
        font-size: 1.7rem;
        line-height: 1.8;
    }

    ul {
        list-style: disc;
        padding-left: 2em;
        line-height: 1.7;
        margin: 1em 0;
        font-size: 1.6rem;

        > li {
            margin: 1.5em 0;

            ul {
                li {
                    margin: 0.75em 0;
                }
            }
        }
    }

    ol {
        padding-left: 2em;
        line-height: 1.6;
        margin: 1em 0;
        font-size: 1.7rem;

        > li {
            margin: 1.5em 0;
        }
    }

    a {
        transition: background-color 0.25s ease;
        background-color: rgba(187, 239, 253, 0.3);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        &:hover {
            background-color: rgba(187, 239, 253, 0.8);
        }
    }

    blockquote {
        background-color: rgba(255, 229, 100, 0.3);
        border-left: 9px solid #ffe564;
        padding: 20px 45px 20px 26px;
        margin: 20px -20px 30px;
    }

    hr {
        border-top: 1px solid #ececec;
        margin: 5rem auto;
    }
`;
