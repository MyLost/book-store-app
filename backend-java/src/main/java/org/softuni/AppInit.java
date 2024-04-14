package org.softuni;

import org.softuni.services.BookService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppInit implements CommandLineRunner {

    private final BookService bookService;

    public AppInit(BookService bookService) {
        this.bookService = bookService;
    }

    @Override
    public void run(String... args) throws Exception {
//        bookService.loadBooks();
    }
}
