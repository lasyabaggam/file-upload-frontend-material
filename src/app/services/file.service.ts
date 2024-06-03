import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  files: BehaviorSubject<any> = new BehaviorSubject([]);
  fileContent: BehaviorSubject<any> = new BehaviorSubject({});
  currentFileData: any = {};
  constructor(private apiService: ApiService) {}

  getFileList(): void {
    this.apiService
      .get('files', {params: {limit: 15}})
      .subscribe((response) =>{
         this.files.next(response.data);
         this.fetchFileContent(response.data[0].id);
      });
  }

  fetchFileContent(id: number): void {
    this.currentFileData = this.files.getValue()[id];
    this.apiService
      .get(`files/${id}/contents`)
      .subscribe((response) => this.fileContent.next(response));
  }

  uploadFile(file: any): void {
    this.apiService
      .post('upload', file)
      .subscribe((response) => this.getFileList(),
    );
  }
}
