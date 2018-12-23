import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import posed from 'react-pose';
import Media from 'react-media';

import ResponsiveNavButton from './ResponsiveNavButton';

class Sidebar extends Component {
    state = {
        visible: true,
    };

    handleResize = () => {
        if (window.innerWidth <= 600) {
            this.setState({
                visible: false,
            });
        } else {
            this.setState({
                visible: true,
            });
        }
    };

    handleNav = () => {
        this.setState(state => ({ visible: !state.visible }));
    };

    handleLinkClick = () => {
        const { visible } = this.state;
        if (visible && window.innerWidth <= 600) {
            this.setState({
                visible: false,
            });
        }
    };

    componentDidMount() {
        if (typeof window !== 'undefined') {
            if (window.innerWidth <= 600) {
                this.setState({
                    visible: false,
                });
            }
            window.addEventListener('resize', this.handleResize);
        }
    }

    render() {
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
                    const { pathname } = this.props;
                    const { visible } = this.state;

                    return (
                        <React.Fragment>
                            <SidebarEl pose={visible ? 'visible' : 'hidden'}>
                                <LinkContainer>
                                    <Heading>Quick Links</Heading>
                                    {edges.map((edge, index) => {
                                        return (
                                            <StyledLink
                                                key={index}
                                                to={edge.node.fields.slug}
                                                focused={pathname.includes(
                                                    edge.node.fields.slug
                                                )}
                                                onClick={this.handleLinkClick}
                                            >
                                                {edge.node.frontmatter.title}
                                            </StyledLink>
                                        );
                                    })}
                                </LinkContainer>
                            </SidebarEl>
                            <Media query="(max-width: 600px)">
                                {matches =>
                                    matches ? (
                                        <ResponsiveNavButton
                                            handleNav={this.handleNav}
                                            isNavVisible={visible}
                                        />
                                    ) : null
                                }
                            </Media>
                        </React.Fragment>
                    );
                }}
            />
        );
    }
}

export default Sidebar;

Sidebar.propTypes = {
    pathname: PropTypes.string.isRequired,
};

const animatedSidebar = posed.aside({
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
});

const SidebarEl = styled(animatedSidebar)`
    background: #f6f9fc;
    padding: 60px 20px 60px 60px;
    border-left: 1px solid #e6e6e6;

    @media (max-width: 1100px) {
        padding: 60px 20px 60px 0;
    }

    @media (max-width: 600px) {
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
`;

const Heading = styled.h4`
    font-weight: bold;
    color: var(--grey);
    margin: 0 0 1em;
    text-transform: uppercase;
    letter-spacing: 0.065em;
    font-size: 1.35rem;

    @media (max-width: 1100px) {
        padding-left: 15px;
    }

    @media (max-width: 600px) {
        display: none;
    }
`;

const LinkContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
    position: sticky;
    top: 12rem;

    @media (max-width: 600px) {
        font-size: 21px;
        justify-content: center;
        position: static;
        top: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        align-items: center;
    }
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

    @media (max-width: 1100px) {
        padding-left: 15px;
    }

    @media (max-width: 600px) {
        border: none;
        padding: 0;
        margin: 12px 0;
    }
`;
