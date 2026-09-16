import { StgTable2Component } from './stg-table2.component';

describe('StgTable2Component selection', () => {
  function createComponent(selection: any): StgTable2Component {
    const component = new StgTable2Component({} as any, {} as any);
    component.options = { body: { selection } };
    component.headers = [];
    component.dataSource = [];
    component.ngOnInit();
    return component;
  }

  it('keeps a row selected when deselection is disabled', () => {
    const component = createComponent({ enabled: true, allowDeselect: false });
    const row = { id: 1 };

    component.selectRow(row);
    component.selectRow(row);

    expect(component.selection.isSelected(row)).toBeTrue();
  });

  it('preserves toggle selection by default', () => {
    const component = createComponent({ enabled: true });
    const row = { id: 1 };

    component.selectRow(row);
    component.selectRow(row);

    expect(component.selection.isSelected(row)).toBeFalse();
  });
});
