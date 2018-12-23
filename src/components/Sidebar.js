import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';

const Sidebar = () => {
    return (
        <StaticQuery
            query={graphql`
                query {
                    allMarkdownRemark(
                        sort: { fields: [frontmatter___order], order: ASC }
                    ) {
                        edges {
                            node {
                                fields {
                                    slug
                                }
                                frontmatter {
                                    title
                                }
                            }
                        }
                    }
                }
            `}
            render={data => {
                const { edges } = data.allMarkdownRemark;
                const { pathname } = location;

                return (
                    <SidebarEl>
                        <LinkContainer>
                            <Heading>Quick Links</Heading>
                            {edges.map((edge, index) => {
                                return (
                                    <StyledLink
                                        key={index}
                                        to={edge.node.fields.slug}
                                        focused={
                                            pathname === edge.node.fields.slug
                                        }
                                    >
                                        {edge.node.frontmatter.title}
                                    </StyledLink>
                                );
                            })}
                        </LinkContainer>
                    </SidebarEl>
                );
            }}
        />
    );
};

export default Sidebar;

Sidebar.propTypes = {
    focused: PropTypes.number,
};

const SidebarEl = styled.aside`
    background: #f6f9fc;
    padding: 60px;
    border-left: 1px solid #e6e6e6;
`;

const Heading = styled.h4`
    font-weight: bold;
    color: var(--grey);
    margin: 0 0 1em;
    text-transform: uppercase;
    letter-spacing: 0.065em;
    font-size: 1.35rem;
`;

const LinkContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
    position: sticky;
    top: 12rem;
`;

const StyledLink = styled(Link)`
    margin: 6px 0;
    transition: color 0.25s ease;
    font-weight: 500;
    border-left: ${({ focused }) =>
        focused ? '4px solid var(--dark-blue)' : null};
    padding-left: ${({ focused }) => (focused ? '10px' : null)};

    &:hover {
        color: var(--dark-blue);
    }
`;
