import { DynamicFormatPipe } from './dynamic-format-pipe';

describe('DynamicFormatPipe', () => {
    function createPipe(): DynamicFormatPipe {
        const sanitizer: any = {
            bypassSecurityTrustHtml: (value: string) => value
        };
        return new DynamicFormatPipe(sanitizer, {} as any);
    }

    it('renders a green icon for zero and positive values', () => {
        const pipe = createPipe();
        const result = pipe.integerTraffic(0.4, { trafficFn: (value: number) => value < 0 ? 'red' : 'green' }) as string;

        expect(result).toContain('stg-green-icon');
        expect(result).toContain('0');
    });

    it('renders a red icon for negative values', () => {
        const pipe = createPipe();
        const result = pipe.integerTraffic(-1675.4, { trafficFn: (value: number) => value < 0 ? 'red' : 'green' }) as string;

        expect(result).toContain('stg-red-icon');
        expect(result).toContain('1,675');
    });

    it('rounds decimal values only at presentation', () => {
        const pipe = createPipe();

        expect(pipe.integer(3143.4, null)).toBe('3,143');
        expect(pipe.integer(4881.6, null)).toBe('4,882');
    });

    it('supports arrow indicators without changing the default dot indicator', () => {
        const pipe = createPipe();
        const result = pipe.integerTraffic(-675, {
            indicator: 'arrow',
            colorValue: true,
            trafficFn: () => 'red'
        }) as string;

        expect(result).toContain('▼');
        expect(result).toContain('675');
        expect(result).toContain('stg-red-text');
        expect(result).not.toContain('lens');
    });

    it('supports arrow indicators for percentages', () => {
        const pipe = createPipe();
        const result = pipe.percent(-0.2812, {
            indicator: 'arrow',
            colorValue: true,
            trafficFn: () => 'green'
        }) as string;

        expect(result).toContain('▼');
        expect(result).toContain('28.12%');
    });

    it('renders escaped text in chip format', () => {
        const pipe = createPipe();
        const result = pipe.chip('<img src=x onerror=alert(1)>Muy Alto', {
            format: 'text',
            contStyleFn: () => 'background:#dc2626;',
            textStyleFn: () => 'color:#ffffff;'
        }, {}, 'risk') as string;

        expect(result).toContain('&lt;img src=x onerror=alert(1)&gt;Muy Alto');
        expect(result).not.toContain('<img');
    });

    it('keeps numeric chip formatting unchanged', () => {
        const pipe = createPipe();
        const result = pipe.chip(12.5, {
            format: 'decimal',
            contStyleFn: () => '',
            textStyleFn: () => ''
        }, {}, 'value') as string;

        expect(result).toContain('12.5');
    });
});
