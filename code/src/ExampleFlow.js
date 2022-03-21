import { useState } from 'react';
import ReactFlow, {Position} from 'react-flow-renderer';

const origin_x = 0
const origin_y = 0

const initialNodes = [
  {
    id: '1',
    type: 'output',
    data: { label: 'Final Item' },
    position: { x: origin_x, y: origin_y },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },

  {
    id: '2',
    type: 'input',
    data: { label: <div>Item 1</div> },
    position: { x: origin_x - 200, y: origin_y + 50 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'input',
    data: { label: 'Item 2' },
    position: { x: origin_x - 200, y: origin_y - 50 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges = [
  { id: 'e1-2', source: '2', target: '1', type: 'smoothstep', },
  { id: 'e1-3', source: '3', target: '1', animated: true, type: 'smoothstep', },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return <ReactFlow style={{width:500, height:500}} nodes={nodes} edges={edges} fitView />;
}

export default Flow;
