import { Injectable } from '@angular/core';
/* import {
    faCoffee,
    faDivide,
    faEllipsisV,
    faEquals,
    faExchangeAlt,
    faFile,
    faFolder,
    faHome,
    faIdBadge as faIdBadgeS,
    faKey,
    faMinus,
    faPeopleArrows,
    faPlus,
    faPowerOff,
    faSearch,
    faTimes,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {
    faExpeditedssl
} from '@fortawesome/free-brands-svg-icons'
import {
    faIdBadge as faIdBadgeR
} from '@fortawesome/free-regular-svg-icons'; */
import { isNullOrUndefined } from 'app/core/shared/functions.util';

@Injectable({
    providedIn: 'root',
})
export class FaIconService {
    public repo: any;

    constructor() {
        this.repo={};
        /* this.repo['faCoffee'] = faCoffee;
        this.repo['file'] = faFile;
        this.repo['folder'] = faFolder;
        this.repo['powerOff'] = faPowerOff;
        this.repo['exchangeAlt'] = faExchangeAlt;
        this.repo['peopleArrows'] = faPeopleArrows;
        this.repo['home'] = faHome;
        this.repo['ellipsisV'] = faEllipsisV;
        this.repo['padlock'] = faExpeditedssl;
        this.repo['key'] = faKey;
        this.repo['search'] = faSearch;
        this.repo['idBadge-s'] = faIdBadgeS;
        this.repo['idBadge-r'] = faIdBadgeR;
        this.repo['plus'] = faPlus;
        this.repo['minus'] = faMinus;
        this.repo['times'] = faTimes;
        this.repo['divide'] = faDivide;
        this.repo['equals'] = faEquals; */
    }

    /* public get(key:string):IconDefinition{
        return this.repo[isNullOrUndefined(key)?'file':key];
    } */
}
