export type DependencyType = 'application' | 'database' | 'api' | 'library';

export interface DependencyNode {
  id: string;
  name: string;
  type: DependencyType;
  version?: string;
  status: 'active' | 'warning' | 'error';
  description?: string;
  dependencies?: string[];
}

export interface Connection {
  source: string;
  target: string;
  type: 'uses' | 'connects-to' | 'depends-on';
}
