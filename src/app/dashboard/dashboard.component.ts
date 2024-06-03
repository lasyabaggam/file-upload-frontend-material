import { Component, ElementRef, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from '../shared/nav/nav.component';
import { FileService } from '../services/file.service';
import { FileListComponent } from '../shared/file-list/file-list.component';
import { TableComponent } from '../shared/table/table.component';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FlexLayoutModule, NavComponent, FileListComponent, TableComponent, FileUploadComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  title: 'material-pu-frontend';
  files: File[] = [];

  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.fileService.getFileList();
  }

  fetchFileContent(id: number): void {
    this.fileService.fetchFileContent(id);
  }
}
