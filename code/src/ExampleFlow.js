import { useState } from 'react';
import ReactFlow, {Position} from 'react-flow-renderer';

const width = 400
const height = 400

const initialNodes = [
  {
    id: 'group1',
    data: { label: 'Crafting (Time)'},
    position: {x: 0, y: 0},
    className: 'light',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: width, height: height}
  },
  {
    id: '1',
    type: 'output',
    data: { label: 'Final Item' },
    position: { x: width - 175, y: height - 220},
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    parentNode: 'group1'
  },
  {
    id: '2',
    type: 'input',
    data: { label: <div>Item 1</div> },
    position: { x: width - 375, y: height - 270 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    parentNode: 'group1'
  },
  {
    id: '3',
    type: 'input',
    data: { label: 'Item 2' },
    position: { x: width - 375, y: height - 170 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    parentNode: 'group1'
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
