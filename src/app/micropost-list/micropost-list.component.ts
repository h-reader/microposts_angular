import { Component, OnInit } from '@angular/core';

import { AuthService } from '../common/auth/auth.service';
import { Micropost } from '../micropost/micropost';
import { MicropostService } from '../micropost/micropost.service';

@Component({
  selector: 'app-micropost-list',
  templateUrl: './micropost-list.component.html',
  styleUrls: ['./micropost-list.component.scss']
})
export class MicropostListComponent implements OnInit {

  microposts: Micropost[];


  constructor(private microPostService: MicropostService, private authService: AuthService) { }

  ngOnInit() {
    this.initMicropostData();
    this.microPostService.editMicropost$.subscribe(() => { this.initMicropostData(); });
  }

  private async initMicropostData() {

    const user = await this.authService.getUser();

    if (user) {
      this.microposts = await this.microPostService.getMicropost(user.id);
      console.log('first create_at :');
      console.log(this.microposts[0].created_at);
    }

  }


}
