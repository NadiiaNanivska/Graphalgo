import { Node, Link } from "./data";

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

  const addEdge = (sourceId: string, targetId: string, edgeValue: number) => {
    const isEdgeExists = links.some((link: any) => link.source.id === sourceId && link.target.id === targetId);
    if (isEdgeExists) {
      alert('Ребро між вузлами вже існує!');
      return;
    }
    const newLink: Link = {
      source: sourceId,
      target: targetId,
      weight: edgeValue
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  return { addNode, addEdge };
};

export default useHandleAddNode;
