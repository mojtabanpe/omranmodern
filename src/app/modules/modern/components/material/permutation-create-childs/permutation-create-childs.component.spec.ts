/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PermutationCreateChildsComponent } from './permutation-create-childs.component';

describe('PermutationCreateChildsComponent', () => {
  let component: PermutationCreateChildsComponent;
  let fixture: ComponentFixture<PermutationCreateChildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermutationCreateChildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermutationCreateChildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
