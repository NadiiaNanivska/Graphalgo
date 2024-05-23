import { InfoCircleOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, message, notification } from 'antd';
import React, { useRef, useState } from 'react';
import { receiveGraph, sendGraph } from '../../app/utils/shareGraphUtils';
import { downloadTxtFile, generateAdjacencyMatrix, generateIncidenceMatrix, handleAdjacencyMatrixFromFile, handleIncidenceMatrixFromFile, openFileModal, openInputNodeModal, openNotification } from '../../app/utils/utilFunctions';
import { useData, useGraphOptions, useUser } from '../../contexts/GraphOptionsContext';
import './GraphTools.css';
import { BFS, DFS, Dijkstra, Kruskal, Prim } from '../../app/api/graphService';
import InputNodesDrawer from './InputNodesDrawer';
import { ShortestPathResponse, TraversalResponse } from '../../app/dto/graphDTO';
import SendGraphModal from '../Graph/sendGraphModal';

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
    getItem('Керування графом', 'sub1', <SettingOutlined />, [
        getItem('Додати елементи', 'g1', null, [getItem('Додати вершину', '1'), getItem('Додати ребро', '2')], 'group'),
        getItem('Видалити елементи', 'g2', null, [getItem('Видалити вершину', '3'), getItem('Видалити ребро', '4')], 'group'),
        getItem('Очистити', 'g3', null, [getItem('Видалити всі елементи', '5')], 'group'),
        getItem('Завантажити граф', 'g4', null, [getItem('З матриці суміжності', '6'), getItem('З матриці інцидентності', '7')], 'group'),
    ]),

    getItem('Graph info', 'sub2', <InfoCircleOutlined />, [
        getItem('Матриця суміжності', '8'),
        getItem('Матриця інцидентності', '9')
    ]),

    getItem('Алгоритми', 'sub3', <PlayCircleOutlined />, [
        getItem('Алгоритми обходу', 'g1', null, [getItem('BFS', '10'), getItem('DFS', '11')], 'group'),
        getItem('Алгоритми пошуку найкоротшого шляху', 'g2', null, [getItem('Алгоритм Дейкстри', '12'), getItem('Алгоритм Флойда-Воршелла', '13')], 'group'),
        getItem('Алгоритм побудови мінімального кістякового дерева', 'g3', null, [getItem('Алгоритм Прима', '14'), getItem('Алгоритм Крускала', '15')], 'group')
    ]),

    getItem('Поділитись графом', 'sub4', <InfoCircleOutlined />, [
        getItem('Надіслати', '16'),
        getItem('Отримати', '17')
    ]),
];

const GraphTools = (_props: { setTraversalResult: React.Dispatch<React.SetStateAction<TraversalResponse | ShortestPathResponse | undefined>> }) => {
    const { nodes, links, setNodes, setLinks } = useData();
    const { setCanAddNode, setCanAddEdge, setCanRemoveEdge, setCanRemoveNode } = useGraphOptions();
    const { user } = useUser();
    const startNode = useRef<string>("0");
    const endNode = useRef<string>("0");
    const [connectionEstablished, setConnectionEstablished] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [algorithm, setAlgorithm] = useState('Dijkstra');
    const [api, contextHolder] = notification.useNotification();

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        if (user === null) { message.info("Увійдіть для доступу до цієї опції") }
        else {
            receiveGraph(user.email, setConnectionEstablished)
                .then(data => {
                    if (data !== null) {
                        setNodes(data.nodes);
                        setLinks(data.edges);
                    }
                })
                .catch(error => {
                    console.error('Помилка під час отримання:', error);
                });
        }
    };

    const handleSendGraph = (username: string) => {
        sendGraph(username, user!.email, { nodes, edges: links })
    };

    const fetchBFSData = async (startNode: string) => {
        BFS({ nodes, edges: links }, startNode)
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                }
            })
            .catch(error => {
                console.error((error as Error).message);
            });
    };

    const fetchDFSData = async (startNode: string) => {
        DFS({ nodes, edges: links }, startNode)
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                }
            })
            .catch(error => {
                console.error((error as Error).message);
            });
    };

    const fetchDijkstraData = async (startNode: string, endNode: string) => {
        Dijkstra({ nodes, edges: links }, startNode, endNode)
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                    console.log(data)
                    openNotification(api, data.cost, 'Вартість найкоротшого шляху між вершинами')
                }
            })
            .catch(error => {
                console.error((error as Error).message);
            });
    };

    const fetchFloydData = async (startNode: string, endNode: string) => {
        Dijkstra({ nodes, edges: links }, startNode, endNode)
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                    openNotification(api, data.cost, 'Вартість найкоротшого шляху між вершинами')
                }
            })
            .catch(error => {
                console.error((error as Error).message);
            });
    };

    const fetchPrimData = async () => {
        Prim({ nodes, edges: links })
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                    openNotification(api, data.cost, 'Вага мінімального кістякового дерева')
                }
            })
            .catch(error => {
                console.error((error as Error).message);
            });
    };

    const fetchKruskalData = async () => {
        Kruskal({ nodes, edges: links })
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                    openNotification(api, data.cost, 'Вага мінімального кістякового дерева')
                }
            })
            .catch(error => {
                console.error((error as Error).message);
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
            openFileModal(setNodes, setLinks, handleAdjacencyMatrixFromFile);
        } else if (key === '7') {
            openFileModal(setNodes, setLinks, handleIncidenceMatrixFromFile);
        } else if (key === '8') {
            const content = generateAdjacencyMatrix(nodes, links).map(row => row.join(' ')).join('\n');
            downloadTxtFile('graphalgo-adjacency-matrix.txt', content);
        } else if (key === '9') {
            const content = generateIncidenceMatrix(nodes, links).map(row => row.join(' ')).join('\n');
            downloadTxtFile('graphalgo-incidence-matrix.txt', content);
        } else if (key === '10') {
            openInputNodeModal(startNode, fetchBFSData, nodes[nodes.length - 1].id)
        } else if (key === '11') {
            openInputNodeModal(startNode, fetchDFSData, nodes[nodes.length - 1].id)
        } else if (key === '12') {
            setAlgorithm('Dijkstra');
            showDrawer();
        } else if (key === '13') {
            setAlgorithm('Floyd');
            showDrawer();
        } else if (key === '14') {
            fetchPrimData();
        } else if (key === '15') {
            fetchKruskalData();
        } else if (key === '16') {
            if (user === null) { message.info("Увійдіть для доступу до цієї опції") }
            else {
                setModalVisible(true);
            }
        } else if (key === '17') {
            if (!connectionEstablished) {
                fetchData();
            }
        }
    };

    return (
        <div className='menu-container'>
            {contextHolder}
            <SendGraphModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSend={handleSendGraph}
            />
            <InputNodesDrawer onclose={onClose} open={open} fetchAlgorithmData={algorithm === 'Dijkstra' ? fetchDijkstraData : fetchFloydData} startNode={startNode} endNode={endNode} />
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