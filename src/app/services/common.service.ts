import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  modifyReqValue(req: any): string {
    return JSON.parse(JSON.stringify(req));
  }
}
