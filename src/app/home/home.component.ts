import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../common/component/component.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private componentService: ComponentService) { }

  ngOnInit() {
    this.componentService.componentAuthCheck();
  }

}
