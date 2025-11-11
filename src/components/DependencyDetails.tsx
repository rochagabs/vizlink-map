import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Database, Server, Cloud, Package, ExternalLink } from 'lucide-react';
import { DependencyNode } from '@/types/dependency';

interface DependencyDetailsProps {
  node: DependencyNode | null;
  allNodes: DependencyNode[];
}

const getIcon = (type: string) => {
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

export const DependencyDetails = ({ node, allNodes }: DependencyDetailsProps) => {
  if (!node) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur border-border h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Selecione um componente para ver os detalhes</p>
        </div>
      </Card>
    );
  }

  const Icon = getIcon(node.type);
  const dependentNodes = node.dependencies
    ? allNodes.filter(n => node.dependencies?.includes(n.id))
    : [];

  const dependentOnThis = allNodes.filter(n => 
    n.dependencies?.includes(node.id)
  );

  return (
    <Card className="p-6 bg-card/80 backdrop-blur border-border h-full overflow-auto">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-1">{node.name}</h2>
          {node.version && (
            <p className="text-sm text-muted-foreground mb-2">Version {node.version}</p>
          )}
          <Badge variant="secondary" className="capitalize">
            {node.type}
          </Badge>
        </div>
      </div>

      {node.description && (
        <>
          <Separator className="my-4" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Descrição</h3>
            <p className="text-sm text-muted-foreground">{node.description}</p>
          </div>
        </>
      )}

      <Separator className="my-4" />
      
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Status</h3>
        <Badge 
          variant={node.status === 'active' ? 'default' : 'destructive'}
          className="capitalize"
        >
          {node.status}
        </Badge>
      </div>

      {dependentNodes.length > 0 && (
        <>
          <Separator className="my-4" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Dependências ({dependentNodes.length})
            </h3>
            <div className="space-y-2">
              {dependentNodes.map(dep => {
                const DepIcon = getIcon(dep.type);
                return (
                  <div 
                    key={dep.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <DepIcon className="w-4 h-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{dep.name}</p>
                      {dep.version && (
                        <p className="text-xs text-muted-foreground">v{dep.version}</p>
                      )}
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {dependentOnThis.length > 0 && (
        <>
          <Separator className="my-4" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Usado por ({dependentOnThis.length})
            </h3>
            <div className="space-y-2">
              {dependentOnThis.map(dep => {
                const DepIcon = getIcon(dep.type);
                return (
                  <div 
                    key={dep.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50"
                  >
                    <DepIcon className="w-4 h-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{dep.name}</p>
                      {dep.version && (
                        <p className="text-xs text-muted-foreground">v{dep.version}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
