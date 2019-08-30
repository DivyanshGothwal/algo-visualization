import React, { Component } from 'react';
import { Menu, Icon, Layout, Button } from 'antd';

import { Sorting } from '../../containers';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class SortingPage extends Component {
    render() {
        return (
            <Sorting />
        )
    }
}

export default SortingPage;