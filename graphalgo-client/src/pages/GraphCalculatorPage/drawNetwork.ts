import { Link, Node } from './data';

export const RADIUS = 20;

export const drawNetwork = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  nodes: Node[],
  links: Link[]
) => {
  context.clearRect(0, 0, width, height);

  // Draw the links first
  links.forEach((link) => {
    context.beginPath();
    context.strokeStyle = 'grey';
    const source: any = link.source as any;
    const target: any = link.target as any;
    context.moveTo(source.x, source.y);
    context.lineTo(target.x, target.y);
    context.stroke();

    context.fillStyle = 'red';
    context.font = '15px Arial';
    context.fillText(link.value.toString(), (source.x + target.x) / 2, (source.y + target.y) / 2);
  });

  // Draw the nodes
  nodes.forEach((node) => {
    if (!node.x || !node.y) {
      return;
    }

    context.beginPath();
    context.moveTo(node.x + RADIUS, node.y);
    context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
    context.fillStyle = '#cb1dd1';
    context.fill();
    context.fillStyle = 'black';
    context.font = '15px Arial';
    context.fillText(node.id, node.x!, node.y!);
  });
};
