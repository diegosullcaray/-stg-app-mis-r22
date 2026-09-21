import { Injectable } from "@angular/core";
import { principalConfig } from "../../principal/principal.util";
import { cardsConfig } from "../../cards/cards.util";
import { avancesConfig } from "../../avances/avances.util";
import { dinamizadoresConfig } from '../../dinamizadores/dinamizadores.util';

@Injectable()
export class Incentivos4Service {

    principalConfig:any;
    cardsConfig:any;
    avancesConfig:any;
    dinamizadoresConfig:any;

    constructor() {
        this.principalConfig = principalConfig;
        this.cardsConfig = cardsConfig;
        this.avancesConfig = avancesConfig;
        this.dinamizadoresConfig = dinamizadoresConfig;
    }

}