import { RootState } from "@/lib/store";
import { ConditionNodeType } from "@/types/general";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { Devices } from "iconsax-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NodeContainer from "./Container";

export default function FlowThingNode({
  data,
  id,
  type,
  isConnectable,
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
        style={{ background: "#555", zIndex: "2" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <NodeContainer
        nodeConfig={selectedNode}
        nodeId={id}
        fields={data.fields}
        type={type}
        name={name}
      >
        <Devices />
        <div className="ml-2">{title}</div>
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
