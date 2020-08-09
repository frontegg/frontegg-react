import { IFronteggPlugins, IPluginConfigs } from './StateProvider';


export const defaultConfig = (plugins: IFronteggPlugins): IPluginConfigs => ({
  config: {
    uiLibrary: plugins.uiLibrary || 'semantic',
    reportsConfig: {
      rootDir: '/reports',
      ReportsListPage: {
        PageHeader: {
          title: 'TTaaa',
        },
      },
      ...(plugins.reportsConfig || {}),
    },
  },
});
