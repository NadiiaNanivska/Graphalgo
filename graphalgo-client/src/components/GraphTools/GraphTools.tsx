import { InfoCircleOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { InputNumber, Menu, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { receiveGraph, sendGraph } from '../../app/utils/shareGraphUtils';
import { downloadTxtFile, generateAdjacencyMatrix, generateIncidenceMatrix, handleAdjacencyMatrixFromFile, handleIncidenceMatrixFromFile } from '../../app/utils/utilFunctions';
import { useData, useGraphOptions } from '../../contexts/GraphOptionsContext';
import './GraphTools.css';
import { BFS, DFS } from '../../app/api/graphService';
import AlgorithmResult from './AlgorithmResult';

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
        getItem('Incidence matrix', '9')
    ]),

    getItem('Graph algorithms', 'sub3', <PlayCircleOutlined />, [
        getItem('Traversal algorithms', 'g1', null, [getItem('BFS', '10'), getItem('DFS', '11')], 'group'),
        getItem('Shortest path algorithms', 'g2', null, [getItem('Dijkstra\'s algorithm', '12'), getItem('Floyd\'s algorithm', '13')], 'group'),
    ]),

    getItem('Share graph', 'sub4', <InfoCircleOutlined />, [
        getItem('Send', '14'),
        getItem('Receive', '15')
    ]),
];

const GraphTools = () => {
    console.log("rendered menu")
    const [connectionEstablished, setConnectionEstablished] = useState<boolean>(false);
    const { setCanAddNode, setCanAddEdge, setCanRemoveEdge, setCanRemoveNode } = useGraphOptions();
    const { nodes, links, setNodes, setLinks } = useData();
    const startNode = useRef<string>("0");
    const [result, setResult] = useState<string>("");

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        receiveGraph("oksana@gmail.com", setConnectionEstablished)
            .then(data => {
                console.log(data)
                if (data !== null) {
                    setNodes(data.nodes);
                    setLinks(data.edges);
                }
            })
            .catch(error => {
                console.error('Error receiving graph:', error);
            });
    };

    const fetchBFSData = async (startNode: string) => {
        BFS({ nodes, edges: links }, startNode)
            .then(data => {
                if (data !== null) {
                    setResult(data.nodes.join(" "));
                    showDrawer();
                }
            })
            .catch(error => {
                console.error('Error receiving graph:', error);
            });
    };

    const fetchDFSData = async (startNode: string) => {
        DFS({ nodes, edges: links }, startNode)
            .then(data => {
                if (data !== null) {
                    setResult(data.nodes.join(" "));
                    showDrawer();
                }
            })
            .catch(error => {
                console.error('Error receiving graph:', error);
            });
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
        } else if (key === '5') {
            setNodes([]);
            setLinks([]);
        } else if (key === '6') {
            Modal.info({
                title: "Завантажити файл",
                content: (
                    <div>
                        <input type="file" accept="text/plain" onChange={(e) => handleAdjacencyMatrixFromFile(e, setNodes, setLinks)} />
                    </div>
                ),
                okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' } },
                cancelButtonProps: { style: { backgroundColor: 'white', borderColor: '#fcbdac', color: 'black' } },
            });
        } else if (key === '7') {
            Modal.info({
                title: "Завантажити файл",
                content: (
                    <div>
                        <input type="file" accept="text/plain" onChange={(e) => handleIncidenceMatrixFromFile(e, setNodes, setLinks)} />
                    </div>
                ),
                okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' } },
                cancelButtonProps: { style: { backgroundColor: 'white', borderColor: '#fcbdac', color: 'black' } },
            });
        } else if (key === '8') {
            const content = generateAdjacencyMatrix(nodes, links).map(row => row.join(' ')).join('\n');
            downloadTxtFile('graphalgo-adjacency-matrix.txt', content);
        } else if (key === '9') {
            const content = generateIncidenceMatrix(nodes, links).map(row => row.join(' ')).join('\n');
            downloadTxtFile('graphalgo-incidence-matrix.txt', content);
        } else if (key === '10') {
            Modal.confirm({
                title: 'Початкова вершина',
                content: (
                    <InputNumber
                        style={{ borderColor: '#fcbdac' }}
                        defaultValue={0}
                        min={0} max={parseInt(nodes[nodes.length - 1].id)} onChange={(value) => {
                            if (value !== null) {
                                startNode.current = value!.toString();
                            }
                        }}
                    />
                ),
                okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' } },
                cancelButtonProps: { style: { backgroundColor: 'white', borderColor: '#fcbdac', color: 'black' } },
                okText: 'Зберегти',
                cancelText: 'Скасувати',
                onOk: () => {
                    fetchBFSData(startNode.current!);
                }
            });
        } else if (key === '11') {
            Modal.confirm({
                title: 'Початкова вершина',
                content: (
                    <InputNumber
                        style={{ borderColor: '#fcbdac' }}
                        defaultValue={0}
                        min={0} max={parseInt(nodes[nodes.length - 1].id)} onChange={(value) => {
                            if (value !== null) {
                                startNode.current = value!.toString();
                            }
                        }}
                    />
                ),
                okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' } },
                cancelButtonProps: { style: { backgroundColor: 'white', borderColor: '#fcbdac', color: 'black' } },
                okText: 'Зберегти',
                cancelText: 'Скасувати',
                onOk: () => {
                    fetchDFSData(startNode.current!);
                }
            });
        } else if (key === '14') {
            sendGraph("oksana@gmail.com", "nadia6@gmail.com", { nodes, edges: links });
        } else if (key === '15') {
            if (!connectionEstablished) {
                fetchData();
            }
        }
    };

    return (
        <div className='menu-container'>
           <AlgorithmResult onclose={onClose} open={open} content={result}/>
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