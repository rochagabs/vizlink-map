import { DependencyNode, Connection } from '@/types/dependency';

export const mockNodes: DependencyNode[] = [
  {
    id: 'app1',
    name: 'Frontend App',
    type: 'application',
    version: '2.1.0',
    status: 'active',
    description: 'React-based web application',
    dependencies: ['api1', 'lib1', 'lib2']
  },
  {
    id: 'app2',
    name: 'Backend API',
    type: 'application',
    version: '1.5.3',
    status: 'active',
    description: 'Node.js REST API',
    dependencies: ['db1', 'api2', 'lib3']
  },
  {
    id: 'db1',
    name: 'PostgreSQL',
    type: 'database',
    version: '14.2',
    status: 'active',
    description: 'Primary database'
  },
  {
    id: 'api1',
    name: 'GraphQL API',
    type: 'api',
    version: '1.0.0',
    status: 'active',
    description: 'Internal GraphQL service',
    dependencies: ['db1']
  },
  {
    id: 'api2',
    name: 'Payment Gateway',
    type: 'api',
    version: '3.2.1',
    status: 'warning',
    description: 'External payment API'
  },
  {
    id: 'lib1',
    name: 'React',
    type: 'library',
    version: '18.3.1',
    status: 'active'
  },
  {
    id: 'lib2',
    name: 'TailwindCSS',
    type: 'library',
    version: '3.4.1',
    status: 'active'
  },
  {
    id: 'lib3',
    name: 'Express',
    type: 'library',
    version: '4.18.2',
    status: 'active'
  }
];

export const mockConnections: Connection[] = [
  { source: 'app1', target: 'api1', type: 'connects-to' },
  { source: 'app1', target: 'lib1', type: 'depends-on' },
  { source: 'app1', target: 'lib2', type: 'depends-on' },
  { source: 'app2', target: 'db1', type: 'connects-to' },
  { source: 'app2', target: 'api2', type: 'connects-to' },
  { source: 'app2', target: 'lib3', type: 'depends-on' },
  { source: 'api1', target: 'db1', type: 'connects-to' }
];
