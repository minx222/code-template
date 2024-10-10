import { I18n } from '@packges/common';

import { enUS } from './en-US';
import { zhCH } from './zh-CH';

const resources = {
	'zh-CH': {
		translation: zhCH,
	},
	'en-US': {
		translation: enUS,
	},
};

I18n.install(resources);

export const intl = new I18n<typeof zhCH, keyof typeof resources>();

export const namespaceT: typeof intl.namespaceT = (n) => {
	return intl.namespaceT(n);
}
