import { Component, OnInit,HostListener,AfterViewInit,ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray,FormBuilder } from '@angular/forms';
import {combineLatest, of,Observable,merge, BehaviorSubject} from 'rxjs';
import { startWith, map, tap, takeWhile } from 'rxjs/operators';
import {baseAnimations} from '../../../../../../../core/screen/animations/animations.util'
import {WinderService} from '../../../../../../../core/data/remote/winder/winder.service';
import { Strand } from '../../../../../../../core/data/remote/winder/strand.class';
import { IWinderConfig } from '../../../../../../../core/data/remote/winder/winder-bearer.interface';
//import { secStructureConfig } from 'app/system/session/session-structure.config';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reva',
  templateUrl: './reva.component.html',
  styleUrls: ['./reva.component.scss'],
  animations:baseAnimations
})
export class RevaComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
  
}
