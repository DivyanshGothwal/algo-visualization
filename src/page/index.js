import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import { Menu, Layout, Icon } from 'antd';

import SortingPage from './sorting';
import SearchingPage from './searching';
import { Application } from '../configurations';
import PageStyles from './Page.module.less';


const { Header, Content, Footer } = Layout;


class Main extends Component {
    render() {
        let selectedPath = Object.entries(Application.ALGORITHMS).map(([key, value]) => {
            if (value.PATH === this.props.history.location.pathname || this.props.history.location.pathname === "/") {
                return value.NAME
            }
            else return null;
        });
        return (<Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={selectedPath.filter(Boolean)[0]}
                    style={{ lineHeight: '64px' }}
                >
                    {
                        Object.entries(Application.ALGORITHMS).map(([key, value]) => {
                            return (<Menu.Item key={value.NAME}> <NavLink key={value.NAME} to={value.PATH}>
                                {value.NAME}
                            </NavLink></Menu.Item>);
                        })
                    }
                </Menu>
            </Header>
            <Content className={PageStyles.main}>
                <Layout className={PageStyles.layout}>
                    <Content className={PageStyles.content}>
                        <Switch>
                            <Route path={Application.ALGORITHMS.SORTING.PATH} component={SortingPage} />
                            <Route path={Application.ALGORITHMS.SEARCHING.PATH} component={SearchingPage} />
                            <Redirect to={Application.ALGORITHMS.SORTING.PATH} />
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Algorithm Visualization ©2019 Created with {<Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />} by {<a href="https://github.com/DivyanshGothwal" target="_">Divyansh</a>}</Footer>
        </Layout>);
    }
}

export default Main;