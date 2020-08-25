import { FC } from 'react';
import { InputProps } from 'semantic-ui-react';
export interface IFieldInput extends InputProps {
    name: string;
    enterAnimation?: boolean;
    visible?: boolean;
    forwardRef?: any;
    wrapperClassName?: string;
}
export declare const FieldInput: FC<IFieldInput>;
