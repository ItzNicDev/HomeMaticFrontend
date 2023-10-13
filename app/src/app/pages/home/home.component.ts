import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Chart} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  public liters: number = 1240;
  public percentage: number = 25;
  public litersMax: number = 4550;
  public chart: any;
  public percentValues: string[] = [];
  public dataValues: string[] = [];

  @ViewChild('svgPath') svgPath: any;


  constructor(private api: ApiService, private renderer: Renderer2) {
  }

  ngOnInit() {


    this.api.get("http://localhost:5169/WaterLevel?apiKey=U2FsdGVkX1%2Fdp4YED4ae%2BQwg0BxU9ywlBNKeOjTBAmo%3D&ip=192.168.178.43&deviceName=BidCos-RF.PEQ1605600%3A1.FILLING_LEVEL").subscribe(result => {
      console.log(result);
      this.percentage = parseInt(result.toString()) - 10;
      this.liters = Math.round(this.litersMax * (this.percentage / 100));
    });

    this.api.get("http://localhost:5169/History").subscribe(result => {

      if (Array.isArray(result)) {
        this.percentValues = result.map(item => item.Percent.toString());
        this.dataValues = result.map(item => item.Date.toString());
        this.createChart(this.percentValues, this.dataValues)

      } else {
        console.error("Response is not an array.");
      }
    });


  }


  ngAfterViewInit() {
    const pathElement = this.svgPath.nativeElement;

    pathElement.setAttribute('stroke-dasharray', (this.percentage * 1).toString() + ', 75');

  }

  createChart(_percentValues: string[], _dataValues: string[]) {



    this.chart = new Chart("MyChart", {
      type: 'line',

      data: {
        labels: _dataValues,
        datasets: [
          {
            data: _percentValues,
            borderColor: 'rgba(255,255,255,0.6)', // Ändern Sie die Randfarbe auf Blau
            borderWidth: 3, // Ändern Sie die Randbreite
            pointBackgroundColor: 'rgb(31,119,171)', // Ändern Sie die Punkt-Hintergrundfarbe auf Blau
            tension: 0.4,
            pointHitRadius: 1,

          },]
      },
      options: {

        responsive: true,

        aspectRatio: 1,
        plugins: {
          legend: {
            display: false
          },

          tooltip: {
            enabled: true, // Enable tooltips
            intersect: false, // Show tooltips for all points when hovering
            backgroundColor: 'rgba(255,255,255,0.28)', // Background color of the tooltip
            callbacks: {
              // Customize the tooltip content
              title: (tooltipItems) => {
                // You can customize the title text here
                // tooltipItems is an array of objects containing information about the hovered points
                // For example, you can use tooltipItems[0].label to access the label of the first point
                return 'Water Level: ' + tooltipItems[0].label;
              },

            }
          }


        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              color: "white"
            }
          },
          y: {
            display: true,
            grid: {
              color: "rgba(56,53,86,0.7)"
            },

          }
        },
        animation: {
          duration: 500, // Dauer der Animation in Millisekunden
          easing: 'easeInOutCubic', // Art der Animation (hier linear)
        }
      }
    });

  }

}
