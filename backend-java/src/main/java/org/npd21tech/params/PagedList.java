package org.npd21tech.params;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

@Setter
@AllArgsConstructor
public class PagedList<T> implements Page<T> {

    private final List<T> content;
    private final Pageable pageable;
    private final Long total;

    @Override
    public int getTotalPages() {
        return (int) Math.ceil((double) total / pageable.getPageSize());
    }

    @Override
    public long getTotalElements() {
        return total;
    }

    @Override
    public int getNumber() {
        return pageable.getPageNumber();
    }

    @Override
    public int getSize() {
        return  pageable.getPageSize();
    }

    @Override
    public int getNumberOfElements() {
        return content.size();
    }

    @Override
    public List<T> getContent() {
        return content;
    }

    @Override
    public boolean hasContent() {
        return !content.isEmpty();
    }

    @Override
    public Sort getSort() {
        return pageable.getSort();
    }

    @Override
    public boolean isFirst() {
        return getNumber() == 0;
    }

    @Override
    public boolean isLast() {
        return getNumber() == getTotalPages() - 1;
    }

    @Override
    public boolean hasNext() {
        return getNumber() < getTotalPages() - 1;
    }

    @Override
    public boolean hasPrevious() {
        return getNumber() > 0;
    }

    @Override
    public Pageable nextPageable() {
        return hasNext() ? pageable.next() : Pageable.unpaged();
    }

    @Override
    public Pageable previousPageable() {
        return hasPrevious() ? pageable.previousOrFirst() : Pageable.unpaged();
    }

    @Override
    public <U> Page<U> map(Function<? super T, ? extends U> converter) {
        List<U> convertedContent = (List<U>) content.stream()
            .map(converter)
            .toList();
        return new PagedList<>(convertedContent, pageable, total);
    }

    @Override
    public Iterator<T> iterator() {
        return content.iterator();
    }
}
