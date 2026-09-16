import {
  fenTableHeaders,
  fenTableOptions,
  isFenRiskRow,
  isHighRisk,
  riskClass
} from './consulta-fen.util';

describe('Consulta FEN table configuration', () => {
  it('maps the confirmed backend fields to local headers', () => {
    expect(fenTableHeaders.map(header => header.key)).toEqual([
      'cod_ubi',
      'des_dist',
      'des_prov',
      'des_dep',
      'exp_mas',
      'exp_inu',
      'exp_seq',
      'exp_pre'
    ]);
    expect(fenTableOptions.body.selection).toEqual(jasmine.objectContaining({
      enabled: true,
      allowDeselect: false,
      style: jasmine.objectContaining({ color: '#334155' })
    }));
  });

  it('validates rows and preserves UBIGEO as text', () => {
    expect(isFenRiskRow({
      cod_ubi: '040101',
      des_dep: 'DEPARTAMENTO',
      des_prov: 'PROVINCIA',
      des_dist: 'DISTRITO',
      exp_mas: 'Muy Bajo',
      exp_inu: 'Medio',
      exp_seq: 'Medio',
      exp_pre: 'Medio'
    })).toBeTrue();
    expect(isFenRiskRow({ cod_ubi: 40101 })).toBeFalse();
  });

  it('maps the closed risk catalog to UI behavior', () => {
    expect(isHighRisk('Muy Alto')).toBeTrue();
    expect(isHighRisk('Alto')).toBeTrue();
    expect(isHighRisk('Medio')).toBeFalse();
    expect(riskClass('Bajo')).toBe('risk--low');
    expect(riskClass()).toBe('risk--empty');
  });
});
