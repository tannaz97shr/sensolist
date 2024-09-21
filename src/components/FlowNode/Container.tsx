import { getNodeGroups } from "@/ApiCall/nodes";
import useContextMenu from "@/hooks/useContextMenu";
import { addEditNode, onDeleteNode } from "@/lib/features/applet/appletSlice";
import { INode, INodeConfig, INodeFields, ISubNode } from "@/types/general";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContextMenu from "../FlowContextMenu";
import Loading from "../UI/Loading";

interface NodeContainerProps {
  children: React.ReactNode;
  nodeId: string;
  nodeConfig: INodeConfig;
  fields: INodeFields[];
  type: string;
  name: string;
}

export default function NodeContainer({
  children,
  nodeId,
  nodeConfig,
  fields,
  type,
  name,
}: NodeContainerProps) {
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  const dispatch = useDispatch();
  const [nodeGroupes, setNodeGroupes] = useState<INode[]>([]);
  const [nodesLoading, setNodesLoading] = useState<boolean>(false);
  const [selectedSubNode, setSelectedSubNode] = useState<ISubNode>();
  console.log("node data", nodeConfig);
  useEffect(() => {
    const getData = async () => {
      setNodesLoading(true);
      const res = await getNodeGroups();
      setNodeGroupes(res.list || []);
      setNodesLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    if (nodeGroupes.length) {
      const subNodesGroup = nodeGroupes.filter((gp) => gp.groupName === type)[0]
        .nodes;
      const subNode = subNodesGroup.filter((nd) => nd.name === name)[0];
      setSelectedSubNode(subNode);
    }
  }, [name, nodeGroupes, type]);

  return (
    <div>
      {nodesLoading ? <Loading /> : null}
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setClicked(true);

          setPoints({
            x: e.pageX,
            y: e.pageY,
          });
        }}
        className="relative data-[menu=true]:z-10 border border-neutral-6 px-4 py-2 rounded-lg flex items-center text-base dark:text-neutral-4 bg-primary-tint-3 text-white"
        data-menu={clicked}
      >
        {children}
      </div>
      {clicked && (
        <ContextMenu
          onEditSelect={() => {
            console.log("on edit select sub node", selectedSubNode);
            if (selectedSubNode?.fields)
              dispatch(
                addEditNode({
                  nodeData: nodeConfig,
                  fields: selectedSubNode?.fields,
                })
              );
          }}
          onDelete={() => {
            dispatch(onDeleteNode({ nodeId: nodeId }));
          }}
        />
      )}
    </div>
  );
}
