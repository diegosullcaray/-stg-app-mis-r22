import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';
import { ModIncentivos2Service } from '../compartido/servicio/mod-incentivos2.service';
import { ClientesBaseComponent } from './clientes-base.component';

@Component({
  selector: 'app-clientes-dialog-incentivos2',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss', '../incentivos2-util.component.scss']
})
export class ClientesDialogComponent extends ClientesBaseComponent implements OnInit {

  constructor(
    public antService: ModIncentivos2Service, public incentivos: Incentivos2Service,
    private dialogRef: MatDialogRef<ClientesDialogComponent>) {
    super(antService, incentivos);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.dialogRef.close();
  }

}
