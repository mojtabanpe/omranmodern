/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditFirstLevelComponent } from './edit-first-level.component';

describe('EditFirstLevelComponent', () => {
  let component: EditFirstLevelComponent;
  let fixture: ComponentFixture<EditFirstLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFirstLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFirstLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
