import { InfoCircleOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Modal } from 'antd';
import React from 'react';

import './GraphTools.css';
import { useData, useGraphOptions } from '../../contexts/GraphOptionsContext';
import { Data, Link } from '../../app/utils/data';
import { generateAdjacencyMatrix } from '../../app/utils/utilFunctions';

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
        getItem('Clear graph', 'g3', null, [getItem('Remove all elements', '5')], 'group'),
        getItem('Download graph', 'g4', null, [getItem('From adjacency matrix', '6'), getItem('From incidence matrix', '7')], 'group'),
    ]),

    getItem('Graph info', 'sub2', <InfoCircleOutlined />, [
        getItem('Adjacency matrix', '8'),
        getItem('Incidence matrix', '9'),
        getItem('Edges list', '10')
    ]),

    getItem('Graph algorithms', 'sub4', <PlayCircleOutlined />, [
        getItem('Shortest path algorithms', 'g1', null, [getItem('Dijkstra\'s algorithm', '11'), getItem('Floyd\'s algorithm', '12')], 'group'),
    ]),
];

const GraphTools = () => {
    console.log("rendered menu")
    const { setCanAddNode, setCanAddEdge, setCanRemoveEdge, setCanRemoveNode } = useGraphOptions();
    const { nodes, links, setNodes, setLinks } = useData();

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target)
            const content: string = e.target!.result as string;
            const lines = content.trim().split(/\r\n|\n/);
            const nodes = lines.map((line, index) => ({ id: index.toString() }));
            const links = lines.flatMap((line, sourceIndex) =>
                line.split(' ').map((value, targetIndex) => {
                    if (value === '1') {
                        return { source: sourceIndex.toString(), target: targetIndex.toString(), weight: 1 };
                    }
                    return null;
                })
            ).filter(link => link !== null) as Link[];
            setNodes(nodes);
            setLinks(links);
        };

        reader.readAsText(file);
    };


    const onClick: MenuProps['onClick'] = (e: any) => {
        const key = e.key.toString();
        setCanAddNode(false);
        setCanAddEdge(false);
        setCanRemoveEdge(false);
        setCanRemoveNode(false);
        if (key === '1') {
            setCanAddNode(true);
        } else if (key === '2') {
            setCanAddEdge(true);
        } else if (key === '3') {
            setCanRemoveNode(true);
        } else if (key === '4') {
            setCanRemoveEdge(true);
        } else if (key === '6') {
            Modal.confirm({
                title: "Завантажити файл",
                content: (
                    <div>
                        <input type="file" onChange={(handleFileChange)} />
                    </div>
                ),
            });
        } else if (key === '8') {
            console.log(generateAdjacencyMatrix(nodes, links));
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