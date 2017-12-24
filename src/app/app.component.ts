import { Component } from '@angular/core';
import { GetFoldersServiceService } from './get-folders-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:  [GetFoldersServiceService]
})
export class AppComponent {
  title = 'app';

  constructor(private forldesService:GetFoldersServiceService) { }
}
