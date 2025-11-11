import { useState } from 'react';
import { DependencyGraph } from '@/components/DependencyGraph';
import { DependencyCard } from '@/components/DependencyCard';
import { DependencyDetails } from '@/components/DependencyDetails';
import { mockNodes, mockConnections } from '@/data/mockDependencies';
import { DependencyNode } from '@/types/dependency';
import { Network, Search, Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredNodes = mockNodes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterType || node.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const types = ['application', 'database', 'api', 'library'];
  const stats = {
    total: mockNodes.length,
    applications: mockNodes.filter(n => n.type === 'application').length,
    databases: mockNodes.filter(n => n.type === 'database').length,
    apis: mockNodes.filter(n => n.type === 'api').length,
    libraries: mockNodes.filter(n => n.type === 'library').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mapa de Dependências</h1>
                <p className="text-sm text-muted-foreground">Visualize e analise as conexões do sistema</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">Total:</span>
              <span className="text-sm font-semibold text-foreground">{stats.total}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">Apps:</span>
              <span className="text-sm font-semibold text-primary">{stats.applications}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">Databases:</span>
              <span className="text-sm font-semibold text-tech-purple">{stats.databases}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">APIs:</span>
              <span className="text-sm font-semibold text-tech-blue">{stats.apis}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">Libs:</span>
              <span className="text-sm font-semibold text-accent">{stats.libraries}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Component List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar componentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant={filterType === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setFilterType(null)}
              >
                Todos
              </Badge>
              {types.map(type => (
                <Badge
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  className="cursor-pointer capitalize"
                  onClick={() => setFilterType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>

            <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
              {filteredNodes.map(node => (
                <DependencyCard
                  key={node.id}
                  node={node}
                  onClick={() => setSelectedNode(node)}
                />
              ))}
            </div>
          </div>

          {/* Center - Graph Visualization */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-[600px]">
              <DependencyGraph
                nodes={filteredNodes}
                connections={mockConnections.filter(conn => 
                  filteredNodes.some(n => n.id === conn.source) &&
                  filteredNodes.some(n => n.id === conn.target)
                )}
                onNodeClick={setSelectedNode}
              />
            </div>

            {/* Details Panel */}
            <div className="h-[400px]">
              <DependencyDetails node={selectedNode} allNodes={mockNodes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
