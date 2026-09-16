import { createStgLightTable2Config } from 'app/core/screen/base/stg-table2-presets';

export type RiskLevel = 'Muy Alto' | 'Alto' | 'Medio' | 'Bajo' | 'Muy Bajo';

export interface FenRiskRow {
  cod_ubi: string;
  des_dep: string;
  des_prov: string;
  des_dist: string;
  exp_mas: RiskLevel;
  exp_inu: RiskLevel;
  exp_seq: RiskLevel;
  exp_pre: RiskLevel;
}

/** Extiende el contrato backend con `obs`, campo derivado de KPIs en frontend. */
export interface FenDisplayRow extends FenRiskRow {
  obs: string;
}

export const FEN_REPORT_CODE = 'CON_AGRO_FEN';
export const FEN_MATRIX_DATE = '12 set. 2026';
export const FEN_HIGH_RISK_MESSAGE = 'Zona de Alto Riesgo CENEPRED: Ofrecer Seguro Agrícola / Multirriesgo.';

const riskLevels: RiskLevel[] = ['Muy Alto', 'Alto', 'Medio', 'Bajo', 'Muy Bajo'];
const riskColors: { [level in RiskLevel]: string } = {
  'Muy Alto': '#dc2626',
  'Alto': '#ea580c',
  'Medio': '#eab308',
  'Bajo': '#5fc97f',
  'Muy Bajo': '#0d9e6e'
};

function riskChipStyle(value: RiskLevel): string {
  const background = riskColors[value] || '#94a3b8';
  return `display:inline-block;min-width:66px;text-align:center;background:${background};padding:4px 12px;border-radius:999px;`;
}

function riskChipTextStyle(value: RiskLevel): string {
  const color = value === 'Medio' || value === 'Bajo' ? '#253041' : '#ffffff';
  return `color:${color};font-size:11.5px;font-weight:700;white-space:nowrap;`;
}

const riskFormat = {
  type: 'chip',
  params: { format: 'text', contStyleFn: riskChipStyle, textStyleFn: riskChipTextStyle }
};

const obsFormat = {
  type: 'chip',
  params: {
    format: 'text',
    contStyleFn: (value: string) =>
      value !== '-'
        ? 'display:inline-block;padding:3px 8px;border-radius:4px;background:#fef2f2;'
        : 'display:inline;',
    textStyleFn: (value: string) =>
      value !== '-'
        ? 'color:#dc2626;font-size:11.5px;font-weight:600;white-space:normal;line-height:1.4;'
        : 'color:#94a3b8;font-size:12px;'
  }
};

export const fenTableOptions = createStgLightTable2Config({
  style: { 'font-size': '13.5px', 'min-width': '1200px' },
  grid: { mode: 'bottom', border: '1px solid #eef1f5' },
  header: {
    style: {
      'background': '#fcfcfd',
      'color': '#64748b',
      'font-size': '11px',
      'font-weight': '600',
      'letter-spacing': '.6px',
      'text-align': 'left',
      'text-transform': 'uppercase'
    },
    cellStyle: { 'height': '40px', 'min-width': '120px', 'padding': '12px 16px' }
  },
  body: {
    loading: { enabled: false },
    hover: { enabled: true, style: { 'background': '#fafbfc' } },
    selection: { enabled: true, allowDeselect: false, style: { 'background': '#eef4ff', 'color': '#334155' } },
    cellStyle: { 'height': '48px', 'padding': '15px 16px' }
  }
});

export const fenTableHeaders = [
  { label: 'UBIGEO',       key: 'cod_ubi', style: { 'min-width': '105px' }, cellStyle: { 'min-width': '105px', 'font-weight': '700', 'color': '#0f172a' } },
  { label: 'Distrito',     key: 'des_dist', style: { 'min-width': '150px' }, cellStyle: { 'min-width': '150px', 'color': '#2b6cb0' } },
  { label: 'Provincia',    key: 'des_prov', style: { 'min-width': '150px' }, cellStyle: { 'min-width': '150px' } },
  { label: 'Departamento', key: 'des_dep',  style: { 'min-width': '170px' }, cellStyle: { 'min-width': '170px' } },
  { label: 'Mov. en masa', key: 'exp_mas', format: riskFormat, cellStyle: { 'text-align': 'center' } },
  { label: 'Inundación',   key: 'exp_inu', format: riskFormat, cellStyle: { 'text-align': 'center' } },
  { label: 'Sequía',       key: 'exp_seq', format: riskFormat, cellStyle: { 'text-align': 'center' } },
  { label: 'Predominante', key: 'exp_pre', format: riskFormat, cellStyle: { 'text-align': 'center' } },
  { label: 'Observación',  key: 'obs',     format: obsFormat,  style: { 'min-width': '220px' }, cellStyle: { 'min-width': '220px', 'white-space': 'normal', 'line-height': '1.35' } }
];

export function isFenRiskRow(value: any): value is FenRiskRow {
  return !!value
    && typeof value.cod_ubi === 'string'
    && typeof value.des_dep === 'string'
    && typeof value.des_prov === 'string'
    && typeof value.des_dist === 'string'
    && riskLevels.indexOf(value.exp_mas) !== -1
    && riskLevels.indexOf(value.exp_inu) !== -1
    && riskLevels.indexOf(value.exp_seq) !== -1
    && riskLevels.indexOf(value.exp_pre) !== -1;
}

export function isHighRisk(value: RiskLevel): boolean {
  return value === 'Alto' || value === 'Muy Alto';
}

/** Observación comercial derivada del KPI predominante. Lógica frontend. */
export function fenBuildDisplayRow(row: FenRiskRow): FenDisplayRow {
  return { ...row, obs: isHighRisk(row.exp_pre) ? FEN_HIGH_RISK_MESSAGE : '-' };
}
