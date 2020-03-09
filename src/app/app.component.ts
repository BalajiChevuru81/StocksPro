import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';

import { HighchartsService } from './LoC/uc2/highcharts-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stocks';
}
