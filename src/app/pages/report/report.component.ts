import { Component, OnInit } from '@angular/core';
import { ConsultService } from 'src/app/service/consult.service';
import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto'; //https://stackoverflow.com/questions/67727603/error-category-is-not-a-registered-scale

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  type: ChartType = "line"
  barType: ChartType = "bar"
  doughnutType: ChartType = "doughnut"
  radarType: ChartType = "radar"
  pieType: ChartType = "pie"
  chart: Chart;

  pdfSrc: string;

  fileName: string;
  selectedFiles: FileList;
  imageData: any;

  constructor(
    private consultService: ConsultService
  ) { }

  ngOnInit(): void {
    this.draw();
  }

  draw() {
    this.consultService.callProcedureOrFunction().subscribe(data => {
      let dates = data.map(x => x.consultDate);
      let quantities = data.map(x => x.quantity);

      this.chart = new Chart('canvas', {
        type: this.type,
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Quantity',
              data: quantities,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              display: true
            },
            y: {
              display: true,
              beginAtZero: true
            },
          }
        }
      });
    });
  }

  change(type: string) {
    switch (type) {
      case 'bar':
        this.type = this.barType;
        break;
      case 'doughnut':
        this.type = this.doughnutType;
        break;
      case 'radar':
        this.type = this.radarType;
        break;
      case 'pie':
        this.type = this.pieType;
        break;
      default:
        break;
    }
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.draw();
  }

  viewReport(){
    this.consultService.generateReport().subscribe(data => {
      this.pdfSrc = window.URL.createObjectURL(data);
    });
  }

  downloadReport(){
    this.consultService.generateReport().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'Consults_Report.pdf'
      a.click();
    });
  }

  selectFile(e: any){    
    this.fileName = e.target.files[0]?.name;
    this.selectedFiles = e.target.files;
  }

  upload(){
    if(this.selectedFiles.item(0) != null){
      this.consultService.saveFile(this.selectedFiles.item(0)).subscribe();
    }

  }
}