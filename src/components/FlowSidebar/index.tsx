"use client";

import { INode, ISubNode } from "@/types/general";
import { Accordion } from "flowbite-react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useState } from "react";
import Loading from "../UI/Loading";

interface FlowSidebarProps {
  appletId: string;
  nodeGroupes: INode[];
  nodesLoading: boolean;
  setSelectedNode: (node: ISubNode) => void;
}

export default function FlowSidebar({
  appletId,
  nodeGroupes,
  nodesLoading,
  setSelectedNode,
}: FlowSidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onDragStart = (
    event: {
      dataTransfer: {
        setData: (arg0: string, arg1: any) => void;
        effectAllowed: string;
      };
    },
    nodeType: string,
    nodeName: string,
    node: ISubNode
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("nodeName", nodeName);
    setSelectedNode(node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={` relative transition-all ${
        isOpen ? "visiblel" : " invisible w-0"
      }`}
    >
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="absolute md:hidden bg-neutral-2 py-3 right-[-1.5rem] top-10 rounded-r-xl z-20 visible"
      >
        {isOpen ? <ArrowLeft2 /> : <ArrowRight2 />}
      </button>
      <div
        className={`flex flex-col w-[280px] h-full z-20 bg-white dark:bg-primary-Shade-1
        `}
      >
        {nodesLoading ? (
          <Loading />
        ) : (
          <Accordion className=" h-full">
            {nodeGroupes?.map((gp) => (
              <Accordion.Panel key={gp.groupName}>
                <Accordion.Title>{gp.groupTitle}</Accordion.Title>
                <Accordion.Content>
                  {gp.nodes.map((node, i) => (
                    <div
                      key={node.name}
                      className={`${
                        i !== 0 && "mt-4"
                      } border border-neutral-6 px-4 py-2 rounded-lg flex items-center dark:text-neutral-4`}
                      onDragStart={(event) =>
                        onDragStart(event, gp.groupName, node.name, node)
                      }
                      draggable
                    >
                      {node.title}
                    </div>
                  ))}
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
