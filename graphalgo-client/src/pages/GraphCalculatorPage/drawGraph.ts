import { Link, Node } from '../../api/utils/helperFunctions/data';

export const RADIUS = 15;

export const drawGraph = (
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
    context.strokeStyle = '#cbcbcb';
    const source: any = link.source as any;
    const target: any = link.target as any;
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const angle = Math.atan2(dy, dx);

    const targetX = target.x - RADIUS * Math.cos(angle);
    const targetY = target.y - RADIUS * Math.sin(angle);

    context.moveTo(source.x, source.y);
    context.lineTo(targetX, targetY);
    context.stroke();

    // Draw the arrowhead
    context.beginPath();
    context.moveTo(targetX - 8 * Math.cos(angle - Math.PI / 6), targetY - 8 * Math.sin(angle - Math.PI / 6));
    context.lineTo(targetX, targetY);
    context.lineTo(targetX - 8 * Math.cos(angle + Math.PI / 6), targetY - 8 * Math.sin(angle + Math.PI / 6));
    context.fillStyle = '#cbcbcb';
    context.fill();

    context.fillStyle = 'black';
    context.font = '15px Arial';
    context.fillText(link.weight.toString(), (source.x + target.x) / 2, (source.y + target.y) / 2);
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
