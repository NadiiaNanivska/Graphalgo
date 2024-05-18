import React, { useEffect, useState } from 'react';
import { Table, Tag, message } from 'antd';
import "./HistoryPage.css";
import { HistoryDTO } from '../../app/dto/graphDTO';
import { History } from '../../app/api/graphService';

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState<HistoryDTO[]>();
    useEffect(() => {
        History()
            .then(data => {
                if (data !== null) {
                    setHistoryData(data);
                }
            })
            .catch(error => {
                message.error((error as Error).message);
            });
    }, []);
    const columns = [
        {
            title: 'Вхідні дані',
            dataIndex: 'startVertices',
            key: 'startVertices',
        },
        {
            title: 'Результат',
            dataIndex: 'resultVertices',
            key: 'resultVertices',
        },
        {

            title: 'Алгоритм',
            dataIndex: 'algorithm',
            key: 'algorithm',
            render: (_: any, { algorithm }: any) => (
                <Tag color={'geekblue'} key={algorithm}>
                    {algorithm}
                </Tag>
            )
        },
    ];

    return (
        <div className='history-container'>
            <h1>Історія обчислень</h1>
            <Table columns={columns} dataSource={historyData} />
        </div>
    );
};

export default HistoryPage;
