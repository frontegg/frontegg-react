import React from 'react';
/**
 * UploadBlocker with never rerender it's children if parent component rerender
 * this component used for preventing redux changes to render the vendor's whole app
 * that wrapped by FronteggProvider
 */
export declare class UpdateBlocker extends React.Component {
    shouldComponentUpdate(): boolean;
    render(): React.ReactNode;
}
