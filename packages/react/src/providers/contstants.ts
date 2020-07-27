import { IFronteggPlugins, IPluginConfigs } from './StateProvider';


export const defaultConfig = (plugins: IFronteggPlugins): IPluginConfigs => ({
  config: {
    reportsConfig: {
      rootDir: '/reports',

      ReportsListPage: {
        PageHeader: {
          subtitle: "TTTTTT"
        }
      },
      ...(plugins.reportsConfig || {}),
    },
  },
});
