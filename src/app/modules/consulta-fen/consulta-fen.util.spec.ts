import {
  fenBuildDisplayRow,
  fenTableHeaders,
  fenTableOptions,
  FEN_HIGH_RISK_MESSAGE,
  isFenRiskRow,
  isHighRisk
} from './consulta-fen.util';

describe('Consulta FEN – util', () => {
  const base = { cod_ubi: '040101', des_dep: 'DEP', des_prov: 'PROV', des_dist: 'DIST' };

  it('headers map all backend fields plus the derived obs column', () => {
    expect(fenTableHeaders.map(h => h.key)).toEqual([
      'cod_ubi', 'des_dist', 'des_prov', 'des_dep',
      'exp_mas', 'exp_inu', 'exp_seq', 'exp_pre', 'obs'
    ]);
    expect(fenTableOptions.body.selection).toEqual(jasmine.objectContaining({
      enabled: true,
      allowDeselect: false,
      style: jasmine.objectContaining({ color: '#334155' })
    }));
  });

  it('isFenRiskRow validates the backend contract', () => {
    expect(isFenRiskRow({
      cod_ubi: '040101', des_dep: 'DEPARTAMENTO', des_prov: 'PROVINCIA', des_dist: 'DISTRITO',
      exp_mas: 'Muy Bajo', exp_inu: 'Medio', exp_seq: 'Medio', exp_pre: 'Medio'
    })).toBeTrue();
    expect(isFenRiskRow({ cod_ubi: 40101 })).toBeFalse();
  });

  it('isHighRisk flags Alto and Muy Alto only', () => {
    expect(isHighRisk('Muy Alto')).toBeTrue();
    expect(isHighRisk('Alto')).toBeTrue();
    expect(isHighRisk('Medio')).toBeFalse();
  });

  describe('fenBuildDisplayRow', () => {
    it('sets obs to the CENEPRED message when exp_pre is high risk', () => {
      expect(fenBuildDisplayRow({ ...base, exp_mas: 'Bajo', exp_inu: 'Bajo', exp_seq: 'Bajo', exp_pre: 'Alto' }).obs)
        .toBe(FEN_HIGH_RISK_MESSAGE);
      expect(fenBuildDisplayRow({ ...base, exp_mas: 'Bajo', exp_inu: 'Bajo', exp_seq: 'Bajo', exp_pre: 'Muy Alto' }).obs)
        .toBe(FEN_HIGH_RISK_MESSAGE);
    });

    it('sets obs to "-" when exp_pre is not high risk', () => {
      expect(fenBuildDisplayRow({ ...base, exp_mas: 'Alto', exp_inu: 'Alto', exp_seq: 'Bajo', exp_pre: 'Medio' }).obs).toBe('-');
      expect(fenBuildDisplayRow({ ...base, exp_mas: 'Bajo', exp_inu: 'Muy Bajo', exp_seq: 'Bajo', exp_pre: 'Bajo' }).obs).toBe('-');
    });

    it('preserves all backend fields', () => {
      const display = fenBuildDisplayRow({ ...base, exp_mas: 'Muy Alto', exp_inu: 'Bajo', exp_seq: 'Bajo', exp_pre: 'Alto' });
      expect(display.cod_ubi).toBe('040101');
      expect(display.des_dep).toBe('DEP');
      expect(typeof display.obs).toBe('string');
    });
  });
});
