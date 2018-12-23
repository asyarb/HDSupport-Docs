import React, { Component } from 'react';
import styled from '@emotion/styled';

import Header from './Header';
import Sidebar from './Sidebar';
import '../css/base-styles.css';
import '../css/prism.css';

class Layout extends Component {
    render() {
        const {
            children,
            location: { pathname },
        } = this.props;

        return (
            <PageContainer>
                <Header
                    siteTitle="HDSupport Docs"
                    resetFocus={this.resetFocus}
                />
                <Main>
                    <Content>{children}</Content>
                    <Sidebar pathname={pathname} />
                </Main>
            </PageContainer>
        );
    }
}

export default Layout;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr 0.4fr;
    grid-column-gap: 20px;
    min-height: 100vh;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const Content = styled.div`
    margin-left: auto;
    max-width: 1020px;
    padding: 0 20px;
    width: 100%;
`;
