import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-in-progress',
  imports: [],
  templateUrl: './work-in-progress.component.html',
  styleUrl: './work-in-progress.component.css'
})
export class WorkInProgressComponent implements OnInit {
  /**
   * Title is set based on route data (e.g. 'History' or 'Reports').
   */
  title = 'Work in Progress';
  pulseState = 'rest';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const dataTitle = this.route.snapshot.data['title'];
    if (dataTitle) {
      this.title = dataTitle;
    }
    // trigger pulsing every interval
    setInterval(() => {
      this.pulseState = this.pulseState === 'rest' ? 'pulse' : 'rest';
    }, 800);
  }
}
