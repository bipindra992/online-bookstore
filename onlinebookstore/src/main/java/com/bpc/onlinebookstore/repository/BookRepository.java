package com.bpc.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bpc.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
