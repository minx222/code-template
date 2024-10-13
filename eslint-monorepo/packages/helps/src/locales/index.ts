import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import type { GetFieldType } from 'lodash';

import type { LocalType } from '@packges/types';

export class I18n<T, L> {
	static install(resources: Resource) {
		i18n.use(initReactI18next).init({
			resources,
			lng: 'zh-CH',
			fallbackLng: 'zh-CH',
			interpolation: {
				escapeValue: false,
			},
		});
	}

	get(key: keyof LocalType<T>) {
		return i18n.t(key as unknown as string);
	}

	switchLanguage(lang: L) {
		i18n.changeLanguage(lang as string);
	}

	namespaceT<N extends keyof LocalType<T>>(base: N) {
		return {
			get<
				K extends keyof LocalType<
					Exclude<GetFieldType<LocalType<T>, N>, undefined>
				>,
			>(key: K): string {
				return i18n.t(`${base}.${key}`);
			},
		};
	}
}
