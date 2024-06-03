import { Component, ElementRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FileService } from '../../services/file.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'file-upload',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  file: File;
  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(
    private fileService: FileService,
    private commonService: CommonService
  ) {}

  onClick(): any {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onUpload(event: any): void {
    this.file = event.target.files[0];
    if (this.file && this.file.type.includes('csv')) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.fileService.uploadFile(formData);
    } else this.commonService.openSnackBar('Invalid File Format');
  }
}
