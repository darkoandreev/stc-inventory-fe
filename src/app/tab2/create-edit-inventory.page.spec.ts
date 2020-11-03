import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CreateEditInventoryPage } from './tab2.page';

describe('CreateEditInventoryPage', () => {
  let component: CreateEditInventoryPage;
  let fixture: ComponentFixture<CreateEditInventoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditInventoryPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
