import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  standalone: true,
  templateUrl: './store.book.component.html',
  styleUrls: ['./store.book.component.css'],
  providers: []
})
export class StoreComponent { }/*
  ready = false;
  Employees: Employee[];
  store;
  books: BookInterface[];
  sortBooks: Array<BookInterface>;

  msgs;
  wrongSymbols: string;
  countIn;
  countOut;
  numberMessage;

  deleteForm: FormGroup;
  findForm: FormGroup;
  paragraphAuthor: string;
  paragraphTitle: string;
  inputMesgAuthor: boolean;
  inputMesgTitle: boolean;

  constructor() {
    this.deleteForm = new FormGroup({
      'author': new FormControl(this.book.author, [
      // Validators.required,
      //  Validators.minLength(4),
      //  Validators.pattern(/[<>]/)
      ]),
      'title': new FormControl(this.book.title, [
            //    Validators.required,

      ])
    });
    this.findForm = new FormGroup({
      'author': new FormControl(this.book.author, [
      // Validators.required,
      //  Validators.minLength(4),
      // Validators.pattern(/[<>]/)
      validateInputCustomValidator(/[<>]/),
      // MyValidator('Validator')
      ]),
      'title': new FormControl(this.book.title, [
      // Validators.required,
      validateInputCustomValidator(/[<>]/)
      ])
    });
    this.wrongSymbols = '';
    this.Employees = [];

    // console.log('I am a constuctor');


    // this.listBook.client().subscribe((data: HttpResponse<Employees>) => {
    // console.log(data);
    // console.log('This is data from obesrvable HttpResponse: ' + data.body);
    // console.log('I can access his properties: ' + data.headers.get('content-type'));
    // console.log(typeof(data) + ' :This is type of arriving data');
    // this.employeesTwo = data.body;

    // console.log(this.employees = this.employees.Employees);
    // tslint:disable-next-line:no-shadowed-variable
    // this.employees.forEach((element: Employees) => {
    // console.log(this.employee = element);
    // });

    // tslint:disable-next-line:no-shadowed-variable
    // this.employees = Object.values(data.body);
    // console.log(Array.from(this.employees));

    // console.log(this.myArray = this.employees.map(function(town){
        // return town[0];
    // }));

    // console.log(this.employees.Employees[0].firstName);
    // this.employees = data;
    // console.log(this.employees.body.Employees[0].firstName);
    // });

   // this.listBook.getCLient().subscribe((res: Response) => this.someVariable = res.json());
   // console.log(this.listBook.getCLient().subscribe(data => console.log(data.lastName)));

    //  this.listBook.getClientResponse().subscribe((data: Response) => {
    // console.log(data.toString() + ' :method to string');
    // console.log(data + ': Before assingment to variable');
    //   console.log(typeof(data));
    // this.employeesOne = data;
    //   console.log(data + ': This is data from observable employeesOne');
    //   console.log(data.headers + ' :I can\'t access headers property');
    // });

  }

  ngOnInit() {

    this.inputMesgAuthor = false;
    this.inputMesgTitle = false;
    // console.log('ng on init');
    this.flag = false;
    this.numberMessage = 0;
    this.countIn = -1;
    this.countOut = 0;


    // this.getState();
    // console.log('I am a ngOnInit');
    // this.listBook.client().subscribe((data) => { console.log();
    // console.log(JSON.parse(JSON.stringify(data.body)));
    // this.employees = {...data};
    // console.log(this.employees);
    // });

    // console.log(this.listBook.client.get('../../../../../resources/myData.php', {
    //  headers: {
    //    'Content-Type' : ['plain/text', 'application/json', 'application/x-httpd-php'] ,
    //    'Accept' : 'plain/text',
    //    'WWW-Authenticate': 'Basic realm="Access to the staging site", charset="UTF-8"',
    //  }
    //  })
    // .subscribe(data => console.log(data))
    // );
  }

  listData() {

    // console.log(Object.entries(this.employees));

    // this.employeesOne.Employees.map(
    //  (elem: Employees) => {
    //  console.log('employeesOne with response I can\'t access response params');
    //  console.log(this.employeesOne + ' :This is employeesOne objects');
    //  console.log(elem.firstName);
    //  });

    // this.employeesTwo.Employees.map(
    //   (elem: Employees) => {
    //  console.log('employeesTwo with response I can\'t access response params');
    //  console.log(this.employeesTwo + ' :This is employeesTwo objects');
    //  console.log(elem.firstName);
    // });

    this.ready = true;
  }

  getPhpFile() {
    this.listBook.getPHPFile().subscribe((data) => console.log(data.body));
  }

  getBackEnd() {
    this.ready = true;
    this.listBook.getBackEnd().subscribe(
      data => {
      this.Employees = data.body;
    });
  }

  showResult() {
    // console.log(this.Employees);
  }

  getState() {}

  ngrxInAction() {}

  dispach() {}




  deleteBook(form: FormGroup) {

    if (!this.inputMesgAuthor && !this.inputMesgTitle) {
      this.book.author = form.controls.author.value;
      this.book.author = form.controls.title.value;
    } else {
      this.book.author = '';
      this.book.title = '';
    }
    // console.log(this.book);
    // this.messageService.add({severity: 'error', summary: 'Service Message', detail: 'Book not deleted'});
    // console.log('deleteBook: ' + this.book.author);
    this.listBook.deleteBook(this.book).subscribe((data: any) => {
      if (data.success) {
        console.log(data);
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Book deleted correctly'});
      } else {
        this.messageService.add({severity: 'error', summary: 'Server Message', detail: 'unfulfilled request'});
      }
    });
  }

  findBook(dataFromForm: FormGroup) {

    if (dataFromForm.valid) {
      this.book.author = dataFromForm.value.author;
      this.book.title = dataFromForm.value.title;
    } else {
      this.book.author = '';
      this.book.title = '';
    }

    // console.log(this.book);
    // this.messageService.add({severity: 'error', summary: 'Service Message', detail: 'Book not found'});
    // console.log('findBook: ' + this.book);
    this.listBook.findBook(this.book).subscribe((data: any) => {
      if (data.success) {
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Book found'});

      } else {
        this.messageService.add({severity: 'error', summary: 'Server Message', detail: 'unfulfilled request'});
      }
    });
  }


  validator(formData) {
    this.paragraphAuthor = formData.value.author;
    this.paragraphTitle = formData.value.title;
    const regex = /[<>]/g;
    if (formData.value.author) {
      if (this.paragraphAuthor.match(regex)) {
        this.inputMesgAuthor = true;
        return;
      }
    this.inputMesgAuthor = false;
    } else {
    this.inputMesgAuthor = false;
    }
    if (formData.value.title) {
      if (this.paragraphTitle.match(regex)) {
        console.log('match');
        this.inputMesgTitle = true;
        return;
      }
    this.inputMesgTitle = false;
    } else {
      this.inputMesgTitle = false;
    }
  }

  find(event) {
    // console.log(event);
  }

}



/*export function MyValidator(value: string) {

  return (control: AbstractControl): { [key: string]: any} | null => {
    return true ? {'forbiddenName': {value: 'someValue'}} : null;
  };
}*/

