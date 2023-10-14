import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-utils',
  templateUrl: './error-utils.component.html',
  styleUrls: ['./error-utils.component.css'],
})
export class ErrorUtilsComponent implements OnInit {
  @Input() errorMessage: string;
  constructor() {}

  ngOnInit() {}
}
