import React, { Component } from 'react';
import styled from '@emotion/styled';

import SEO from '../components/seo';

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <SEO
                    title="Home"
                    keywords={['Docs', 'gatsby', 'javascript', 'react']}
                />
                <Heading>Home</Heading>
            </React.Fragment>
        );
    }
}

export default Index;

const Heading = styled.h1`
    margin: 12rem 0 0.85em;
    font-size: 5.25rem;
`;
