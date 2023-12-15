import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { PostComponent } from './pages/post/post.component';
import { EditPostComponent } from './pages/post/edit-post/edit-post.component';
import { PostTableComponent } from './components/post/post-table/post-table.component';
import { CreatePostComponent } from './pages/post/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'posts', component: PostComponent, children: [
        { path: 'list', component: PostTableComponent },
        { path: 'create', component: CreatePostComponent },
        { path: ':id/edit', component: EditPostComponent }
      ]},
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
