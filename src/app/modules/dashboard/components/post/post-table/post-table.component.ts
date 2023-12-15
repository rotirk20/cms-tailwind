import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from '../../../models/post';
import { PostTableItemComponent } from '../post-table-item/post-table-item.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[post-table]',
  standalone: true,
  imports: [NgFor, NgIf, PostTableItemComponent, AngularSvgIconModule, RouterLink],
  templateUrl: './post-table.component.html',
})
export class PostTableComponent implements OnInit {
  posts: Post[] = [];
  deleteRecord: boolean = false;
  selectedPost = <Post>{};
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  onDeletePost(post: Post): void {
    this.deleteRecord = true;
    this.selectedPost = post;
  }

  deletePost(post: Post) {
    this.postService.deletePost(post._id).subscribe((_) => {
      this.deleteRecord = false;
      this.getPosts();
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
