import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from '../../../models/post';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { TableItemComponent } from 'src/app/shared/components/table-item/table-item.component';

@Component({
  selector: '[post-table]',
  standalone: true,
  imports: [NgFor, NgIf, TableItemComponent, AngularSvgIconModule, RouterLink, NgClass],
  templateUrl: './post-table.component.html',
})
export class PostTableComponent implements OnInit {
  posts: Post[] = [];
  deleteRecord: boolean = false;
  selectedPost = <Post>{};
  columns = [
    { name: "Title", field: "title" },
    { name: "Created by", field: "created_by" },
    { name: "Category", field: "categories" },
    { name: "Status", field: "status" },
    { name: "Action", field: "action" },
  ]
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
