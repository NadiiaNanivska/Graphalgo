import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { Data, data } from "./data";
import { message } from "antd";

export const sendGraph = (user: string, currentUser: string, data: Data) => {
    const res = JSON.stringify(data);
    console.log(res)
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        if (user !== currentUser) {
            stompClient.send('/chat.invite', {}, JSON.stringify({ senderId: currentUser, recipientId: user, data: res }));
        }
    }
    );
    setTimeout(() => {
        stompClient.disconnect(() => { message.warning("Connection closed") });
    }, 30000);
}

export const receiveGraph = async (currentUser: string, setConnectionEstablished: React.Dispatch<React.SetStateAction<boolean>>): Promise<Data | null> => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    const connectPromise = new Promise<void>((resolve, reject) => {
        stompClient.connect({}, function (frame) {
            resolve();
        }, function (error) {
            reject(error);
        });
    });
    await connectPromise;
    return new Promise<Data | null>((resolve, reject) => {
        setConnectionEstablished(true);
        console.log(currentUser)
        stompClient.subscribe('/topic/public/' + currentUser, function (msg) {
            const chatroomId: Data = JSON.parse(msg.body);
            const nodes = chatroomId.nodes.map(node => { return { id: node.id } });
            const links = chatroomId.edges.map(link => {
                const { source, target, weight } = link;
                return { source: (source as any).id, target: (target as any).id, weight };
            });
            const sanitizedData = {
                nodes: nodes,
                edges: links
            };
            stompClient.disconnect(() => { setConnectionEstablished(false); });
            resolve(sanitizedData);
        });
        setTimeout(() => {
            stompClient.disconnect(() => { setConnectionEstablished(false); message.warning("Waiting time is over. Click on receive button again!") });
        }, 30000);
    });
}
