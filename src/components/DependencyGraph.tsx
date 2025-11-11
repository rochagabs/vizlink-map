import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { DependencyNode as DependencyNodeType } from '@/types/dependency';
import { Database, Server, Cloud, Package } from 'lucide-react';

interface DependencyGraphProps {
  nodes: DependencyNodeType[];
  connections: { source: string; target: string; type: string }[];
  onNodeClick: (node: DependencyNodeType) => void;
}

const getNodeIcon = (type: string) => {
  switch (type) {
    case 'database':
      return Database;
    case 'application':
      return Server;
    case 'api':
      return Cloud;
    case 'library':
      return Package;
    default:
      return Package;
  }
};

const getNodeColor = (type: string, status: string) => {
  if (status === 'error') return 'hsl(var(--destructive))';
  if (status === 'warning') return 'hsl(40 100% 60%)';
  
  switch (type) {
    case 'database':
      return 'hsl(var(--tech-purple))';
    case 'application':
      return 'hsl(var(--tech-cyan))';
    case 'api':
      return 'hsl(var(--tech-blue))';
    case 'library':
      return 'hsl(var(--tech-green))';
    default:
      return 'hsl(var(--primary))';
  }
};

const CustomNode = ({ data }: { data: any }) => {
  const Icon = getNodeIcon(data.type);
  const color = getNodeColor(data.type, data.status);
  
  return (
    <div 
      className="px-4 py-3 rounded-lg border-2 bg-card min-w-[180px] transition-all hover:scale-105"
      style={{ 
        borderColor: color,
        boxShadow: `0 0 20px ${color}40`
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" style={{ color }} />
        <div className="font-semibold text-sm text-foreground">{data.label}</div>
      </div>
      {data.version && (
        <div className="text-xs text-muted-foreground">v{data.version}</div>
      )}
      <div className="text-xs text-muted-foreground capitalize mt-1">{data.type}</div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const DependencyGraph = ({ nodes: dependencyNodes, connections, onNodeClick }: DependencyGraphProps) => {
  const initialNodes: Node[] = dependencyNodes.map((node, index) => ({
    id: node.id,
    type: 'custom',
    data: { 
      label: node.name,
      type: node.type,
      version: node.version,
      status: node.status,
      fullNode: node
    },
    position: { 
      x: (index % 3) * 300 + 50, 
      y: Math.floor(index / 3) * 200 + 50 
    },
  }));

  const initialEdges: Edge[] = connections.map((conn, index) => ({
    id: `${conn.source}-${conn.target}-${index}`,
    source: conn.source,
    target: conn.target,
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'hsl(var(--primary))',
      strokeWidth: 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'hsl(var(--primary))',
    },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClickHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeClick(node.data.fullNode);
    },
    [onNodeClick]
  );

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [dependencyNodes, connections]);

  return (
    <div className="w-full h-full bg-background/50 rounded-lg border border-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClickHandler}
        nodeTypes={nodeTypes}
        fitView
        className="bg-background/30"
      >
        <Background color="hsl(var(--primary))" gap={16} />
        <Controls className="bg-card border-border" />
        <MiniMap 
          className="bg-card border-border"
          nodeColor={(node) => getNodeColor(node.data.type, node.data.status)}
        />
      </ReactFlow>
    </div>
  );
};
