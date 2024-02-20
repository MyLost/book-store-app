import { ErrorHandler, EventEmitter } from '@angular/core';

export const logout: EventEmitter<boolean> = new EventEmitter<boolean>();
export const dashboard:  EventEmitter<boolean> = new EventEmitter<boolean>();
export const editUser: EventEmitter<boolean> = new EventEmitter<boolean>();
export const deleteUser: EventEmitter<boolean> = new EventEmitter<boolean>();
export const translateEmitter: EventEmitter<string> = new EventEmitter<string>();




export class CustomErrorHandler implements ErrorHandler {
    handleError(error: any): void {
      console.log(error);
    }
}
