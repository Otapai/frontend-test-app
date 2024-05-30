import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { MainFooterComponent } from '../../components/main-footer/main-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    CommonModule,
    MainHeaderComponent,
    MainFooterComponent,
    RouterOutlet,
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
})
export class MainContainerComponent {}
