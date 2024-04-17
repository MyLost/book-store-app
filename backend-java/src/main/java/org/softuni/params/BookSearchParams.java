package org.softuni.params;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//This is basic search, but enough for this application
public class BookSearchParams {

    private String author;
    private String title;

}
