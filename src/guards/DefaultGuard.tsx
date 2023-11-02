import { Navigate, useLocation } from 'react-router-dom';

import { ParentComponentProps } from '@root/interfaces';
import { getDeployPath } from '@root/utils';

export default function DefaultGuard({ children }: ParentComponentProps) {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return <Navigate to={getDeployPath()} />;
  }

  return children;
}
