import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Server, Cloud, Package, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { DependencyNode } from '@/types/dependency';

interface DependencyCardProps {
  node: DependencyNode;
  onClick: () => void;
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return CheckCircle;
    case 'warning':
      return AlertTriangle;
    case 'error':
      return AlertCircle;
    default:
      return CheckCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-accent';
    case 'warning':
      return 'text-yellow-500';
    case 'error':
      return 'text-destructive';
    default:
      return 'text-accent';
  }
};

export const DependencyCard = ({ node, onClick }: DependencyCardProps) => {
  const Icon = getIcon(node.type);
  const StatusIcon = getStatusIcon(node.status);
  const statusColor = getStatusColor(node.status);

  return (
    <Card 
      className="p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg bg-card/80 backdrop-blur border-border"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{node.name}</h3>
            {node.version && (
              <p className="text-xs text-muted-foreground">v{node.version}</p>
            )}
          </div>
        </div>
        <StatusIcon className={`w-5 h-5 ${statusColor}`} />
      </div>
      
      {node.description && (
        <p className="text-sm text-muted-foreground mb-3">{node.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="capitalize">
          {node.type}
        </Badge>
        {node.dependencies && node.dependencies.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {node.dependencies.length} dependências
          </span>
        )}
      </div>
    </Card>
  );
};
