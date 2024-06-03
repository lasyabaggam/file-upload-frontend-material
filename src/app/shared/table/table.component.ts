import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from '../../services/file.service';
import { FileData } from '../../interfaces/file-data';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  displayedColumns: string[] = ['product', 'category', 'color', 'price'];

  dataSource: MatTableDataSource<FileData>;
  recordsCount: number;
  paginator: any;
  sort: any;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  };
  
  constructor(public fileService: FileService) {
    this.initiateTableData();
  }

  ngOnChanges() {
    this.initiateTableData();
  }

  ngAfterViewInit() {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initiateTableData(): void {
    this.fileService.fileContent.subscribe((data) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data.data);
        this.recordsCount = data.total;
      }
    });
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
