import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSizeDirective } from 'app/core/screen/directives/font-size.directive';
import { ScrollToDirective } from 'app/core/screen/directives/scroll-to.directive';
import { AppDropdownDirective } from 'app/core/screen/directives/dropdown.directive';
import { DropdownAnchorDirective } from 'app/core/screen/directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from 'app/core/screen/directives/dropdown-link.directive';
import { AdminSideNavToggleDirective } from './admin-side-nav-toggle.directive';
import { AdminSidenavHelperDirective, AdminSidenavTogglerDirective } from './admin-sidenav-helper/admin-sidenav-helper.directive';
//import { AdminHighlightDirective } from './admin-highlight.directive';



const directives = [
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  AdminSideNavToggleDirective,
  AdminSidenavHelperDirective,
  AdminSidenavTogglerDirective,
  //AdminHighlightDirective
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class AdminDirectivesModule {}