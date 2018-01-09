import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';

import { AuthService } from '../common/auth/auth.service';
import { MicropostService} from '../micropost/micropost.service';
import { Micropost } from '../micropost/micropost';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-micropost-entry',
  templateUrl: './micropost-entry.component.html',
  styleUrls: ['./micropost-entry.component.scss']
})
export class MicropostEntryComponent implements OnInit {

  loginUser: User;
  post: Micropost;

  constructor(private authService: AuthService, private micropostService: MicropostService, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  async execMicropost() {
    if (!this.post.content) {
      return;
    }

    const body = JSON.stringify({
      'content': this.post.content,
      'user_id': this.post.userId,
    });

    const ret = await this.micropostService.postMicropost(body);
    console.log(ret);
    this.post.content = '';
  }

  private async init() {
    this.post = new Micropost();
    this.loginUser = new User();
    this.loginUser = await this.authService.getUser();
    if (!this.loginUser) {
      this.router.navigate(['/login']);
    } else {
      this.post.userId = this.loginUser.id;
    }
  }
}
