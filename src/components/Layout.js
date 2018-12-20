import React, { Component } from 'react';
import styled from '@emotion/styled';

import Header from './Header';
import Sidebar from './Sidebar';
import '../css/base-styles.css';
import '../css/prism.css';

class Layout extends Component {
    render() {
        const { children } = this.props;

        return (
            <PageContainer>
                <Header siteTitle="HDSupport Docs" />
                <Main>
                    <Content>{children}</Content>
                    <Sidebar />
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
    grid-template-columns: 1fr 0.5fr;
    grid-column-gap: 20px;
    min-height: 100vh;
`;

const Content = styled.div`
    margin-left: auto;
    max-width: 930px;
    padding: 0 30px;
    width: 100%;
`;
