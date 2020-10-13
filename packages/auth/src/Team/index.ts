import { TeamPage } from './TeamPage';
import { TeamLayout } from './TeamLayout';
import { TeamHeader } from './TeamHeader';
import { TeamTableHeader } from './TeamTableHeader';
import { TeamTable } from './TeamTable';
import { TeamAddUserDialog } from './TeamAddUserDialog';
import { TeamDeleteUserDialog } from './TeamDeleteUserDialog';

export const Team = {
  Page: TeamPage,
  Layout: TeamLayout,
  Header: TeamHeader,
  TableHeader: TeamTableHeader,
  Table: TeamTable,
  AddUserDialog: TeamAddUserDialog,
  DeleteUserDialog: TeamDeleteUserDialog,
};

//  usage example:
//
//  /* inside route */
//  <Route path='/teams' component={Team.Page} />
//
//  /* custom route */
//  render() {
//    return <Team.Layout />
//  }
