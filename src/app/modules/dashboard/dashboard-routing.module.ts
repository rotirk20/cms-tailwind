import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { PostComponent } from './pages/post/post.component';
import { EditPostComponent } from './pages/post/edit-post/edit-post.component';
import { PostTableComponent } from './components/post/post-table/post-table.component';
import { CreatePostComponent } from './pages/post/create-post/create-post.component';
import { CategoryComponent } from './pages/category/category.component';
import { CreateCategoryComponent } from './pages/category/create-category/create-category.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { CategoryTableComponent } from './components/category/category-table/category-table.component';
import { UserTableComponent } from './components/user/user-table/user-table.component';
import { UserComponent } from './pages/user/user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      {
        path: 'posts',
        component: PostComponent,
        children: [
          { path: '', component: PostTableComponent },
          { path: 'create', component: CreatePostComponent },
          { path: ':id/edit', component: EditPostComponent },
        ],
      },
      {
        path: 'categories',
        component: CategoryComponent,
        children: [
          { path: '', component: CategoryTableComponent },
          { path: 'create', component: CreateCategoryComponent },
          { path: ':id/edit', component: EditCategoryComponent },
        ],
      },
      { path: 'users', component: UserComponent, 
      children: [
        { path: '', component: UserTableComponent },
        { path: 'create', component: CreateUserComponent },
        { path: ':id/edit', component: EditUserComponent },
      ]
      },
      { path: 'podcast', component: PodcastComponent },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
