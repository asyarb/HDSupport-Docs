import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Layout from '../components/Layout';
import SEO from '../components/seo';

class Post extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = this.props.data.site.siteMetadata.title;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.excerpt}
                />
                <Heading>{post.frontmatter.title}</Heading>
                <Content dangerouslySetInnerHTML={{ __html: post.html }} />
            </Layout>
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
                date(formatString: "MMMM DD, YYYY")
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

    p {
        font-size: 1.8rem;
        line-height: 1.8;
    }

    ul {
        list-style: disc;
        padding-left: 2em;
        line-height: 1.5;
        margin: 1em 0;
        font-size: 1.7rem;
    }
`;
