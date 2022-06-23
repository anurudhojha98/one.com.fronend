import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from '../constants';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['position', 'item_name', 'description', 'actions'];
  constructor(private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  dataSource!:MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: any) => {
      console.log(res)
      if (res.success === true) {
        this.snackBar.open(res.message, Constants.SNACK_BAR_SUCCESS_MESSAGE_ACTION, {
          duration: Constants.SNACK_BAR_MESSAGE_DURATION,
        });
        this.dataSource = new MatTableDataSource(res.products);
        this.dataSource.paginator = this.paginator;
      } else {
        this.snackBar.open(res.message, Constants.SNACK_BAR_SUCCESS_MESSAGE_ACTION, {
          duration: Constants.SNACK_BAR_MESSAGE_DURATION,
        });
        this.router.navigate(['/login']);
      }
      console.log(this.dataSource)
    }, (err: any) => {
      console.log(err)
    })
  }

}
export interface PeriodicElement {
  item_name:string;
  description:string;
}

let ELEMENT_DATA: PeriodicElement[] = [];