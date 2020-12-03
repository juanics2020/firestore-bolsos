import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerAticuloPage } from './ver-aticulo.page';

describe('VerAticuloPage', () => {
  let component: VerAticuloPage;
  let fixture: ComponentFixture<VerAticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerAticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
