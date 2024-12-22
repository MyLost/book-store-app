import { ErrorHandler, EventEmitter, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

export const logout: EventEmitter<boolean> = new EventEmitter<boolean>();
export const dashboard:  EventEmitter<boolean> = new EventEmitter<boolean>();
export const editUser: EventEmitter<boolean> = new EventEmitter<boolean>();
export const deleteUser: EventEmitter<boolean> = new EventEmitter<boolean>();
export const translateEmitter: EventEmitter<string> = new EventEmitter<string>();
export const loginEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

export class CustomErrorHandler implements ErrorHandler {

    private msgSvc = inject(MessageService);

    handleError(error: any): void {
      if(error instanceof HttpErrorResponse) {
        this.msgSvc.add({
          key: 'app',
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
        });
      }
    }
}

export function isObjectEmpty(object: any) {
  return object && Object.keys(object).length === 0 && object.constructor === Object;
}
