import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';


import SortingPage from './sorting';
import { Application } from '../configurations';


import { Menu, Icon, Layout } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


class Main extends Component {
    render() {
        return (<Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={Application.ALGORITHMS.SORTING.NAME}
                    style={{ lineHeight: '64px' }}
                >
                    {
                        Object.entries(Application.ALGORITHMS).map(([key, value]) => {
                            return (<Menu.Item key={value.NAME}> <Link key={value.NAME} to={value.PATH}>
                                {value.NAME}
                            </Link></Menu.Item>);
                        })
                    }
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Switch>
                            <Route path={Application.ALGORITHMS.SORTING.PATH} component={SortingPage} />
                            <Route path={Application.ALGORITHMS.SEARCHING.PATH} component={SortingPage} />
                            <Redirect to={Application.ALGORITHMS.SORTING.PATH} />
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Algorithm Visualization ©2018 Created by Divyansh</Footer>
        </Layout>);
    }
}

export default Main;