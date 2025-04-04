import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BookService } from '../book.service';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { BookInterface } from '../common/BookInterface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../common/Genre';
import { CardModule } from "primeng/card";
import { Fluid } from "primeng/fluid";
import { FloatLabel } from "primeng/floatlabel";
import { Select } from "primeng/select";

@Component({
    selector: 'app-editbook',
    templateUrl: './editbook.component.html',
    styleUrls: ['./editbook.component.css'],
  imports: [
    ToastModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    CardModule,
    Fluid,
    FloatLabel,
    Select,
    FormsModule
  ],
    providers: [MessageService, BookService]
})
export class EditBookComponent implements OnInit, OnDestroy {

  @ViewChild(NgForm)
  protected ngForm: NgForm;

  protected bookModel: BookInterface;
  protected subscriptions: Subscription = new Subscription();

  protected coverDropdownOptions: SelectItem[] = [
    {label: 'Hard', value: 'HARD' },
    {label: 'Soft', value: 'SOFT' }
  ];

  protected coverImageSignal = signal<string>("");

  protected genres: Genre[];

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((book: { book: BookInterface } ) => {
      this.bookService.getGenres().subscribe(result => {
        this.genres = result;
        this.bookModel = book.book;
        this.coverImageSignal.set("data:image/png;base64," + this.bookModel.coverImage);
        console.log(this.coverImageSignal());
      });
    });
  }

  protected editBook() {
    this.ngForm.form.markAllAsTouched();
    if (this.ngForm.valid) {
      let value = this.ngForm.value;
      value.coverImage = this.bookModel.coverImage;
      this.bookService.update(this.bookModel.id, value).subscribe(result => {
        if (result) {
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'Record was edited successfully'
          });
        }
      });
    }
  }

  addCover(event: any) {

    const imageData: {image: string, name: string} = {
    } as {image: string, name: string};

    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
       const base64Image = reader.result;
       imageData.image = (<string>base64Image).split(',')[1];
       imageData.name = file.name;

       this.bookModel.coverImage = imageData;
       this.coverImageSignal.set(<string>base64Image);
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  }
}
