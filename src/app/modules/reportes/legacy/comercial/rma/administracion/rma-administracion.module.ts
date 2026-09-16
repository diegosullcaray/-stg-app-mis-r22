import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCraV3Module } from '../../../support/components/template/cra/report-cra-v3/report-cra-v3.module';
import { ReportCraV2Module } from '../../../support/components/template/cra/report-cra-v2/report-cra-v2.module';
import { SharedComponentsLegacyModule } from '../../../support/components/shared-components.module';
import { RmaAdministracionRoutingModule } from './rma-administracion-routing.module';
import { ReportCraV4Module } from '../../../support/components/template/cra/report-cra-v4/report-cra-v4.module';
import { CraSegAseComponent } from './cra-seg-ase/cra-seg-ase.component';
import { SelectModule } from '../../../support/components/select/select.module';
import { TableModule } from '../../../support/components/table/table.module';
import { GraphicModule } from '../../../support/components/graphic/graphic.module';
import { ReportCraV5Module } from '../../../support/components/template/cra/report-cra-v5/report-cra-v5.module';
import { ReportCraV1P1Module } from '../../../support/components/template/cra/report-cra-v1p1/report-cra-v1p1.module';
import { CraAutTasaComponent } from './cra-aut-tasa/cra-aut-tasa.component';
import { ReportCraV1P3Module } from '../../../support/components/template/cra/report-cra-v1p3/report-cra-v1p3.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
import { ReportCraV1P8Module } from '../../../support/components/template/cra/report-cra-v1p8/report-cra-v1p8.module';
import { ReportCraV11Module } from '../../../support/components/template/cra/report-cra-v11/report-cra-v11.module';


@NgModule({
  imports: [
    CommonModule,
    ReportCraV1P1Module,
    ReportCraV1P3Module,
    ReportCraV5Module,
    ReportCraV4Module,
    ReportCraV3Module,
    ReportCraV2Module,
    ReportCraV5Module,
    ReportCraV1P1Module,
    ReportCraV1P8Module,
    SharedComponentsLegacyModule,
    SelectModule,
    TableModule,
    RmaAdministracionRoutingModule,
    GraphicModule,
    SharedCWCModule,
    SharedCMCModule,
    ReportCraV11Module,
  ],
  declarations: [CraSegAseComponent, CraAutTasaComponent]
})
export class RmaAdministracionModule { }