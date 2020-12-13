/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditZeroLevelComponent } from './edit-zero-level.component';

describe('EditZeroLevelComponent', () => {
  let component: EditZeroLevelComponent;
  let fixture: ComponentFixture<EditZeroLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditZeroLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditZeroLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
