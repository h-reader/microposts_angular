import { Component, OnInit } from '@angular/core';

import { AuthService } from '../common/auth/auth.service';
import { Micropost } from '../micropost/micropost';
import { MicropostService } from '../micropost/micropost.service';
import { getDefaultService } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-micropost-list',
  templateUrl: './micropost-list.component.html',
  styleUrls: ['./micropost-list.component.scss']
})
export class MicropostListComponent implements OnInit {

  microposts : Micropost[];


  constructor(private microPostService: MicropostService, private authService: AuthService) { }

  ngOnInit() {

    this.initMicropostData();
  }

  private async initMicropostData() {

    var user = await this.authService.getUser();

    if(user) {
      this.microposts = await this.microPostService.getMicropost(user.id);
      console.log('first create_at :');
      console.log(this.microposts[0].created_at);
    }

  }


}
