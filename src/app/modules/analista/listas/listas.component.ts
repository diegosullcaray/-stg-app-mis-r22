import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AnalistaService } from "../compartido/servicios/analista.service";

@Component({
  selector: 'app-listas-analista',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {

  dataSource = [
    {
      name: 'Priorizacion de Leads',
      route: 'priorizacion-leads'
    },
    {
      name: 'Becas Financiera Confianza',
      route: 'becas'
    }
  ];

  headers = [
    {
      key: 'name',
      label: 'Nombre',
      
      format: {
        type: 'link',
        params: {
          actionFn: 'actionLink'
        }
      }
    }
  ];

  options = {
    header: {
      style: {
        'background': 'white',
        'color': '#304156'
      },
      cellStyle: {
        'height': '40px',
        'text-align': 'left'
      }
    },
    body: {
      hover: {
        enabled: true,
        style: {
          'background': '#f6f7f8'
        }
      },
    },
    grid: {
      mode: 'bottom'
    }
  };

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private analista:AnalistaService) { }

  ngOnInit(): void {
    if(!this.analista.cod_bt){
      this.router.navigateByUrl('/app/analista');
    }
  }

  actionLink(evt: any) {
    
    if (evt.key == 'name') {
      let route = './'+evt.row.route;
      this.router.navigate([route], { relativeTo: this.activatedRoute});
    }
  }

}
