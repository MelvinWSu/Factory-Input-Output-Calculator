import { useState } from 'react';
import ReactFlow, {Position} from 'react-flow-renderer';

const origin_x = 0
const origin_y = 0

const initialNodes = [
  {
    id: '1',
    type: 'output',
    data: { label: 'Final Item' },
    position: { x: origin_x + 200, y: origin_y},
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '2',
    type: 'input',
    data: { label: <div>Item 1</div> },
    position: { x: origin_x - 200, y: origin_y - 50 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'input',
    data: { label: 'Item 2' },
    position: { x: origin_x - 200, y: origin_y + 50 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '4',
    data: { label: 'Crafting (Time)' },
    position: { x: origin_x, y: origin_y },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges = [
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', },
  { id: 'e3-4', source: '3', target: '4', animated: true, type: 'smoothstep', },
  { id: 'e4-1', source: '4', target: '1', type: 'smoothstep',},
];

function Flow1() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return <ReactFlow style={{width:500, height:500}} nodes={nodes} edges={edges} fitView />;
}

export default Flow1;
