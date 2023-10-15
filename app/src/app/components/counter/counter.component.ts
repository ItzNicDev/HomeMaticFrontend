import {Component, Input, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input()
  set countUntil(value: number) {
    this.startCount(value);
  }

  @Input() interval: any;

  currentCount: number = 0;

  startCount(countUntil: number) {
    const duration = this.interval; // Animation duration in milliseconds
    const startTime = new Date().getTime();
    const startCount = this.currentCount;
    const endCount = countUntil;

    const animate = () => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const t = elapsedTime / duration;
        this.currentCount = Math.floor(startCount + t * (endCount - startCount));
        requestAnimationFrame(animate);
      } else {
        this.currentCount = endCount;
      }
    };

    requestAnimationFrame(animate);
  }
}
