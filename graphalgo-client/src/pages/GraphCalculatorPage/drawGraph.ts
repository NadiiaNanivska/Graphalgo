import { BaseType, Selection, select } from 'd3';
import { Link, Node } from '../../api/utils/helperFunctions/data';

export const RADIUS = 15;

export const drawGraph = (
  context: Selection<SVGSVGElement | null, unknown, null, undefined>,
  nodes: Node[],
  links: Link[]
) => {
  let lines: Selection<SVGLineElement, Link, SVGSVGElement | null, unknown>;
  let edgeLabels: Selection<SVGTextElement, Link, SVGSVGElement | null, unknown>;
  let node: Selection<BaseType | SVGCircleElement, Node, SVGSVGElement | null, unknown>;
  let nodeLabels: Selection<BaseType | SVGTextElement, Node, SVGSVGElement | null, unknown>;
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
    node = context
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', RADIUS)
      .attr('data-node-id', d => d.id)
      .style('fill', '#FD744F')
      .on('click', function (event, d) {
        select(this).style('fill', 'green');
      })
      .raise();

    nodeLabels = context.selectAll('text.node-label')
      .data(nodes)
      .join('text')
      .attr('class', 'node-label')
      .text(d => (d as any).id)
      .attr('font-family', 'Arial')
      .attr('font-size', '12px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .style('pointer-events', 'none')
      .raise();
  };

  const drawEdges = () => {
    lines = context.selectAll<SVGLineElement, Link>('line.link')
      .data(links);

    lines.enter()
      .append('line')
      .attr('class', 'link')
      .merge(lines as Selection<SVGLineElement, Link, SVGSVGElement | null, unknown>)
      .attr('marker-end', 'url(#arrow)')
      .attr('stroke', '#cbcbcb')
      .style('fill', 'none');

    edgeLabels = context.selectAll<SVGTextElement, Link>('text.edge-label')
      .data(links);

    edgeLabels.enter()
      .append('text')
      .attr('class', 'edge-label')
      .merge(edgeLabels as Selection<SVGTextElement, Link, SVGSVGElement | null, unknown>)
      .text(function (d: any) { return d.weight.toString(); })
      .attr('font-family', 'Arial')
      .attr('font-size', '12px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .raise();

    lines.exit().remove();
    edgeLabels.exit().remove();
  };

  function ticked() {
    lines
      .attr("x1", function (d) {
        return (d as any).source.x;
      })
      .attr("y1", function (d) {
        return (d as any).source.y;
      })
      .attr("x2", function (d: any) {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const angle = Math.atan2(dy, dx);
        const x = d.target.x - RADIUS * Math.cos(angle);
        return x;
      })
      .attr("y2", function (d: any) {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const angle = Math.atan2(dy, dx);
        const y = d.target.y - RADIUS * Math.sin(angle);
        return y;
      });

    node
      .attr("cx", function (d) {
        return d.x!;
      })
      .attr("cy", function (d) {
        return d.y!;
      });

    edgeLabels
      .attr("x", function (d: any) {
        return (d.source.x + d.target.x) / 2;
      })
      .attr("y", function (d: any) {
        return (d.source.y + d.target.y) / 2;
      });

    nodeLabels
      .attr("x", function (d) {
        return d.x!;
      })
      .attr("y", function (d) {
        return d.y!;
      });
  }

  return { drawNodes, drawEdges, ticked };
};
