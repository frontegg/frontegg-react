export declare type IGetMetadata = {
    entityName: 'saml';
};
export declare function getMetadata(body: IGetMetadata): Promise<any>;
export declare const getSamlMetadata: () => Promise<any>;
