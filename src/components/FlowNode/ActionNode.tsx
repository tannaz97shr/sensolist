"use client";

import { RootState } from "@/lib/store";
import { ConditionNodeType } from "@/types/general";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NodeContainer from "./Container";

export default function FlowActionNode({
  data,
  id,
  isConnectable,
  type,
}: NodeProps<ConditionNodeType>) {
  const { title, name } = data;
  const { nodes } = useSelector((state: RootState) => state.appletSlice);
  const [selectedNode, setSelectedNode] = useState(
    nodes.filter((nd) => nd.nodeIndex.toString() === id)[0]
  );

  useEffect(() => {
    setSelectedNode(nodes.filter((nd) => nd.nodeIndex.toString() === id)[0]);
  }, [id, nodes]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <NodeContainer
        fields={data.fields}
        nodeConfig={selectedNode}
        nodeId={id}
        type={type}
        name={name}
      >
        <div>{title}</div>
      </NodeContainer>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
}
