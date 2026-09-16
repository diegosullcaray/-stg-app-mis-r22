import { NgModule } from '@angular/core';
import { RdaAdministracionRoutingModule } from './rda-administracion-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { TableModule } from '../../../support/components/table/table.module';
import { SelectModule } from '../../../support/components/select/select.module';
import { MatCardModule } from '@angular/material/card';

import { ReportCraV1P1Module } from '../../../support/components/template/cra/report-cra-v1p1/report-cra-v1p1.module';
import { ReportCraV1P3Module } from '../../../support/components/template/cra/report-cra-v1p3/report-cra-v1p3.module';
import { ReportCraV4Module } from '../../../support/components/template/cra/report-cra-v4/report-cra-v4.module';
import { ReportCraV5Module } from '../../../support/components/template/cra/report-cra-v5/report-cra-v5.module';
import { ReportCraV6Module } from '../../../support/components/template/cra/report-cra-v6/report-cra-v6.module'; 

import { ReportCraV7Module } from '../../../support/components/template/cra/report-cra-v7/report-cra-v7.module';
import { ReportCraV10Module } from '../../../support/components/template/cra/report-cra-V10/report-cra-v10.module';
import { CraAutTasaComponent } from './cra-aut-tasa/cra-aut-tasa.component';
import { RevaTempComponent } from './reva-temp/reva-temp.component';
import { CraTopEfecComponent } from './cra-top-efec/cra-top-efec.component';
import { CraPanSupComponent } from './cra-pan-sup/cra-pan-sup.component';
import { CraAgendaComponent } from './cra-agenda/cra-agenda.component';

import { CraCamImpComponent } from './cra-cam-imp/cra-cam-imp.component';
import { CraAutComponent } from './cra-aut/cra-aut.component';
import { SharedComponentsLegacyModule } from '../../../support/components/shared-components.module';
import { ReportCraV1P2Module } from '../../../support/components/template/cra/report-cra-v1p2/report-cra-v1p2.module';
import { ReportCraV1P5Module } from '../../../support/components/template/cra/report-cra-v1p5/report-cra-v1p5.module';
import { ReportCraV1P4Module } from '../../../support/components/template/cra/report-cra-v1p4/report-cra-v1p4.module';
import { ReportCraV1P6Module } from '../../../support/components/template/cra/report-cra-v1p6/report-cra-v1p6.module';
import { ReportCraV1P9Module } from '../../../support/components/template/cra/report-cra-v1p9/report-cra-v1p9.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
import { ReportCraV1P7Module } from '../../../support/components/template/cra/report-cra-v1p7/report-cra-v1p7.module';
import { ReportCraV8Module } from '../../../support/components/template/cra/report-cra-v8/report-cra-v8.module';
import { ReportCraV1P8Module } from '../../../support/components/template/cra/report-cra-v1p8/report-cra-v1p8.module';
import { ReportCraV11Module } from '../../../support/components/template/cra/report-cra-v11/report-cra-v11.module';
import { ReportCraV12Module } from '../../../support/components/template/cra/report-cra-v12/report-cra-v12.module';
import { ReportCraV1P10Module } from '../../../support/components/template/cra/report-cra-v1p10/report-cra-v1p10.module';
import { ReportCraV1P11Module } from '../../../support/components/template/cra/report-cra-v1p11/report-cra-v1p11.module';

@NgModule({
  imports: [
    RdaAdministracionRoutingModule,
    SelectModule,
    TableModule,
    SharedCWCModule,
    SharedCMCModule,

    SharedComponentsLegacyModule,

    ReportCraV1P1Module,
    ReportCraV1P2Module,
    ReportCraV1P6Module,
    ReportCraV1P7Module,
    ReportCraV1P3Module,
    ReportCraV1P4Module,
    ReportCraV1P5Module,
    ReportCraV1P8Module,
    ReportCraV1P9Module,
    ReportCraV1P10Module,
    ReportCraV1P11Module,
    ReportCraV4Module,
    ReportCraV5Module,
    ReportCraV6Module,
    ReportCraV7Module,
    ReportCraV8Module, 
    ReportCraV10Module,
    ReportCraV11Module,
    ReportCraV12Module
  ],
  declarations: [
    CraAutTasaComponent,
    RevaTempComponent,
    CraTopEfecComponent,
    CraPanSupComponent,
    CraAgendaComponent, /////
    CraCamImpComponent,
    CraAutComponent
  ]
})
export class RdaAdministracionModule { }