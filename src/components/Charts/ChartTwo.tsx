import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// Define the type for the data used in the sunburst chart
interface SunburstData {
  name: string;
  value?: number;
  children?: SunburstData[];
}

// Extend the HierarchyRectangularNode to include `current` and `target`
interface SunburstNode extends d3.HierarchyRectangularNode<SunburstData> {
  current: SunburstNode;
  target?: SunburstNode;
}

const data: SunburstData = {
  name: "root",
  children: [
    {
      name: "Category 1",
      children: [
        { name: "Subcategory 2.1", value: 30 },
        { name: "Subcategory 2.2", value: 70 },
      ],
    },
    {
      name: "Category 2",
      children: [
        { name: "Subcategory 2.1", value: 30 },
        { name: "Subcategory 2.2", value: 70 },
      ],
    },
    {
      name: "Category 3",
      children: [
        { name: "Subcategory 2.1", value: 30 },
        { name: "Subcategory 2.2", value: 70 },
      ],
    },
  ],
};

const ChartTwo: React.FC = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  // Move labelTransform function above its usage
  const labelTransform = (d: SunburstNode): string => {
    const x = ((d.x0 + d.x1) / 2) * (180 / Math.PI);
    const y = ((d.y0 + d.y1) / 2);
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && chartRef.current) {
      // Clear any existing chart if the component re-renders
      d3.select(chartRef.current).selectAll("*").remove();

      const width = 928;
      const radius = width / 6;

      const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children!.length + 1));

      const hierarchy = d3.hierarchy<SunburstData>(data)
        .sum((d) => d.value || 0)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      const root = d3.partition<SunburstData>()
        .size([2 * Math.PI, hierarchy.height + 1])(hierarchy as SunburstNode);

      root.each((d) => {
        (d as SunburstNode).current = d as SunburstNode;
      });

      const arc = d3.arc<SunburstNode>()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

      const svg = d3.select(chartRef.current)
        .attr("viewBox", [-width / 2, -width / 2, width, width].toString())
        .style("font", "10px sans-serif");

      const path = svg.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1) as SunburstNode[])
        .join("path")
        .attr("fill", (d) => {
          let node = d;
          while (node.depth > 1) node = node.parent!;
          return color(node.data.name);
        })
        .attr("d", (d) => arc(d.current)!);

      path.append("title")
        .text((d) => `${d.ancestors().map((d) => d.data.name).reverse().join("/")}\n${d.value}`);

      const label = svg.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1) as SunburstNode[])
        .join("text")
        .attr("dy", "0.35em")
        .text((d) => d.data.name)
        .attr("transform", (d) => labelTransform(d.current));

      const parent = svg.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all");
    }
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-4.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Profit this week</h4>
      <svg className="mt-10" ref={chartRef}></svg>
    </div>
  );
};

export default ChartTwo;
