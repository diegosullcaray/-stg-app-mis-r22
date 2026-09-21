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
  obs_mobile: string;
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

const mobileRiskFormat = {
  type: 'chip',
  params: {
    format: 'text',
    contStyleFn: (value: RiskLevel) => `display:inline-block;width:12px;height:12px;border-radius:50%;background:${riskColors[value] || '#94a3b8'};margin:auto;`,
    textStyleFn: () => 'font-size:0;color:transparent;'
  }
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

const mobileObsFormat = {
  type: 'chip',
  params: {
    format: 'text',
    contStyleFn: (value: string) =>
      value !== '-'
        ? 'display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#fef2f2;margin:auto;'
        : 'display:inline;',
    textStyleFn: (value: string) =>
      value !== '-'
        ? 'color:#dc2626;font-size:14px;'
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

const styR = { 'text-align': 'right' ,  'width': '100px', 'min-width': '100px', 'max-width': '100px' };
const styC = { 'text-align': 'center', 'width': '90px', 'min-width': '90px', 'max-width': '90px'  };

export const fenTableHeaders = [
  { label: 'UBIGEO', key: 'cod_ubi', style: {  ...styR }, cellStyle: { 'font-weight': '700', 'color': '#0f172a', ...styR } },
  { label: 'Distrito', key: 'des_dist', style: {...styR }, cellStyle: {  'color': '#2b6cb0', ...styR } },
  { label: 'Provincia', key: 'des_prov', style: { ...styR }, cellStyle: {  ...styR } },
  { label: 'Departamento', key: 'des_dep', style: {...styR }, cellStyle: { ...styR } },
  { label: 'Huayco', key: 'exp_mas', format: riskFormat, style: styC, cellStyle: styC },
  { label: 'Inundación', key: 'exp_inu', format: riskFormat, style: styC, cellStyle: styC },
  { label: 'Sequía', key: 'exp_seq', format: riskFormat, style: styC, cellStyle: styC },
  { label: 'Predominante', key: 'exp_pre', format: riskFormat, style: styC, cellStyle: styC },
  { label: 'Observación', key: 'obs', format: obsFormat, style: { 'min-width': '220px',  'text-align': 'right' }, cellStyle: { 'min-width': '220px', 'white-space': 'normal', 'line-height': '1.35', 'text-align': 'right' } }
];

const styRisk = { 'min-width': '28px', 'width': '30px', 'max-width': '30px', 'text-align': 'center' };
const styAlert = { 'min-width': '36px', 'width': '36px', 'max-width': '36px', 'text-align': 'center' };
const styDist = { 'min-width': '50px', 'width': '65px', 'max-width': '65px', 'text-align': 'right' };
const styUbi = { 'min-width': '50px', 'width': '50px', 'max-width': '50px', 'text-align': 'right' };
const styProv = { 'min-width': '65px', 'width': '65px', 'max-width': '65px', 'text-align': 'right' };

export const fenTableHeadersMobile = [
  { label: 'Distrito', key: 'des_dist', style: styDist, cellStyle: { ...styDist, 'color': '#2b6cb0' } },
  { label: 'Huay.', key: 'exp_mas', format: mobileRiskFormat, style: styRisk, cellStyle: styRisk },
  { label: 'Inun.', key: 'exp_inu', format: mobileRiskFormat, style: styRisk, cellStyle: styRisk },
  { label: 'Sequ.', key: 'exp_seq', format: mobileRiskFormat, style: styRisk, cellStyle: styRisk },
  { label: 'Pred.', key: 'exp_pre', format: mobileRiskFormat, style: styRisk, cellStyle: styRisk },
  { label: 'Alerta', key: 'obs_mobile', format: mobileObsFormat, style: styAlert, cellStyle: styAlert },
  { label: 'UBIGEO', key: 'cod_ubi', style: styUbi, cellStyle: { ...styUbi, 'font-weight': '700', 'color': '#0f172a' } },
  { label: 'Provincia', key: 'des_prov', style: styProv, cellStyle: styProv },
  { label: 'Dpto.', key: 'des_dep', style: styProv, cellStyle: styProv }
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
  const isHigh = isHighRisk(row.exp_pre);
  return {
    ...row,
    obs: isHigh ? FEN_HIGH_RISK_MESSAGE : '-',
    obs_mobile: isHigh ? '⚠️' : '-'
  };
}
