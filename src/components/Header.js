import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { ReactComponent as ITSLogo } from '../images/its-logo.svg';

import Container from './Container';

const Header = ({ siteTitle, resetFocus }) => {
    return (
        <HeaderEl>
            <Container>
                <Nav>
                    <Logo>
                        <Link to="/">
                            <ITSLogo />
                            <span>{siteTitle}</span>
                        </Link>
                    </Logo>
                    <ul>
                        <li>
                            <Link to="getting-started/">Docs</Link>
                        </li>
                        <li>
                            <Link to="build/">Build for Production</Link>
                        </li>
                        <li>
                            <Link to="contact/">Contact</Link>
                        </li>
                    </ul>
                </Nav>
            </Container>
        </HeaderEl>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: '',
};

export default Header;

const HeaderEl = styled.header`
    background: rgb(40, 44, 52);
    color: var(--white);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`;

const Logo = styled.div`
    color: var(--white);
    font-size: 2rem;
    font-weight: 600;

    a {
        display: flex;
        align-items: center;
    }

    svg {
        margin-right: 12px;
        width: 30px;
    }
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 1.7rem;

    ul {
        display: flex;
        list-style: none;

        li {
            padding: 0 20px;
            transition: color 0.3s ease;

            &:hover {
                color: var(--blue);
            }

            &:last-of-type {
                padding-right: 0;
            }
        }
    }
`;
