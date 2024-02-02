import { BaseType, Selection, drag, select } from 'd3';
import { Link, Node } from '../../app/utils/data';

export const RADIUS = 20;

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

  const drawNodes = (simulation: d3.Simulation<Node, undefined>) => {
    const dragstarted = (event: any) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    };

    const dragged = (event: any) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    };

    const dragended = (event: any) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    };

    const drag1: any = drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

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
      .call(drag1)
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

  const drawEdges = (openModal: (link: Link) => void) => {
    lines = context.selectAll<SVGLineElement, Link>('line.link')
      .data(links);

    lines.enter()
      .append('line')
      .attr('class', 'link')
      .attr('link-index', (d) => d.index!)
      .merge(lines as Selection<SVGLineElement, Link, SVGSVGElement | null, unknown>)
      .attr('marker-end', 'url(#arrow)')
      .attr('stroke', '#cbcbcb')
      .attr('stroke-width', 2)
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
      .on('click', (event, d) => { openModal(d); })
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
        const midX = (d.source.x + d.target.x) / 2;
        const directionX = d.target.x - d.source.x;
        return midX + directionX * 0.2;
      })
      .attr("y", function (d: any) {
        const midY = (d.source.y + d.target.y) / 2;
        const directionY = d.target.y - d.source.y;
        return midY + directionY * 0.2;
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
