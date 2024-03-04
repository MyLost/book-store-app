package org.lost.backendjava.services.impl;

import java.math.BigDecimal;
import java.util.List;
import org.lost.backendjava.dtos.BookResponse;
import org.lost.backendjava.dtos.BookGenreResponse;
import org.lost.backendjava.dtos.BookRequest;
import org.lost.backendjava.entities.BookEntity;
import org.lost.backendjava.entities.BookGenreEntity;
import org.lost.backendjava.enums.BookCover;
import org.lost.backendjava.mappers.BookMapper;
import org.lost.backendjava.params.BookSearchParams;
import org.lost.backendjava.repositories.BookRepository;
import org.lost.backendjava.repositories.GenreRepository;
import org.lost.backendjava.services.BookService;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;
    private final BookMapper bookMapper;

    public BookServiceImpl(BookRepository bookRepository, GenreRepository genreRepository, BookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.genreRepository = genreRepository;
        this.bookMapper = bookMapper;
    }

    @Override
    public List<BookResponse> getAll(BookSearchParams bookSearchParams) {
        if (bookSearchParams == null) {
            return bookRepository.findAll().stream().map(bookMapper::toDto).toList();
        }
        return bookRepository
            .findAllByAuthorEqualsAndTitleEquals(bookSearchParams.getAuthor(), bookSearchParams.getTitle())
            .stream().map(bookMapper::toDto).toList();
    }

    @Override
    public List<BookResponse> getAllPromotion() {
        return bookRepository.findAllByPromotionEquals(true).stream().map(bookMapper::toDto).toList();
    }

    @Override
    public List<BookGenreResponse> getAllGenre() {
        return genreRepository.findAll().stream().map(bookMapper::toGenreDto).toList();
    }

    @Override
    public BookResponse save(BookRequest bookRequest) {
        var entity = bookMapper.fromDto(bookRequest);
        entity = bookRepository.save(entity);
        var request = bookMapper.toDto(entity);
        return request;
    }

    @Override
    public BookResponse getById(Long id) {
        var entity = bookRepository.findById(id).get();
        return bookMapper.toDto(entity);
    }

    @Override
    public BookResponse update(Long id, BookRequest bookRequest) {
        var optionEntity = bookRepository.findById(id);
        BookResponse response = null;
        if(optionEntity.isPresent()) {
            var entity = optionEntity.get();

            entity.setAuthor(bookRequest.getAuthor());
            entity.setTitle(bookRequest.getTitle());
            entity.setNumberOfBooks(bookRequest.getNumberOfBooks());
            entity.setGenre(genreRepository.getReferenceById(id));
            entity.setCover(BookCover.valueOf(bookRequest.getCover()));
            entity.setPrice(bookRequest.getPrice());

            response = bookMapper.toDto(bookRepository.save(entity));
        }
        return response;
    }

    @Override
    public void delete(Long id) {
        this.bookRepository.deleteById(id);
    }

    @Override
    public void loadBooks() {

        var genre = BookGenreEntity.builder().name("Biography").build();
        genreRepository.save(genre);

        var bookOne = new BookEntity();
        bookOne.setAuthor("Shubhra Gupta");
        bookOne.setTitle("Irrfan Khan: A Life in Movies");
        bookOne.setPrice(new BigDecimal(23));
        bookOne.setNumberOfBooks(4);
        bookOne.setCover(BookCover.HARD);
        bookOne.setGenre(genre);

        var bookTwo = new BookEntity();
        bookTwo.setAuthor("British historian Simon Sebag Montefiore");
        bookTwo.setTitle("The World: A Family History");
        bookTwo.setPrice(new BigDecimal(23));
        bookTwo.setNumberOfBooks(4);
        bookTwo.setCover(BookCover.HARD);
        bookTwo.setGenre(genre);

        var bookThree = new BookEntity();
        bookThree.setAuthor("Kaki Madhava Rao");
        bookThree.setTitle("Breaking Barriers: the Story of a Dalit Chief Secretary");
        bookThree.setPrice(new BigDecimal(23));
        bookThree.setNumberOfBooks(4);
        bookThree.setCover(BookCover.HARD);
        bookThree.setGenre(genre);

        var bookFour = new BookEntity();
        bookFour.setAuthor("Shashi Tharoor");
        bookFour.setTitle("Ambedkar: A Life"	);
        bookFour.setPrice(new BigDecimal(23));
        bookFour.setNumberOfBooks(4);
        bookFour.setCover(BookCover.HARD);
        bookFour.setGenre(genre);

        var bookFive = new BookEntity();
        bookFive.setAuthor("Dr. Ashvini Kumar Dwivedi");
        bookFive.setTitle("Human Anatomy");
        bookFive.setPrice(new BigDecimal(23));
        bookFive.setNumberOfBooks(4);
        bookFive.setCover(BookCover.HARD);
        bookFive.setGenre(genre);

        var allBooks = List.of(bookOne, bookTwo, bookThree, bookFour, bookFive);

        bookRepository.saveAll(allBooks);
    }
}
