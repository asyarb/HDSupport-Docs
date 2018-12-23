import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import SEO from '../components/seo';

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <SEO
                    title="Home"
                    keywords={['Docs', 'gatsby', 'javascript', 'react']}
                />
                <Heading>HDSupport Docs</Heading>
                <Content
                    id="intro-to-docs"
                    aria-label="HDSupport Documentation"
                >
                    <h6>
                        These docs aim to provide an overview of the technology,
                        program architecture, and other useful information for
                        developing HDSupport.
                    </h6>
                    <p>
                        Welcome to the HDSupport documentation! My name is
                        Anthony Yarbrough, and I'm the developer who worked on
                        the recent rewrite for HDSupport. Since I am no longer
                        actively employed at UH, I hope these docs provide a
                        solid starting point for any other staff or interested
                        student who wants to continue development of the
                        HDSupport single-page-application (SPA).
                    </p>
                    <h3>Navigation</h3>
                    <p>
                        You can find different topics in the table of contents.
                        On desktop, you should see it in the right sidebar. On
                        mobile, you should see it after pressing the icon with
                        arrows in the bottom right corner.
                    </p>
                    <h3>Something Missing or Hard to Understand?</h3>
                    <p>
                        If something is unclear or you just need help with a
                        problem you've run into, feel free to reach out via the
                        info on the <Link to="/contact">contact page</Link>.
                    </p>
                    <h3>Feedback</h3>
                    <p>
                        These docs are open to PRs and issues. Feel free to open
                        one in it's repo at:{' '}
                        <a
                            href="https://github.com/asyarb/HDSupport-Docs"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://github.com/asyarb/HDSupport-Docs
                        </a>
                    </p>
                </Content>
            </React.Fragment>
        );
    }
}

export default Index;

const Heading = styled.h1`
    margin: 12rem 0 0.85em;
    font-size: 5.25rem;
`;

const Content = styled.article`
    h3,
    h3,
    h4 {
        margin: 1em 0;
    }

    h3 {
        font-size: 3.5rem;
    }

    h3 {
        font-size: 2.6rem;
    }

    h4 {
        font-size: 2.25rem;
    }

    h5 {
        font-size: 1.85rem;
    }

    h6 {
        font-size: 2.4rem;
        font-weight: 300;
        color: var(--grey);
        margin: 1.35em 0;
        line-height: 1.5;

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
        font-size: 1.7rem;

        > li {
            margin: 1em 0;

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
            margin: 1em 0;
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
