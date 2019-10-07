import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import { Menu, Layout, Icon, Drawer } from 'antd';

import SortingPage from './sorting';
import SearchingPage from './searching';
import PathFinder from './path-finder';
import { Application } from '../configurations';
import PageStyles from './Page.module.less';
import { Generics } from '../utils';


const { Header, Content, Footer } = Layout;
let drawerBodyStyle = { padding: "14px 0px" }

class Main extends PureComponent {
    state = {
        visible: false,

    }
    onClose = () => {
        this.setState({ visible: false });
    }
    onMenuClick = () => {
        this.setState({ visible: true });
    }
    render() {
        const { visible } = this.state;
        let selectedPath = Object.entries(Application.ALGORITHMS).map(([key, value]) => {
            if (value.PATH === this.props.history.location.pathname || this.props.history.location.pathname === "/") {
                return value.NAME
            }
            else return null;
        });
        let menuItems = (
            Object.entries(Application.ALGORITHMS).map(([key, value]) => {
                return (<Menu.Item key={value.NAME}> <NavLink key={value.NAME} to={value.PATH}>
                    {value.NAME}
                </NavLink></Menu.Item>);
            })
        );
        let drawer = (
            <Drawer
                title="Select Algorithm"
                placement="left"
                closable={true}
                onClose={this.onClose}
                visible={visible}
                className={PageStyles.drawer}
                bodyStyle={drawerBodyStyle}
            >
                <Menu
                    theme="light"
                    mode="vertical"
                    selectedKeys={selectedPath.filter(Boolean)}
                    className={PageStyles.menu}
                >
                    {menuItems}
                </Menu>
            </Drawer>
        );
        let smallDeviceJsMedia = Generics.getDefaultMediaQueries().extraSmallDevice;
        return (<Layout>
            {
                <Header className={PageStyles.header}>
                    {
                        !smallDeviceJsMedia.matches ?
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={selectedPath.filter(Boolean)}
                                className={PageStyles.menu}
                            >
                                {menuItems}
                            </Menu>
                            : <React.Fragment><Icon type="menu" className={PageStyles.menuIcon} onClick={this.onMenuClick} />{drawer}</React.Fragment>
                    }
                </Header>
            }
            <Content className={PageStyles.main}>
                <Layout className={PageStyles.layout}>
                    <Content className={PageStyles.content}>
                        <Switch>
                            <Route path={Application.ALGORITHMS.SORTING.PATH} component={SortingPage} />
                            <Route path={Application.ALGORITHMS.SEARCHING.PATH} component={SearchingPage} />
                            <Route path={Application.ALGORITHMS.PATH_FINDING.PATH} component={PathFinder} />
                            <Redirect to={Application.ALGORITHMS.SORTING.PATH} />
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer className={PageStyles.footer}>Algorithm Visualization ©2019 Created with {<Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />} by {<a href="https://github.com/DivyanshGothwal" target="_">Divyansh</a>}</Footer>
        </Layout>);
    }
}

export default Main;