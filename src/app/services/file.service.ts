import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  files: BehaviorSubject<any> = new BehaviorSubject([]);
  fileContent: BehaviorSubject<any> = new BehaviorSubject({});
  currentFileData: any = {};
  constructor(private apiService: ApiService, private commonService: CommonService) {}

  getFileList(): void {
    this.apiService
      .get('files', {params: {limit: 50}})
      .subscribe((response) =>{
         this.files.next(response.data);
         this.fetchFileContent(response.data[0].id);
      });
  }

  fetchFileContent(id: number): void {
    const files = this.files.getValue();
    this.currentFileData = files.find((res: any) => res.id === id);
    this.apiService
      .get(`files/${id}/contents`)
      .subscribe((response) => this.fileContent.next(response));
  }

  uploadFile(file: any): void {
    this.apiService
      .post('upload', file)
      .subscribe((response: any) => {
        this.getFileList();
        if (response) {
          this.fetchFileContent(response.file_id);
          this.commonService.openSnackBar('File uploaded successfully');
        }
      }
    );
  }
}
