import { wysiwygConfig } from './config';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import Wysiwyg from './components/Wysiwyg';

const name = pluginPkg.strapi.name;
export default {
  register(app) {
    wysiwygConfig.enableMenu &&
      app.addMenuLink({
        to: `/plugins/${pluginId}`,
        icon: PluginIcon,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: name,
        },
        Component: async () => {
          const component = await import(/* webpackChunkName: "[request]" */ './pages/App');
          return component;
        },
      });
    app.addFields({ type: 'wysiwyg', Component: Wysiwyg });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },
  bootstrap(app) {},
};

export { getStrapiTheme } from './utils/getStrapiTheme';
export { replaceVideoLinks } from './utils/replaceVideoLinks';
