import { Node, Link } from "./data";

const useHandleAddNode = (
  nodes: Node[],
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
