import {
  Component, OnInit, ViewChild,

  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,

} from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { of } from 'rxjs';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';

import * as HighchartsServiceService from 'highcharts';

import { Ac2 } from '../ac2/ac2';
import { Ac5 } from '../ac5/ac5';
import { Ac6 } from '../ac6/ac6';
import { Ac5Service } from '../ac5/ac5.service';
import { Ac6Service } from '../ac6/ac6.service';
import { Ac2serviceService } from '../ac2/ac2service.service';
import { HighchartsService } from './highcharts-service.service';
@Component({
  selector: 'app-uc2',
  templateUrl: './uc2.component.html',
  styleUrls: ['./uc2.component.css']
})
export class Uc2Component implements OnInit {
  @ViewChild('charts') public chartEl: ElementRef;

  myGroup: FormGroup;

  constructor(private hcs: HighchartsService, private formBuilder: FormBuilder, 
    private router: Router, private companyserviceservice: Ac2serviceService,
     private sectorsserviceservice: Ac5Service, private stockpriceservice: Ac6Service) { }

  companyList: Ac2[];

  companyListAll: Ac2[];

  sectorsList: Ac5[];

  stockpriceList: Observable<Ac6[]>;

  ngOnInit() {
    this.hcs.createChart(this.chartEl.nativeElement);
    this.myGroup = this.formBuilder.group({
      "choose": new FormControl([Validators.required]),
      "sectorname": new FormControl([Validators.required]),
      "companyname": new FormControl([Validators.required]),
      "fromdate": new FormControl([Validators.required]),
      "todate": new FormControl([Validators.required])
    })
    this.companyserviceservice.getAllCompanies().subscribe(data => {
      this.companyList = data;
      this.companyListAll = data;
      this.companyList = this.companyList.filter(comp => comp.sector == 'NSE');
    })
    this.stockpriceservice.getAllStockPrice().subscribe(data => {
      this.stockpriceList = data;
    })
    this.sectorsserviceservice.getAllSectors().subscribe(data => {
      this.sectorsList = data;
    })

  }

  sectorChange() {
    alert(1234);
    var sectorValue = this.myGroup.controls['sectorname'].value;
    this.companyList = this.companyListAll.filter(comp => comp.sector == sectorValue);

  }

}
