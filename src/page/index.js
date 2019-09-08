import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';


import SortingPage from './sorting';
import SearchingPage from './searching';
import { Application } from '../configurations';


import { Menu, Layout } from 'antd';
const { Header, Content, Footer } = Layout;


class Main extends Component {
    render() {
        let selectedPath = Object.entries(Application.ALGORITHMS).map(([key, value]) => {
            if (value.PATH === this.props.history.location.pathname) {
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
                    defaultSelectedKeys={selectedPath.filter(Boolean)}
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
            <Content style={{ padding: '0 50px' }}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Content style={{ padding: '0 24px', minHeight: "280px" }}>
                        <Switch>
                            <Route path={Application.ALGORITHMS.SORTING.PATH} component={SortingPage} />
                            <Route path={Application.ALGORITHMS.SEARCHING.PATH} component={SearchingPage} />
                            <Redirect to={Application.ALGORITHMS.SORTING.PATH} />
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Algorithm Visualization ©2019 Created by Divyansh</Footer>
        </Layout>);
    }
}

export default Main;