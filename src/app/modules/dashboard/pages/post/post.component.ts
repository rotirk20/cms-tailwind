import { Component } from '@angular/core';
import { PostTableComponent } from '../../components/post/post-table/post-table.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostTableComponent, RouterOutlet],
  templateUrl: './post.component.html',
})
export class PostComponent {

  constructor() {
  }
}
