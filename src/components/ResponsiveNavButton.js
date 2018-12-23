import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from '../images/arrow.svg';

const ResponsiveNavButton = ({ handleNav, isNavVisible }) => {
    return (
        <Button onClick={handleNav} open={isNavVisible}>
            <Arrow />
            <Arrow />
        </Button>
    );
};

ResponsiveNavButton.propTypes = {
    handleNav: PropTypes.func.isRequired,
    isNavVisible: PropTypes.bool.isRequired,
};

export default ResponsiveNavButton;

const Button = styled.button`
    position: fixed;
    color: var(--dark-blue);
    bottom: 40px;
    right: 30px;
    background-color: #20232a;
    z-index: 3;
    border-radius: 50%;
    border: 1px solid #ffffff1a;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    margin: 0 auto;
    height: 60px;
    transition: transform 0.15s ease;
    outline: none;
    cursor: pointer;

    &:active {
        transform: translateY(2px) scale(0.99);
        background-color: #424957;
    }

    svg {
        transition: transform 0.2s ease;

        &:first-of-type {
            transform: ${({ open }) =>
                open
                    ? 'translateY(10.5px) rotate(180deg);'
                    : 'translateY(-4px) rotate(180deg);'};
        }

        &:nth-of-type(2) {
            transform: ${({ open }) =>
                open ? 'translateY(-10.5px)' : 'translateY(4px)'};
        }
    }
`;
