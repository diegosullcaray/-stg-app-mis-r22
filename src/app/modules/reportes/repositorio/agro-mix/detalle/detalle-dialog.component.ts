import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { tblOptsModal } from '../agro-mix.util';
import { cloneObject } from 'app/core/shared/functions.util';
import * as L from 'leaflet';
import { LayerGroup } from 'leaflet'; 

@Component({
  selector: 'app-detalle-dialog',
  templateUrl: './detalle-dialog.component.html',
  styleUrls: ['./detalle-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleDialogComponent implements OnInit, AfterViewInit {
 
  modalData: any[] = [];
  dataSource3Page: any[] = [];
  dataSource3Length: number = 0;
  showPaginator: boolean = false;
  OptsModal: any;
  @ViewChild("paginator", { static: false }) paginatorVC: StgPaginatorComponent;
 
  originalDataSource: any[] = [];
  public filterValue: string = ''; 
  public currentView: 'table' | 'map' = 'table';  
  private dataParaMapa: any = null;  
 
  isMapReady: boolean = false;   
  map: L.Map | undefined;  
  markersLayer = new L.LayerGroup();
  zoomLevel = 14; 
  iconUrl = 'https://decisionfarm.ca/assets/images/marker-icon-2x.png';

  options: L.MapOptions = {
    zoom: 6,
    center: L.latLng(-9.189967, -75.015152),
  };

  constructor(
    public dialogRef: MatDialogRef<DetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef 
  ) { }

  ngOnInit(): void {
    this.OptsModal = cloneObject(tblOptsModal);
     
    this.originalDataSource = this.data.modalData; 
     
    this.dataSource3Page = [...this.originalDataSource]; 
     
    this.preparePagination();
  }

  ngAfterViewInit(): void { 
    this.aplicarEstiloManualBarra();
  }
 
  aplicarEstiloManualBarra(): void { 
    setTimeout(() => {
        try { 
            const stgWindowBarHostElement = this.elementRef.nativeElement.querySelector('stg-window-bar');

            if (stgWindowBarHostElement) { 
                const elementoInterno = stgWindowBarHostElement.querySelector('.stg-window-bar');

                if (elementoInterno) { 
                    (elementoInterno as HTMLElement).style.setProperty(
                        'background',
                        'linear-gradient(135deg, #2d7738 0%, #4CAC54 100%)',
                        'important'
                    );
                    (elementoInterno as HTMLElement).style.setProperty(
                        'color',
                        'white',
                        'important'
                    );
                }
            }
        } catch (error) {
            console.error('❌ Error al aplicar estilo manualmente a la barra:', error);
        }
    }, 0); 
  }

 
  closeDialog(): void {
    this.dialogRef.close();
  }
 
  public goBackToTable(): void {
    this.currentView = 'table';
    if (this.map) {
      this.markersLayer.clearLayers();  
    }
  }
 
  onMapReady(map: L.Map) {
    this.map = map;
    this.isMapReady = true;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, 
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.addLayer(this.markersLayer);
 
    if (this.dataParaMapa) {
      this.setupMap();
    }
  }
 
  ddMaps(evt: any) { 
    const lat = +evt.row.HLATITU;
    const lng = +evt.row.HLONGIT;
    const name = evt.row.HDESCLI || evt.row.HCTACLI || 'Ubicación';

    if (isNaN(lat) || isNaN(lng)) {
      console.error("❌ Coordenadas inválidas:", evt.row);
      return;
    }
      
    this.dataParaMapa = { lat, lng, name };
    this.currentView = 'map';
 
    setTimeout(() => {
      this.setupMap();
    }, 100); 
  }
 
  private setupMap(): void {
    if (!this.isMapReady || !this.map || !this.dataParaMapa) {
      console.warn("⏳ Mapa no listo o sin datos, esperando...");
      return;
    }

    console.log('🗺️ Configurando mapa (setupMap)...');
    const { lat, lng, name } = this.dataParaMapa;
 
    this.map.invalidateSize();
 
    this.markersLayer.clearLayers();
 
    const icon = new L.DivIcon({
      html: `<img src='${this.iconUrl}'/><span>${name}</span>`,
      className: 'leaflet-div-icon',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    const marker = L.marker([lat, lng], { icon });
    this.markersLayer.addLayer(marker);
 
    this.map.setView([lat, lng], this.zoomLevel);
  }
 
  filter(evt: any) { 
    const inputValue = evt.target.value ?? '';  
     
    this.filterValue = inputValue;

    const v = inputValue.toString().toLowerCase();  
    console.log('Buscando:', v);

    if (v === "") { 
      this.dataSource3Page = [...this.originalDataSource];  
    } else { 
      console.log(this.dataSource3Page)  
      this.dataSource3Page = this.originalDataSource.filter(x => {
         
        const cli= (x.HDESCLI ?? '').toLowerCase();
        const fecpro = (x.HFECPRO ?? '').toString().toLowerCase();
        const cultivo = (x.HDESCUL ?? '').toLowerCase();
        const ctacli = (x.HCTACLI ?? '').toString().toLowerCase();
        const estCultivo = (x.HETPROD ?? '').toLowerCase();
        
 
        return cli.includes(v) ||
        fecpro.includes(v) ||
        cultivo.includes(v) ||
        ctacli.includes(v)    ||
        estCultivo.includes(v)  
      });
    }
 
    this.preparePagination();
  }
 

  preparePagination(): void {
    if (!this.dataSource3Page || this.dataSource3Page.length === 0) {
      this.showPaginator = false;
      this.modalData = [];
      this.dataSource3Length = 0;
      return;
    }
    this.dataSource3Length = this.dataSource3Page.length;

    if (this.dataSource3Length > 10) {
      this.showPaginator = true;
      prepareDataForPagination(10, this.dataSource3Page, "idPage");

      if (this.paginatorVC) {
        this.paginatorVC.toFirstPage();  
      }
      this.filterPage(1);
    } else {
      this.showPaginator = false;
      this.modalData = this.dataSource3Page;
    }
  }

  filterPage(page: number): void {
    this.modalData = this.dataSource3Page.filter(p => p.idPage == page);
  }

  eventChangePage(event: any): void {
    this.filterPage(event.page);
  }

}