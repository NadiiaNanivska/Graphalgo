import { Selection } from 'd3';
import { Link, Node } from '../../api/utils/helperFunctions/data';

export const RADIUS = 15;

export const drawGraph = (
  context: Selection<SVGSVGElement | null, unknown, null, undefined>,
  width: number,
  height: number,
  nodes: Node[],
  links: Link[]
) => {
  context
    .append("svg:defs")
    .append("svg:marker")
    .attr('id', 'arrow')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 9)
    .attr('refY', 5)
    .attr('markerWidth', 14)
    .attr('markerHeight', 8)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,0 L10,5 L0,10 L2,5')
    .style('fill', '#cbcbcb');


  const drawNodes = () => {
    nodes.forEach(node => {
      if (node.x !== undefined && node.y !== undefined) {
        node.x = Math.max(RADIUS, Math.min(width - RADIUS, node.x));
        node.y = Math.max(RADIUS, Math.min(height - RADIUS, node.y));
      }
    });
    context
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', RADIUS)
      .attr('cx', d => (d as any).x)
      .attr('cy', d => (d as any).y)
      .style('fill', '#cb1dd1')
      .raise();

      context.selectAll('text.node-label')
      .data(nodes)
      .join('text')
      .attr('class', 'node-label')
      .attr('x', d => (d as any).x)
      .attr('y', d => (d as any).y)
      .text(d => (d as any).id)
      .attr('font-family', 'Arial')
      .attr('font-size', '12px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .style('pointer-events', 'none') // Забороняємо взаємодію з текстовими елементами
      .raise();
  };

  const drawEdges = () => {
    context.selectAll('line').remove();
    context.selectAll('text').remove();
    context.selectAll('line.link')
      .data(links)
      .join('line')
      .attr('x1', function (d: any) {
        return d.source.x;
      })
      .attr('y1', function (d: any) {
        return d.source.y;
      })
      .attr('x2', function (d: any) {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const angle = Math.atan2(dy, dx);
        const x = d.target.x - RADIUS * Math.cos(angle);
        return x;
      })
      .attr('y2', function (d: any) {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const angle = Math.atan2(dy, dx);
        const y = d.target.y - RADIUS * Math.sin(angle);
        return y;
      })
      .attr('marker-end', 'url(#arrow)')
      .attr('stroke', '#cbcbcb')
      .style('fill', 'none');

      context.selectAll('text.edge-label')
      .data(links)
      .join('text')
      .attr('class', 'edge-label')
      .attr('x', function(d: any) {
        return (d.source.x + d.target.x) / 2;
      })
      .attr('y', function(d: any) {
        return (d.source.y + d.target.y) / 2;
      })
      .text(function(d: any) {
        return d.weight.toString();
      })
      .attr('font-family', 'Arial')
      .attr('font-size', '12px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .raise();
  };

  return { drawNodes, drawEdges };
};
