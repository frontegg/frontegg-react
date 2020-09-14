import { ProfilePage } from './ProfilePage';
import { ProfileHeader } from './ProfileHeader';
import { ProfileRouter, ProfileTabs } from './ProfileRouter';
import { ProfilePasswordSettingsPage } from './ProfilePasswordSettingsPage';
import { ProfileMfaPage } from './ProfileMfaPage';
import { ProfileInfoPage } from './ProfileInfoPage';

export const Profile = {
  Page: ProfilePage,
  Header: ProfileHeader,
  Tabs: ProfileTabs,
  Router: ProfileRouter,
  InfoPage: ProfileInfoPage,
  MfaPage: ProfileMfaPage,
  PasswordSettingsPage: ProfilePasswordSettingsPage,
};
