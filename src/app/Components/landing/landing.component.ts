import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SiteInfo } from '../../Interfaces/siteInfo';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public siteInfo: SiteInfo = { title: '', description: '' };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSiteInfo();
  }

  public goToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView();
  }

  public getSiteInfo(): void {
    this.http
      .get<SiteInfo>(environment.apiUrl + '/admin/info/')
      .toPromise()
      .then((info: SiteInfo) => {
        this.siteInfo = info;
      });
  }
}
