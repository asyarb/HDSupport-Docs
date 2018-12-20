import React, { Component } from 'react';
import styled from '@emotion/styled';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: null,
        };
    }

    render() {
        return <SidebarEl />;
    }
}

export default Sidebar;

const SidebarEl = styled.aside`
    background: #f6f9fc;
    padding: 60px;
    border-left: 1px solid #e6e6e6;
`;
