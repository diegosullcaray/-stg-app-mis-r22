import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';
import { AutoCompleteModule } from '../../../support/components/auto-complete/auto-complete.module';
import { SelectModule } from '../../../support/components/select/select.module';
import { SharedComponentsLegacyModule } from '../../../support/components/shared-components.module';
import { TableModule } from '../../../support/components/table/table.module';
import { ReportCrsV1Module } from '../../../support/components/template/crs/report-crs-v1/report-crs-v1.module';
import { ReportCrsV2Module } from '../../../support/components/template/crs/report-crs-v2/report-crs-v2.module';
import { ReportCrsV3Module } from '../../../support/components/template/crs/report-crs-v3/report-crs-v3.module';
import { CrsCapRetComponent } from './crs-cap-ret/crs-cap-ret.component';
import { CrsCliActComponent } from './crs-cli-act/crs-cli-act.component';
import { CrsReproPdmComponent } from './crs-repro-pdm/crs-repro-pdm.component';
import { CrsReproComponent } from './crs-repro/crs-repro.component';
import { RDASectoristaRoutingModule } from './rda-sectorista-routing.module';
//import { RevaComponent } from './reva/reva.component';
import { SearchSecComponent } from './search-sec/search-sec.component';
import { ReportCrsV4Module } from '../../../support/components/template/crs/report-crs-v4/report-crs-v4.module';
import { AutoCompletePropModule } from '../../../support/components/auto-complete-prop/auto-complete-prop.module';
import { CrsProspeComponent } from './crs-prospe/crs-prospe.component';
import { ReportCrsV5Module } from '../../../support/components/template/crs/report-crs-v5/report-crs-v5.module';
import { ReportCrsV6Module } from '../../../support/components/template/crs/report-crs-v6/report-crs-v6.module';


@NgModule({
  imports: [
    TableModule,
    SelectModule,
    SharedMaterialModule,
    FlexLayoutModule,
    SharedComponentsLegacyModule,
    RDASectoristaRoutingModule,
    AutoCompleteModule,
    AutoCompletePropModule,
    ReportCrsV1Module,
    ReportCrsV2Module,
    ReportCrsV3Module,
    ReportCrsV4Module,
    ReportCrsV5Module,
    ReportCrsV6Module
  ],
  declarations: [/*RevaComponent,*/ SearchSecComponent, CrsReproComponent, CrsCliActComponent, CrsReproPdmComponent, CrsCapRetComponent, CrsProspeComponent],
  
})
export class RDASectoristaModule { }