import React from 'react';
import styled from '@emotion/styled';

const Container = ({ children }, { ...props }) => {
    return <ContainerEl {...props}>{children}</ContainerEl>;
};

export default Container;

const ContainerEl = styled.div`
    width: 100%;
    max-width: 1240px;
    padding: 0 20px;
    margin: 0 auto;
`;
