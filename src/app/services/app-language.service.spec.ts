import { TestBed, inject } from '@angular/core/testing';

import { AppLanguageService } from './app-language.service';

describe('AppLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLanguageService]
    });
  });

  it('should be created', inject([AppLanguageService], (service: AppLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
