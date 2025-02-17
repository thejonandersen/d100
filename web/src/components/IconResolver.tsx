import React, {ComponentPropsWithoutRef} from 'react';
import * as Icons from 'lucide-react';

interface IconResolverProps {
    iconName: string,
    [key: string]: any;
}

const IconResolver: React.FC<IconResolverProps> = ({ iconName, ...rest }) => {
    // @ts-ignore
    const IconComponent = Icons[iconName] as React.FC;
    const restProps: ComponentPropsWithoutRef<'input'> = rest;
    if (!IconComponent) {
        console.error(`Icon "${iconName}" not found`);
        return null; // You can return a default icon or an empty element here
    }

    return (<IconComponent {...restProps} />);
};

export default IconResolver;
