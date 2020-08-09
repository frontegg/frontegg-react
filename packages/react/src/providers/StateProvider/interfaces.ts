import { IReportsPluginConfig } from '@plugins/reports';

export type UILibrary = 'semantic'

export type IFronteggPlugins = {
  uiLibrary?: UILibrary
  reportsConfig?: IReportsPluginConfig
}

export type IPluginConfigs = {
  config: Required<IFronteggPlugins>
}
