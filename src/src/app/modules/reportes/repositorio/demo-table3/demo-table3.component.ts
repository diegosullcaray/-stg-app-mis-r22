import { Component, OnInit } from '@angular/core';
import { StgTable3RandomOptions, StgTable3Service } from 'app/core/screen/components/stg-table3/stg-table3.service';
import { IStgTable3Header, StgTable3Options } from 'app/core/screen/components/stg-table3/stg-table3.util';

@Component({
    selector: 'demo-table3',
    templateUrl: './demo-table3.component.html',
    styleUrls: ['./demo-table3.component.scss']
})
export class DemoTable3Component implements OnInit {

    data: any[] = [];
    columns: IStgTable3Header[] = [];

    tableOptions: StgTable3Options = new StgTable3Options();

    constructor(private table3Service: StgTable3Service) { }

    ngOnInit(): void {
        this.tableOptions.grid = { type: 'full', style: { border: '1px solid green' } };
        this.tableOptions.header.sticky = true;
        this.tableOptions.header.cellStyle = {
            ...(this.tableOptions.header.cellStyle),
            ...({ color: 'white',background: 'blue'})
          };

        // Definimos las keys usadas por los registros
        const keys = [
            'id', 'nombre', 'correo', 'telefono',
            'ciudad', 'pais', 'estado', 'rol',
            'fechaCreacion', 'updatedAt', 'observaciones'
        ];

        // Opciones de generación para cada key
        const options: StgTable3RandomOptions[] = [
            { key: 'id', type: 'integer', min: 1, max: 9999 },
            { key: 'nombre', type: 'string', name: true },
            { key: 'correo', type: 'string', email: true },
            { key: 'telefono', type: 'string', doc_num: true },
            { key: 'ciudad', type: 'string' },
            { key: 'pais', type: 'string' },
            { key: 'estado', type: 'string' },
            { key: 'rol', type: 'string' },
            { key: 'fechaCreacion', type: 'date', hour: true },
            { key: 'updatedAt', type: 'date', hour: true },
            { key: 'observaciones', type: 'string' }
        ];

        // Generamos 100 registros de datos de prueba
        this.data = this.table3Service.buildDemoData(100, keys, options);

        // 4. Definir cabeceras multinivel
        this.columns = [
            {
                label: 'Mega Superior',
                subs: [
                    {
                        label: 'Grupo Superior',
                        subs: [
                            {
                                label: 'Bloque A',
                                subs: [
                                    { label: 'ID', key: 'id' },
                                    { label: 'Nombre', key: 'nombre' },
                                    { label: 'Correo', key: 'correo' },
                                    { label: 'Teléfono', key: 'telefono' }
                                ]
                            },
                            {
                                label: 'Bloque B',
                                subs: [
                                    { label: 'Ciudad', key: 'ciudad' },
                                    { label: 'País', key: 'pais' },
                                    { label: 'Estado', key: 'estado' },
                                    { label: 'Rol', key: 'rol' }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Fechas',
                        subs: [
                            { label: 'Fecha Creación', key: 'fechaCreacion' },
                            { label: 'Última Actualización', key: 'updatedAt' }
                        ]
                    }
                ]
            },
            {
                label: 'Observaciones',
                key: 'observaciones'
            }
        ];
    }
}
