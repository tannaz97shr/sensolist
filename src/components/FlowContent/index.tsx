"use client";

// import { NodeDataType } from "@/types/general";
import { getExampleGroups, getNodeGroups } from "@/ApiCall/nodes";
import { storeNodesConfig } from "@/ApiCall/rule";
import {
  addConnection,
  fetchApplet,
  removeEditNode,
} from "@/lib/features/applet/appletSlice";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { AppDispatch, RootState } from "@/lib/store";
import {
  IChainConnection,
  INode,
  INodeConfig,
  ISubNode,
} from "@/types/general";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeTypes,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppletHeader from "../AppletHeader";
import FlowActionNode from "../FlowNode/ActionNode";
import FlowControlNode from "../FlowNode/ControlNode";
import FlowThingNode from "../FlowNode/ThingNode";
import FlowSidebar from "../FlowSidebar";
import Loading from "../UI/Loading";
import NodeFormModal from "./NodeFormModal";
import "./index.css";
const nodeTypes: NodeTypes = {
  Thing: FlowThingNode,
  FlowControl: FlowControlNode,
  Action: FlowActionNode,
};

interface FlowContentProps {
  nodes: INodeConfig[];
  connections: IChainConnection[];
  appletName: string;
  appletId: string;
}

export default function FlowContent({
  nodes: reduxNodes,
  connections,
  appletName,
  appletId,
}: FlowContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { editNode } = useSelector((state: RootState) => state.appletSlice);
  const [editMode, setEditMode] = useState<boolean>(false);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    reduxNodes.map((nd) => {
      return {
        id: nd.nodeIndex.toString(),
        type: nd.groupName,
        position: { x: nd.nodeX, y: nd.nodeY },
        data: {
          config: nd.config,
          title: nd.title,
          name: nd.name,
        },
        measured: {},
      };
    })
  );

  const mapNodes = (reduxNodes: any) => {
    return reduxNodes.map((nd: any) => ({
      id: nd.nodeIndex.toString(),
      type: nd.groupName,
      position: { x: nd.nodeX, y: nd.nodeY },
      data: {
        config: nd.config,
        title: nd.title,
        name: nd.name,
      },
    }));
  };
  console.log("editnode", mapNodes);
  console.log("nodess", nodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    connections.map((connect) => ({
      source: connect.sourceIndex.toString(),
      target: connect.destinationIndex.toString(),
      id: `${connect.sourceIndex.toString()}-${connect.destinationIndex.toString()}`,
    }))
  );
  const [nodeGroupes, setNodeGroupes] = useState<INode[]>([]);
  const [exampleGroupe, setExampleGroupe] = useState<INode[]>([]);
  const [nodesLoading, setNodesLoading] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<ISubNode | null>(null);
  const [nodeModalOpen, setNodeModalOpen] = useState<INodeConfig | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialNodes, setInitialNodes] = useState<any[]>([]);
  const [initialEdges, setInitialEdges] = useState<any[]>([]);
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
    const getData = async () => {
      setNodesLoading(true);
      const res = await getExampleGroups();
      setExampleGroupe(res.list || []);
      setNodesLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    // console.log("useeffect", reduxNodes);
    // setNodes((nds) =>
    //   reduxNodes.map((nd) => {
    //     return {
    //       id: nd.nodeIndex.toString(),
    //       type: nd.groupName,
    //       position: { x: nd.nodeX, y: nd.nodeY },
    //       data: {
    //         config: nd.config,
    //         title: nd.title,
    //         name: nd.name,
    //       },
    //     };
    //   })
    // );
    setNodes(mapNodes(reduxNodes));
  }, [reduxNodes]);

  useEffect(() => {
    setEdges((edg) =>
      connections.map((cn) => {
        return {
          source: cn.sourceIndex.toString(),
          target: cn.destinationIndex.toString(),
          id: `${cn.sourceIndex.toString()}-${cn.destinationIndex.toString()}`,
        };
      })
    );
  }, [connections, setEdges]);

  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    setInitialNodes(JSON.parse(JSON.stringify(nodes))); // Deep clone to avoid reference issues
    setInitialEdges(JSON.parse(JSON.stringify(edges)));
  }, []);

  // Function to compare current state with the initial state
  interface Node {
    id: string;
    type: string;
    position: object;
    data: object;
    measured?: object; // Optional measured property
  }
  const removeMeasured = (nodes: Node[]): Node[] => {
    return nodes.map(({ measured, ...rest }) => rest);
  };
  const compareChanges = useCallback(() => {
    const nodesChanged =
      JSON.stringify(initialNodes.map(({ measured, ...rest }) => rest)) !==
      JSON.stringify(nodes.map(({ measured, ...rest }) => rest));
    const edgesChanged = JSON.stringify(initialEdges) !== JSON.stringify(edges);
    console.log("compare", initialNodes, nodes);
    setHasChanges(nodesChanged || edgesChanged);
  }, [initialNodes, initialEdges, nodes, edges]);

  useEffect(() => {
    compareChanges();
  }, [nodes, edges, compareChanges]);

  const onConnect: OnConnect = useCallback(
    (params) => {
      dispatch(
        addConnection({
          connection: {
            sourceIndex: Number(params.source),
            destinationIndex: Number(params.target),
          },
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  type FlowNode = (typeof nodes)[number];
  const reorderNodes = (_e: unknown, node: FlowNode) => {
    setNodes((prev) =>
      prev.filter((target) => target.id != node.id).concat([node])
    );
  };

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => string };
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();
      const groupName = event.dataTransfer.getData("application/reactflow");
      const nodeName = event.dataTransfer.getData("nodeName");

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      if (selectedNode) {
        console.log("hereeee", selectedNode);
        const newNodeConfig: INodeConfig = {
          name: selectedNode.name,
          title: selectedNode.title,
          description: selectedNode.description,
          nodeIndex: reduxNodes.length
            ? reduxNodes[reduxNodes.length - 1].nodeIndex + 1
            : 0,
          nodeX: position.x,
          nodeY: position.y,
          groupName: groupName,
        };
        setNodeModalOpen(newNodeConfig);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenToFlowPosition, selectedNode]
  );

  return (
    <>
      {saveLoading ? <Loading /> : null}
      {editMode && (
        <FlowSidebar
          appletId={appletId}
          nodeGroupes={nodeGroupes}
          nodesLoading={nodesLoading}
          setSelectedNode={(node: ISubNode) => {
            setSelectedNode(node);
          }}
        />
      )}
      <div className="flex flex-grow flex-col h-auto">
        <AppletHeader
          saveDisabled={!hasChanges}
          appletName={appletName}
          editMode={editMode}
          toggleEditMode={(a: boolean) => {
            setEditMode(a);
          }}
          onCancel={() => {
            dispatch(fetchApplet(appletId));
            setEditMode(false);
          }}
          onSave={async () => {
            setSaveLoading(true);
            const res = await storeNodesConfig({
              appletId: appletId,
              nodesConfig: nodes.map((nd) => {
                return {
                  config: nd.data.config || {},
                  nodeName: nd.data.name,
                  nodeIndex: Number(nd.id),
                  centerX: nd.position.x,
                  centerY: nd.position.y,
                };
              }),
              connections: connections,
            });
            setSaveLoading(false);
            if (res.statusCode > 199 && res.statusCode < 300) {
              dispatch(
                createAlert({ message: "Flow saved.", type: "success" })
              );
            } else {
              dispatch(
                createAlert({ message: "Flow save failed", type: "error" })
              );
            }
          }}
        />
        <div className="flex-grow h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            onNodeContextMenu={reorderNodes}
            // edgesUpdatable={!editMode}
            edgesFocusable={editMode}
            nodesDraggable={editMode}
            nodesConnectable={editMode}
            nodesFocusable={editMode}
            elementsSelectable={editMode}
            className="![&>div]:z-2"
          >
            <Background
              className="z-1 ![&>div]:z-2 "
              color="#ccc"
              variant={BackgroundVariant.Dots}
            />
            <Controls />
            <MiniMap nodeStrokeWidth={2} />
          </ReactFlow>
        </div>
      </div>
      <NodeFormModal
        open={!!nodeModalOpen || !!editNode}
        onClose={() => {
          setNodeModalOpen(null);
          setSelectedNode(null);
          dispatch(removeEditNode());
        }}
        edit={editNode?.data}
        node={nodeModalOpen}
        appletId={appletId}
        fields={
          editNode?.fields ? editNode.fields || [] : selectedNode?.fields || []
        }
        title={nodeModalOpen?.title || ""}
      />
    </>
  );
}
