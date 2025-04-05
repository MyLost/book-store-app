package org.npd21tech.services.impl;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.dtos.BookRequest;
import org.npd21tech.dtos.BookResponse;
import org.npd21tech.entities.BookEntity;
import org.npd21tech.entities.BookGenreEntity;
import org.npd21tech.enums.BookCover;
import org.npd21tech.mappers.BookMapper;
import org.npd21tech.params.BookSearchParams;
import org.npd21tech.params.GenreParams;
import org.npd21tech.params.PagedList;
import org.npd21tech.params.PagedParams;
import org.npd21tech.repositories.BookRepository;
import org.npd21tech.repositories.GenreRepository;
import org.npd21tech.services.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public PagedList<BookResponse> getPagedList(PagedParams params) {

        Pageable pageable = PageRequest.of(params.getPage(), params.getRows(), params.getSort());

        Page<BookEntity> pagedBooksEntity = bookRepository.findAll(pageable);

        var content = pagedBooksEntity.getContent().stream().map(bookMapper::toDto).toList();

        return new PagedList<BookResponse>(content, pageable, pagedBooksEntity.getTotalElements());
    }

    @Override
    public PagedList<BookResponse> getPagedListByGenre(PagedParams params, Long genreId) {

        Pageable pageable = PageRequest.of(params.getPage(), params.getRows(), params.getSort());

        Page<BookEntity> pagedBooksEntity = bookRepository.findAllByGenreId(pageable, genreId);

        var content = pagedBooksEntity.getContent().stream().map(bookMapper::toDto).toList();

        return new PagedList<BookResponse>(content, pageable, pagedBooksEntity.getTotalElements());
    }

    @Override
    public BookResponse getByParams(BookSearchParams bookSearchParams) {
        BookEntity book = bookRepository
            .findByAuthorEqualsAndTitleEquals(bookSearchParams.getAuthor(), bookSearchParams.getTitle());
        return bookMapper.toDto(book);
    }

    @Override
    public List<BookResponse> getAll(BookSearchParams bookSearchParams) {
        if (bookSearchParams == null) {
            var books = bookRepository.findAll().stream().map(bookMapper::toDto).toList();
            return books;
        }
        var books = bookRepository
                .findAllByAuthorEqualsAndTitleEquals(bookSearchParams.getAuthor(), bookSearchParams.getTitle())
                .stream().map(bookMapper::toDto).toList();
        return books;
    }

    @Override
    public List<BookResponse> getAllPromotion() {
        return bookRepository.findAllByPromotionEquals(true).stream().map(bookMapper::toDto).toList();
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
            entity.setGenre(genreRepository.getReferenceById(bookRequest.getGenreRequest().getId()));
            entity.setCover(BookCover.valueOf(bookRequest.getCover()));
            entity.setCoverImage(Base64.getDecoder().decode(bookRequest.getCoverImage().getImage()));
            entity.setPrice(bookRequest.getPrice());

            bookRepository.save(entity);
            response = bookMapper.toDto(entity);
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
