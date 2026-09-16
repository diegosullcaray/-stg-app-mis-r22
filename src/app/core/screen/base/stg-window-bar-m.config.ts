export interface StgWindowBarMConfig {
    header?: { [property: string]: string | number };
    title?: { [property: string]: string | number };
    subtitle?: { [property: string]: string | number };
    chip?: { [property: string]: string | number };
    select?: {
        container?: { [property: string]: string | number };
        trigger?: { [property: string]: string | number };
        dropdown?: { [property: string]: string | number };
        option?: { [property: string]: string | number };
        selectedOption?: { [property: string]: string | number };
    };
    icons?: {
        trigger?: boolean;
        options?: boolean;
    };
    responsive?: 'none' | 'stack-sm' | 'stack-md';
}

export const stgLightWindowBarMConfig: StgWindowBarMConfig = {
    header: {
        'background': 'linear-gradient(135deg, #07395f, #084f86)',
        'color': '#ffffff',
        'padding': '16px 24px'
    },
    title: {
        'font-size': '22px',
        'color': '#ffffff'
    },
    subtitle: {
        'font-size': '12px',
        'color': 'rgba(255, 255, 255, .72)'
    },
    chip: {
        'color': '#a96f00',
        'background': '#fff3cc',
        'padding': '5px 10px',
        'border-radius': '999px',
        'font-size': '10px',
        'font-weight': '800'
    },
    select: {
        container: { 'min-width': '190px' },
        trigger: {
            'background': 'rgba(255, 255, 255, .10)',
            'border': '1px solid rgba(255, 255, 255, .15)',
            'color': '#ffffff',
            'border-radius': '10px'
        },
        dropdown: {
            'background': '#ffffff',
            'border': '1px solid #e3eaf0',
            'color': '#172b3a'
        },
        option: { 'color': '#40566a' },
        selectedOption: {
            'background': '#eaf2f8',
            'color': '#084f86'
        }
    },
    icons: {
        trigger: false,
        options: false
    },
    responsive: 'stack-md'
};
