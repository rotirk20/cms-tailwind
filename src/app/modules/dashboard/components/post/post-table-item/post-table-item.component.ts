import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models/post';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[post-table-item]',
  standalone: true,
  imports: [AngularSvgIconModule, DatePipe, NgIf, RouterLink],
  templateUrl: './post-table-item.component.html',
})
export class PostTableItemComponent {
  @Input() post = <Post>{};
  @Output() deletePost = new EventEmitter<Post>();

  constructor() {}

  onDelete(): void {
    this.deletePost.emit(this.post);
  }
}
