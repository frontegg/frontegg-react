import { AppHolder, FronteggApp } from '@frontegg/js';
import React, { memo } from 'react';
import { CMCComponentProps } from '@frontegg/types';
import { FC } from 'react';


export type RenderableFronteggComponent = keyof Pick<FronteggApp, 'renderChangePasswordForm' | 'renderInviteUserDialog' | 'renderProfilePage' | 'renderUsersTable'>;
export type FronteggCMCComponentProps<K extends CMCComponentProps> = Pick<K, 'themeOptions' | 'props' | 'localizations' | 'hostStyle'>

export const CMCComponent: FC<FronteggCMCComponentProps<CMCComponentProps> & { renderComponent: RenderableFronteggComponent }> = memo(
    ({ themeOptions, props, localizations, hostStyle, renderComponent }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        React.useLayoutEffect(() => {
            const app = AppHolder.getInstance('default');
            if (!ref.current) {
                return;
            }
            let rootRendered: { unmount: () => void } = {
                unmount: () => { },
            };

            console.log({ app });
            if (!app[renderComponent]) {
                throw new Error(`Component ${renderComponent} is not supported`);
            }

            app[renderComponent](ref.current, props, {
                themeOptions,
                localizations,
            })
                .then((root) => (rootRendered = root));
        }, []);

        return <div style={{ ...hostStyle }} ref={ref} />;
    },
    () => true
);





