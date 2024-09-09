import { ReactNode } from 'react';

export interface Category {
    _id: string;
    category_name: string;
    route: string;
    category_slug:string
    is_hidded: boolean;
    updatedAt: string;
}

export interface MenuItem {
    icon: ReactNode;
    label: string;
    route: string;
    children?: SubMenuItem[];
}

export interface SubMenuItem {
    menuitem: string;
    menuroute: string;
}
