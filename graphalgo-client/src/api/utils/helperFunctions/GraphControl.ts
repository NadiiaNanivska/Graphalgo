import { Node, Link } from "./data";
import { message } from 'antd';

const useHandleAddNode = (
  nodes: Node[],
  links: Link[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>
) => {
  const addNode = () => {
    const newNode: Node = {
      id: `Node_${nodes.length + 1}`
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const removeNode = (nodeIdToRemove: string) => {
    const filteredNodes = nodes.filter(node => node.id !== nodeIdToRemove);
    const filteredLinks = links.filter((link: any) => link.source.id !== nodeIdToRemove && link.target.id !== nodeIdToRemove);
    setNodes(filteredNodes);
    setLinks(filteredLinks);
  };

  const addEdge = (sourceId: string, targetId: string, edgeValue: number) => {
    const isEdgeExists = links.some((link: any) => link.source.id === sourceId && link.target.id === targetId);
    if (isEdgeExists) {
      message.error('Ребро між вузлами вже існує!');
      return;
    }
    const newLink: Link = {
      source: sourceId,
      target: targetId,
      weight: edgeValue
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const removeEdge = (linkId: number) => {
    const updatedLinks = links.filter(link => link.index! != linkId);
    setLinks(updatedLinks);
  };

  return { addNode, addEdge, removeNode,  removeEdge};
};

export default useHandleAddNode;
