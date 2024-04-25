import { InfoCircleOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, message, notification } from 'antd';
import React, { useRef, useState } from 'react';
import { receiveGraph, sendGraph } from '../../app/utils/shareGraphUtils';
import { downloadTxtFile, generateAdjacencyMatrix, generateIncidenceMatrix, handleAdjacencyMatrixFromFile, handleIncidenceMatrixFromFile, openFileModal, openInputNodeModal, openNotification } from '../../app/utils/utilFunctions';
import { useData, useGraphOptions, useUser } from '../../contexts/GraphOptionsContext';
import './GraphTools.css';
import { BFS, DFS, Dijkstra } from '../../app/api/graphService';
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
        getItem('Minimum spanning tree algorithms', 'g3', null, [getItem('Prim\'s algorithm', '14'), getItem('Kruskal\'s algorithm', '15')], 'group')
    ]),

    getItem('Share graph', 'sub4', <InfoCircleOutlined />, [
        getItem('Send', '16'),
        getItem('Receive', '17')
    ]),
];

const GraphTools = (_props: { setTraversalResult: React.Dispatch<React.SetStateAction<TraversalResponse | ShortestPathResponse | undefined>> }) => {
    const { nodes, links, setNodes, setLinks } = useData();
    const { setCanAddNode, setCanAddEdge, setCanRemoveEdge, setCanRemoveNode } = useGraphOptions();
    const { user } = useUser();
    const startNode = useRef<string>("0");
    const endNode = useRef<string>(nodes.length === 0 ? "0" : nodes[nodes.length - 1].id);
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
        if (user === null) { message.info("Увійдіть для того, щоб мати доступ до цієї опції") }
        else {
        receiveGraph(user.email, setConnectionEstablished)
            .then(data => {
                if (data !== null) {
                    setNodes(data.nodes);
                    setLinks(data.edges);
                }
            })
            .catch(error => {
                console.error('Error receiving graph:', error);
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
                message.error((error as Error).message);
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
                message.error((error as Error).message);
            });
    };

    const fetchDijkstraData = async (startNode: string, endNode: string) => {
        Dijkstra({ nodes, edges: links }, startNode, endNode)
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                    openNotification(api, data.cost)
                }
            })
            .catch(error => {
                message.error((error as Error).message);
            });
    };

    const fetchFloydData = async (startNode: string, endNode: string) => {
        Dijkstra({ nodes, edges: links }, startNode, endNode)
            .then(data => {
                if (data !== null) {
                    _props.setTraversalResult(data);
                    openNotification(api, data.cost)
                }
            })
            .catch(error => {
                message.error((error as Error).message);
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
        } else if (key === '16') {
            if (user === null) { message.info("Увійдіть для того, щоб мати доступ до цієї опції") }
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