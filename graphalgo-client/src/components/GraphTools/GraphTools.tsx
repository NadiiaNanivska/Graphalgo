import { InfoCircleOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';

import './GraphTools.css';
import { useGraphOptions } from '../../contexts/GraphOptionsContext';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Graph control', 'sub1', <SettingOutlined />, [
        getItem('Add elements', 'g1', null, [getItem('Add vertex', '1'), getItem('Add edge', '2')], 'group'),
        getItem('Remove elements', 'g2', null, [getItem('Remove vertex', '3'), getItem('Remove edge', '4')], 'group'),
    ]),

    getItem('Graph info', 'sub2', <InfoCircleOutlined />, [
        getItem('Adjacency matrix', '5'),
        getItem('Incidence matrix', '6'),
        getItem('Edges list', '7'),
        getItem('Adjacency matrix', '5'),
        getItem('Incidence matrix', '6'),
        getItem('Edges list', '7'),
    ]),

    getItem('Graph algorithms', 'sub4', <PlayCircleOutlined />, [
        getItem('Shortest path algorithms', 'g1', null, [getItem('Dijkstra\'s algorithm', '8'), getItem('Floyd\'s algorithm', '9')], 'group'),
    ]),
];

const GraphTools = () => {
    const { setCanAddNode, setCanAddEdge, setCanRemoveEdge, setCanRemoveNode } = useGraphOptions();

    const onClick: MenuProps['onClick'] = (e: any) => {
        const key = e.key.toString();
        setCanAddNode(false);
        setCanAddEdge(false);
        setCanRemoveEdge(false);
        setCanRemoveNode(false);
        if (key === '1') {
            setCanAddNode(true);
        }
        else if (key === '2') {
            setCanAddEdge(true);
        }
        else if (key === '3') {
            setCanRemoveNode(true);
        }
        else if (key === '4') {
            setCanRemoveEdge(true);
        }
    };

    return (
        <div className='menu-container'>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </div>
    );
};

export default GraphTools;