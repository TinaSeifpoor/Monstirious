import { Component, OnInit } from '@angular/core';
import { StartsettingsService } from '../startsettings.service';

@Component({
  selector: 'app-starting',
  templateUrl: './starting.component.html',
  styleUrls: ['./starting.component.css']
})
export class StartingComponent implements OnInit {

  constructor(private StartSettingService: StartsettingsService ) {}

  ngOnInit() {
  
  }
  public onEasyClick(): void {
    this.StartSettingService.setHealth(100);
    console.log('easy is called');
  }

  public onModerateClick(): void {
    this.StartSettingService.setHealth(200);
    console.log('Moderate is called');
  }

  public onHardClick(): void {
    this.StartSettingService.setHealth(300);
    console.log('hard is called');
  }
}
