import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTableItemComponent } from './post-table-item.component';

describe('PostTableItemComponent', () => {
  let component: PostTableItemComponent;
  let fixture: ComponentFixture<PostTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTableItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
